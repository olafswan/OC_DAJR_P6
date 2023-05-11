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
    console.log("👩‍💻 (données brutes) photographers:", photographers);
    console.log("👩‍💻 photographers.photographers:", photographers.photographers);
    return photographers.photographers;
  } else {
    // si pas de réponse retourne une erreur
    throw new Error("Impossible de récupérer les données");
  }
}

//  ----------------------------------------
//* fonction affichage des données récupérées
//  -----------------------------------------

// argument est un tableau contenant des objets
async function displayData(photographers) {
  // cible l'element HTML de classe photographer_section
  const photographersSection = document.querySelector(".photographer_section");

  // itération sur chaque élément du tableau photographer
  photographers.forEach((photographer) => {
    // utilisation de la fonction photographerFactory qui retourne un object contenant 3 variables : name, picture, getUserCardDOM
    const photographerModel = photographerFactory(photographer);
    console.log(
      "1️⃣ ~ file: index.js:36 ~ photographers.forEach ~ photographerModel:",
      photographerModel
    );
    // assigne à userCardDOM l'element HTML créé grace à la fonction getUserCardDOM
    const userCardDOM = photographerModel.getUserCardDOM();
    console.log(
      "2️⃣ ~ file: index.js:39 ~ photographers.forEach ~ userCardDOM:",
      userCardDOM
    );
    // ajoute l'element HTML à l'element HTML de classe photographer_section
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
