import myNav from "./componets/header/my-nav.js";
import myFormularios from "./componets/formularios/my-formularios.js";

myNav.componet()
myFormularios.componet();

const links = document.querySelector("my-nav").shadowRoot.children[0].querySelector('.nav-links')
const formularios = document.querySelector("my-formularios")

links.addEventListener('click', (e) => {
    formularios.setAttribute('tipo', e.target.id)
})