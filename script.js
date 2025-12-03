// Sélecteurs des pages
const startPage = document.getElementById("startPage");
const gamePage = document.getElementById("gamePage");
const endPage = document.getElementById("endPage");

// Sélecteurs du jeu
const patient = document.getElementById("patient");
const doc1 = document.getElementById("doc1");
const doc2 = document.getElementById("doc2");
const irm = document.getElementById("irm");
const smoke = document.getElementById("smoke");
const info = document.getElementById("info");
const progressSpan = document.getElementById("progress");

// Boutons
const btnStart = document.getElementById("btnStart");
const btnRestart = document.getElementById("btnRestart");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

// État du jeu
let completedActions = new Set();

// Textes explicatifs pour Terminale ES
const explanationTexts = {
  curative: `<p><strong>Méthode curative</strong></p><p> La radiothérapie utilise des rayonnements ionisants pour détruire les cellules cancéreuses. Les faisceaux de rayons X ou gamma sont concentrés précisément sur la tumeur pour limiter les dommages aux tissus sains environnants. Cette technique curative complète souvent la chirurgie et la chimiothérapie dans le traitement du cancer.</p>`,
  
  preventive: `<p><strong>Méthode préventive</strong></p><p>La radioprotection est essentielle en radiologie. Les professionnels portent des tabliers de plomb et utilisent le principe ALARA (As Low As Reasonably Achievable) pour minimiser l'exposition aux rayonnements. Les examens sont justifiés médicalement avant réalisation. Des dosimètres mesurent les doses reçues par le personnel médical pour garantir leur sécurité à long terme.</p>`,
  
  irm: `<p><strong>IRM (Imagerie par Résonance Magnétique)</strong></p><p>L'IRM (Imagerie par Résonance Magnétique)
L'IRM utilise un champ magnétique puissant et des ondes radio pour créer des images détaillées du corps humain. Contrairement aux rayons X, cette technique n'emploie pas de rayonnements ionisants, ce qui la rend plus sûre. L'IRM permet d'observer les tissus mous comme le cerveau, les muscles ou les organes internes avec une grande précision diagnostique.</p>`
};

// === NAVIGATION ENTRE LES PAGES ===
function showStartPage() {
  startPage.classList.remove("hidden");
  gamePage.classList.add("hidden");
  endPage.classList.add("hidden");
}

function showGamePage() {
  startPage.classList.add("hidden");
  gamePage.classList.remove("hidden");
  endPage.classList.add("hidden");
}

function showEndPage() {
  startPage.classList.add("hidden");
  gamePage.classList.add("hidden");
  endPage.classList.remove("hidden");
}

// === LOGIQUE DU JEU ===
function resetScene() {
  doc1.style.animation = "";
  doc2.style.animation = "";
  patient.style.animation = "";
  smoke.style.animation = "";
  irm.style.animation = "";
  
  doc1.style.opacity = 0;
  doc2.style.opacity = 0;
  irm.style.opacity = 0;
  smoke.style.opacity = 0;
  
  doc1.style.left = "-120px";
  doc2.style.right = "-120px";
  patient.style.opacity = 1;
  patient.style.transform = "translate(-50%, -50%)";
}

function updateProgress() {
  progressSpan.textContent = `${completedActions.size}/3`;
  if (completedActions.size === 3) {
    setTimeout(showEndPage, 1500);
  }
}

function completeAction(actionId, buttonElement) {
  if (!completedActions.has(actionId)) {
    completedActions.add(actionId);
    buttonElement.classList.add("completed");
    updateProgress();
  }
}

/* MÉTHODE CURATIVE */
function playCurative() {
  resetScene();
  info.innerHTML = explanationTexts.curative;
  
  doc1.style.animation = "doc-enter-left 1s forwards";
  doc2.style.animation = "doc-enter-right 1s forwards";
  
  setTimeout(() => {
    smoke.style.animation = "smoke-burst 1.2s forwards";
  }, 1100);
  
  setTimeout(() => {
    patient.style.animation = "patient-pulse 0.8s ease-in-out";
  }, 1200);
  
  setTimeout(() => {
    resetScene();
    completeAction('curative', btn1);
  }, 2400);
}

/* MÉTHODE PRÉVENTIVE */
function playPreventive() {
  resetScene();
  info.innerHTML = explanationTexts.preventive;
  
  doc1.style.animation = "doc-enter-left 1s forwards";
  
  setTimeout(() => {
    smoke.style.animation = "smoke-burst 1.2s forwards";
  }, 1100);
  
  setTimeout(() => {
    patient.style.animation = "patient-pulse 0.8s ease-in-out";
  }, 1200);
  
  setTimeout(() => {
    resetScene();
    completeAction('preventive', btn2);
  }, 2400);
}

/* MÉTHODE IRM */
function playIrm() {
  resetScene();
  info.innerHTML = explanationTexts.irm;
  
  irm.style.opacity = 1;
  irm.style.animation = "fadeIn 0.6s ease-in";
  
  setTimeout(() => {
    patient.style.animation = "patient-slide-irm 1.5s forwards";
  }, 400);
  
  setTimeout(() => {
    smoke.style.animation = "smoke-burst 1.2s forwards";
  }, 1900);
  
  setTimeout(() => {
    resetScene();
    completeAction('irm', btn3);
  }, 3200);
}

// === ÉVÉNEMENTS ===
btnStart.onclick = function() {
  showGamePage();
  info.innerHTML = `<p>Choisissez une action pour soigner le patient. Vous devez effectuer les 3 interventions médicales.</p>`;
};

btnRestart.onclick = function() {
  completedActions.clear();
  btn1.classList.remove("completed");
  btn2.classList.remove("completed");
  btn3.classList.remove("completed");
  progressSpan.textContent = "0/3";
  resetScene();
  showStartPage();
};

btn1.onclick = playCurative;
btn2.onclick = playPreventive;
btn3.onclick = playIrm;
