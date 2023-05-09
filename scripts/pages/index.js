//  ---------------------------------
//* fonction récupération des données et création d'un object  listant les object de chaque photographer
//  ---------------------------------

let photographers;

async function getPhotographers() {
  // contact le "serveur" pour récupérer le json
  const r = await fetch("../../data/photographers.json");
  // si réponse du serveur
  if (r.ok === true) {
    // retourn le json
    photographers = await r.json();
    console.log("🚀 (données brutes) photographers:", photographers);
    console.log("🚀 photographers.photographers:", photographers.photographers);
    return photographers.photographers;
  } else {
    // si pas de réponse retourne une erreur
    throw new Error("Impossible de récupérer les données");
  }
}

//  ----------------------------------------
//* fonction affichage des données récupérées
//  -----------------------------------------

async function displayData(photographers) {
  // cible l'element HTML de classe photographer_section
  const photographersSection = document.querySelector(".photographer_section");

  // itération sur chaque élément du tableau photographer
  photographers.forEach((photographer) => {
    // utilisation de la fonction photographerFactory (comment est elle liée sans import ?)
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

//  ----------------------------------------
//* fonction intialisation (fetch + display)
//  -----------------------------------------

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
