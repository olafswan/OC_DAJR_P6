// fonctions principales :
//      construction du header photographe
//      construction du portfolio
// fichier unique à la page photographer.html

class App {
  constructor() {
    // 1 cible l'emplacement de l'injection du header sur la page photographer.html
    this.$headerWrapper = document.querySelector(".photograph-header");
    // 2 cible l'emplacement de l'injection de la galerie photo/video sur la page photographer.html
    this.$mediaWrapper = document.querySelector(".media-container");
    this.$lightboxWrapper = document.querySelector("body");
    // 3 fetch les données json du fichier photographers.json via le fichier Api.js
    this.photographersApi = new PhotographersApi(
      "https://olafswan.github.io/OC_DAJR_P6/data/photographers.json"
    );
    this.mediaApi = new MediaApi(
      "https://olafswan.github.io/OC_DAJR_P6/data/photographers.json"
    );
    // 4 récupère l'id dans l'url
    this.photographerId = window.location.search.substring(4);

    this.MediaData = [];
    this.focusableContent = [];
    this.firstFocusableElement;
    this.lastFocusableElement;
  }

  async main() {
    // stocke les données de l'API sous forme d'array
    const photographerRawData = await this.photographersApi.getPhotographers();
    const mediaRawData = await this.mediaApi.getMedia();

    // console.log(
    //   " Data 🧑📸 file: photographer.js:16 \n App \n main \n variable: photographerRawData\n",
    //   photographerRawData
    // );
    // console.log(
    //   " Data 🖼👩🖼 file: photographer.js:16 \n App \n main \n variable: mediaRawData\n",
    //   mediaRawData
    // );

    // selectione puis traite les donnés du photographe via la factory
    const PhotographerData = new PhotographersFactory(
      photographerRawData.filter(
        (photographer) => photographer.id == this.photographerId
      )[0],
      this.photographerId
    );

    // création du header via le template
    const HeaderTemplate = new PhotographerHeader(PhotographerData);
    // ajout du header à son element parent
    this.$headerWrapper.appendChild(HeaderTemplate.createPhotographerHeader());

    // ajout du nom du photographe dans la modale contact
    HeaderTemplate.customPhotographerContactModal();

    // ajout du label du bouton contact
    const contactButton = document.querySelector(".contact_button");
    contactButton.setAttribute("aria-labelledby", "photographer");

    // selectione puis traite les media du photographe via la factory
    const MediaData = mediaRawData.reduce((reducedData, currentMedia) => {
      if (currentMedia.photographerId == this.photographerId) {
        reducedData.push(new PhotographersFactory(currentMedia, "media"));
      }
      return reducedData;
    }, []);

    this.MediaData = MediaData;
    // console.log(
    //   "🚀 ~ file: photographer.js:50 ~ App ~ MediaData ~ MediaData:",
    //   MediaData
    // );

    // // création de la galerie media par itération sur l'array MediaData
    // MediaData.forEach((medium) => {
    //   // création de la media card via le template
    //   const MediaTemplate = new MediaCard(medium);
    //   // ajout de la media card à son element parent
    //   this.$mediasWrapper.appendChild(MediaTemplate.createMediaCard());
    // });
    this.sortDropDown();

    return this.galleryBuilder(MediaData);

    // return MediaData;
  }

  openDropDown() {
    // OUVERTURE FERMETURE
    const dropDownOptionWrapper = document.querySelector(
      ".drop-down-option-wrapper"
    );
    const dropDownOptionContainer = document.querySelectorAll(
      ".drop-down-option-container"
    );
    const up = document.querySelector(".up");
    const down = document.querySelector(".down");

    dropDownOptionWrapper.classList.toggle("hide");
    up.classList.toggle("hide");
    down.classList.toggle("hide");
    dropDownOptionContainer.forEach((option) => {
      console.log(typeof option.getAttribute("tabindex"));
      if (option.getAttribute("tabindex") === "-1") {
        console.log("tabindex des options =-1 !!!!!");
        option.setAttribute("tabindex", 0);
      } else if (option.getAttribute("tabindex") === "0") {
        console.log("tabindex des options =0 !!!!!");
        option.setAttribute("tabindex", -1);
      }
    });
    this.setFocusableContent();
  }

  sortDropDown() {
    // OUVERTURE FERMETURE
    const header = document.querySelector(".drop-down-header");
    const dropDownOptionWrapper = document.querySelector(
      ".drop-down-option-wrapper"
    );
    const dropDownOptionContainer = document.querySelectorAll(
      ".drop-down-option-container"
    );
    const up = document.querySelector(".up");
    const down = document.querySelector(".down");

    header.addEventListener("click", () => {
      this.openDropDown();
    });

    // SELECTION

    // selection des containers de labels
    let choices = document.querySelectorAll(".choice");
    console.log(
      "🚀 ~ file: photographer.js:104 ~ App ~ sortDropDown ~ choice:",
      choices
    );

    // création de la liste des labels
    let labelList = [];
    choices.forEach((choice) => {
      const label = choice.querySelector("p").innerText;
      labelList.push(label);
    });
    console.log(
      "🚀 ~ file: photographer.js:110 ~ App ~ sortDropDown ~ labelList:",
      labelList
    );

    // fonction pour deplacer l'item en 1er
    function moveItemToFront(arr, item) {
      // Check if the item exists in the array
      const itemIndex = arr.indexOf(item);

      if (itemIndex !== -1) {
        // Remove the item from its current position
        arr.splice(itemIndex, 1);
        // Add the item to the beginning of the array
        arr.unshift(item);
      }
    }

    // AU CLICK -----------------
    // itération sur les containers de labels
    choices.forEach((choice) => {
      // ajout d'un ecouteur de click
      choice.addEventListener("click", () => {
        // séléction du nom du label
        const label = choice.querySelector("p").innerText;
        console.log("-----------------\n");
        console.log("label clické :", label);

        // si click sur le label 2 ou 3
        if (labelList.indexOf(label) != 0) {
          console.log("click sur le label 2 ou 3 !!!");
          console.log("liste avant click", labelList);
          moveItemToFront(labelList, label);
          console.log("liste après click", labelList);

          // copie de labelList dans un nouvel array
          let sortLabel = [...labelList];
          // reset de la list labeList
          labelList = [];

          // itération sur chaque container de label
          choices.forEach((choice) => {
            // ciblage du nom du label
            let previousLabel = choice.querySelector("p");
            // assignation du 1er label de la list
            previousLabel.innerText = sortLabel[0];
            // update de labelList
            labelList.push(sortLabel[0]);
            // suppression du label attribué
            sortLabel.splice(0, 1);

            // ferme le menu
            // dropDownOptionWrapper.classList.toggle("hide");
            // up.classList.toggle("hide");
            // down.classList.toggle("hide");
            // // TODO ajouter tabindex="-1" aux choix 2 et 3
            this.openDropDown();
          });

          console.log("labelList mis à jour", labelList);

          // update des containers de labels
          choices = document.querySelectorAll(".choice");
          console.log("choices mis à jour", choices);
          this.sortBy(this.MediaData, label);
        } else {
          console.log("click sur le label 1 !!!");
        }
      });

      // AU KEYPRESS -----------------
      choice.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          // séléction du nom du label
          const label = choice.querySelector("p").innerText;
          console.log("-----------------\n");
          console.log("label clické :", label);

          // si click sur le label 2 ou 3
          if (labelList.indexOf(label) != 0) {
            console.log("click sur le label 2 ou 3 !!!");
            console.log("liste avant click", labelList);
            moveItemToFront(labelList, label);
            console.log("liste après click", labelList);

            // copie de labelList dans un nouvel array
            let sortLabel = [...labelList];
            // reset de la list labeList
            labelList = [];

            // itération sur chaque container de label
            choices.forEach((choice) => {
              // ciblage du nom du label
              let previousLabel = choice.querySelector("p");
              // assignation du 1er label de la list
              previousLabel.innerText = sortLabel[0];
              // update de labelList
              labelList.push(sortLabel[0]);
              // suppression du label attribué
              sortLabel.splice(0, 1);

              // ferme le menu
              // dropDownOptionWrapper.classList.toggle("hide");
              // up.classList.toggle("hide");
              // down.classList.toggle("hide");
              // // TODO ajouter tabindex="-1" aux choix 2 et 3
              this.openDropDown();
            });

            console.log("labelList mis à jour", labelList);

            // update des containers de labels
            choices = document.querySelectorAll(".choice");
            console.log("choices mis à jour", choices);
            this.sortBy(this.MediaData, label);
          } else {
            console.log("click sur le label 1 !!!");
          }
        }
      });
    });

    // END SELECTION
  }

  sortAccessibility() {
    const header = document.querySelector(".drop-down-header");

    header.addEventListener("focus", (event) => {
      console.log(
        "\n\n\nfocus sur le menu de tri, bingo !!! ecouter le enter press\n\n\n\n\n\n"
      );
      header.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          this.openDropDown();
        }
      });
    });

    // if (document.activeElement === header) {
    // }
  }

  galleryBuilder(MediaData) {
    this.$mediaWrapper = document.querySelector(".media-container");

    // // selectione puis traite les media du photographe via la factory
    // const MediaData = mediaRawData.reduce((reducedData, currentMedia) => {
    //   if (currentMedia.photographerId == this.photographerId) {
    //     reducedData.push(new PhotographersFactory(currentMedia, "media"));
    //   }
    //   return reducedData;
    // }, []);
    // console.log(
    //   "🚀 2) variable MediaData passée à la fonction galleryBuilder ~ MediaData:",
    //   MediaData
    // );

    // création de la galerie media par itération sur l'array MediaData
    MediaData.forEach((medium) => {
      // création de la media card via le template
      const MediaTemplate = new MediaCard(medium);
      // ajout de la media card à son element parent
      this.$mediaWrapper.appendChild(MediaTemplate.createMediaCard());
    });

    return MediaData;
  }

  sortBy(MediaData, label) {
    console.log(
      "🚀 ~ file: photographer.js:212 ~ App ~ sortBy ~ label:",
      label
    );

    let sortedMediaData;

    switch (label) {
      case "Popularité": //popularité
        console.log("Tri par popularité");
        sortedMediaData = MediaData.sort((a, b) =>
          a._likes < b._likes ? 1 : a._likes > b._likes ? -1 : 0
        );
        console.log(
          "🚀 5) variable MediaData ~ triée sortedMediaData:",
          sortedMediaData
        );

        break;
      case "Date": //date
        console.log("Tri par date");
        sortedMediaData = MediaData.sort((a, b) =>
          Date.parse(a._date) < Date.parse(b._date)
            ? -1
            : Date.parse(a._date) > Date.parse(b._date)
            ? 1
            : 0
        );
        console.log(
          "🚀 5) variable MediaData ~ triée sortedMediaData:",
          sortedMediaData
        );

        break;

      case "Titre": //titre
        console.log("Tri par titre");
        sortedMediaData = MediaData.sort((a, b) =>
          a._title < b._title ? -1 : a._title > b._title ? 1 : 0
        );
        console.log(
          "🚀 5) variable MediaData ~ triée sortedMediaData:",
          sortedMediaData
        );

        break;
    }

    const mediaContainer = document.querySelector(".media-container");
    mediaContainer.innerHTML = "";
    this.galleryBuilder(sortedMediaData);

    this.setLightbox(sortedMediaData);
    this.likeAdder();
    this.setFocusableContent();

    // // V2 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // this.$mediasWrapper = document.querySelector(".medias-container");

    // // création de la galerie media par itération sur l'array MediaData
    // sortedMediaData.forEach((medium) => {
    //   // création de la media card via le template
    //   const MediaTemplate = new MediaCard(medium);
    //   // ajout de la media card à son element parent
    //   this.$mediasWrapper.appendChild(MediaTemplate.createMediaCard());
    // });
  }

  likesCounter() {
    // récupère tous les elements HTML de classe likes
    const likesNodeList = document.querySelectorAll(".likes");
    // transforme la nodeList en array
    const likesArr = Array.from(likesNodeList);

    // totalise le nombre de like dans l'array
    const likesCount = likesArr.reduce(
      (likesCounter, currentValue) =>
        likesCounter + Number(currentValue.innerText),
      0
    );

    // ajout du total de like dans la div rate-container
    const likesElement = document.querySelector(".likes-sum");
    likesElement.innerHTML = `${likesCount} <i class="fa-sharp fa-solid fa-heart"></i>`;

    // // ajout du total de like dans la div rate-container
    // const rateContainer = document.querySelector(".rate-container");
    // const likes = document.createElement("p");
    // likes.innerHTML = `${likesCount} <i class="fa-sharp fa-solid fa-heart"></i>`;
    // likes.classList.add("rate");
    // rateContainer.prepend(likes);
  }

  likeAdder() {
    document.querySelectorAll("figure >.likes >i").forEach((media) => {
      media.addEventListener("click", (event) => {
        // div like clickée (parent)
        const likeDiv = event.target.parentNode;
        const likeIcon = event.target;
        const likeNumber = likeDiv.querySelector("span");

        // récupère le nombre de like actuel
        const currentLikes = Number(likeDiv.innerText);

        if (likeIcon.classList.contains("liked")) {
          // si le media est déjà liké
          likeNumber.innerText = currentLikes - 1 + " ";
          likeIcon.classList.remove("liked");
          this.likesCounter();
        } // si le media n'est pas encore liké
        else {
          likeNumber.innerText = currentLikes + 1 + " ";
          likeIcon.classList.add("liked");
          this.likesCounter();
        }
      });
    });
  }

  //* gestion de la lightbox
  setLightbox(MediaData) {
    // console.log("🚀 argument passé à la fonction lightbox:", MediaData);

    // écoute le click sur un des media de la gallerie
    document.querySelectorAll(".thumbnail").forEach((media) => {
      media.addEventListener("click", (event) => {
        this.launchLightbox(MediaData, media);
      });

      media.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          this.launchLightbox(MediaData, media);
        }
      });
    });
  }

  launchLightbox(MediaData, media) {
    // récupère la node list des medias
    const mediaNodeList = document.querySelectorAll("figure");

    // récupère un tableau des url des media (à mettre à jour en cas de tri)
    let mediaNodeArray = Array.from(mediaNodeList).map(
      (img) => img.firstChild.src
    );

    console.log("1) data = le tableau MediaData est : ", MediaData);
    console.log("2) type = l'array des url est : ", mediaNodeArray);
    console.log("3) url = l'url du media clické est : ", media.src);
    // TODO envoyer au à la factory le tableau MediaData, l'array des url et l'url du media clické pour formaté l'objet

    const mediaToEnlight = new PhotographersFactory(
      MediaData,
      mediaNodeArray,
      media.src
    );
    console.log(
      "🚀 ~ file: photographer.js:114 ~ App ~ media.addEventListener ~ mediaToEnlight:",
      mediaToEnlight
    );

    const lightboxElement = new LightboxModal(mediaToEnlight);
    console.log(
      "🚀 ~ file: photographer.js:124 ~ App ~ media.addEventListener ~ LightboxElement:",
      lightboxElement
    );
    // TODO terminer l'affichage de la lighbox

    this.$lightboxWrapper.appendChild(lightboxElement.createLightbox());
    let lightbox = document.querySelector(".lightbox");
    lightbox.showModal();

    // previent le comportement de la touche echap
    lightbox.addEventListener("cancel", (event) => {
      event.preventDefault();
    });

    let main = document.querySelector("main");
    lightbox.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
    this.accessibleNavigation();

    // toto.classList.add("open")

    //* partie gestion de la modale

    let previousButton = document.querySelector(".lightbox_previous");
    let nextButton = document.querySelector(".lightbox_next");
    // let closeButton = document.querySelector(".close");
    // écoute le click sur le bouton précédent

    previousButton.addEventListener("click", (event) => {
      console.log("previous clicked!!");
      // TODO gérer le previous
      this.updateLightbox(MediaData, mediaNodeArray, "previous");
    });

    nextButton.addEventListener("click", (event) => {
      console.log("next clicked!!");
      // TODO gérer le next
      this.updateLightbox(MediaData, mediaNodeArray, "next");

      if (event.target.classList.contains("close")) {
        console.log("fermeture modal");
        lightbox.remove();
        main.setAttribute("aria-hidden", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      const keyCode = e.key;

      if (keyCode === "ArrowLeft") {
        this.updateLightbox(MediaData, mediaNodeArray, "previous");
      } else if (keyCode === "ArrowRight") {
        this.updateLightbox(MediaData, mediaNodeArray, "next");
      }
    });

    document.addEventListener("keydown", (e) => {
      const keyCode = e.key;

      if (
        lightbox.getAttribute("aria-hidden") == "false" &&
        keyCode === "Escape"
      ) {
        lightbox.remove();
        main.setAttribute("aria-hidden", "false");
      }
      // if (keyCode === 27) {
      //   contactModal.close();
      //   console.log("fonction de fermeture");
      // }
    });
  }

  updateLightbox(MediaData, mediaNodeArray, direction) {
    // MediaData est une constante
    // mediaNodeArray est une constante
    // TODO mediaSrc doit être mis à jour !
    console.log("update de la lightbox !!!");
    // previous = document.querySelector(".lightbox_previous")
    // next = document.querySelector(".lightbox_next")

    const lightbox = document.querySelector(".lightbox");
    const currentMedia = lightbox.querySelector("figure :first-child");
    const currentMediaSrc = currentMedia.src;
    console.log(
      "🚀 ~ file: photographer.js:176 ~ App ~ updateLightbox ~ currentMediaSrc:",
      currentMediaSrc
    );

    // mise en forme de l'objet representant le prochain media à afficher
    const newMediaToEnlight = new PhotographersFactory(
      MediaData,
      mediaNodeArray,
      currentMediaSrc,
      direction
    );
    console.log("🚀 ~ l'object newMediaToEnlight:", newMediaToEnlight);

    // modification de la lightbox en utilisant l'objet precedement créé
    const newlightboxElement = new LightboxModal(newMediaToEnlight);
    console.log("🚀 ~ l'element html newlightboxElement:", newlightboxElement);
    newlightboxElement.updateLightbox();

    // affichage du media à afficher
  }

  // ACCESSIBILITé

  setFocusableContent() {
    console.log("\n\nUPDATE of focusable elements!!!!!\n\n");
    // liste des "types" d'elements que l'ont souhaite focusable
    const focusableElements =
      'button, [href], input, select, textarea, .thumbnail, .close, .arrow, [tabindex]:not([tabindex="-1"])';

    const main = document.querySelector("#main");
    const header = document.querySelector("header");
    const contactModal = document.querySelector("#contact");
    const lightBox = document.querySelector(".lightbox");
    let target;

    // si l'utilisateur est sur "main" chercher les elements focusables sur main
    if (main.getAttribute("aria-hidden") == "false") {
      console.log("♿ le mode accessibilité lancé sur main");
      target = main;
      // si l'utilisateur est sur la modale contact y chercher les elements focusables
    } else if (contactModal.getAttribute("aria-hidden") == "false") {
      console.log("♿ le mode accessibilité lancé sur contactModal");
      target = contactModal;
      // si l'utilisateur est sur la lightbox y chercher les elements focusables
    } else if (lightBox.getAttribute("aria-hidden") == "false") {
      console.log("♿ le mode accessibilité lancé sur lightBox");
      return;
      // target = lightBox;
    }

    // création de la liste des elements focusables
    // let focusableContent;
    if (target === main) {
      // cas particulier dans le cas de main, le querySelector doit être fait sur header et sur main
      this.focusableContent = Array.from(
        header.querySelectorAll(focusableElements)
      ).concat(Array.from(target.querySelectorAll(focusableElements)));
    } else {
      // dans les autres cas, une seul querySelector
      this.focusableContent = Array.from(
        target.querySelectorAll(focusableElements)
      );
    }

    // 1er element focusable
    this.firstFocusableElement = this.focusableContent[0];
    // dernier element focusable
    this.lastFocusableElement =
      this.focusableContent[this.focusableContent.length - 1];

    console.log(
      "liste des elements focusable\n(variable nommée 'focusableContent') :\n",
      this.focusableContent
    );
    console.log(
      "🚀 ~ file: photographer.js:609 ~ App ~ accessibleNavigation ~ this.firstFocusableElement:",
      this.firstFocusableElement
    );
    console.log(
      "🚀 ~ file: photographer.js:611 ~ App ~ accessibleNavigation ~ this.lastFocusableElement:",
      this.lastFocusableElement
    );
    return target;
  }

  accessibleNavigation() {
    let target = this.setFocusableContent();
    console.log(
      "🚀 ~ file: photographer.js:655 ~ App ~ accessibleNavigation ~ target:",
      target
    );

    // écoute la pression sur les touches
    document.addEventListener("keydown", (e) => {
      this.accessNavigation(e, target);
    });
    // met le focus sur le 1er element par défaut
    this.firstFocusableElement.focus();
    console.log(
      "le focus est actuellement sur l'element :",
      document.activeElement,
      "\nindex de l'element dans la nodeList :",
      Array.from(this.focusableContent).indexOf(document.activeElement),
      "/",
      Array.from(this.focusableContent).length
    );
  }

  accessNavigation(e, target) {
    console.log(
      "🚀 ~ file: photographer.js:673 ~ App ~ accessNavigation ~ target:",
      target
    );
    let isTabPressed = e.key === "Tab";
    let isArrowLeftPressed = e.key === "ArrowLeft";
    let isArrowRightPressed = e.key === "ArrowRight";

    console.log(
      "liste des elements focusable\n(variable nommée 'focusableContent') :\n",
      this.focusableContent
    );

    // si pression sur autre chose que Tab, flèche droite et flèche gauche mettre fin à la fonction
    if (!(isTabPressed || isArrowLeftPressed || isArrowRightPressed)) {
      return;
    }

    // lors de la première pression de tab ou arrows, ajoute la classe CSS ada à tous les elements de la liste des elements focusable pour mettre en avant le focus
    if (target.getElementsByClassName("ada").length === 0) {
      console.log("this.focusableContent", this.focusableContent);
      this.focusableContent.forEach((element) => {
        element.classList.add("ada");
      });
    }

    //  si shift est pressé (pour shift + tab) ou arrowleft
    if (e.shiftKey || isArrowLeftPressed) {
      if (document.activeElement === this.firstFocusableElement) {
        // cas NUMERO 1 où le focus est sur le 1er element et l'on fait un tab arrière : le focus doit aller sur le dernier element

        console.log(
          "---- ---- ---- ---- ---- ---- ----\n1) avant interaction le focus était sur 1er elem\n interaction sur la touche : tab arrière \n résultat attendu : focus sur le dernier elem"
        );

        console.log(
          "element sur lequel le focus doit être mis :",
          this.lastFocusableElement
        );

        this.lastFocusableElement.focus(); // mettre le focus sur le dernier element
        e.preventDefault();
        console.log(
          "après interaction focus a été mis sur :",
          document.activeElement,
          "\nindex de l'element dans la nodeList :",
          Array.from(this.focusableContent).indexOf(document.activeElement),
          "/",
          Array.from(this.focusableContent).length
        );

        if (this.lastFocusableElement != document.activeElement) {
          console.log("⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ \ncomportement anormal");
        }
      } else {
        // cas NUMERO 2 où le focus n'est pas sur le 1er element et l'on fait un tab arrière : le focus doit aller sur l'element precedent

        console.log(
          "---- ---- ---- ---- ---- ---- ----\n2) avant interaction le focus était sur un elem (pas le 1er)\n interaction sur la touche : tab arrière \n résultat attendu : focus sur l'elem precedent"
        );
        // récupérer l'index de l'element actif (focus) et faire le focus sur index - 1)
        const indexActiveElement = Array.from(this.focusableContent).indexOf(
          document.activeElement
        );

        console.log(
          "index de l'element focused avant action\n(variable nommée 'indexActiveElement') :\n",
          indexActiveElement,
          "/",
          Array.from(this.focusableContent).length
        );

        const indexPreviousElement =
          this.focusableContent[indexActiveElement - 1];
        console.log(
          "element sur lequel le focus doit être mis\n(variable nommée 'indexPreviousElement') :\n",
          indexPreviousElement
        );
        indexPreviousElement.focus();

        e.preventDefault();
        console.log(
          "après interaction focus a été mis sur :",
          document.activeElement,
          "\nindex de l'element dans la nodeList :",
          Array.from(this.focusableContent).indexOf(document.activeElement),
          "/",
          Array.from(this.focusableContent).length
        );
        if (indexPreviousElement != document.activeElement) {
          console.log("⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ \ncomportement anormal");
        }
      }
    } else {
      if (document.activeElement === this.lastFocusableElement) {
        // cas NUMERO 3 où le focus est sur le dernier element et l'on fait un tab : le focus doit aller sur le premier element

        console.log(
          "---- ---- ---- ---- ---- ---- ----\n3) avant interaction le focus était sur dernier elem\n interaction sur la touche : tab avant \n résultat attendu : focus sur le 1er elem"
        );

        console.log(
          "element sur lequel le focus doit être mis :",
          this.firstFocusableElement
        );

        // si le focus est actuellement sur le dernier element focusable
        this.firstFocusableElement.focus(); // mettre le focus sur le premier element
        e.preventDefault();
        console.log(
          "après interaction focus a été mis sur :",
          document.activeElement,
          "\nindex de l'element dans la nodeList :",
          Array.from(this.focusableContent).indexOf(document.activeElement),
          "/",
          Array.from(this.focusableContent).length
        );

        if (this.firstFocusableElement != document.activeElement) {
          console.log("⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ \ncomportement anormal");
        }
      } else {
        // cas NUMERO  4 où le focus n'est pas sur le dernier element et l'on fait un tab : le focus doit aller sur l'element suivant

        console.log(
          "---- ---- ---- ---- ---- ---- ----\n4) avant interaction le focus était sur un elem (pas le dernier)\n interaction sur la touche : tab avant \n résultat attendu : focus sur l'elem suivant"
        );

        // récupérer l'index de l'element actif (focus) et faire le focus sur index + 1)
        console.log("(this.focusableContent)", this.focusableContent);
        let indexActiveElement = Array.from(this.focusableContent).indexOf(
          document.activeElement
        );

        console.log(
          "index de l'element focused avant action\n(variable nommée 'indexActiveElement') :\n",
          indexActiveElement,
          "/",
          Array.from(this.focusableContent).length
        );

        let indexNextElement = this.focusableContent[indexActiveElement + 1];

        console.log(
          "element sur lequel le focus doit être mis\n(variable nommée 'indexNextElement') :\n",
          indexNextElement
        );

        indexNextElement.focus();

        e.preventDefault();
        console.log(
          "après interaction focus a été mis sur :",
          document.activeElement,
          "\nindex de l'element dans la nodeList :",
          Array.from(this.focusableContent).indexOf(document.activeElement),
          "/",
          Array.from(this.focusableContent).length
        );
        if (indexNextElement != document.activeElement) {
          console.log("⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ \ncomportement anormal");
        }
      }
    }

    //ouverture du select de tri
    if (document.activeElement.id == "sort") {
      console.log("focus sur la selectbox");
      // TODO déclencher un click à la pressio sur enter
      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          console.log("bingo!!!");
          const toto = document.querySelector("#sort");
          toto.click();
        }
      });
    }
    // console.log(document.activeElement);
    // console.log(typeof document.activeElement);
    // document.getElementById('elementID').click();
  }

  modal() {
    //* gestion de la modale contact
    let contactButton = document.querySelector(".contact_button");
    let contactModal = document.querySelector(".modal");
    let closeButton = document.querySelector(".close");
    let sendButton = document.querySelector(".send_button");
    let main = document.querySelector("main");
    // ouverture
    contactButton.addEventListener("click", () => {
      console.log("ouverture modal");
      contactModal.classList.toggle("open");
      contactModal.showModal();
      console.log("contactModal", contactModal);
      contactModal.setAttribute("aria-hidden", "false");
      main.setAttribute("aria-hidden", "true");
      this.accessibleNavigation();
      // TODO prochaine ligne à supprimer ? (doublon avec accessibleNavigation)
      // document.querySelector("#first").focus();
    });
    // fermeture
    closeButton.addEventListener("click", () => {
      console.log("fermeture modal");
      contactModal.close();
      contactModal.classList.toggle("open");
      contactModal.setAttribute("aria-hidden", "true");
      main.setAttribute("aria-hidden", "false");
    });
    // bouton Envoyer
    sendButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("fermeture modal (envoi des données)");
      // TODO gérer l'envoi des données de la modale
      console.log(
        "Message :",
        "\n",
        "Prénom :",
        this.getValue("first"),
        "\n",
        "Nom :",
        this.getValue("last"),
        "\n",
        "Email :",
        this.getValue("email"),
        "\n",
        "Message :",
        this.getValue("message")
      );
      const form = document.querySelector("form");
      form.reset();
      contactModal.close();
      contactModal.classList.toggle("open");
    });
    // fermeture à la touche Echap
    document.addEventListener("keydown", (e) => {
      // console.log("keycode", e.keycode);
      // console.log("wich", e.which);
      const keyCode = e.key;

      if (
        contactModal.getAttribute("aria-hidden") == "false" &&
        keyCode === "Escape"
      ) {
        contactModal.close();
        contactModal.classList.toggle("open");
        console.log("fonction de fermeture");
      }
      // if (keyCode === 27) {
      //   contactModal.close();
      //   console.log("fonction de fermeture");
      // }
    });
  }

  getValue(inputId) {
    const input = document.getElementById(inputId);
    return input.value;
  }
}

let dialog = document.querySelector("dialog");
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
});

async function init() {
  const app = new App();
  const MediaData = await app.main();
  app.likesCounter();
  app.setLightbox(MediaData);
  app.likeAdder();
  app.sortAccessibility();
  app.modal();
  app.accessibleNavigation();

  // console.log("🚀 ~ file: photographer.js:189 ~ init ~ toto:", toto);
  // console.log("toto :", toto);
}

init();
