const fmt = n => Math.round(n).toLocaleString("cs-CZ") + " Kč";
const fmtE = n => Math.round(n).toLocaleString("cs-CZ") + " €";
const mapUrl = a => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.name + " " + a.addr)}`;
const photoUrl = p => `https://upload.wikimedia.org/wikipedia/commons/thumb/${p}/1280px-${p.split("/").pop()}`;
const photoPage = p => "https://commons.wikimedia.org/wiki/File:" + p.split("/").pop();
const BADGE = { good: ["good", "Otevřeno"], warn: ["warn", "Ověřit"], ok: ["", ""] };

function card(a) {
  const [cls, label] = BADGE[a.status] || BADGE.ok;
  const gal = a.photos.length ? `<div class="gallery">${a.photos.map((p, i) =>
    `<a class="ph${i ? " extra" : ""}" href="${photoPage(p)}" target="_blank" rel="noopener" title="Zdroj: Wikimedia Commons"><img loading="lazy" src="${photoUrl(p)}" alt="${a.name}"></a>`).join("")}
    ${a.photos.length > 1 ? `<button class="morephotos" type="button">+${a.photos.length - 1} foto</button>` : ""}
    ${label ? `<span class="badge ${cls}">${label}</span>` : ""}</div>` : "";
  return `<article class="card attraction ${cls}" id="a-${a.id}">${gal}
    <div class="pad">
      <p class="when">${a.day}</p><h3>${a.name}</h3>
      <p>${a.desc}</p>
      <ul class="kv">
        <li><span>Adresa</span>${a.addr}</li>
        <li><span>Z Vrsaru</span>${a.from}</li>
        <li><span>Otevřeno</span>${a.hours}</li>
        <li><span>Vstupné</span>${a.price}</li>
        <li><span>Délka</span>${a.duration}</li>
        <li><span>S dětmi</span>${a.kid}</li>
      </ul>
      ${a.verify ? '<p class="verify">⚠ Údaje nejsou plně ověřeny, před cestou potvrďte u provozovatele.</p>' : ""}
      <p class="links"><a class="btn" href="${mapUrl(a)}" target="_blank" rel="noopener">Mapa</a>
      <a class="btn ghost" href="${a.web}" target="_blank" rel="noopener">Web</a></p>
    </div></article>`;
}
document.getElementById("places").innerHTML = PLACES.map(card).join("");
document.getElementById("food").innerHTML = FOOD.map(card).join("");

document.addEventListener("click", e => {
  const btn = e.target.closest(".morephotos"); if (!btn) return;
  const imgs = [...btn.parentElement.querySelectorAll(".ph")];
  const cur = imgs.findIndex(x => !x.classList.contains("extra"));
  imgs[cur].classList.add("extra"); imgs[(cur + 1) % imgs.length].classList.remove("extra");
});

document.getElementById("days").innerHTML = DAYS.map(d => `
  <div class="card day">
    <div class="dayhead"><span>${d.date}</span><h3>${d.title}</h3></div>
    <ol class="timeline">${d.items.map(([t, x]) => `<li><time>${t}</time><span>${x}</span></li>`).join("")}</ol>
    ${d.alt ? `<p class="alt">${d.alt}</p>` : ""}
  </div>`).join("");

if (window.L) {
  const map = L.map("map", { scrollWheelZoom: false }).setView([45.05, 13.75], 9);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap" }).addTo(map);
  const dot = c => L.divIcon({ className: "", html: `<span class="pin ${c}"></span>`, iconSize: [16, 16], iconAnchor: [8, 8] });
  const add = (list, c) => list.forEach(a => L.marker([a.lat, a.lng], { icon: dot(c) }).addTo(map)
    .bindPopup(`<strong>${a.name}</strong>${a.day ? "<br>" + a.day : ""}${a.id ? `<br><a href="#a-${a.id}">detail</a>` : ""}`));
  add(PLACES, "red"); add(FOOD, "blue"); add([HOTEL], "dark");
}

// Rozpočet
const chosen = new Set();
let hotelEur = 0;
function renderBudget() {
  const rows = []; let tot = 0;
  BUDGET.forEach((r, i) => {
    if (r.g) { rows.push(`<tr class="grp"><td colspan="3">${r.g}</td></tr>`); return; }
    if (r.opt && !chosen.has(i)) return;
    const eur = r.input === "hotel" ? hotelEur : r.eur;
    tot += eur;
    rows.push(`<tr><td>${r.label}${r.est ? ' <span class="est" title="odhad">≈</span>' : ""}</td><td>${fmtE(eur)}</td><td class="tot">${fmt(eur * EUR)}</td></tr>`);
  });
  document.getElementById("budget").innerHTML =
    `<thead><tr><th>Položka</th><th>EUR</th><th>Kč</th></tr></thead><tbody>${rows.join("")}</tbody>
     <tfoot><tr><td>Celkem</td><td>${fmtE(tot)}</td><td>${fmt(tot * EUR)}</td></tr></tfoot>`;
  document.getElementById("summary").innerHTML =
    `<div class="fact big"><span class="lbl">Celkem</span><strong>${fmt(tot * EUR)}</strong><span>${fmtE(tot)}${hotelEur ? "" : " · bez hotelu"}</span></div>
     <div class="fact"><span class="lbl">Na osobu</span><strong>${fmt(tot * EUR / 4)}</strong><span>2 dospělí + 2 děti</span></div>`;
  document.getElementById("factTotal").textContent = "≈ " + fmt(Math.round(tot * EUR / 1000) * 1000);
}
document.getElementById("opts").innerHTML = "<span class='small'>Přidat volitelné:</span>" +
  BUDGET.map((r, i) => r.opt ? `<label class="chip"><input type="checkbox" data-i="${i}"> ${r.label}</label>` : "").join("");
document.getElementById("opts").addEventListener("change", e => {
  const i = +e.target.dataset.i; e.target.checked ? chosen.add(i) : chosen.delete(i); renderBudget();
});
document.getElementById("hotelInput").addEventListener("input", e => { hotelEur = +e.target.value || 0; renderBudget(); });

const todo = [...document.querySelectorAll(".todo input")];
try { const s = JSON.parse(localStorage.getItem("vrsar26-todo") || "[]"); todo.forEach((c, i) => c.checked = !!s[i]); } catch (e) {}
todo.forEach(c => c.addEventListener("change", () => { try { localStorage.setItem("vrsar26-todo", JSON.stringify(todo.map(x => x.checked))); } catch (e) {} }));

renderBudget();
