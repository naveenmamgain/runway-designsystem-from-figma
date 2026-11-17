"""Build the review page with every screenshot embedded as a data URI.

Reads research/pattern-catalogue.json and research/review-page.template.html,
looks up a PNG for every evidence frame (research/figma-inventory/<slug>/<node>.png
or a repo path for "repo:" evidence), resizes to JPEG, and writes
<out>/index.html.

Run: python3 research/build_review_page.py <out_dir>
"""
import base64, json, os, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INV = os.path.join(ROOT, "research", "figma-inventory")
SLUG = {"LOG": "logistics", "ER": "e-rickshaw", "HP": "home-page-2026", "NO": "new-onboarding", "RF": "referral-flow",
        "MP": "my-plans-2", "BO": "bundle-orders", "OA": "oa-revamp", "HO": "home-of-orders", "FA": "face-auth", "BD": "b2b-delivery"}


def png_for(ev):
    if ev["code"] == "repo":
        return os.path.join(ROOT, ev["node"])
    return os.path.join(INV, SLUG[ev["code"]], ev["node"].replace(":", "-") + ".png")


TALL = set()


def dims(path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", path], capture_output=True, text=True).stdout
    w = int(out.split("pixelWidth:")[1].split()[0]); h = int(out.split("pixelHeight:")[1].split()[0])
    return w, h


def to_data_uri(path, max_dim, key=None):
    w, h = dims(path)
    if h > 2.3 * w:  # long scrolling page: size by width, keep it readable
        TALL.add(key)
        resize = ["--resampleWidth", str(min(w, 420))]
    else:
        resize = ["-Z", str(max_dim)]
    with tempfile.NamedTemporaryFile(suffix=".jpg") as t:
        r = subprocess.run(["sips", *resize, "-s", "format", "jpeg", "-s", "formatOptions", "58", path, "--out", t.name],
                           capture_output=True)
        if r.returncode != 0:
            return None
        data = open(t.name, "rb").read()
    if len(data) < 800:  # blank / 1x1 renders
        return None
    return "data:image/jpeg;base64," + base64.b64encode(data).decode()


def main(out_dir):
    cat = json.load(open(os.path.join(ROOT, "research", "pattern-catalogue.json")))
    images, missing = {}, 0

    def add(ev, max_dim=520):
        nonlocal missing
        key = ev["code"] + ":" + ev["node"]
        if key in images:
            return key if images[key] else None
        p = png_for(ev)
        uri = to_data_uri(p, max_dim, key) if os.path.exists(p) else None
        images[key] = uri
        if not uri:
            missing += 1
        return key if uri else None

    for it in cat["items"]:
        it["shots"] = [k for k in (add(e) for e in it.get("evidence", [])) if k]
        for o in it.get("options", []):
            o["shots"] = [k for k in (add(e) for e in o.get("evidence", [])) if k]
        if it.get("image"):  # whole-page overview from the first review pass
            slug, name = it["image"].split("/")
            ev = {"code": "page", "node": it["image"]}
            key = "page:" + it["image"]
            if key not in images:
                p = os.path.join(INV, slug, name)
                images[key] = to_data_uri(p, 1400, key) if os.path.exists(p) else None
            if images[key]:
                it["overview"] = key

    images = {k: v for k, v in images.items() if v}
    cat["tall"] = sorted(k for k in TALL if k in images)
    tpl = open(os.path.join(ROOT, "research", "review-page.template.html")).read()
    html = tpl.replace("__DATA__", json.dumps(cat, ensure_ascii=False).replace("</", "<\\/")) \
              .replace("__IMAGES__", json.dumps(images).replace("</", "<\\/"))
    js = open(os.path.join(ROOT, "research", "review.js")).read()
    html = html.replace('<script src="review.js"></script>', "<script>\n" + js + "</script>")
    os.makedirs(out_dir, exist_ok=True)
    open(os.path.join(out_dir, "index.html"), "w").write(html)
    no_visual = [it["id"] for it in cat["items"] if not it["shots"] and not it.get("overview")
                 and not any(o["shots"] for o in it.get("options", []))]
    print(f"images {len(images)}  missing {missing}  size {len(html)/1e6:.1f} MB  no-visual {no_visual}")


if __name__ == "__main__":
    main(sys.argv[1])
