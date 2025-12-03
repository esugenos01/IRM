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
  curative: `<p><strong>Méthode curative</strong></p><p>Cette approche consiste à traiter une maladie déjà présente. En économie de la santé, elle représente un coût direct pour le système de santé. Les dépenses curatives constituent la majorité des budgets hospitaliers, avec des interventions chirurgicales, des traitements médicamenteux et un suivi post-opératoire.</p><p>Cette méthode privilégie l'efficacité immédiate mais peut s'avérer coûteuse à long terme pour la collectivité.</p>`,
  
  preventive: `<p><strong>Méthode préventive</strong></p><p>Cette stratégie vise à éviter l'apparition de maladies par des actions anticipées : vaccinations, dépistages, sensibilisation aux comportements à risque.</p><p>Économiquement, la prévention réduit les coûts futurs de santé et améliore la productivité sociale. Selon l'OMS, 1€ investi en prévention peut économiser jusqu'à 14€ en soins curatifs. C'est un investissement rentable pour la collectivité malgré des résultats parfois différés dans le temps.</p>`,
  
  irm: `<p><strong>IRM (Imagerie par Résonance Magnétique)</strong></p><p>Technologie médicale de diagnostic permettant de visualiser l'intérieur du corps sans intervention chirurgicale. L'acquisition d'un appareil IRM représente un investissement majeur pour un hôpital (entre 1 et 3 millions d'euros).</p><p>Cependant, elle améliore considérablement la qualité diagnostique et réduit les interventions exploratoires inutiles. C'est un exemple d'investissement en capital médical qui optimise les ressources à moyen terme.</p>`
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

// Réinitialisation de la scène
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
  
  doc1.style.left = "-150px";
  doc2.style.right = "-150px";
  patient.style.opacity = 1;
  patient.style.transform = "translate(-50%, -50%)";
}

// Mise à jour de la progression
function updateProgress() {
  progressSpan.textContent = `${completedActions.size}/3`;
  
  // Vérifier si toutes les actions sont complétées
  if (completedActions.size === 3) {
    setTimeout(showEndPage, 1500);
  }
}

// Marquer une action comme complétée
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
  
  // Animation des deux docteurs
  doc1.style.animation = "doc-enter-left 1s forwards";
  doc2.style.animation = "doc-enter-right 1s forwards";
  
  // Effet de soin
  setTimeout(() => {
    smoke.style.animation = "smoke-burst 1.2s forwards";
  }, 1100);
  
  // Pulse du patient
  setTimeout(() => {
    patient.style.animation = "patient-pulse 0.8s ease-in-out";
  }, 1200);
  
  setTimeout(() => {
    resetScene();
    completeAction('curative', btn1);
  }, 2300);
}

/* MÉTHODE PRÉVENTIVE */
function playPreventive() {
  resetScene();
  info.innerHTML = explanationTexts.preventive;
  
  // Un seul docteur pour la prévention
  doc1.style.animation = "doc-enter-left 1s forwards";
  
  // Effet de prévention
  setTimeout(() => {
    smoke.style.animation = "smoke-burst 1.2s forwards";
  }, 1100);
  
  setTimeout(() => {
    patient.style.animation = "patient-pulse 0.8s ease-in-out";
  }, 1200);
  
  setTimeout(() => {
    resetScene();
    completeAction('preventive', btn2);
  }, 2300);
}

/* MÉTHODE IRM */
function playIrm() {
  resetScene();
  info.innerHTML = explanationTexts.irm;
  
  // Apparition de l'IRM
  irm.style.opacity = 1;
  irm.style.animation = "fadeIn 0.6s ease-in";
  
  // Le patient glisse dans l'IRM
  setTimeout(() => {
    patient.style.animation = "patient-slide-irm 1.5s forwards";
  }, 400);
  
  // Effet de scan
  setTimeout(() => {
    smoke.style.animation = "smoke-burst 1.2s forwards";
  }, 1900);
  
  setTimeout(() => {
    resetScene();
    completeAction('irm', btn3);
  }, 3100);
}

// === ÉVÉNEMENTS ===

// Démarrage du jeu
btnStart.onclick = function() {
  showGamePage();
  info.innerHTML = `<p>Choisissez une action pour soigner le patient. Vous devez effectuer les 3 interventions médicales.</p>`;
};

// Redémarrage du jeu
btnRestart.onclick = function() {
  // Réinitialiser l'état
  completedActions.clear();
  btn1.classList.remove("completed");
  btn2.classList.remove("completed");
  btn3.classList.remove("completed");
  
  progressSpan.textContent = "0/3";
  resetScene();
  
  // Retour à la page de début
  showStartPage();
};

// Boutons d'actions
btn1.onclick = playCurative;
btn2.onclick = playPreventive;
btn3.onclick = playIrm;
