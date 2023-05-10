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
    // retourne le json complet
    return datas;
  } else {
    // si pas de réponse retourne une erreur
    throw new Error("Impossible de récupérer les données");
  }
}

getDatas();

// déclare 2 variables pour stockage des données du photographe
let thisPhotographer, thisMedia;

// tri les données du photographe (photographer)
function cleaning(id) {
  for (const photographer of photographers) {
    console.log(photographer.id);
    if (photographer.id == id) {
      thisPhotographer = photographer;
      console.log("bingo !!!");
    }
  }
}

async function init() {
  await getDatas();
  cleaning(photographerId);
  return thisPhotographer;
}

init();
