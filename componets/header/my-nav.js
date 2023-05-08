import config from "../config.js";

let componet =  await config.phatname(import.meta.url)


export default {
    name :  componet[2],
    componet(){
        this.name = class extends HTMLElement{
            constructor(){
                super();
                let shadowRoot = this.attachShadow({ mode: 'open' });
                shadowRoot.innerHTML = componet[0];
            }
            static get observedAttributes() {
                return [];
            }

            handleEvent(e){
                
            }

            sendMesaggerEvent(e){
                console.log(e.target.textContent);
            }


            attributeChangedCallback(attr, oldValue, newValue) {
                // console.log(attr);
                // console.log(oldValue);
                // console.log(newValue);
                
            }
            connectedCallback() {
                
            }
        }
        window.customElements.define(componet[1], this.name);
   }

}