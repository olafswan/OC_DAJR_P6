// //* OUVERTURE / FERMETURE DU FORMULAIRE DE CONTACT

// // cible le bouton contactez-moi via sa classe CSS
// const contact = document.querySelector(".contact_button");

// // au click sur ce bouton jouer la fonction toggleModal()
// contact.addEventListener("click", function () {
//   toggleModal();
// });

// // fonction d'ouverture / fermeture du formulaire de contact
// function toggleModal() {
//   const modal = document.querySelector(".modalbg");
//   modal.classList.toggle("toggleModal");
// }

// //* CREATION DU FORMULAIRE DE CONTACT

// // fonction de creation du formulaire de contact
// function buildModal(photographerName) {
//   // création de l'element principal de la modal
//   const modalbg = document.createElement("div");
//   modalbg.classList.add("modalbg", "toggleModal");

//   // création du container de la modal
//   const modal = document.createElement("div");
//   modal.classList.add("modal");

//   // création du header de la modal (1er enfant du container de la modal)
//   const header = document.createElement("header");
//   const h2 = document.createElement("h2");
//   h2.innerHTML = `Contactez moi<br/>${photographerName}`;

//   // création du bouton close du header
//   closeButton = document.createElement("img");
//   closeButton.setAttribute("src", "assets/icons/close.svg");
//   closeButton.setAttribute("id", "close_modal_button");

//   // création de l'element form (2nd enfant du container de la modal)
//   const form = document.createElement("form");

//   // création du container du formulaire
//   const div = document.createElement("div");
//   div.classList.add("form_content");

//   // création du label prénom
//   const firstLabel = document.createElement("label");
//   firstLabel.setAttribute("for", "first");
//   firstLabel.textContent = "Prénom";

//   // création du label nom
//   const lastLabel = document.createElement("label");
//   lastLabel.setAttribute("for", "last");
//   lastLabel.textContent = "Nom";

//   // création du label email
//   const emailLabel = document.createElement("label");
//   emailLabel.setAttribute("for", "email");
//   emailLabel.textContent = "Email";

//   // création du label message
//   const messageLabel = document.createElement("label");
//   messageLabel.setAttribute("for", "message");
//   messageLabel.textContent = "Votre message";

//   // création de l'input prénom
//   const firstInput = document.createElement("input");
//   firstInput.setAttribute("type", "text");
//   firstInput.setAttribute("id", "first");
//   firstInput.setAttribute("name", "first");
//   firstInput.setAttribute("minlength", "2");

//   // création de l'input nom
//   const lastInput = document.createElement("input");
//   lastInput.setAttribute("type", "text");
//   lastInput.setAttribute("id", "last");
//   lastInput.setAttribute("name", "last");
//   lastInput.setAttribute("minlength", "2");

//   // création de l'input mail
//   const emailInput = document.createElement("input");
//   emailInput.setAttribute("type", "email");
//   emailInput.setAttribute("id", "email");
//   emailInput.setAttribute("name", "email");

//   // création de l'input message
//   const messageInput = document.createElement("input");
//   messageInput.setAttribute("type", "textarea");
//   messageInput.setAttribute("id", "message");
//   messageInput.setAttribute("name", "message");
//   messageInput.setAttribute("rows", "5");

//   // création du bouton envoyer
//   const sendButton = document.createElement("button");
//   sendButton.classList.add("contact_button");
//   sendButton.textContent = "Envoyer";
//   sendButton.setAttribute("type", "submit");
//   sendButton.setAttribute("id", "send");

//   // ajout de l'element parent créé
//   const body = document.querySelector("body");
//   const main = document.getElementById("main");
//   body.insertBefore(modalbg, main);

//   // ajout des enfants de l'element crée
//   modalbg.append(modal);

//   modal.append(header);
//   header.append(closeButton);
//   header.append(h2);
//   modal.append(form);
//   form.append(sendButton);
//   form.append(div);

//   div.append(
//     firstLabel,
//     firstInput,
//     lastLabel,
//     lastInput,
//     emailLabel,
//     emailInput,
//     messageLabel,
//     messageInput
//   );

//   // au click sur le bouton close jouer la fonction toggleModal()
//   closeButton.addEventListener("click", function () {
//     toggleModal();
//   });
// }

// //* FONCTION D'ENVOI DU FORMULAIRE

// function sendForm(photographerName) {
//   // séquence de fermeture
//   function closeResetForm() {
//     // fermeture
//     toggleModal();
//     // suppression de la modal modifiée
//     deleteModal();
//     // re-création de la modal original
//     buildModal(photographerName);
//     // ajout du comportement de la fonction d'envoi
//     sendForm(photographerName);
//   }

//   // cible le bouton sumbit
//   boutonEnvoyer = document.getElementById("send");
//   // comportement au click sur ce bouton
//   boutonEnvoyer.addEventListener("click", (event) => {
//     event.preventDefault();
//     // TODO tester la validité des données
//     console.log("🖧 Envoi des données du formulaire au serveur");
//     // si bouton est Fermer : fermeture et reset du formulaire
//     if (boutonEnvoyer.innerHTML == "Fermer") {
//       // fonction de fermeture + reset de la modale
//       closeResetForm();
//     } else {
//       // sinon afficher le message de confirmation
//       confirmMessageSent(photographerName);
//     }
//   });
//   closeButton.addEventListener("click", (e) => {
//     if (boutonEnvoyer.innerHTML == "Fermer") {
//       // fonction de fermeture + reset de la modale
//       closeResetForm();
//     }
//   });
// }

// //* FONCTION D'AFFICHAGE DU MESSAGE DE CONFIRMATION

// function confirmMessageSent(photographerName) {
//   // supression du contenu de h2
//   let h2 = document.querySelector("h2");
//   h2.innerHTML = "";

//   // remplacement du contenu de la div du formulaire par le message de confirmation
//   let modalForm = document.querySelector(".form_content");
//   modalForm.innerHTML = `<p>Message envoyé !</p><p>${photographerName} vous répondera sous 48 heures</p>`;

//   // remplacement du contenu du bouton submit (envoyer -> fermer)
//   boutonEnvoyer.innerHTML = "Fermer";
// }

// //* FONCTION DE SUPPRESSION DE LA MODAL

// function deleteModal() {
//   const modal = document.querySelector(".modalbg");
//   modal.remove();
// }
