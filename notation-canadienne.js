/* Système de notation canadien (barème de type universitaire québécois) :
   lettre A+ à E, valeur sur 4,3 et mention. Utilisé par index.html et concours.html. */
var CDN_SCALE = [
  { min: 90, l: "A+", gpa: 4.3, m: "Excellent" },
  { min: 85, l: "A",  gpa: 4.0, m: "Excellent" },
  { min: 80, l: "A-", gpa: 3.7, m: "Excellent" },
  { min: 77, l: "B+", gpa: 3.3, m: "Très bien" },
  { min: 73, l: "B",  gpa: 3.0, m: "Très bien" },
  { min: 70, l: "B-", gpa: 2.7, m: "Très bien" },
  { min: 65, l: "C+", gpa: 2.3, m: "Bien" },
  { min: 60, l: "C",  gpa: 2.0, m: "Bien" },
  { min: 57, l: "C-", gpa: 1.7, m: "Bien" },
  { min: 54, l: "D+", gpa: 1.3, m: "Passable" },
  { min: 50, l: "D",  gpa: 1.0, m: "Passable" },
  { min: 0,  l: "E",  gpa: 0.0, m: "Échec" }
];
function cdnGrade(pct) {
  pct = Math.max(0, Math.min(100, Math.round(pct)));
  for (var i = 0; i < CDN_SCALE.length; i++) if (pct >= CDN_SCALE[i].min) return CDN_SCALE[i];
  return CDN_SCALE[CDN_SCALE.length - 1];
}
function cdnGpa(g) { return g.gpa.toFixed(1).replace(".", ","); }
function cdnLetter(pct) { var g = cdnGrade(pct); return '<span class="cg cg-' + g.l.charAt(0) + '" title="' + g.m + ' · ' + cdnGpa(g) + ' / 4,3">' + g.l + '</span>'; }
function cdnBadge(pct) {
  var g = cdnGrade(pct);
  return '<div class="cgb cg-' + g.l.charAt(0) + '" role="note" aria-label="Note canadienne ' + g.l + ', ' + g.m + '">' +
    '<span class="cgl">' + g.l + '</span><span><b>' + g.m + '</b><br><span class="cgs">Notation canadienne · ' + cdnGpa(g) + ' / 4,3 · ' + Math.round(pct) + ' %</span></span></div>';
}
function cdnTable(pct) {
  var cur = cdnGrade(pct);
  return '<details class="cgt"><summary>Barème canadien (lettres, % et valeur sur 4,3)</summary><table><thead><tr><th>Lettre</th><th>Pourcentage</th><th>Valeur</th><th>Mention</th></tr></thead><tbody>' +
    CDN_SCALE.map(function (g, i) {
      var max = i === 0 ? 100 : CDN_SCALE[i - 1].min - 1;
      return '<tr' + (g === cur ? ' class="on"' : '') + '><td><span class="cg cg-' + g.l.charAt(0) + '">' + g.l + '</span></td><td>' + (g.min === 0 ? "moins de 50" : g.min + " à " + max) + ' %</td><td>' + cdnGpa(g) + '</td><td>' + g.m + '</td></tr>';
    }).join("") + '</tbody></table><p class="cgs">Seuil de réussite : D (50 %). Barème de référence des universités québécoises ; il peut varier selon les établissements.</p></details>';
}
(function () {
  var css = '.cg{display:inline-grid;place-items:center;min-width:2.2em;padding:2px 6px;border-radius:7px;font:700 13px/1.2 ui-monospace,Consolas,monospace;color:var(--g);border:2px solid var(--g);background:color-mix(in srgb,var(--g) 12%,transparent)}' +
    '.cgb{display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:14px;border:2px solid var(--g);background:color-mix(in srgb,var(--g) 10%,var(--surface,#fff));color:var(--ink)}' +
    '.cgl{font:800 2.4rem/1 ui-monospace,Consolas,monospace;color:var(--g);min-width:2.2ch}.cgs{font-size:.85rem;color:var(--muted)}' +
    '.cgt{border:1px solid var(--line);border-radius:12px;padding:8px 12px;background:var(--surface,#fff)}.cgt summary{cursor:pointer;font-weight:700}' +
    '.cgt table{width:100%;border-collapse:collapse;margin-top:8px;font-size:.92rem}.cgt th,.cgt td{text-align:left;padding:5px 6px;border-top:1px solid var(--line)}.cgt tr.on td{background:color-mix(in srgb,var(--g,var(--ok)) 14%,transparent);font-weight:700}' +
    '.cg-A{--g:var(--ok)}.cg-B{--g:var(--accent)}.cg-C{--g:#B7791F}.cg-D{--g:#C2570C}.cg-E{--g:var(--bad)}' +
    '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .cg-C{--g:#F2B544}:root:not([data-theme="light"]) .cg-D{--g:#FB923C}}:root[data-theme="dark"] .cg-C{--g:#F2B544}:root[data-theme="dark"] .cg-D{--g:#FB923C}';
  try { var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s); } catch (e) {}
})();
