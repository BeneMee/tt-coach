// Navigation: Willkommen -> Burger-Menü -> Kategorie -> Technikliste -> Detail.

// Kategorien fürs Burger-Menü. "match" entscheidet, welche Techniken dazugehören.
const CATEGORIES = [
  { id: "vorhand",   label: "Vorhand",    icon: "🏓", match: (t) => t.side === "Vorhand" && t.category === "Grundschläge" },
  { id: "rueckhand", label: "Rückhand",   icon: "🏓", match: (t) => t.side === "Rückhand" },
  { id: "aufschlag", label: "Aufschläge", icon: "🚀", match: (t) => t.category === "Aufschläge" },
  { id: "abwehr",    label: "Abwehr",     icon: "🛡️", match: (t) => t.category === "Rückschlag" && t.side === "Beide" },
];

const els = {
  views: {
    home: document.getElementById("homeView"),
    category: document.getElementById("categoryView"),
    detail: document.getElementById("detailView"),
  },
  drawer: document.getElementById("drawer"),
  overlay: document.getElementById("overlay"),
  menuList: document.getElementById("menuList"),
  categoryTitle: document.getElementById("categoryTitle"),
  techniqueList: document.getElementById("techniqueList"),
};

// ---------- View-Wechsel ----------
function showView(name) {
  Object.values(els.views).forEach((v) => v.classList.remove("active"));
  els.views[name].classList.add("active");
  window.scrollTo(0, 0);
}

// ---------- Burger-Menü ----------
function buildMenu() {
  els.menuList.innerHTML = "";
  for (const cat of CATEGORIES) {
    const count = TECHNIQUES.filter(cat.match).length;
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="menu-icon">${cat.icon}</span>
      <span>${cat.label}</span>
      <span class="menu-count">${count}</span>`;
    li.addEventListener("click", () => {
      closeDrawer();
      openCategory(cat.id);
    });
    els.menuList.appendChild(li);
  }
}

function openDrawer() {
  els.drawer.classList.add("open");
  els.overlay.classList.add("open");
}

function closeDrawer() {
  els.drawer.classList.remove("open");
  els.overlay.classList.remove("open");
}

// ---------- Kategorie -> Technikliste ----------
function openCategory(catId) {
  const cat = CATEGORIES.find((c) => c.id === catId);
  if (!cat) return;

  els.categoryTitle.textContent = cat.label;
  const techniques = TECHNIQUES.filter(cat.match);
  els.techniqueList.innerHTML = "";

  if (techniques.length === 0) {
    els.techniqueList.innerHTML = `<p style="color:var(--text-dim);padding:0 4px;">Noch keine Techniken in dieser Kategorie.</p>`;
  } else {
    for (const t of techniques) els.techniqueList.appendChild(buildCard(t));
  }

  showView("category");
}

function buildCard(t) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="thumb">🏓</div>
    <div class="card-body">
      <h3>${t.name}</h3>
      <p>${t.summary}</p>
      <div class="meta">
        <span class="tag level-${t.level}">${t.level}</span>
      </div>
    </div>`;
  card.addEventListener("click", () => openDetail(t.id));
  return card;
}

// ---------- Technik-Detail ----------
function openDetail(id) {
  const t = TECHNIQUES.find((x) => x.id === id);
  if (!t) return;

  const video = t.videoUrl
    ? `<video controls src="${t.videoUrl}" style="width:calc(100% - 36px);border-radius:16px;margin:12px 18px 0;"></video>`
    : `<div class="video-placeholder">
         <div class="play"></div>
         <span class="label">Video folgt – Platzhalter</span>
       </div>`;

  els.views.detail.innerHTML = `
    <button class="back-btn" id="detailBack">‹ Zurück</button>
    ${video}
    <div class="detail-content">
      <h2>${t.name}</h2>
      <div class="detail-meta">
        <span class="tag">${t.side}</span>
        <span class="tag level-${t.level}">${t.level}</span>
      </div>
      <p>${t.description}</p>

      <h4>Erklärung – worauf achten?</h4>
      <ul>${t.keyPoints.map((p) => `<li>${p}</li>`).join("")}</ul>

      <h4>Übungen</h4>
      <ul class="drills">${t.drills.map((d) => `<li>${d}</li>`).join("")}</ul>
    </div>`;

  document.getElementById("detailBack").addEventListener("click", () => showView("category"));
  showView("detail");
}

// ---------- Events ----------
document.getElementById("burgerBtn").addEventListener("click", openDrawer);
els.overlay.addEventListener("click", closeDrawer);
document.getElementById("startBtn").addEventListener("click", openDrawer);
document.querySelector('[data-back="home"]').addEventListener("click", () => showView("home"));

// ---------- Start ----------
buildMenu();
showView("home");
