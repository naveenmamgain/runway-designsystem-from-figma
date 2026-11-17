(function () {
  const DATA = JSON.parse(document.getElementById("data").textContent);
  const IMG = JSON.parse(document.getElementById("images").textContent);
  const ITEMS = DATA.items;
  const FILES = DATA.files;
  const TALL = new Set(DATA.tall || []);
  const GROUPS = [
    ["decision", null, "Decisions", "Places where your files disagree. Each option shows the screens that use it. Pick the one that becomes the rule."],
    ["pattern", "pages", "Page patterns", "Full screens the captain navigates to."],
    ["pattern", "overlays", "Sheets, cards and overlays", "Things that appear on top of a screen."],
    ["pattern", "home", "Home", "Patterns specific to the home screen."],
    ["pattern", "orders", "Orders", "Order alerts, order list and trip."],
    ["pattern", "progress", "Progress and status", "Showing how far along the captain is."],
    ["pattern", "delivery", "Delivery (B2B parcel and food) — new", "From the B2B Delivery Flow page: map, collect, photo, payment, OTP, drop."],
    ["rule", null, "Rules", "Cross-cutting rules for copy, translation and components. Screens show where the problem was found."],
    ["component", null, "Missing components", "Built locally in the files but not in Runway. Screens show where each one is used."],
  ];
  const VERDICTS = {
    pattern: [["yes", "Yes, keep"], ["no", "No"], ["maybe", "Not sure"]],
    rule: [["yes", "Yes"], ["no", "No"], ["maybe", "Not sure"]],
    component: [["build", "Build"], ["skip", "Skip"], ["later", "Later"]],
  };
  const LABEL = { yes: "Yes", no: "No", maybe: "Not sure", build: "Build", skip: "Skip", later: "Later" };
  const TONE = { yes: "yes", build: "yes", no: "no", skip: "no", maybe: "maybe", later: "maybe" };

  // answers: what is in the shared store (submitted rounds); drafts: local unsent edits
  let answers = {}, store = null, sampler = undefined, filter = "all", hideDone = false;
  const live = {};   // id -> {text, error, busy} while Claude is reading back
  const DK = "runway-pattern-review-drafts";
  let drafts = (() => { try { return JSON.parse(localStorage.getItem(DK) || "{}"); } catch (e) { return {}; } })();
  const saveDrafts = () => { try { localStorage.setItem(DK, JSON.stringify(drafts)); } catch (e) {} };
  const pick3 = (a) => ({ verdict: (a && a.verdict) || "", option: (a && a.option) || "", comment: (a && a.comment) || "" });
  const cur = (id) => pick3(drafts[id] || answers[id]);
  const same = (a, b) => JSON.stringify(pick3(a)) === JSON.stringify(pick3(b));
  const sub = (id) => (answers[id] && answers[id].submitted ? answers[id] : null);
  const dirty = (id) => !!drafts[id] && !same(drafts[id], sub(id) || {});
  const confirmed = (it) => { const s = sub(it.id); return !!(s && s.confirmed === "yes" && !dirty(it.id)); };

  const $ = (q, r = document) => r.querySelector(q);
  const el = (tag, attrs = {}, kids = []) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) { if (k === "text") n.textContent = v; else if (k === "class") n.className = v; else n.setAttribute(k, v); }
    for (const k of [].concat(kids)) if (k) n.append(k);
    return n;
  };
  const caption = (key) => {
    if (key.startsWith("page:")) return "Whole Figma page (overview)";
    if (key.startsWith("repo:")) return "Runway component today";
    const [code, ...rest] = key.split(":"); return (FILES[code] ? FILES[code].name : code) + " · " + rest.join(":");
  };
  const item = (id) => ITEMS.find((x) => x.id === id);
  const KEY2NAME = Object.fromEntries(Object.values(FILES).map((f) => [f.key, f.name]));
  function figmaRefs(text) {
    const out = [], seen = new Set();
    const re = /https?:\/\/(?:www\.)?figma\.com\/(?:design|file|proto|board)\/([A-Za-z0-9]+)(?:\/[^\s?#]*)?(?:\?[^\s#]*)?/g;
    let m;
    while ((m = re.exec(text || ""))) {
      const url = m[0], key = m[1];
      const nm = /[?&]node-id=([0-9]+)(?:-|:|%3A)([0-9]+)/i.exec(url);
      const node = nm ? nm[1] + ":" + nm[2] : "";
      const k = key + "|" + node;
      if (seen.has(k)) continue; seen.add(k);
      out.push({ url, key, node, file: KEY2NAME[key] || "Figma file " + key.slice(0, 6) + "…" });
    }
    return out;
  }
  function refsRow(text) {
    const refs = figmaRefs(text);
    const row = el("div", { class: "ev refs" });
    if (!refs.length) return row;
    row.append(el("span", { class: "reflbl", text: "Your Figma links:" }));
    for (const r of refs) row.append(el("a", { href: r.url, target: "_blank", rel: "noopener", text: r.file + (r.node ? " · " + r.node : " (whole file)") + " ↗" }));
    if (refs.some((r) => !r.node)) row.append(el("span", { class: "reflbl", text: "Tip: right-click a frame → Copy link to selection, so the link points at one screen." }));
    return row;
  }

  // ---------- lightbox
  let lbSet = [], lbI = 0;
  function openLb(set, i) { lbSet = set; lbI = i; showLb(); $("#lb").hidden = false; $("#lbClose").focus(); }
  function showLb() { const k = lbSet[lbI]; $("#lb").classList.toggle("tall", TALL.has(k)); $("#lb").scrollTop = 0; $("#lbImg").src = IMG[k]; $("#lbImg").alt = caption(k); $("#lbCap").textContent = caption(k) + "  (" + (lbI + 1) + "/" + lbSet.length + ")"; }
  $("#lbPrev").addEventListener("click", () => { lbI = (lbI - 1 + lbSet.length) % lbSet.length; showLb(); });
  $("#lbNext").addEventListener("click", () => { lbI = (lbI + 1) % lbSet.length; showLb(); });
  $("#lbClose").addEventListener("click", () => { $("#lb").hidden = true; });
  $("#lb").addEventListener("click", (e) => { if (e.target.id === "lb") $("#lb").hidden = true; });
  document.addEventListener("keydown", (e) => {
    if ($("#lb").hidden) return;
    if (e.key === "Escape") $("#lb").hidden = true;
    if (e.key === "ArrowRight") $("#lbNext").click();
    if (e.key === "ArrowLeft") $("#lbPrev").click();
  });

  // ---------- header
  const counts = ITEMS.reduce((m, it) => (m[it.kind] = (m[it.kind] || 0) + 1, m), {});
  $("#facts").append(
    el("span", {}, [el("b", { text: "10" }), " Figma files"]),
    el("span", {}, [el("b", { text: "364" }), " pages"]),
    el("span", {}, [el("b", { text: "~6,100" }), " frames inventoried"]),
    el("span", {}, [el("b", { text: String(Object.keys(IMG).length) }), " screens shown"]),
    el("span", {}, [el("b", { text: String(ITEMS.length) }), " items to review"]),
  );
  for (const [k, l, n] of [["all", "All", ITEMS.length], ["decision", "Decisions", counts.decision], ["pattern", "Patterns", counts.pattern], ["rule", "Rules", counts.rule], ["component", "Components", counts.component]]) {
    const b = el("button", { class: "tab", type: "button", "aria-pressed": String(k === filter), "data-k": k }, [l, el("span", { class: "n", text: String(n) })]);
    b.addEventListener("click", () => { filter = k; for (const t of document.querySelectorAll(".tab")) t.setAttribute("aria-pressed", String(t.dataset.k === k)); render(); });
    $("#tabs").append(b);
  }
  $("#onlyOpen").addEventListener("change", (e) => { hideDone = e.target.checked; render(); });

  // ---------- pieces
  function strip(keys) {
    if (!keys.length) return el("div", { class: "noshot", text: "No screenshot for this one. Use the Figma links below." });
    const s = el("div", { class: "strip", role: "list" });
    keys.forEach((k, i) => {
      const b = el("button", { class: "shot" + (k.startsWith("page:") ? " wide" : "") + (TALL.has(k) ? " tall" : ""), type: "button", role: "listitem", "aria-label": "Enlarge " + caption(k) },
        [el("img", { src: IMG[k], alt: caption(k), loading: "lazy" }), el("span", { text: caption(k) })]);
      b.addEventListener("click", () => openLb(keys, i));
      s.append(b);
    });
    return s;
  }
  function evidence(list) {
    if (!list || !list.length) return null;
    return el("div", { class: "ev" }, list.map((e) => e.url ? el("a", { href: e.url, target: "_blank", rel: "noopener", text: e.file + " · " + e.node + " ↗" }) : el("span", { text: e.file })));
  }
  function summary(it, a) {
    if (it.kind === "decision") return a.option ? "Picked " + a.option : (a.comment ? "Own answer" : "");
    return a.verdict ? LABEL[a.verdict] : (a.comment ? "Comment only" : "");
  }
  function statusPill(it) {
    const s = sub(it.id);
    if (dirty(it.id)) return el("span", { class: "status maybe", text: s ? "Edited, not sent" : "Draft, not sent" });
    if (!s) return el("span", { class: "status", text: "Open" });
    if (s.confirmed === "yes") return el("span", { class: "status yes", text: "Confirmed ✓ · " + summary(it, s) });
    if (s.confirmed === "no") return el("span", { class: "status no", text: "Needs another round" });
    return el("span", { class: "status maybe", text: "Check Claude's reading" });
  }

  // ---------- read-back block
  function understoodBlock(it) {
    const s = sub(it.id), L = live[it.id];
    if (!s) return null;
    const box = el("div", { class: "understood", id: "u-" + it.id, "aria-live": "polite" });
    const lbl = (t) => el("span", { class: "lbl", text: t });
    if (L && L.busy) {
      box.append(lbl("Claude is reading your answer…"), el("p", { class: "utext", text: L.text || "…" }));
      return box;
    }
    if (!s.understanding) {
      box.className = "understood redo";
      box.append(lbl("No read-back yet"),
        el("p", { text: (L && L.error) || "Claude hasn't written what it understood for this answer yet." }));
      if (sampler) { const b = el("button", { class: "cbtn", type: "button", text: "Ask Claude to read it back" }); b.addEventListener("click", () => readBack(it.id)); box.append(el("div", { class: "row" }, [b])); }
      else box.append(el("p", { text: "Your answer is saved. Claude will read it in the chat when you say you're done." }));
      return box;
    }
    if (s.confirmed === "yes") box.className = "understood ok";
    if (s.confirmed === "no") box.className = "understood redo";
    box.append(lbl(s.confirmed === "yes" ? "Confirmed: Claude understood this" : s.confirmed === "no" ? "You said this isn't right" : "What Claude understood"), el("p", { text: s.understanding }));
    if (!s.confirmed) {
      const yes = el("button", { class: "cbtn yes", type: "button", text: "Yes, that's right" });
      const no = el("button", { class: "cbtn", type: "button", text: "No, let me edit" });
      yes.addEventListener("click", () => setConfirm(it.id, "yes"));
      no.addEventListener("click", () => setConfirm(it.id, "no"));
      box.append(el("div", { class: "row" }, [yes, no]));
    } else if (s.confirmed === "no") {
      box.append(el("p", { text: "Change your pick if needed, explain in the comment what Claude got wrong, then press Submit changes." }));
    }
    if (s.history && s.history.length) {
      const d = el("details", { class: "hist" }, [el("summary", { text: "Earlier rounds (" + s.history.length + ")" })]);
      const ol = el("ol");
      for (const h of s.history) ol.append(el("li", { text: "You: " + (summary(it, h) || "—") + (h.comment ? " · “" + h.comment + "”" : "") + "  →  Claude: " + (h.understanding || "—") + (h.confirmed === "no" ? "  (you said: not right)" : "") }));
      d.append(ol); box.append(d);
    }
    return box;
  }

  // ---------- card
  function card(it) {
    const a = cur(it.id), s = sub(it.id);
    const tone = s && s.confirmed === "yes" && !dirty(it.id) ? "yes" : "";
    const c = el("article", { class: "card", id: it.id, "data-tone": tone });
    c.append(el("div", { class: "head" }, [el("span", { class: "id", text: it.id }), el("h3", { text: it.title }), statusPill(it)]));
    const dl = el("dl");
    const row = (k, v) => { if (v) dl.append(el("dt", { text: k }), el("dd", {}, [v])); };

    if (it.kind === "decision") {
      row("Why", it.context);
      c.append(dl);
      const opts = el("div", { class: "opts" });
      for (const o of it.options) {
        const on = a.option === o.key;
        const pics = el("div", { class: "pics" });
        if (o.shots.length) o.shots.forEach((k, i) => { const im = el("img", { src: IMG[k], alt: caption(k), title: caption(k), loading: "lazy", class: TALL.has(k) ? "tall" : "" }); im.addEventListener("click", () => openLb(o.shots, i)); pics.append(im); });
        else pics.append(el("span", { class: "none", text: "No screen for this option" }));
        const pick = el("button", { class: "pick", type: "button", "aria-pressed": String(on), text: on ? "Picked ✓" : "Pick " + o.key });
        pick.addEventListener("click", () => setDraft(it.id, { option: on ? "" : o.key }));
        opts.append(el("div", { class: "opt", "data-on": String(on) }, [pics, el("div", { class: "t" }, [el("span", { class: "k", text: o.key }), el("span", { class: "l", text: o.label })]), el("p", { class: "d", text: o.detail }), pick]));
      }
      c.append(opts);
      if (it.recommend) c.append(el("div", { class: "rec" }, ["Claude suggests: ", el("b", { text: it.recommend })]));
      const more = (it.shots || []).filter((k) => !it.options.some((o) => o.shots.includes(k)));
      if (more.length || it.overview) c.append(strip(more.concat(it.overview ? [it.overview] : [])));
      const d2 = el("dl"); d2.append(el("dt", { text: "Figma" }), el("dd", {}, [evidence(it.evidence)])); c.append(d2);
    } else {
      c.append(strip((it.shots || []).concat(it.overview ? [it.overview] : [])));
      if (it.kind === "pattern") { row("When", it.when); row("Structure", it.structure); row("Watch", it.notes); }
      else row(it.kind === "rule" ? "Rule" : "What", it.detail);
      row("Figma", evidence(it.evidence));
      c.append(dl);
      const acts = el("div", { class: "actions", role: "group", "aria-label": "Answer" });
      for (const [v, l] of VERDICTS[it.kind]) {
        const b = el("button", { class: "vb", type: "button", "data-v": v, "aria-pressed": String(a.verdict === v), text: l });
        b.addEventListener("click", () => setDraft(it.id, { verdict: a.verdict === v ? "" : v }));
        acts.append(b);
      }
      c.append(acts);
    }

    const ta = el("textarea", { id: "c-" + it.id, placeholder: it.kind === "decision" ? "Comment: why, or your own answer if none of the options fit…" : "Comment (optional): what to change, which screen is right…", "aria-label": "Comment on " + it.id });
    ta.value = a.comment;
    let refs = refsRow(a.comment);
    ta.addEventListener("input", () => { setDraft(it.id, { comment: ta.value }, true); const n = refsRow(ta.value); refs.replaceWith(n); refs = n; });
    c.append(ta, refs);

    const btn = el("button", { class: "submit", type: "button" });
    const state = el("span", { class: "substate", "aria-live": "polite" });
    function paint() {
      const d = cur(it.id), s2 = sub(it.id), has = !!(d.option || d.verdict || d.comment.trim()), ch = dirty(it.id);
      const busy = live[it.id] && live[it.id].busy;
      btn.disabled = busy || !has || (s2 && !ch);
      btn.textContent = s2 ? (ch ? "Submit changes" : "Submitted ✓") : "Submit";
      state.className = "substate" + (ch ? " warn" : s2 ? " ok" : "");
      state.textContent = ch ? (s2 ? "Changed since your last submit. Submit again and Claude will re-read it." : "Not sent yet.")
        : s2 ? "Sent " + new Date(s2.submittedAt).toLocaleString() + (s2.round > 1 ? " · round " + s2.round : "")
        : (it.kind === "decision" ? "Pick an option or write your own answer, then submit." : "Choose an answer or comment, then submit.");
    }
    btn.addEventListener("click", () => submit(it.id));
    c._paint = paint; paint();
    c.append(el("div", { class: "submitbar" }, [btn, state]));
    const u = understoodBlock(it); if (u) c.append(u);
    return c;
  }

  function render() {
    const y = window.scrollY, list = $("#list"); list.textContent = "";
    for (const [kind, group, title, subt] of GROUPS) {
      if (filter !== "all" && filter !== kind) continue;
      const items = ITEMS.filter((it) => it.kind === kind && (!group || it.group === group) && (!hideDone || !confirmed(it)));
      if (!items.length) continue;
      list.append(el("h2", { class: "group-title", text: title }), el("p", { class: "group-sub", text: subt }));
      for (const it of items) list.append(card(it));
    }
    if (!list.children.length) list.append(el("p", { class: "group-sub", text: "Everything here is confirmed. Switch off \"Hide confirmed\" to see it." }));
    window.scrollTo(0, y); progress();
  }
  function progress() {
    const c = ITEMS.filter(confirmed).length, sN = ITEMS.filter((it) => sub(it.id)).length;
    $("#count").textContent = c + " confirmed · " + sN + " submitted / " + ITEMS.length;
    $("#meter").style.width = (100 * c / ITEMS.length) + "%";
  }
  function refreshCard(id) {
    const it = item(id), old = document.getElementById(id);
    if (!old) return progress();
    if (document.activeElement && document.activeElement.id === "c-" + id) {
      old.querySelector(".status").replaceWith(statusPill(it)); if (old._paint) old._paint(); return progress();
    }
    old.replaceWith(card(it)); progress();
  }

  // ---------- actions
  const saveEl = $("#save");
  function setDraft(id, patch, typing) {
    drafts[id] = Object.assign({}, cur(id), patch);
    if (!dirty(id)) delete drafts[id];
    saveDrafts();
    refreshCard(id);
  }
  function submit(id) {
    const prev = sub(id);
    const history = prev ? (prev.history || []).concat([Object.assign(pick3(prev), { understanding: prev.understanding || "", confirmed: prev.confirmed || "", at: prev.submittedAt })]) : [];
    const body = Object.assign(cur(id), { figmaRefs: figmaRefs(cur(id).comment).map((r) => ({ key: r.key, node: r.node, file: r.file, url: r.url })), submitted: true, submittedAt: new Date().toISOString(), understanding: "", confirmed: "", history, round: history.length + 1 });
    saveEl.textContent = "Sending…";
    store.save(id, body)
      .then(() => { answers[id] = body; delete drafts[id]; saveDrafts(); saveEl.textContent = "Submitted " + id; refreshCard(id); if (sampler) readBack(id); })
      .catch(() => { saveEl.textContent = "Not sent"; const c = document.getElementById(id); if (c) { const st = c.querySelector(".substate"); st.className = "substate warn"; st.textContent = "Couldn't send this. Check you're signed in to claude.ai and try again."; } });
  }
  function setConfirm(id, v) {
    const patch = { confirmed: v, confirmedAt: new Date().toISOString() };
    answers[id] = Object.assign({}, answers[id], patch); refreshCard(id);
    store.update(id, patch).then(() => { saveEl.textContent = v === "yes" ? "Confirmed " + id : "Marked for another round"; }).catch(() => { saveEl.textContent = "Not saved"; });
    if (v === "no") { const ta = document.getElementById("c-" + id); if (ta) { ta.focus(); ta.scrollIntoView({ block: "center", behavior: "smooth" }); } }
  }

  // ---------- Claude read-back
  function promptFor(it, s) {
    const lines = [];
    lines.push("You are helping a product designer at Rapido review findings from their Figma files for the Runway design system (captain app).");
    lines.push("They answered one review card. Restate, in 2 to 4 short plain-English sentences, what they decided and what that means will be done in the design system. Speak to them directly (\"You chose…\", \"So Runway will…\").");
    lines.push("Use only what they said plus the card's content. Do not add new ideas. If their comment changes or overrides their pick, follow the comment. If something is unclear or contradictory, end with one short question. Plain text only, no lists, no markdown.");
    lines.push("");
    lines.push("CARD " + it.id + " (" + it.kind + "): " + it.title);
    if (it.context) lines.push("Context: " + it.context);
    if (it.when) lines.push("When to use: " + it.when);
    if (it.structure) lines.push("Structure: " + it.structure);
    if (it.notes) lines.push("Notes: " + it.notes);
    if (it.detail) lines.push("Detail: " + it.detail);
    if (it.options) { lines.push("Options:"); for (const o of it.options) lines.push("  " + o.key + ". " + o.label + " — " + o.detail); }
    if (it.recommend) lines.push("Claude had suggested: " + it.recommend);
    if (it.kind !== "decision") lines.push("Answer choices were: " + VERDICTS[it.kind].map((v) => v[1]).join(" / "));
    lines.push("");
    if (s.history && s.history.length) {
      lines.push("EARLIER ROUNDS (they said the read-back was not right, so do better this time):");
      s.history.forEach((h, i) => lines.push("  Round " + (i + 1) + ": answer = " + (summary(it, h) || "none") + (h.comment ? ", comment = \"" + h.comment + "\"" : "") + "; read-back = \"" + (h.understanding || "") + "\"" + (h.confirmed === "no" ? " → designer said NOT RIGHT" : "")));
      lines.push("");
    }
    lines.push("THEIR ANSWER NOW: " + (it.kind === "decision" ? (s.option ? "picked option " + s.option + " (" + it.options.find((o) => o.key === s.option).label + ")" : "picked none of the options") : (s.verdict ? LABEL[s.verdict] : "no choice")));
    lines.push("THEIR COMMENT: " + (s.comment ? "\"" + s.comment + "\"" : "(none)"));
    const refs = figmaRefs(s.comment);
    if (refs.length) {
      lines.push("");
      lines.push("They linked these Figma frames as references: " + refs.map((r) => r.file + (r.node ? " frame " + r.node : " (whole file)")).join("; ") + ".");
      lines.push("You cannot open Figma. Name each linked frame in your restatement as the reference they gave (e.g. \"like the Face Auth frame 1305:3878 you linked\"), describe it only from what their comment says, and add one closing sentence: \"Claude will open the linked frame(s) in the chat to check this before building.\"");
    }
    return lines.join("\n");
  }
  async function readBack(id) {
    const it = item(id), s = sub(id);
    if (!s || !sampler) return;
    live[id] = { busy: true, text: "" }; refreshCard(id);
    try {
      const { text } = await sampler(promptFor(it, s), {
        cache: false, modelTier: "default",
        onText: ({ text }) => { live[id].text = text; const u = document.querySelector("#u-" + id + " .utext"); if (u) u.textContent = text; },
      });
      const understanding = (text || "").trim();
      delete live[id];
      answers[id] = Object.assign({}, answers[id], { understanding, understoodAt: new Date().toISOString() });
      refreshCard(id);
      await store.update(id, { understanding, understoodAt: answers[id].understoodAt });
    } catch (e) {
      const msg = { not_granted: "You turned off Claude for this page, so it can't read back here.", rate_limited: "Claude is busy right now. Try again in a minute.", sampling_disabled: "Asking Claude isn't available on this page right now." }[e && e.code] || "Claude couldn't read this back just now.";
      live[id] = { busy: false, error: msg + " Your answer is saved either way." };
      if (e && e.code === "not_granted") sampler = null;
      refreshCard(id);
    }
  }

  // ---------- storage
  const LS = "runway-pattern-review";
  const local = {
    load() { try { return JSON.parse(localStorage.getItem(LS) || "{}"); } catch (e) { return {}; } },
    save(id, body) { const all = local.load(); all[id] = body; localStorage.setItem(LS, JSON.stringify(all)); return Promise.resolve(); },
    update(id, patch) { const all = local.load(); all[id] = Object.assign({}, all[id], patch); localStorage.setItem(LS, JSON.stringify(all)); return Promise.resolve(); },
  };
  function useLocal(reason) {
    store = local; answers = local.load(); render();
    const n = $("#storeNote"); n.hidden = false;
    n.textContent = reason + " Answers are kept only in this browser for now, so Claude can't read them. Open the page signed in to claude.ai to send them to Claude.";
  }

  store = local; // until the shared store answers
  render();
  (async function connect() {
    let db = null, by = "";
    try { sampler = await window.claude.use("sample"); } catch (e) { sampler = null; }
    try { db = await window.claude.use("db"); } catch (e) { db = null; }
    if (!db) return useLocal("Shared saving isn't available here.");
    try { const user = await window.claude.use("user"); by = user ? await user.id() : ""; } catch (e) {}
    const col = db.collection("reviews");
    store = {
      save: (id, body) => col.doc(id).set(Object.assign({}, body, { by })),
      update: (id, patch) => col.doc(id).update(patch),
    };
    saveEl.textContent = "Connecting…";
    let first = true;
    const timer = setTimeout(() => { if (first) saveEl.textContent = "Still connecting…"; }, 10000);
    col.onSnapshot((snap) => {
      const next = {};
      for (const d of snap.docs) next[d.id] = JSON.parse(JSON.stringify(d.data() || {}));
      if (first) { first = false; clearTimeout(timer); answers = next; render(); saveEl.textContent = ""; return; }
      if (snap.metadata && snap.metadata.hasPendingWrites) return;
      for (const id of new Set([...Object.keys(next), ...Object.keys(answers)])) {
        if (JSON.stringify(answers[id] || {}) !== JSON.stringify(next[id] || {})) { answers[id] = next[id] || {}; if (!live[id]) refreshCard(id); }
      }
    }, () => { clearTimeout(timer); saveEl.textContent = "Connection lost"; });
  })();
})();
