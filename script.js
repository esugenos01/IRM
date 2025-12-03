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
    setTimeout(showEndMessage, 1000);
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

// Démarrage du jeu
function startGame() {
  startMessage.classList.add("hidden");
  btn1.disabled = false;
  btn2.disabled = false;
  btn3.disabled = false;
  
  info.innerHTML = `<p>Choisissez une action pour soigner le patient. Vous devez effectuer les 3 interventions médicales.</p>`;
}

// Redémarrage du jeu
function restartGame() {
  endMessage.classList.add("hidden");
  startMessage.classList.remove("hidden");
  
  // Réinitialiser l'état
  completedActions.clear();
  btn1.classList.remove("completed");
  btn2.classList.remove("completed");
  btn3.classList.remove("completed");
  btn1.disabled = true;
  btn2.disabled = true;
  btn3.disabled = true;
  
  updateProgress();
  resetScene();
}

// Afficher le message de fin
function showEndMessage() {
  endMessage.classList.remove("hidden");
}

/* Événements des boutons */
btn1.onclick = playCurative;
btn2.onclick = playPreventive;
btn3.onclick = playIrm;
btnStart.onclick = startGame;
btnRestart.onclick = restartGame;
