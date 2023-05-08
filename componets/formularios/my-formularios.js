import config from "../config.js";
import reclutas from "./reclutas.js";
import teams from "./teams.js";
import skill from "./skill.js";


let componet = await config.phatname(import.meta.url);

export default {
  name: componet[2],
  componet() {
    this.name = class extends HTMLElement {
      constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = componet[0];
      }
      static get observedAttributes() {
        return ["tipo"];
      }



      attributeChangedCallback(attr, oldValue, newValue) {
        switch (newValue) {
          case "recluta":
            this.shadowRoot.querySelectorAll(".item").forEach((e) => {
              e.style.display = "none";
            });
            this.shadowRoot.querySelector("#reclutas").style.display = "block";
            break;
          case "team":
            this.shadowRoot.querySelectorAll(".item").forEach((e) => {
              e.style.display = "none";
            });
            this.shadowRoot.querySelector("#team").style.display = "block";
            teams.get(this.shadowRoot.querySelector("#team"))
            break;
          case "trainer":
            this.shadowRoot.querySelectorAll(".item").forEach((e) => {
              e.style.display = "none";
            });
            this.shadowRoot.querySelector("#trainer").style.display = "block";
            break;
          case "modulos_skill":
            this.shadowRoot.querySelectorAll(".item").forEach((e) => {
              e.style.display = "none";
            });
            this.shadowRoot.querySelector("#modulosskill").style.display =
              "block";
            break;
          case "skill":
            this.shadowRoot.querySelectorAll(".item").forEach((e) => {
              e.style.display = "none";
            });
            this.shadowRoot.querySelector("#skill").style.display = "block";
            skill.get(this.shadowRoot.querySelector("#skill"))
            break;
          case "evaluacion":
            console.log("hola");
            this.shadowRoot.querySelectorAll(".item").forEach((e) => {
              e.style.display = "none";
            });
            this.shadowRoot.querySelector("#evaluacion").style.display =
              "block";
            break;
          default:
            break;
        }
      }
      async connectedCallback() {

        reclutas.getreclutas(this.shadowRoot)
        reclutas.delete(this.shadowRoot)
        this.shadowRoot.querySelector("#reclutas form").addEventListener("submit", (e) => {
            e.preventDefault();
            reclutas.post(e)
        })

        let team = this.shadowRoot.querySelector('#team')
        
        team.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault()
            teams.post(e , team)
        })

        let skills = this.shadowRoot.querySelector('#skill')
        
        skills.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault()
            skill.post(e , skills)
        })

        
      }
    };
    window.customElements.define(componet[1], this.name);
  },
};
