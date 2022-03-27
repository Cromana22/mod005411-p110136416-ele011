const contactUsClick = document.getElementById("contactUs");
contactUsClick.addEventListener("click", sentModal, false)

const contactUs = document.getElementById("contactUsSent");
contactUs.addEventListener("click", sentModal, false)

function sentModal(event) {
    event.preventDefault();
    contactUsSent.classList.toggle("Hide");
    contactUsSent.classList.toggle("Show");
}