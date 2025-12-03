// Sélecteurs
const patient = document.getElementById("patient");
const doc1 = document.getElementById("doc1");
const doc2 = document.getElementById("doc2");
const irm = document.getElementById("irm");
const smoke = document.getElementById("smoke");
const info = document.getElementById("info");

// Réinitialisation de la scène
function resetScene() {
  doc1.style.animation = "";
  doc2.style.animation = "";
  patient.style.animation = "";
  smoke.style.animation = "";

  doc1.style.opacity = 0;
  doc2.style.opacity = 0;
  irm.style.opacity = 0;
  smoke.style.opacity = 0;

  doc1.style.left = "-120px";
  doc2.style.right = "-120px";

  patient.style.opacity = 1;
  patient.style.transform = "translate(-50%, -50%)";
}

/* MÉTHODE CURATIVE */
function playCurative() {
  resetScene();

  info.textContent = "Méthode curative : intervention directe.";

  doc1.style.animation = "doc-enter-left .8s forwards";
  doc2.style.animation = "doc-enter-right .8s forwards";

  setTimeout(() => {
    smoke.style.animation = "smoke-burst 1s forwards";
  }, 900);

  setTimeout(() => resetScene(), 1800);
}

/* MÉTHODE PRÉVENTIVE */
function playPreventive() {
  resetScene();

  info.textContent = "Méthode préventive : réduire les risques.";

  doc1.style.animation = "doc-enter-left .8s forwards";

  setTimeout(() => {
    smoke.style.animation = "smoke-burst 1s forwards";
  }, 900);

  setTimeout(() => resetScene(), 1800);
}

/* MÉTHODE IRM */
function playIrm() {
  resetScene();

  info.textContent = "IRM : imagerie médicale.";

  irm.style.opacity = 1;

  setTimeout(() => {
    patient.style.animation = "patient-slide-irm 1.2s forwards";
  }, 300);

  setTimeout(() => {
    smoke.style.animation = "smoke-burst 1s forwards";
  }, 1500);

  setTimeout(() => resetScene(), 2500);
}

/* Boutons */
document.getElementById("btn1").onclick = playCurative;
document.getElementById("btn2").onclick = playPreventive;
document.getElementById("btn3").onclick = playIrm;
