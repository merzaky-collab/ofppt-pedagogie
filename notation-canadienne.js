/* Notation canadienne (notation négative) : +1 par réponse juste, 0 par question sans réponse, −1 par réponse fausse.
   Utilisée par index.html et concours.html. */
var CDN = { ok: 1, blank: 0, ko: -1 };
function cdnPts(ok, ko) { return ok * CDN.ok + ko * CDN.ko; }
function cdnSign(x) { return x > 0 ? "+" + x : x < 0 ? "−" + Math.abs(x) : "0"; }
function cdnNum(x) { return x < 0 ? "−" + Math.abs(x) : String(x); }
function cdn20(pts, n) { return n ? (Math.round(Math.max(0, pts) / n * 200) / 10).toFixed(1).replace(".", ",") : "0"; }
/* Encadré du résultat : points canadiens + détail justes / fausses / sans réponse */
function cdnBadge(ok, ko, blank) {
  var n = ok + ko + blank, pts = cdnPts(ok, ko);
  var cls = pts >= 0.75 * n ? "cg-A" : pts >= 0.5 * n ? "cg-B" : pts >= 0 ? "cg-C" : "cg-E";
  return '<div class="cgb ' + cls + '" role="note" aria-label="Notation canadienne : ' + cdnNum(pts) + ' points sur ' + n + '">' +
    '<span class="cgl">' + cdnNum(pts) + '<small> / ' + n + '</small></span><span><b>Notation canadienne</b><br>' +
    '<span class="cgs">' + ok + ' juste' + (ok > 1 ? "s" : "") + ' (' + cdnSign(ok) + ') · ' + ko + ' fausse' + (ko > 1 ? "s" : "") + ' (' + cdnSign(-ko) + ') · ' + blank + ' sans réponse (0)' +
    ' · équivalent ' + cdn20(pts, n) + ' / 20</span></span></div>';
}
/* Rappel du barème et de la stratégie */
function cdnRules() {
  return '<details class="cgt"><summary>Barème de la notation canadienne</summary><table><tbody>' +
    '<tr><td><span class="cg cg-A">+1</span></td><td>Réponse juste</td></tr>' +
    '<tr><td><span class="cg cg-C">0</span></td><td>Question sans réponse</td></tr>' +
    '<tr><td><span class="cg cg-E">−1</span></td><td>Réponse fausse</td></tr></tbody></table>' +
    '<p class="cgs">Stratégie : répondre au hasard entre 5 choix fait perdre en moyenne 0,6 point par question. Réponds si tu es sûr, ou si tu hésites seulement entre 2 options (au pire, l’espérance est nulle). Sinon, laisse la question sans réponse.</p></details>';
}
(function () {
  var css = '.cg{display:inline-grid;place-items:center;min-width:2.2em;padding:2px 6px;border-radius:7px;font:700 13px/1.2 ui-monospace,Consolas,monospace;color:var(--g);border:2px solid var(--g);background:color-mix(in srgb,var(--g) 12%,transparent)}' +
    '.cgb{display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:14px;border:2px solid var(--g);background:color-mix(in srgb,var(--g) 10%,var(--surface,#fff));color:var(--ink)}' +
    '.cgl{font:800 2.2rem/1 ui-monospace,Consolas,monospace;color:var(--g);white-space:nowrap}.cgl small{font-size:.5em;color:var(--muted)}.cgs{font-size:.88rem;color:var(--muted)}' +
    '.cgt{border:1px solid var(--line);border-radius:12px;padding:8px 12px;background:var(--surface,#fff)}.cgt summary{cursor:pointer;font-weight:700}' +
    '.cgt table{border-collapse:collapse;margin:8px 0;font-size:.95rem}.cgt td{padding:5px 10px 5px 0}' +
    '.cg-A{--g:var(--ok)}.cg-B{--g:var(--accent)}.cg-C{--g:#B7791F}.cg-E{--g:var(--bad)}' +
    '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .cg-C{--g:#F2B544}}:root[data-theme="dark"] .cg-C{--g:#F2B544}';
  try { var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s); } catch (e) {}
})();
