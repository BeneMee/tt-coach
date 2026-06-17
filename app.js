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
    exercise: document.getElementById("exerciseView"),
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

// ---------- Video rendern ----------
// Erkennt YouTube-Links und bettet sie ein; eigene mp4-Dateien als <video>;
// leer -> Platzhalter.
function youtubeId(url) {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function renderVideo(url) {
  if (!url) {
    return `<div class="video-placeholder">
              <div class="play"></div>
              <span class="label">Video folgt – Platzhalter</span>
            </div>`;
  }
  const ytId = youtubeId(url);
  if (ytId) {
    return `<div class="video-wrap">
              <iframe src="https://www.youtube-nocookie.com/embed/${ytId}"
                title="Technik-Video" loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
            <p class="video-credit">Quelle: Deutsche Tischtennis-Akademie (DTTB)</p>`;
  }
  return `<div class="video-wrap"><video controls src="${url}"></video></div>`;
}

// ---------- Technik-Detail ----------
function openDetail(id) {
  const t = TECHNIQUES.find((x) => x.id === id);
  if (!t) return;

  const video = renderVideo(t.videoUrl);

  // Verknüpfte Übungen (eigene Datenliste) – euer Mehrwert.
  const exercises = EXERCISES.filter((e) => e.techniqueIds.includes(t.id));
  const exercisesHtml = exercises.length
    ? `<div class="exercise-cards">${exercises.map((e) => exerciseCard(e, t.id)).join("")}</div>`
    : `<div class="exercise-cards">${t.drills
        .map((d) => `<div class="exercise-card placeholder"><span>💡 ${d}</span><small>Detail-Übung folgt</small></div>`)
        .join("")}</div>`;

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

      <h4>Übungen dazu</h4>
      ${exercisesHtml}
    </div>`;

  document.getElementById("detailBack").addEventListener("click", () => showView("category"));
  // Klick auf eine Übungs-Karte -> Übungs-Detail
  els.views.detail.querySelectorAll(".exercise-card[data-exercise]").forEach((card) => {
    card.addEventListener("click", () => openExercise(card.dataset.exercise, t.id));
  });
  showView("detail");
}

function exerciseCard(e, fromTechniqueId) {
  return `
    <div class="exercise-card" data-exercise="${e.id}" data-from="${fromTechniqueId}">
      <div class="exercise-card-body">
        <strong>${e.title}</strong>
        <div class="meta">
          <span class="tag level-${e.level}">${e.level}</span>
          <span class="tag">${e.setup}</span>
        </div>
      </div>
      <span class="chevron">›</span>
    </div>`;
}

// ---------- Übungs-Detail ----------
function openExercise(id, fromTechniqueId) {
  const e = EXERCISES.find((x) => x.id === id);
  if (!e) return;

  const video = renderVideo(e.videoUrl);

  // Welche Techniken trainiert die Übung? (für Verweis-Chips)
  const trained = e.techniqueIds
    .map((tid) => TECHNIQUES.find((t) => t.id === tid))
    .filter(Boolean)
    .map((t) => `<span class="tag">${t.name}</span>`)
    .join("");

  els.views.exercise.innerHTML = `
    <button class="back-btn" id="exerciseBack">‹ Zurück zur Technik</button>
    ${video}
    <div class="detail-content">
      <h2>${e.title}</h2>
      <div class="detail-meta">
        <span class="tag level-${e.level}">${e.level}</span>
        <span class="tag">${e.setup}</span>
      </div>

      <h4>Ziel</h4>
      <p>${e.goal}</p>

      <h4>Ablauf</h4>
      <ul>${e.steps.map((s) => `<li>${s}</li>`).join("")}</ul>

      <h4>Tipps</h4>
      <ul class="drills">${e.tips.map((tp) => `<li>${tp}</li>`).join("")}</ul>

      <h4>Trainiert</h4>
      <div class="detail-meta">${trained}</div>
    </div>`;

  document
    .getElementById("exerciseBack")
    .addEventListener("click", () => openDetail(fromTechniqueId));
  showView("exercise");
}

// ---------- Events ----------
document.getElementById("burgerBtn").addEventListener("click", openDrawer);
els.overlay.addEventListener("click", closeDrawer);
document.getElementById("startBtn").addEventListener("click", openDrawer);
document.querySelector('[data-back="home"]').addEventListener("click", () => showView("home"));

// ---------- Start ----------
buildMenu();
showView("home");
