#!/usr/bin/env python3
"""color-styles.json, text-styles.json, effects.json, radius.json from Figma file GEdvNUzFqwB2gAbQKZRsIn."""
import json, os, sys
from collections import OrderedDict as OD
OUT = sys.argv[1]
FILE = "GEdvNUzFqwB2gAbQKZRsIn"
def dump(o, fn):
    with open(os.path.join(OUT, fn), "w") as f:
        json.dump(o, f, indent=2, ensure_ascii=False); f.write("\n")

# ------------------------------------------------------------ colour styles
cs = OD([("$description", "Every local paint style in Figma file " + FILE + " (3 total). None are bound to variables and none "
          "are used by Runway components; values match the Figma \"Primitives\" sample collection. See EXPORT_NOTES.md.")])
cs["Brand-Primary"] = OD([("$value", "#3b82f6"), ("$type", "color"), ("$description", "Primary brand color style"),
    ("$extensions", {"com.figma": {"styleId": "S:37edfed8157fac834938d7e9cb6c86a16ac328c7,", "paint": "SOLID", "opacity": 1, "blendMode": "NORMAL"}})])
cs["Brand-Primary-Hover"] = OD([("$value", "#1d4ed8"), ("$type", "color"),
    ("$extensions", {"com.figma": {"styleId": "S:971a84e79cfd658985a02c58df1796850c41be11,", "paint": "SOLID", "opacity": 1, "blendMode": "NORMAL"}})])
cs["Overlay-Scrim"] = OD([("$value", "rgba(17, 24, 39, 0.6)"), ("$type", "color"), ("$description", "Modal backdrop"),
    ("$extensions", {"com.figma": {"styleId": "S:c39e4b936917c890c5f8a0624e387c93acb08075,", "paint": "SOLID", "color": "#111827",
                                   "opacity": 0.6, "opacityRaw": 0.6000000238418579, "blendMode": "NORMAL"}})])
dump(cs, "color-styles.json")

# ------------------------------------------------------------ text styles
DISPLAY_DESC = ("Display font style should be applied to the largest text on the screen which needs highest emphasis apart from "
                "headlines. display styles are reserved for short, important text or numerals.\n\nExample: Total earning number on Earnings screen.")
# name, id-hash, style, size, lineHeight, leadingTrim, semantic-token-prefix, desc
TS = [
 ("Display/Large/Bold","1e844164ca0552b2639d507810d5de2d9d4863d4","Bold",40,44,"NONE","Display/Large (40)/Bold",DISPLAY_DESC),
 ("Display/X-Large/Bold","fb6ca43011136a06b370bd590ae04f44412c98fa","Bold",48,52,"NONE","Display/X-Large (48)/Bold",DISPLAY_DESC),
 ("Title/2X-Small/SemiBold","a59f257c155d9c6a3ca8b60b8fcb0ec034b5d678","Semi Bold",16,24,"NONE","Title/2X-Small (16)/SemiBold",None),
 ("Title/2X-Small/Bold","79b69b19d6d84ba08d54604319f17448ecf6cb93","Bold",16,24,"NONE","Title/2X-Small (16)/Bold",None),
 ("Title/X-Small/SemiBold","37f60b7339df7bdceb20f5222b135a46813099f0","Semi Bold",18,24,"NONE","Title/X-Small (18)/SemiBold",None),
 ("Title/X-Small/Bold","d9cef0bb5938b39cda7c1ed1fef4d18f8dd1457a","Bold",18,24,"NONE","Title/X-Small (18)/Bold",None),
 ("Title/Small/SemiBold","3d433a36abac2d91298e8d497bb34a8f2c662f51","Semi Bold",20,28,"NONE","Title/Small (20)/SemiBold",None),
 ("Title/Small/Bold","b537e0e15cf5e74093e6880f672aa636df6012d2","Bold",20,28,"NONE","Title/Small (20)/Bold",None),
 ("Title/Moderate/SemiBold","5fb6f4750e46b0ccc64340d55dfce34d9ebec8e4","Semi Bold",24,32,"NONE","Title/Moderate (24)/SemiBold",None),
 ("Title/Moderate/Bold","0fdef6e5e3a3970daf24319610632a55733e8a47","Bold",24,32,"NONE","Title/Moderate (24)/Bold",None),
 ("Title/Large/SemiBold","a419de39796aedbad2880a8da95d7f8462d504fe","Semi Bold",32,44,"NONE","Title/Large (32)/SemiBold",None),
 ("Title/Large/Bold","cf7ae526b72c0a0593ca5ce465fb0b2cfd654f82","Bold",32,44,"NONE","Title/Large (32)/Bold",None),
 ("SubTitle/X-Small/Med","eab83dcdd4066e05b611891326aeb98df235fdb3","Medium",14,20,"NONE","SubTitle/X-Small (14)/Med",None),
 ("SubTitle/X-Small/SemiBold","3932a6b229570087ccb5ae10db95cfb2ccca0f7a","Semi Bold",14,20,"NONE","SubTitle/X-Small (14)/SemiBold",None),
 ("SubTitle/X-Small/Bold","18a3ae908efde317ac4c9dca883d2242018df4ea","Bold",14,20,"NONE","SubTitle/X-Small (14)/Bold",None),
 ("SubTitle/Small/Med","8fb68c109d79378a3b7d745d787758717bc5b7f2","Medium",16,24,"NONE","SubTitle/Small (16)/Med",None),
 ("SubTitle/Small/SemiBold","e93ca4c21a32d21b2a7ccd4de728b5b48de7f97f","Semi Bold",16,24,"NONE","SubTitle/Small (16)/SemiBold",None),
 ("SubTitle/Small/Bold","19fd45c24481f3f647f92b3f204831e681b0524c","Bold",16,24,"NONE","SubTitle/Small (16)/Bold",None),
 ("SubTitle/Moderate/Med","6688a5fab3d464516f4cc49056d18ae24f5f455c","Medium",20,28,"NONE","SubTitle/Moderate (20)/Med",None),
 ("SubTitle/Moderate/SemiBold","059db92d5062babc26089950c5bcc6026c98d201","Semi Bold",20,28,"NONE","SubTitle/Moderate (20)/SemiBold",None),
 ("SubTitle/Moderate/Bold","9a1fafd59a293fe1dbe916415c75355fc0ae0a77","Bold",20,28,"NONE","SubTitle/Moderate (20)/Bold",None),
 ("SubTitle/Large/Med","cf33ddda1785d888faf28761b7e105c7232de403","Medium",24,32,"NONE","SubTitle/Large (24)/Med",None),
 ("SubTitle/Large/SemiBold","2519d0ae32000f6394276cf7b8b19d9a60d8dd56","Semi Bold",24,32,"NONE","SubTitle/Large (24)/SemiBold",None),
 ("SubTitle/Large/Bold","4e6577bd17f67d2dd06a0a50c711acafa64ee6f3","Bold",24,32,"NONE","SubTitle/Large (24)/Bold",None),
 ("Body/Small/Reg","6579d28744b2105fc8e8ae0fa1ee70fb7b35e70e","Regular",14,20,"NONE","Body/Small (14)/Reg",None),
 ("Body/Small/Med","c9a7b43d4630a230b6a78b39990265defd4a5ee0","Medium",14,20,"NONE","Body/Small (14)/Med",None),
 ("Body/Moderate/Reg","78589bcf5484f65e6d3a7adcedfbb8c93578dfe8","Regular",16,24,"NONE","Body/Moderate (16)/Reg",None),
 ("Body/Moderate/Med","2eb30fc20bb11f87c533b1a9ca73fa19bd401ef9","Medium",16,24,"NONE","Body/Moderate (16)/Med",None),
 ("Label/Small/Reg","320b5375d8c8080812e49b7d04b6dcefb6a6374a","Regular",10,16,"CAP_HEIGHT","Label/Small (10)/Reg",None),
 ("Label/Small/Med","d78335b77cccd445360343e8721db50f036fe070","Medium",10,16,"CAP_HEIGHT","Label/Small (10)/Med",None),
 ("Label/Moderate/Reg","c0740b9de56c426ee2331b58d0a1fca308364706","Regular",12,16,"CAP_HEIGHT","Label/Moderate (12)/Reg",None),
 ("Label/Moderate/Med","bbd09537404edc0a3f7479b4d7a56514d9331e0c","Medium",12,16,"CAP_HEIGHT","Label/Moderate (12)/Med",None),
 ("Label/Large/Reg","911d60987b7eaff9d038a96792656e1a5bf078d1","Regular",14,20,"CAP_HEIGHT","Label/Large (14)/Reg",None),
 ("Label/Large/Med","af128204f62e766ca8fa17bc2584c8d251b13bd4","Medium",14,20,"CAP_HEIGHT","Label/Large (14)/Med",None),
 ("Button/Small/Med","d69b6f3874980854f349580fecaf5f33c5958728","Medium",14,16,"NONE","Botton/Small (14)/Med",None),
 ("Button/Small/SemiBold","a362d61f79d7c802178ac145412ec6d0cd7ea823","Semi Bold",14,16,"NONE","Botton/Small (14)/SemiBold",None),
 ("Button/Small/Bold","657a10d1d9437f14ed1ac79c19d7f9543121b9a1","Bold",14,16,"NONE","Botton/Small (14)/Bold",None),
 ("Button/Moderate/Med","0e519059db1b73e5ce8c177a5ff54a447afc259b","Medium",16,20,"NONE","Botton/Moderate (16)/Med",None),
 ("Button/Moderate/SemiBold","8f20d7c5ff7f6d0791740c560955d31767ea7206","Semi Bold",16,20,"NONE","Botton/Moderate (16)/SemiBold",None),
 ("Button/Moderate/Bold","45c89cc67b822c4a9599be76ca9d95bc7c8dd0ce","Bold",16,20,"NONE","Botton/Moderate (16)/Bold",None),
]
def sref(p):  # semantic.json path for a Typography - Semantic Tokens variable
    return "{Semantic.Typography - Semantic Tokens." + p.replace("/", ".") + "}"
ts = OD([("$description", "Every local text style in Figma file " + FILE + " (43 total). Units are Figma's own (PIXELS / PERCENT / AUTO). "
          "fontWeight is the Figma font style name. $extensions.com.figma.boundVariables names the variable bound to each property.")])
for name, h, style, size, lh, trim, pref, desc in TS:
    v = OD([("fontFamily", "Inter"), ("fontWeight", style), ("fontSize", size),
            ("lineHeight", OD([("unit", "PIXELS"), ("value", lh)])), ("letterSpacing", OD([("unit", "PERCENT"), ("value", 0)])),
            ("textCase", "ORIGINAL"), ("textDecoration", "NONE"), ("leadingTrim", trim)])
    weight_ref = pref + "/Weight"
    if name == "Title/X-Small/SemiBold":
        weight_ref = "Title/2X-Small (16)/SemiBold/Weight"   # exactly as bound in Figma (see EXPORT_NOTES)
    bv = OD([("fontFamily", "{Primitives.typeface.Cap App - Typeface}"), ("fontSize", sref(pref + "/Size")),
             ("fontStyle", sref(weight_ref)), ("lineHeight", sref(pref + "/Height"))])
    leaf = OD([("$value", v), ("$type", "typography")])
    if desc: leaf["$description"] = desc
    leaf["$extensions"] = {"com.figma": OD([("styleId", f"S:{h},"), ("boundVariables", bv)])}
    node = ts
    for p in name.split("/")[:-1]: node = node.setdefault(p, OD())
    node[name.split("/")[-1]] = leaf
SAMPLE_NOTE = "Not bound to variables and not used by Runway components; matches the repo's earlier placeholder file. See EXPORT_NOTES.md."
ts["Heading-Large"] = OD([("$value", OD([("fontFamily","Inter"),("fontWeight","Bold"),("fontSize",32),("lineHeight",OD([("unit","PIXELS"),("value",40)])),
    ("letterSpacing",OD([("unit","PERCENT"),("value",-1)])),("textCase","ORIGINAL"),("textDecoration","NONE"),("leadingTrim","NONE")])),
    ("$type","typography"),("$description","Page titles"),("$extensions",{"com.figma":{"styleId":"S:0caf10b26e468b8a0c380c1bbce6c2dcb058a921,","note":SAMPLE_NOTE}})])
ts["Body"] = OD([("$value", OD([("fontFamily","Inter"),("fontWeight","Regular"),("fontSize",16),("lineHeight",OD([("unit","PIXELS"),("value",24)])),
    ("letterSpacing",OD([("unit","PERCENT"),("value",0)])),("textCase","ORIGINAL"),("textDecoration","NONE"),("leadingTrim","NONE")])),
    ("$type","typography"),("$extensions",{"com.figma":{"styleId":"S:254317dcb3389ccf40e7122e71378ed46c7e326f,","note":SAMPLE_NOTE}})])
ts["Caption"] = OD([("$value", OD([("fontFamily","Inter"),("fontWeight","Medium"),("fontSize",12),("lineHeight",OD([("unit","AUTO")])),
    ("letterSpacing",OD([("unit","PERCENT"),("value",2)])),("textCase","UPPER"),("textDecoration","NONE"),("leadingTrim","NONE")])),
    ("$type","typography"),("$extensions",{"com.figma":{"styleId":"S:168685ff92d7b25a1c0d8dd6c5cbbbff480a97ea,","note":SAMPLE_NOTE}})])
assert len(TS) + 3 == 43
dump(ts, "text-styles.json")

# ------------------------------------------------------------ effects
def sh(x, y, blur, spread, color, alpha, raw=None):
    d = OD([("offsetX", f"{x}px"), ("offsetY", f"{y}px"), ("blur", f"{blur}px"), ("spread", f"{spread}px"), ("color", color), ("alpha", alpha)])
    if raw is not None and raw != alpha: d["alphaRaw"] = raw
    return d
ef = OD([("$description", "Effects from Figma file " + FILE + ". 'Elevation' = the 3 local effect styles. 'Shadow' = shadow values documented on the "
          "'Shadows, Blurs & Overlays' page that are NOT saved as styles. 'Blur' = background-blur values on that page. "
          "'Overlay' = overlay fills (bound to colour variables). Colours are hex + separate alpha exactly as stored.")])
E = OD()
for nm, sid, blur, a, raw in [("S","9cb0355e772f24170597d31b89d6d0aee22b5b29",4,0.16,0.1599999964237213),
                               ("M","6432aba9c81e496524d09a65feedad0cd8a25a94",8,0.2,0.20000000298023224),
                               ("L","b95597894ee046da80b870a449345987e04766de",12,0.2,0.20000000298023224)]:
    E[nm] = OD([("$value", [sh(0,0,blur,0,"#101010",a,raw)]), ("$type","shadow"),
                ("$extensions", {"com.figma": {"styleId": f"S:{sid},", "effectType": "DROP_SHADOW", "blendMode": "NORMAL", "showShadowBehindNode": True}})])
ef["Elevation"] = E
S = OD()
for label, nid, layers in [
    ("X-Small","560:17970",[(0,1,2,0,0.04,0.03999999910593033),(0,1,2,0,0.04,0.03999999910593033)]),
    ("Small","560:17974",[(0,2,6,0,0.06,0.05999999865889549),(0,2,6,0,0.06,0.05999999865889549)]),
    ("Moderate","560:17978",[(0,6,15,-2,0.08,0.07999999821186066),(0,6,15,-2,0.08,0.07999999821186066)]),
    ("Large","560:17982",[(0,8,24,-3,0.1,0.10000000149011612),(0,8,24,-3,0.05,0.05000000074505806)]),
    ("X-Large","560:17986",[(0,20,40,-8,0.1,0.10000000149011612),(0,20,40,-8,0.05,0.05000000074505806)]),
    ("XX-Large","560:17990",[(0,25,60,-15,0.2,0.20000000298023224),(0,25,60,-15,0.12,0.11999999731779099)])]:
    S[label] = OD([("$value", [sh(x,y,b,s,"#101828",a,r) for x,y,b,s,a,r in layers]), ("$type","shadow"),
                   ("$description", "Documented on canvas only (no effect style). Two stacked DROP_SHADOW layers, blendMode NORMAL."),
                   ("$extensions", {"com.figma": {"node": nid, "label": {"X-Small":"Shadow / X-Small","Small":"shadow / Small","Moderate":"Shadow / Moderate",
                        "Large":"Shadow / large","X-Large":"Shadow / X-Large","XX-Large":"Shadow / XX-Large"}[label]}})])
ef["Shadow"] = S
ef["Blur"] = OD((k, OD([("$value", f"{v}px"), ("$type","dimension"), ("$description","BACKGROUND_BLUR radius applied to the 'Blur/"+k+"' sample on the Shadows page (no effect style; the Blur/"+k+" component itself carries no effect)."),
                ("$extensions", {"com.figma": {"effectType": "BACKGROUND_BLUR", "component": cid}})]))
                for k, v, cid in [("Small",4,"1663:7087"),("Moderate",6,"1663:7088"),("Large",8,"1663:7089")])
ef["Overlay"] = OD((k, OD([("$value", "{Semantic.Colors - Semantic Tokens.Overlays." + t + "}"), ("$type","color"),
                ("$description", "Overlay / " + k + " / " + p + " of Black")]))
                for k, t, p in [("Small","Small (25% Black)","25%"),("Moderate","Moderate (50% Black)","50%"),("Large","Large (75% Black)","75%")])
dump(ef, "effects.json")

# ------------------------------------------------------------ radius
rd = OD([("$description", "Corner radii used by components in Figma file " + FILE + ". Runway has no dedicated radius collection: "
          "components bind 'Button Tokens/Button/Radius' (-> Numbers Base Full = 999). Other values are raw (unbound) and listed with where they occur. "
          "Values in 'external' are bound to variables from other libraries (see EXPORT_NOTES.md).")])
rd["variables"] = OD([
    ("Button/Radius", OD([("$value", "{Semantic.Button Tokens.Button.Radius}"), ("$type","dimension"),
        ("$description", "Resolves to 999px in all modes (Large/Medium/Small) via {Primitives.number.Base - 4 Multiple.Full (999)}."),
        ("$extensions", {"runway": {"usedBy": ["Buttons","Icon Only Button","Input Field",".Base OA",".Bike OA",".Auto OA",".Cab OA",".OA message Box",
            "OA Cards","Home of Orders","Duty Toggle","Secondary Tabs","Homepage Header","Internal Page Header",".Sec Tab Box","Bottom Sheet",
            "Guidance Bottom Sheet","Chip","Badge","Modal","Tool Tip"]}})]))])
rd["external"] = OD([
    ("Radius/radi-0", OD([("$value","0px"),("$type","dimension"),("$description","Remote library collection 'Radius' (modes Default=0, Rounded=0, Sharp=0)."),
        ("$extensions",{"runway":{"usedBy":[".Input"],"variableKey":"d8811d19ae43a5cc9ecde30a10f57d2ae6bd10d3","modes":{"Default":0,"Rounded":0,"Sharp":0}}})])),
    ("Radius/radi-1", OD([("$value","2px"),("$type","dimension"),("$description","Remote library collection 'Radius' (modes Default=2, Rounded=4, Sharp=0)."),
        ("$extensions",{"runway":{"usedBy":[".Input Caption"],"variableKey":"99956a8ea4556670faa179438bd919425352be66","modes":{"Default":2,"Rounded":4,"Sharp":0}}})])),
    ("Radius/radi-6", OD([("$value","12px"),("$type","dimension"),("$description","Remote library collection 'Radius' (modes Default=12, Rounded=18, Sharp=0)."),
        ("$extensions",{"runway":{"usedBy":[".Input"],"variableKey":"1f93f4080d47763c7d56ee6bf895c7a1ed07f45b","modes":{"Default":12,"Rounded":18,"Sharp":0}}})])),
    ("Button/Button Numbers/Radius-Full", OD([("$value","999px"),("$type","dimension"),("$description","Remote library variable (collection 'Button'). Value read as resolved on the node."),
        ("$extensions",{"runway":{"usedBy":[".OA message Box"]}})])),
])
RAW = [
    ("2", [".Base OA",".Bike OA",".Auto OA",".Cab OA","Home of Orders"]),
    ("4", [".Base OA",".Cab OA","Tag"]),
    ("8", ["Home of Orders","Bottom Sheet","Snackbar"]),
    ("12", ["Input Field"]),
    ("16", [".Base OA",".Bike OA",".Auto OA",".Cab OA","OA Cards","Home of Orders","Toast","Modal","Tool Tip"]),
    ("24", [".Service Chip Icons",".Service Chips",".Base OA",".Bike OA",".Auto OA",".Cab OA","OA Cards","Home of Orders","Toggle"]),
    ("32", ["Bottom Sheet"]),
    ("100", [".Service Chips",".Base OA",".Bike OA",".Auto OA",".Cab OA","OA Cards","Home of Orders","bottom navigation",".Order Button Animation",".Order Button","Chip"]),
    ("200", [".OA message Box","Home of Orders","Duty Toggle","Homepage Header",".Order Button Animation",".Order Button"]),
    ("222", ["Home of Orders","Toggle"]),
    ("999", [".Base OA",".Bike OA",".Auto OA",".Cab OA","OA Cards","Home of Orders","Bottom Sheet"]),
    ("1000", ["Home of Orders",".Order Button Animation",".Color Token"]),
    ("16 16 0 0", ["Bottom Sheet","Guidance Bottom Sheet"]),
    ("10 10 0 0", ["Guidance Bottom Sheet"]),
    ("20 20 0 0", ["Home of Orders"]),
    ("222 22 0 0", ["Primary Tabs","Internal Page Header",".2 Tabs",".3 Tabs"]),
    ("0 4 4 0", ["Home of Orders"]),
    ("0 12 12 12", ["Home of Orders"]),
    ("1.0940780639648438", [".Bike OA"]),
    ("1.9999998807907104", [".Bike OA"]),
    ("4.624133110046387", [".Cab OA"]),
    ("8.380953788757324", ["Home of Orders","bottom navigation",".Nav Icons"]),
    ("14.560223579406738", [".Auto OA",".Cab OA"]),
    ("141.96983337402344", [".Bike OA"]),
    ("758.6206665039062", [".Order Button Animation",".Order Button"]),
]
def px(s): return " ".join(p + "px" if p != "0" else "0" for p in s.split()) if " " in s else s + "px"
rd["raw"] = OD((k, OD([("$value", px(k)), ("$type","dimension"),
    ("$description", ("Per-corner value in Figma order top-left top-right bottom-right bottom-left. " if " " in k else "") +
                     ("Non-integer value, almost certainly from a scaled layer; see EXPORT_NOTES.md. " if "." in k else "") + "Unbound (raw) in Figma."),
    ("$extensions", {"runway": {"usedBy": v}})])) for k, v in RAW)
dump(rd, "radius.json")
print("ok")

# ------------------------------------------------------------ append effects to tokens.css
def rgba(h, a):
    r, g, b = (int(h[i:i+2], 16) for i in (1, 3, 5)); return f"rgba({r}, {g}, {b}, {a})"
css = ["", "/* Effects (tokens/effects.json) */", ":root {"]
for k, v in ef["Elevation"].items():
    css.append(f"  --elevation-{k.lower()}: " + ", ".join(f"{l['offsetX']} {l['offsetY']} {l['blur']} {l['spread']} {rgba(l['color'], l['alpha'])}" for l in v["$value"]) + ";")
for k, v in ef["Shadow"].items():
    css.append(f"  --shadow-{k.lower()}: " + ", ".join(f"{l['offsetX']} {l['offsetY']} {l['blur']} {l['spread']} {rgba(l['color'], l['alpha'])}" for l in v["$value"]) + ";")
for k, v in ef["Blur"].items():
    css.append(f"  --blur-{k.lower()}: {v['$value']};")
for k in ef["Overlay"]:
    css.append(f"  --overlay-{k.lower()}: var(--overlays-{k.lower()}-{ {'Small':'25','Moderate':'50','Large':'75'}[k] }pct-black);")
css.append("}")
with open(os.path.join(OUT, "tokens.css"), "a") as f: f.write("\n".join(css) + "\n")
