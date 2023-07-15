// fonction principale, construction des cards des photographes
// fichier unique à la page index.html

class App {
  constructor() {
    // 1 cible l'emplacement de l'injection sur la page index.html
    this.$wrapper = document.querySelector(".photographer_section");
    // 2 fetch les données json du fichier photographers.json via le fichier Api.js
    this.photographersApi = new PhotographersApi(
      "https://olafswan.github.io/OC_DAJR_P6/data/photographers.json"
    );
  }

  async main() {
    // récupére les données sous forme d'array
    const photographerRawData = await this.photographersApi.getPhotographers();

    console.log(
      "🚀 1) file: index.js:16 \n App \n main \n variable: photographerRawData\n",
      photographerRawData
    );

    console.log(
      "🚀 newwww \n file: index.js:18 \n App \n main \n photographerRawData constructor name\n",
      photographerRawData.constructor.name
    );

    // TODO c'est ici que sera passer en argument le type "photographers" ou "media"
    //
    // crée un nouveau array via le fichier PhotographersFactory.js ancien MoviesFactory.js
    // transforme le tableau de données en tableau de classe PhotographersFactory
    const Data = photographerRawData.map(
      (data) => new PhotographersFactory(data, "photographer")
    );

    console.log(
      "🚀 4) file: index.js:28 \n App \n main \n variable: Data\n",
      Data
    );

    // TODO comprendre le mapage, ajout des propriétés du model ?

    // itération sur l'array Data
    Data.forEach((data) => {
      // data vaut ici l'une des photographes application de la classe PhotographerCard
      const Template = new PhotographerCard(data);
      // ajout au parent $wrapper la PhotographerCard
      this.$wrapper.appendChild(Template.createPhotographerCard());
    });
  }

  // ----------------------------------
  // ----------------------------------
  // FOCUS TRAP
  // ----------------------------------
  // ----------------------------------

  accessibleNavigation() {
    // type d'elements que l'ont souhaite focusable
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    // element dans lequel on souhaite instauré le focus trap
    const target = document.querySelector("body");

    // liste des elements focusables
    const focusableContent = target.querySelectorAll(focusableElements);
    // 1er element focusable
    const firstFocusableElement = focusableContent[0];
    // dernier element focusable
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    console.log(focusableContent);

    // ajoute le trap
    document.addEventListener("keydown", function (e) {
      let isTabPressed = e.key === "Tab" || e.keyCode === 9;
      let isArrowLeftPressed = e.key === "ArrowLeft" || e.keyCode === 37;
      let isArrowRightPressed = e.key === "ArrowRight" || e.keyCode === 39;

      if (!(isTabPressed || isArrowLeftPressed || isArrowRightPressed)) {
        return;
      }

      console.log("after", e.key, e.keyCode);

      // ajoute la classe CSS ada lors de la première pression de tab ou arrows
      if (document.getElementsByClassName("ada").length === 0) {
        for (const element of focusableContent) {
          element.classList.add("ada");
        }
      }

      //  si shift est pressé (pour shift + tab) ou arrowleft
      if (e.shiftKey || isArrowLeftPressed) {
        // si le focus est actuellement sur le premier element focusable
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // mettre le focus sur le dernier element
          e.preventDefault();
        } // si le focus n'est pas sur le premier element
        else {
          // récupérer l'index de l'element actif (focus) et faire le focus sur index - 1)
          const indexActiveElement = Array.from(focusableContent).indexOf(
            document.activeElement
          );
          console.log(indexActiveElement);
          focusableContent[indexActiveElement - 1].focus();
          e.preventDefault();
        }
      } else {
        // si seul tab est pressé
        if (document.activeElement === lastFocusableElement) {
          // si le focus est actuellement sur le dernier element focusable
          firstFocusableElement.focus(); // mettre le focus sur le premier element
          e.preventDefault();
        } else {
          // récupérer l'index de l'element actif (focus) et faire le focus sur index + 1)
          const indexActiveElement = Array.from(focusableContent).indexOf(
            document.activeElement
          );
          console.log(indexActiveElement);
          focusableContent[indexActiveElement + 1].focus();
          e.preventDefault();
        }
      }
    });
    firstFocusableElement.focus();
  }
}

// const app = new App();
// app.main();

async function init() {
  const app = new App();
  await app.main();
  app.accessibleNavigation();
}

init();
