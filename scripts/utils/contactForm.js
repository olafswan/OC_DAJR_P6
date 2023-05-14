// const { thisPhotographer } = require("..pages/photographer.js");
// console.log("🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 thisPhotographer:", thisPhotographer.name);
// const photographerName = "Mimi Keel";

// //* ouverture de la modal
// const contact = document.querySelector(".contact_button");
// contact.addEventListener("click", function () {
//   displayModal();
// });

// function displayModal() {
//   const modal = document.querySelector(".modalbg");
//   modal.style.display = "block";
// }

// //* fermeture de la modal
// const closeButton = document.querySelector(".close");
// closeButton.addEventListener("click", function () {
//   closeModal();
// });
// function closeModal() {
//   const modal = document.querySelector(".modalbg");
//   modal.style.display = "none";
// }

//* toggle de la modal

const contact = document.querySelector(".contact_button");
contact.addEventListener("click", function () {
  toggleModal();
});

let closeButton;

// closeButton.addEventListener("click", function () {
//   console.log("on ferme la modal !!!!!!!!!!");
//   toggleModal();
// });

function toggleModal() {
  const modal = document.querySelector(".modalbg");
  modal.classList.toggle("toggleModal");
}

// TODO terminer l'affichage de la modal
// 1. pourquoi apparait il avec une class="modal contact_button" au lieu de class="modal" ?
// 2. pourquoi l'input first n'apparait pas ?
// 3. où est le bouton class="contact_button" ?

//* generation du contenu de la modal
//* essai d'injection dans body
function buildModal(photographerName) {
  //cible de l'injection
  const body = document.querySelector("body");

  // lvl 1 bground - modalbg
  const modalbg = document.createElement("div");
  modalbg.classList.add("modalbg", "toggleModal");

  //* v1 avec contact_modal
  // // lvl 2 content - contact_modal
  // const contactModal = document.createElement("div");
  // contactModal.setAttribute("id", "contact_modal");

  // lvl 3 modal
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const header = document.createElement("header");
  const h2 = document.createElement("h2");
  h2.innerHTML = `Contactez moi<br/>${photographerName}`;

  closeButton = document.createElement("img");
  closeButton.setAttribute("src", "assets/icons/close.svg");
  closeButton.setAttribute("id", "close_modal_button");
  // img.setAttribute("onclick", "closeModal()");

  const form = document.createElement("form");
  const div = document.createElement("div");

  const firstLabel = document.createElement("label");
  firstLabel.setAttribute("for", "first");
  firstLabel.textContent = "Prénom";

  const lastLabel = document.createElement("label");
  lastLabel.setAttribute("for", "last");
  lastLabel.textContent = "Nom";

  const emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "email");
  emailLabel.textContent = "Email";

  const messageLabel = document.createElement("label");
  messageLabel.setAttribute("for", "message");
  messageLabel.textContent = "Votre message";

  const firstInput = document.createElement("input");
  // firstInput.setAttribute("class", "text-control");
  firstInput.setAttribute("type", "text");
  firstInput.setAttribute("id", "first");
  firstInput.setAttribute("name", "first");
  firstInput.setAttribute("minlength", "2");

  const lastInput = document.createElement("input");
  // lastInput.setAttribute("class", "text-control");
  lastInput.setAttribute("type", "text");
  lastInput.setAttribute("id", "last");
  lastInput.setAttribute("name", "last");
  lastInput.setAttribute("minlength", "2");

  const emailInput = document.createElement("input");
  // emailInput.setAttribute("class", "text-control");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("id", "email");
  emailInput.setAttribute("name", "email");

  const messageInput = document.createElement("input");
  // messageInput.setAttribute("class", "text-control");
  messageInput.setAttribute("type", "textarea");
  messageInput.setAttribute("id", "message");
  messageInput.setAttribute("name", "message");
  messageInput.setAttribute("rows", "5");
  // messageInput.rows = "5";

  const sendButton = document.createElement("button");
  sendButton.classList.add("contact_button");
  sendButton.textContent = "Envoyer";
  sendButton.setAttribute("type", "submit");
  sendButton.setAttribute("id", "send");

  // lvl1
  const main = document.getElementById("main");
  body.insertBefore(modalbg, main);

  // lvl 1
  // body.appendChild(modalbg);

  //* v1
  // modalbg.appendChild(contactModal);
  // contactModal.appendChild(modal);

  //* v2 sans contactModal
  modalbg.appendChild(modal);
  // contactModal.appendChild(modal);

  modal.appendChild(header);
  header.appendChild(h2);
  header.appendChild(closeButton);
  modal.appendChild(form);
  form.appendChild(div);

  div.appendChild(firstLabel);
  div.appendChild(firstInput);
  div.appendChild(lastLabel);
  div.appendChild(lastInput);
  div.appendChild(emailLabel);
  div.appendChild(emailInput);
  div.appendChild(messageLabel);
  div.appendChild(messageInput);

  //   const pairs = [  [firstLabel, firstInput],
  //   [lastLabel, lastInput],
  //   [emailLabel, emailInput],
  //   [messageLabel, messageInput],
  // ];

  // for (const [label, input] of pairs) {
  //   label.appendChild(div);
  //   input.appendChild(div);
  // }

  form.appendChild(sendButton);

  //* event du bouton close
  closeButton.addEventListener("click", function () {
    toggleModal();
  });

  //*event du bouton envoyer
  // TODO ne fonctionne pas car sendButton est undefined ?!
  // sendButton.addEventListener("click", function () {
  //   console.log("envoi du message au serveur");
  //   toggleModal();
  // });

  sendButton.addEventListener("submit", (e) => {
    // empeche la modal de se fermer au click
    e.preventDefault();
    console.log("submit!!!!!!!!");
    toggleModal();

    // // si le formulaire n'a pas encore été validé
    // if (submitBtn.value == "C'est parti") {
    //   // lancer la fonction de test des inputs
    //   testInputsValidity();
    // } else {
    //   // fermer la modale
    //   closeModal();
    //   restoreForm();
    // }
  });
}

// //* generation du contenu de la modal
//* fonctionnelle à l'injection dans la div #contact_modal enfant de body
// function buildModal(photographerName = "Mimi Keel") {
//   //cible de l'injection
//   const contactModal = document.querySelector("#contact_modal");

//   const modal = document.createElement("div");
//   modal.classList.add("modal");

//   const header = document.createElement("header");
//   const h2 = document.createElement("h2");
//   h2.textContent = `Contactez moi ${photographerName}`;

//   const img = document.createElement("img");
//   img.setAttribute("src", "assets/icons/close.svg");
//   img.setAttribute("onclick", "closeModal()");

//   const form = document.createElement("form");
//   const div = document.createElement("div");

//   const firstLabel = document.createElement("label");
//   firstLabel.setAttribute("for", "first");
//   firstLabel.textContent = "Prénom";

//   const lastLabel = document.createElement("label");
//   lastLabel.setAttribute("for", "last");
//   lastLabel.textContent = "Nom";

//   const emailLabel = document.createElement("label");
//   emailLabel.setAttribute("for", "email");
//   emailLabel.textContent = "Email";

//   const messageLabel = document.createElement("label");
//   messageLabel.setAttribute("for", "message");
//   messageLabel.textContent = "Votre message";

//   const firstInput = document.createElement("input");
//   firstInput.setAttribute("class", "text-control");
//   firstInput.setAttribute("type", "text");
//   firstInput.setAttribute("id", "first");
//   firstInput.setAttribute("name", "first");
//   firstInput.setAttribute("minlength", "2");

//   const lastInput = document.createElement("input");
//   lastInput.setAttribute("class", "text-control");
//   lastInput.setAttribute("type", "text");
//   lastInput.setAttribute("id", "last");
//   lastInput.setAttribute("name", "last");
//   lastInput.setAttribute("minlength", "2");

//   const emailInput = document.createElement("input");
//   emailInput.setAttribute("class", "text-control");
//   emailInput.setAttribute("type", "email");
//   emailInput.setAttribute("id", "email");
//   emailInput.setAttribute("name", "email");

//   const messageInput = document.createElement("input");
//   messageInput.setAttribute("class", "text-control");
//   messageInput.setAttribute("type", "text");
//   messageInput.setAttribute("id", "message");
//   messageInput.setAttribute("name", "message");

//   const contactButton = document.createElement("button");
//   contactButton.classList.add("contact_button");

//   contactModal.appendChild(modal);
//   modal.appendChild(header);
//   header.appendChild(h2);
//   header.appendChild(img);
//   modal.appendChild(form);
//   form.appendChild(div);

//   div.appendChild(firstLabel);
//   div.appendChild(firstInput);
//   div.appendChild(lastLabel);
//   div.appendChild(lastInput);
//   div.appendChild(emailLabel);
//   div.appendChild(emailInput);
//   div.appendChild(messageLabel);
//   div.appendChild(messageInput);

//   //   const pairs = [  [firstLabel, firstInput],
//   //   [lastLabel, lastInput],
//   //   [emailLabel, emailInput],
//   //   [messageLabel, messageInput],
//   // ];

//   // for (const [label, input] of pairs) {
//   //   label.appendChild(div);
//   //   input.appendChild(div);
//   // }

//   form.appendChild(contactButton);
// }
