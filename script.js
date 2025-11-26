// Sélecteurs
const patient = document.getElementById("patient");
const doc1 = document.getElementById("doc1");
const doc2 = document.getElementById("doc2");
const irm = document.getElementById("irm");
const smoke = document.getElementById("smoke");
const infoBox = document.getElementById("infoBox");

// Réinitialisation de la scène
function resetScene(){
  doc1.style.animation = "";
  doc2.style.animation = "";
  patient.style.animation = "";
  smoke.style.animation = "";

  doc1.style.opacity = 0;
  doc2.style.opacity = 0;
  irm.style.opacity = 0;
  smoke.style.opacity = 0;

  doc1.style.left = "-150px";
  doc2.style.right = "-150px";

  patient.style.opacity = 1;
  patient.style.transform = "translate(-50%, -50%)";
}

/* MÉTHODE CURATIVE */
function playCurative(){
  resetScene();

  infoBox.innerHTML = `<h4>Méthode curative</h4>
    <p>Deux docteurs interviennent directement pour soigner le patient.</p>`;

  doc1.style.animation = "doc-enter-left .9s forwards";
  doc2.style.animation = "doc-enter-right .9s forwards";

  setTimeout(()=>{
    smoke.style.animation = "smoke-burst 1.1s forwards";
  },900);

  setTimeout(()=> resetScene(),1800);
}

/* MÉTHODE PRÉVENTIVE */
function playPreventive(){
  resetScene();

  infoBox.innerHTML = `<h4>Méthode préventive</h4>
    <p>Un docteur s’approche pour vérifier l’état du patient.</p>`;

  doc1.style.animation = "doc-enter-left .9s forwards";

  setTimeout(()=>{
    smoke.style.animation = "smoke-burst 1.1s forwards";
  },900);

  setTimeout(()=> resetScene(),1800);
}

/* MÉTHODE IRM */
function playIRM(){
  resetScene();

  infoBox.innerHTML = `<h4>IRM</h4>
    <p>Le patient entre dans un IRM pour un diagnostic précis.</p>`;

  irm.style.opacity = 1;

  setTimeout(()=>{
    patient.style.animation = "patient-slide-irm 1.4s forwards";
  },300);

  setTimeout(()=>{
    smoke.style.animation = "smoke-burst 1.1s forwards";
  },1500);

  setTimeout(()=> resetScene(),2600);
}

/* Événements */
document.getElementById("btnCurative").onclick = playCurative;
document.getElementById("btnPreventive").onclick = playPreventive;
document.getElementById("btnIRM").onclick = playIRM;
