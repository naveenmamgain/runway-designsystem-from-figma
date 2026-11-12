#!/usr/bin/env python3
"""Generate tokens/*.json and tokens/tokens.css from values extracted from Figma
file GEdvNUzFqwB2gAbQKZRsIn (Runway design system (Cap-App)) on 2026-11-11.
All values below were read via the Figma Plugin API; nothing is derived or rounded
except float32 alpha noise (e.g. 0.8999999761581421 -> 0.9), which is noted in EXPORT_NOTES.md."""
import json, re, sys, os
from collections import OrderedDict as OD

OUT = sys.argv[1]
FILE = "GEdvNUzFqwB2gAbQKZRsIn"

def ext(collection, variable, scopes=None, extra=None):
    d = OD([("collection", collection), ("variable", variable)])
    if scopes is not None:
        d["scopes"] = scopes
    if extra:
        d.update(extra)
    return {"com.figma": d}

def put(tree, path, leaf):
    node = tree
    for p in path[:-1]:
        node = node.setdefault(p, OD())
    node[path[-1]] = leaf

def color_value(hexv, alpha=None):
    if alpha is None:
        return hexv
    r, g, b = (int(hexv[i:i + 2], 16) for i in (1, 3, 5))
    return f"rgba({r}, {g}, {b}, {alpha})"

def kebab(s):
    s = s.replace("%", "pct").replace("&", "and")
    s = re.sub(r"[()]", "", s)
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-").lower()
    return s

# ---------------------------------------------------------------- primitives
BASE_COLORS = """Base-Neutral/Black|#000000
Base-Neutral/90% Black|#000000|0.9
Base-Neutral/75% Black|#000000|0.75
Base-Neutral/50% Black|#000000|0.5
Base-Neutral/25% Black|#000000|0.25
Base-Neutral/White|#ffffff
Base-Brand/Primary-A|#ffca20
Base-Brand/Primary-B|#1e4b82
Base-Gray/Gray 50|#f6f7f9
Base-Gray/Gray 100|#eceef2
Base-Gray/Gray 200|#e0e3e6
Base-Gray/Gray 300|#c8ced8
Base-Gray/Gray 400|#aeb6c3
Base-Gray/Gray 500|#7d899b
Base-Gray/Gray 600|#5c6675
Base-Gray/Gray 700|#394454
Base-Gray/Gray 800|#253041
Base-Gray/Gray 900|#1a202a
Base-Yellow/Yellow 50|#fffbf0
Base-Yellow/Yellow 100|#fff6d9
Base-Yellow/Yellow 200|#ffecac
Base-Yellow/Yellow 300|#f8da77
Base-Yellow/Yellow 400|#ffca20
Base-Yellow/Yellow 500|#d3a91f
Base-Yellow/Yellow 600|#997f28
Base-Yellow/Yellow 700|#66551b
Base-Red/Red 50|#fff2f1
Base-Red/Red 100|#ffbdb8
Base-Red/Red 200|#ff837c
Base-Red/Red 300|#ff3b30
Base-Red/Red 400|#c42925
Base-Red/Red 500|#a11404
Base-Red/Red 600|#791308
Base-Red/Red 700|#500f07
Base-Orange/Orange 50|#fff6ef
Base-Orange/Orange 100|#ffe2cd
Base-Orange/Orange 200|#feac7a
Base-Orange/Orange 300|#f46d0b
Base-Orange/Orange 400|#ca4900
Base-Orange/Orange 500|#9d3901
Base-Orange/Orange 600|#772b02
Base-Orange/Orange 700|#401a00
Base-Green/Green 50|#f4fdf8
Base-Green/Green 100|#cdf6e0
Base-Green/Green 200|#95e8bc
Base-Green/Green 300|#4dd98f
Base-Green/Green 400|#12af5c
Base-Green/Green 500|#058743
Base-Green/Green 600|#0a6b38
Base-Green/Green 700|#094525
Base-Blue/Blue 50|#eef5fe
Base-Blue/Blue 100|#d4e6fc
Base-Blue/Blue 200|#a0c8f9
Base-Blue/Blue 300|#5ca2f6
Base-Blue/Blue 400|#146edc
Base-Blue/Blue 500|#1559ac
Base-Blue/Blue 600|#1e4b82
Base-Blue/Blue 700|#103460
Base-Teal/Teal 50|#f1fdfd
Base-Teal/Teal 100|#d4f4f3
Base-Teal/Teal 200|#9ee5e3
Base-Teal/Teal 300|#42d2ca
Base-Teal/Teal 400|#48aca7
Base-Teal/Teal 500|#367c78
Base-Teal/Teal 600|#235b59
Base-Teal/Teal 700|#113331
Base-Purple/Purple 50|#efe8ff
Base-Purple/Purple 100|#d8c6ff
Base-Purple/Purple 200|#b38eff
Base-Purple/Purple 300|#9563ff
Base-Purple/Purple 400|#6e29ff
Base-Purple/Purple 500|#4b0bd1
Base-Purple/Purple 600|#3804a5
Base-Purple/Purple 700|#230269
Base-Pink/Pink 50|#fcebff
Base-Pink/Pink 100|#f5c0fc
Base-Pink/Pink 200|#e290ec
Base-Pink/Pink 300|#de4eed
Base-Pink/Pink 400|#b926c8
Base-Pink/Pink 500|#93069f
Base-Pink/Pink 600|#6b0377
Base-Pink/Pink 700|#410547"""

NUMBERS = [("2XS (2)", 2), ("XS (4)", 4), ("S (8)", 8), ("M (12)", 12), ("L (16)", 16), ("XL (20)", 20),
           ("2XL (24)", 24), ("3XL (28)", 28), ("4XL (32)", 32), ("5XL (36)", 36), ("6XL (40)", 40), ("Full (999)", 999)]
FONT_SIZES = [10, 12, 14, 16, 18, 20, 22, 24, 32, 36, 40, 48]
LINE_HEIGHTS = [("2XS (16)", 16), ("XS (20)", 20), ("S (24)", 24), ("Mod (28)", 28), ("L (32)", 32), ("XL (36)", 36),
                ("2XL (40)", 40), ("3XL (44)", 44), ("4XL (48)", 48), ("5XL (52)", 52)]
WEIGHTS = ["Regular", "Medium", "SemiBold", "Bold"]

# Runway-name -> (primitives.json path, css var)
REF = {}
CSS_ROOT = []   # (var, value)

prim = OD()
prim["$description"] = ("Runway (Cap-App) primitive tokens exported from Figma file " + FILE +
                        ". Groups map 1:1 to Figma variable collections (see $extensions.com.figma).")

for line in BASE_COLORS.splitlines():
    parts = line.split("|")
    name, hexv = parts[0], parts[1]
    alpha = float(parts[2]) if len(parts) > 2 else None
    grp, leafname = name.split("/")
    path = ["color", grp, leafname]
    leaf = OD([("$value", color_value(hexv, alpha)), ("$type", "color")])
    leaf["$extensions"] = ext("Colors - Base Tookens", name, [])
    put(prim, path, leaf)
    css = "--" + kebab(name)
    REF["Colors - Base Tookens/" + name] = ("Primitives." + ".".join(path), css)
    CSS_ROOT.append((css, leaf["$value"]))

for n, v in NUMBERS:
    name = "Base - 4 Multiple/" + n
    path = ["number", "Base - 4 Multiple", n]
    leaf = OD([("$value", f"{v}px"), ("$type", "dimension"), ("$extensions", ext("Numbers Base", name, []))])
    put(prim, path, leaf)
    css = "--" + kebab(name)
    REF["Numbers Base/" + name] = ("Primitives." + ".".join(path), css)
    CSS_ROOT.append((css, f"{v}px"))

for v in FONT_SIZES:
    name = f"Font Size/Base-Size-{v}"
    path = ["typography", "Font Size", f"Base-Size-{v}"]
    leaf = OD([("$value", f"{v}px"), ("$type", "dimension"), ("$extensions", ext("Typography - Base Tokens", name, []))])
    put(prim, path, leaf)
    css = "--" + kebab(name)
    REF["Typography - Base Tokens/" + name] = ("Primitives." + ".".join(path), css)
    CSS_ROOT.append((css, f"{v}px"))
for n, v in LINE_HEIGHTS:
    name = f"Line Height/Base-Height-{n}"
    path = ["typography", "Line Height", f"Base-Height-{n}"]
    leaf = OD([("$value", f"{v}px"), ("$type", "dimension"), ("$extensions", ext("Typography - Base Tokens", name, []))])
    put(prim, path, leaf)
    css = "--" + kebab(name)
    REF["Typography - Base Tokens/" + name] = ("Primitives." + ".".join(path), css)
    CSS_ROOT.append((css, f"{v}px"))
CSS_WEIGHT = {"Regular": 400, "Medium": 500, "SemiBold": 600, "Bold": 700}
for w in WEIGHTS:
    name = f"Font Weight/Base-{w}"
    path = ["typography", "Font Weight", f"Base-{w}"]
    leaf = OD([("$value", w), ("$type", "fontWeight"),
               ("$description", f"Figma stores this as the font style string \"{w}\". CSS numeric equivalent for Inter: {CSS_WEIGHT[w]}."),
               ("$extensions", ext("Typography - Base Tokens", name, []))])
    put(prim, path, leaf)
    css = "--" + kebab(name)
    REF["Typography - Base Tokens/" + name] = ("Primitives." + ".".join(path), css)
    CSS_ROOT.append((css, str(CSS_WEIGHT[w])))

put(prim, ["typeface", "Cap App - Typeface"], OD([
    ("$value", "Inter"), ("$type", "fontFamily"),
    ("$extensions", ext("Typography - Typeface", "Cap App - Typeface", ["ALL_SCOPES"], {"mode": "Primary"}))]))
REF["Typography - Typeface/Cap App - Typeface"] = ("Primitives.typeface.Cap App - Typeface", "--cap-app-typeface")
CSS_ROOT.append(("--cap-app-typeface", "'Inter'"))

# Figma collection literally named "Primitives" (see EXPORT_NOTES: looks like sample/test data)
SAMPLE_PRIM = [("gray/50", "#f9fafb", None), ("gray/100", "#f3f4f6", None), ("gray/300", "#d1d5db", None),
               ("gray/500", "#6b7280", None), ("gray/700", "#374151", None),
               ("gray/900", "#111827", "Darkest gray, café-grade contrast ✓"),
               ("blue/100", "#dbeafe", None), ("blue/500", "#3b82f6", None), ("blue/700", "#1d4ed8", None)]
sp = OD([("$description", "Figma collection \"Primitives\" (12 variables). Not used by any Runway component; "
                          "values match Tailwind CSS defaults and the repo's earlier placeholder tokens. Flagged in EXPORT_NOTES.md.")])
for name, hexv, desc in SAMPLE_PRIM:
    leaf = OD([("$value", hexv), ("$type", "color")])
    if desc:
        leaf["$description"] = desc
    leaf["$extensions"] = ext("Primitives", name, ["ALL_SCOPES"])
    put(sp, name.split("/"), leaf)
    REF["Primitives/" + name] = ("Primitives.Primitives." + name.replace("/", "."), "--primitives-" + kebab(name))
for name, v in [("space/sm", 8), ("space/md", 16), ("space/lg", 24)]:
    put(sp, name.split("/"), OD([("$value", f"{v}px"), ("$type", "dimension"), ("$extensions", ext("Primitives", name, ["ALL_SCOPES"]))]))
    REF["Primitives/" + name] = ("Primitives.Primitives." + name.replace("/", "."), "--primitives-" + kebab(name))
prim["Primitives"] = sp

# ---------------------------------------------------------------- semantic
sem = OD()
sem["$description"] = ("Runway (Cap-App) semantic tokens exported from Figma file " + FILE +
                       ". Every token lists its value per Figma mode in $extensions.com.figma.modes; "
                       "$value is the collection's default mode. Aliases use {Primitives.<path>} / {Semantic.<path>}.")
CSS_SEM = []          # (var, value_by_mode dict)

def alias(target):
    return "{" + REF[target][0] + "}"

def sem_token(coll, name, typ, modes, scopes, desc=None, hidden=False, group=None):
    """modes: OD(modeName -> runway target name or literal)"""
    mv = OD()
    for m, t in modes.items():
        mv[m] = alias(t) if isinstance(t, str) and t in REF else t
    leaf = OD([("$value", list(mv.values())[0]), ("$type", typ)])
    if desc:
        leaf["$description"] = desc
    e = ext(coll, name, scopes)
    e["com.figma"]["modes"] = mv
    if hidden:
        e["com.figma"]["hiddenFromPublishing"] = True
    leaf["$extensions"] = e
    path = [group or coll] + name.split("/")
    put(sem, path, leaf)
    css = "--" + kebab(name)
    REF[coll + "/" + name] = ("Semantic." + ".".join(path), css)
    CSS_SEM.append((css, OD((m, (REF[t][1] if isinstance(t, str) and t in REF else t)) for m, t in modes.items())))
    return leaf

B = "Colors - Base Tookens/"
# Colors - Maps (all ALL_SCOPES, alias 1:1 onto base)
MAPS = ["Neutral/Black", "Neutral/White", "Brand/Primary-A", "Brand/Primary-B", "Gray/Gray 50"] + \
       [f"Yellow/Yellow {n}" for n in (50, 100, 200, 300, 400, 500, 600, 700)] + \
       [f"Gray/Gray {n}" for n in (100, 200, 300, 400, 500, 600, 700, 800, 900)] + \
       [f"Red/Red {n}" for n in (50, 100, 200, 300, 400, 500, 600, 700)] + \
       [f"Orange/Orange {n}" for n in (50, 100, 200, 300, 400, 500, 600, 700)] + \
       ["Green/Green 50"] + [f"Blue/Blue {n}" for n in (50, 100, 200, 300, 400, 500, 600, 700)] + \
       [f"Green/Green {n}" for n in (100, 200, 300, 400, 500, 600, 700)] + \
       [f"{c}/{c} {n}" for c in ("Teal", "Purple", "Pink") for n in (50, 100, 200, 300, 400, 500, 600, 700)]
assert len(MAPS) == 78, len(MAPS)
for m in MAPS:
    sem_token("Colors - Maps", "Mapped-" + m, "color", OD([("Mode 1", B + "Base-" + m)]), ["ALL_SCOPES"])

SEMC = [
    ("Surface/APP BG/Light", "Base-Gray/Gray 50", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Brand/Primary-A", "Base-Brand/Primary-A", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Neutral/Black", "Base-Neutral/Black", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Neutral/Dark", "Base-Gray/Gray 600", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Neutral/Medium", "Base-Gray/Gray 400", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Neutral/Light", "Base-Gray/Gray 100", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Neutral/White", "Base-Neutral/White", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Brand/Primary-B", "Base-Brand/Primary-B", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Error/Dark", "Base-Red/Red 400", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Warning/Dark", "Base-Orange/Orange 400", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Warning/Light", "Base-Orange/Orange 50", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Success/Dark", "Base-Green/Green 500", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Information/Dark", "Base-Blue/Blue 400", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Information/Light", "Base-Blue/Blue 50", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Success/Light", "Base-Green/Green 50", "FRAME_FILL,SHAPE_FILL"),
    ("Surface/Error/Light", "Base-Red/Red 50", "FRAME_FILL,SHAPE_FILL"),
    ("Border/Brand/Primary-A", "Base-Brand/Primary-A", "STROKE_COLOR"),
    ("Border/Brand/Primary-B", "Base-Brand/Primary-B", "STROKE_COLOR"),
    ("Border/Neutral/Black", "Base-Neutral/Black", "STROKE_COLOR"),
    ("Border/Neutral/Dark", "Base-Gray/Gray 600", "STROKE_COLOR"),
    ("Border/Neutral/Medium", "Base-Gray/Gray 400", "STROKE_COLOR"),
    ("Border/Neutral/Light", "Base-Gray/Gray 200", "STROKE_COLOR"),
    ("Border/Neutral/White", "Base-Neutral/White", "STROKE_COLOR"),
    ("Border/Error/Dark", "Base-Red/Red 400", "STROKE_COLOR"),
    ("Border/Error/Light", "Base-Red/Red 50", "STROKE_COLOR", "Discontinued"),
    ("Border/Warning/Dark", "Base-Orange/Orange 400", "STROKE_COLOR"),
    ("Border/Warning/Light", "Base-Orange/Orange 50", "STROKE_COLOR", "Discontinued"),
    ("Border/Success/dark", "Base-Green/Green 500", "STROKE_COLOR"),
    ("Border/Success/Light", "Base-Green/Green 50", "STROKE_COLOR", "Discontinued"),
    ("Border/Information/Dark", "Base-Blue/Blue 400", "STROKE_COLOR"),
    ("Border/Information/Light", "Base-Blue/Blue 50", "STROKE_COLOR", "Discontinued"),
    ("Text/Brand/Primary-A", "Base-Brand/Primary-A", "TEXT_FILL"),
    ("Overlays/Large (75% Black)", "Base-Neutral/75% Black", "ALL_SCOPES"),
    ("Overlays/Moderate (50% Black)", "Base-Neutral/50% Black", "ALL_SCOPES"),
    ("Overlays/Small (25% Black)", "Base-Neutral/25% Black", "ALL_SCOPES"),
    ("Text/Brand/Primary-B", "Base-Brand/Primary-B", "TEXT_FILL"),
    ("Text/OnSurface/Default", "Base-Gray/Gray 900", "TEXT_FILL"),
    ("Text/OnSurface/Disabled", "Base-Gray/Gray 400", "TEXT_FILL"),
    ("Text/OnSurface/Inverse", "Base-Gray/Gray 50", "TEXT_FILL"),
    ("Text/Neutral/Black", "Base-Neutral/Black", "TEXT_FILL", "Discontinued"),
    ("Text/Neutral/Dark", "Base-Gray/Gray 900", "TEXT_FILL"),
    ("Text/Neutral/Medium", "Base-Gray/Gray 600", "TEXT_FILL"),
    ("Text/Neutral/Light", "Base-Gray/Gray 400", "TEXT_FILL"),
    ("Text/Neutral/White", "Base-Neutral/White", "TEXT_FILL", "Discontinued"),
    ("Text/Error/Dark", "Base-Red/Red 400", "TEXT_FILL"),
    ("Text/Error/Light", "Base-Red/Red 50", "TEXT_FILL", "Discontinued"),
    ("Text/Warning/Dark", "Base-Orange/Orange 400", "TEXT_FILL"),
    ("Text/Warning/Light", "Base-Orange/Orange 50", "TEXT_FILL", "Discontinued"),
    ("Text/Success/dark", "Base-Green/Green 500", "TEXT_FILL"),
    ("Text/Success/Light", "Base-Green/Green 50", "TEXT_FILL", "Discontinued"),
    ("Text/Information/Dark", "Base-Blue/Blue 400", "TEXT_FILL"),
    ("Text/Information/Light", "Base-Blue/Blue 50", "TEXT_FILL", "Discontinued"),
]
for row in SEMC:
    name, tgt, scopes = row[0], row[1], row[2]
    desc = row[3] if len(row) > 3 else None
    sem_token("Colors - Semantic Tokens", name, "color", OD([("Mode 1", B + tgt)]), scopes.split(","),
              desc=desc, hidden=bool(desc))
sem_token("Colors - Semantic Tokens", "Boolean", "boolean", OD([("Mode 1", True)]), ["ALL_SCOPES"],
          desc="Boolean variable stored in the colour collection; purpose not documented in Figma.")

# Typography - Semantic Tokens: (style group, size label, weight label, size, weight, height-name or None)
T = "Typography - Base Tokens/"
TYPO = [
    ("Display", "Large (40)", "Bold", 40, "Bold", "3XL (44)"),
    ("Display", "X-Large (48)", "Bold", 48, "Bold", "5XL (52)"),
    ("Title", "2X-Small (16)", "SemiBold", 16, "SemiBold", "S (24)"),
    ("Title", "2X-Small (16)", "Bold", 16, "Bold", "S (24)"),
    ("Title", "X-Small (18)", "SemiBold", 18, "SemiBold", "S (24)"),
    ("Title", "X-Small (18)", "Bold", 18, "Bold", "S (24)"),
    ("Title", "Small (20)", "SemiBold", 20, "SemiBold", "Mod (28)"),
    ("Title", "Small (20)", "Bold", 20, "Bold", "Mod (28)"),
    ("Title", "Moderate (24)", "SemiBold", 24, "SemiBold", "L (32)"),
    ("Title", "Moderate (24)", "Bold", 24, "Bold", "L (32)"),
    ("Title", "Large (32)", "SemiBold", 32, "SemiBold", "3XL (44)"),
    ("Title", "Large (32)", "Bold", 32, "Bold", "3XL (44)"),
    ("SubTitle", "X-Small (14)", "Med", 14, "Medium", "XS (20)"),
    ("SubTitle", "X-Small (14)", "SemiBold", 14, "SemiBold", "XS (20)"),
    ("SubTitle", "X-Small (14)", "Bold", 14, "Bold", "XS (20)"),
    ("SubTitle", "Small (16)", "Med", 16, "Medium", "S (24)"),
    ("SubTitle", "Small (16)", "SemiBold", 16, "SemiBold", "S (24)"),
    ("SubTitle", "Small (16)", "Bold", 16, "Bold", "S (24)"),
    ("SubTitle", "Moderate (20)", "Med", 20, "Medium", "Mod (28)"),
    ("SubTitle", "Moderate (20)", "SemiBold", 20, "SemiBold", "Mod (28)"),
    ("SubTitle", "Moderate (20)", "Bold", 20, "Bold", "Mod (28)"),
    ("SubTitle", "Large (24)", "Med", 24, "Medium", "L (32)"),
    ("SubTitle", "Large (24)", "SemiBold", 24, "SemiBold", "L (32)"),
    ("SubTitle", "Large (24)", "Bold", 24, "Bold", "L (32)"),
    ("Body", "Small (14)", "Reg", 14, "Regular", "XS (20)"),
    ("Body", "Small (14)", "Med", 14, "Medium", "XS (20)"),
    ("Body", "Moderate (16)", "Reg", 16, "Regular", "S (24)"),
    ("Body", "Moderate (16)", "Med", 16, "Medium", "S (24)"),
    ("Label", "Small (10)", "Reg", 10, "Regular", "2XS (16)"),
    ("Label", "Small (10)", "Med", 10, "Medium", "2XS (16)"),
    ("Label", "Moderate (12)", "Reg", 12, "Regular", "2XS (16)"),
    ("Label", "Moderate (12)", "Med", 12, "Medium", "2XS (16)"),
    ("Label", "Large (14)", "Reg", 14, "Regular", "XS (20)"),
    ("Label", "Large (14)", "Med", 14, "Medium", "XS (20)"),
    ("Botton", "Small (14)", "Med", 14, "Medium", "2XS (16)"),
    ("Botton", "Small (14)", "SemiBold", 14, "SemiBold", "2XS (16)"),
    ("Botton", "Small (14)", "Bold", 14, "Bold", "2XS (16)"),
    ("Botton", "Moderate (16)", "Med", 16, "Medium", "XS (20)"),
    ("Botton", "Moderate (16)", "SemiBold", 16, "SemiBold", "XS (20)"),
    ("Botton", "Moderate (16)", "Bold", 16, "Bold", "XS (20)"),
]
LABEL_DESC = "Label font has both line height & Vertical trim set to it."
for g, s, w, size, weight, lh in TYPO:
    base = f"{g}/{s}/{w}"
    sem_token("Typography - Semantic Tokens", base + "/Size", "dimension",
              OD([("Mode 1", f"{T}Font Size/Base-Size-{size}")]), ["FONT_SIZE"])
    sem_token("Typography - Semantic Tokens", base + "/Weight", "fontWeight",
              OD([("Mode 1", f"{T}Font Weight/Base-{weight}")]), ["FONT_STYLE"])
    sem_token("Typography - Semantic Tokens", base + "/Height", "dimension",
              OD([("Mode 1", f"{T}Line Height/Base-Height-{lh}")]), ["LINE_HEIGHT"],
              desc=LABEL_DESC if g == "Label" else None)
assert len(TYPO) * 3 == 120

# Button Tokens (modes Large / Medium / Small)
N = "Numbers Base/Base - 4 Multiple/"
BTN = [
    ("Button/Button Height", ["WIDTH_HEIGHT"], ("52px", "44px", "32px")),
    ("Button/Button Max-Width", ["ALL_SCOPES"], ("328px", "296px", "264px")),
    ("Button/Button Min-Width", ["ALL_SCOPES"], ("188px", "140px", "80px")),
    ("Button/Radius", ["CORNER_RADIUS"], (N + "Full (999)", N + "Full (999)", N + "Full (999)")),
    ("Button/H-Padding", ["GAP"], (N + "L (16)", N + "L (16)", N + "M (12)")),
    ("Button/H-Pad Extra", ["GAP"], ("24px", "24px", "16px")),
    ("Button/V-Padding", ["GAP"], (N + "L (16)", N + "M (12)", N + "S (8)")),
    ("Button/Icon-Size", ["WIDTH_HEIGHT"], (N + "XL (20)", N + "XL (20)", N + "L (16)")),
    ("Button/Space-Number", ["GAP"], (N + "S (8)", N + "S (8)", N + "XS (4)")),
    ("Un-common/Label Layout/Max Width/No Icon", ["ALL_SCOPES"], ("296px", "264px", "240px")),
    ("Un-common/Label Layout/Max Width/Any One Icon", ["WIDTH_HEIGHT"], ("264px", "236px", "216px")),
    ("Un-common/Label Layout/Max Width/Both Icon", ["ALL_SCOPES"], ("232px", "208px", "192px")),
]
for name, scopes, (l, m, s) in BTN:
    sem_token("Button Tokens", name, "dimension", OD([("Large", l), ("Medium", m), ("Small", s)]), scopes)

# Mode collection (Hub / Delivery / Bike Lift) — added 2026-11-12 from the Logistics file (nJVb4xUWWcmIUArw5sAxIv,
# page "Ready for Dev", Section 1). Not a Figma variable collection yet: values are the raw fills used in the frames,
# aliased to Runway tokens where an identical token exists. Decisions on conflicting frames are recorded in EXPORT_NOTES.md.
MODE_SRC = "Logistics file nJVb4xUWWcmIUArw5sAxIv (frames 556:39547 Hub, 119:13985/119:14011 Delivery, 119:14091/119:14051 Bike Lift)"
B = "Colors - Base Tookens/"
MODES = [
    ("Mode/Header/Start", "Top stop of the home header gradient (vertical, top → bottom).",
     OD([("Hub", "#fffbe4"), ("Delivery", "#ffefde"), ("Bike Lift", "#cbe3ff")])),
    ("Mode/Header/End", "Bottom stop of the home header gradient. Hub uses #fff092 (frames 119:14117, 556:39547); frame 119:13782 uses #ffecac.",
     OD([("Hub", "#fff092"), ("Delivery", "#ffcd96"), ("Bike Lift", "#79a3d5")])),
    ("Mode/Button/Start", "Mode button (closed switcher, 64×64) fill — top stop. Delivery and Bike Lift are solid (start = end).",
     OD([("Hub", B + "Base-Neutral/White"), ("Delivery", "#ffddb8"), ("Bike Lift", "#c9e1ff")])),
    ("Mode/Button/End", "Mode button fill — bottom stop.",
     OD([("Hub", "#fff4cd"), ("Delivery", "#ffddb8"), ("Bike Lift", "#c9e1ff")])),
    ("Mode/Pill/Selected", "Fill of the selected mode pill in the open switcher.",
     OD([("Hub", "Colors - Maps/Mapped-Yellow/Yellow 200"), ("Delivery", "#ffddb8"), ("Bike Lift", "#c9e1ff")])),
]
sem["Mode"] = OD([("$description", "Per-mode theme colours for the captain app (Hub, Delivery, Bike Lift). Source: " + MODE_SRC +
                                     ". Hub is the default. In CSS switch with data-mode=\"hub|delivery|bike-lift\".")])
for name, desc, modes in MODES:
    leaf = sem_token("Mode", name, "color", modes, ["FRAME_FILL", "SHAPE_FILL"], desc=desc)
    leaf["$extensions"]["com.figma"]["status"] = "proposed — not a Figma variable yet; values read from Logistics frames"

# Figma collection literally named "Semantic" (light/dark) — flagged as sample data
P = "Primitives/"
SAMPLE_SEM = [
    ("color/bg/default", "color", OD([("light", "#ffffff"), ("dark", "#0b0f19")]), None),
    ("color/bg/surface", "color", OD([("light", P + "gray/50"), ("dark", P + "gray/900")]), None),
    ("color/text/primary", "color", OD([("light", P + "gray/900"), ("dark", P + "gray/50")]), None),
    ("color/text/secondary", "color", OD([("light", P + "gray/500"), ("dark", P + "gray/300")]), None),
    ("color/action/primary", "color", OD([("light", P + "blue/500"), ("dark", P + "blue/500")]), "Primary buttons and links"),
    ("color/action/primary-hover", "color", OD([("light", P + "blue/700"), ("dark", P + "blue/100")]), None),
    ("color/border/default", "color", OD([("light", P + "gray/300"), ("dark", P + "gray/700")]), None),
    ("space/inset", "dimension", OD([("light", P + "space/md"), ("dark", P + "space/md")]), None),
]
sem["Semantic"] = OD([("$description", "Figma collection \"Semantic\" (modes light, dark; 8 variables). Not used by any Runway "
                                         "component; aliases the sample \"Primitives\" collection. Flagged in EXPORT_NOTES.md.")])
for name, typ, modes, desc in SAMPLE_SEM:
    sem_token("Semantic", name, typ, modes, ["ALL_SCOPES"], desc=desc)

# ---------------------------------------------------------------- write json
def dump(obj, fn):
    with open(os.path.join(OUT, fn), "w") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
        f.write("\n")

dump(prim, "primitives.json")
dump(sem, "semantic.json")

# ---------------------------------------------------------------- css
def css_val(v):
    if isinstance(v, bool):
        return "1" if v else "0"
    if isinstance(v, str) and v.startswith("--"):
        return f"var({v})"
    return str(v)

sample_prefixes = ("--primitives-", )
lines = ["/* Generated from tokens/*.json — Runway (Cap-App) design tokens. Do not edit by hand. */",
         "/* Figma file " + FILE + ". Collections with one mode (\"Mode 1\") are emitted on :root. */", "",
         ":root {", "  /* Primitives */"]
lines += [f"  {k}: {v};" for k, v in CSS_ROOT]
lines.append("")
lines.append("  /* Semantic (default mode) */")
sample_sem = [k for k, _ in CSS_SEM if k.startswith(("--color-", "--space-inset"))]
for k, mv in CSS_SEM:
    if k in sample_sem:
        continue
    first = list(mv.values())[0]
    lines.append(f"  {k}: {css_val(first)};")
lines.append("}")
lines.append("")
lines.append("/* Button Tokens modes. Large is the default (on :root); apply a size with data-button-size. */")
for mode in ("Large", "Medium", "Small"):
    lines.append(f"[data-button-size=\"{mode.lower()}\"] {{")
    for k, mv in CSS_SEM:
        if "Large" in mv:
            lines.append(f"  {k}: {css_val(mv[mode])};")
    lines.append("}")
lines.append("")
lines.append("/* Mode tokens (Hub / Delivery / Bike Lift). Hub is the default (on :root); switch with data-mode. */")
for mode in ("Hub", "Delivery", "Bike Lift"):
    lines.append(f"[data-mode=\"{kebab(mode)}\"] {{")
    for k, mv in CSS_SEM:
        if "Delivery" in mv:
            lines.append(f"  {k}: {css_val(mv[mode])};")
    lines.append("}")
lines.append("")
lines.append("/* Figma collections \"Primitives\" + \"Semantic\" (light/dark). Flagged as sample data in EXPORT_NOTES.md;")
lines.append("   emitted under [data-runway-sample] so they never collide with Runway tokens. */")
lines.append("[data-runway-sample], [data-runway-sample][data-theme=\"light\"] {")
for name, hexv, _ in SAMPLE_PRIM:
    lines.append(f"  --primitives-{kebab(name)}: {hexv};")
for name, v in [("space/sm", 8), ("space/md", 16), ("space/lg", 24)]:
    lines.append(f"  --primitives-{kebab(name)}: {v}px;")
for k, mv in CSS_SEM:
    if k in sample_sem:
        lines.append(f"  {k}: {css_val(mv['light'])};")
lines.append("}")
lines.append("[data-runway-sample][data-theme=\"dark\"] {")
for k, mv in CSS_SEM:
    if k in sample_sem:
        lines.append(f"  {k}: {css_val(mv['dark'])};")
lines.append("}")
with open(os.path.join(OUT, "tokens.css"), "w") as f:
    f.write("\n".join(lines) + "\n")

# CSS var duplicate check
allk = [k for k, _ in CSS_ROOT] + [k for k, _ in CSS_SEM]
dups = {k for k in allk if allk.count(k) > 1}
print("css vars:", len(allk), "dups:", dups)
json.dump({k: v[1] for k, v in REF.items()}, open(os.environ.get('TOKEN_CSS_MAP', '/dev/null'), "w"), indent=1, ensure_ascii=False)
