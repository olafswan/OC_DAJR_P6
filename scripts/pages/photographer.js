// import { getPhotographers } from "./index.js";

// getPhotographers();

// récupère l'id du photographe contenu dans l'url
const photographerId = window.location.search.substring(4);

//  ---------------------------------
//* fonction récupération des données avec argument
//  ---------------------------------

// let photographers2, media2;

// async function getData(data) {
//   // contact le "serveur" pour récupérer le json
//   const r = await fetch("../../data/photographers.json");

//   // si réponse du serveur
//   if (r.ok === true) {
//     // récupère le json complet
//     const datas = await r.json();
//     data == media
//       ? (media2 = datas.media)
//       : (photographers2 = datas.photographers);
//     // retourne uniquement la partie nécessaire
//     return datas[data];
//   } else {
//     // si pas de réponse retourne une erreur
//     throw new Error("Impossible de récupérer les données");
//   }
// }

//  ---------------------------------
//* fonction récupération des données
//  ---------------------------------

// TODO importer la fonction dans index.js ? et la modifier pour qu'elle accepte un argument ?

// déclare 2 variables pour stockage des données brutes
let photographers, medias;

async function getDatas() {
  // contact le "serveur" pour récupérer le json
  const r = await fetch("../../data/photographers.json");
  // si réponse du serveur
  if (r.ok === true) {
    // stocke le json complet
    const datas = await r.json();
    // stocke la partie photographers
    photographers = datas.photographers;
    // stocke la partie media
    medias = datas.media;

    console.log(
      "👩‍💻 ~ file: photographer.js:50 ~ photographers:",
      photographers
    );
    console.log("👩‍💻 ~ file: photographer.js:52 ~ medias:", medias);

    // retourne le json complet
    return datas;
  } else {
    // si pas de réponse retourne une erreur
    throw new Error("Impossible de récupérer les données");
  }
}

//  -----------------------------------
//* fonction tri des données récupérées
//  -----------------------------------

// déclare 2 variables pour stockage des données du photographe sélectionné
let thisPhotographer,
  thoseMedias = [];

// tri les données du photographe sélectionné
function cleaning(id) {
  // tri pour conserver uniquement les données du photographe
  for (const photographer of photographers) {
    if (photographer.id == id) {
      thisPhotographer = photographer;
    }
  }
  // tri pour conserver uniquement les médias du photographe
  for (const media of medias) {
    console.log(media.photographerId);
    if (media.photographerId == id) {
      thoseMedias.push(media);
    }
  }
}

//  ----------------------------------------
//* fonction affichage des données récupérées
//  -----------------------------------------

// argument est un tableau contenant des objets
async function displayData(thisPhotographer, thoseMedia) {
  //* AFFICHAGE DU HEADER

  // cible l'element HTML de classe photographerHeader
  const photographHeader = document.querySelector(".photograph-header");

  // utilisation de la fonction indexFactory qui retourne un object contenant 3 variables : name, picture, getPhotographerCardDOM
  const photographerModel = photographerFactory(thisPhotographer);
  console.log(
    "1️⃣ ~ file: photographer.js:95 ~ displayData ~ photographerModel:",
    photographerModel
  );
  // assigne à userCardDOM l'element HTML créé grace à la fonction getPhotographerCardDOM
  const userCardDOM = photographerModel.getUserCardDOM();
  console.log(
    "2️⃣ ~ file: photographer.js:98 ~ displayData ~ userCardDOM:",
    userCardDOM
  );
  // ajoute l'element HTML à l'element HTML de classe photographer_section
  photographHeader.appendChild(userCardDOM);

  //* AFFICHAGE DE LA SECTION MEDIA

  // cible l'element HTML de classe photographer_section
  const mediaSection = document.querySelector(".media_section");

  // itération sur chaque élément du tableau thoseMedia
  thoseMedia.forEach((media) => {
    // utilisation de la fonction mediaFactory qui retourne un object contenant 3 variables : name, picture, getUserCardDOM
    const photographerModel = mediaFactory(media);
    console.log(
      "1️⃣ ~ file: index.js:130 ~ thoseMedia.forEach ~ photographerModel:",
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

async function init() {
  await getDatas();
  cleaning(photographerId);
  displayData(thisPhotographer);
}

init();
