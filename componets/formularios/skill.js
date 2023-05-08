export default{
    async teamIds() {
        const teams = await fetch(`http://localhost:4000/skill`);
        let result = await teams.json();
        return result;
      },
    
      async fetchs(id) {
        const teams = await fetch(
          `http://localhost:4000/skill/${id}?_embed=modulosskill`
        );
        let result = await teams.json();
        return result;
      },
    
      async get(element) {
        let data = await this.teamIds();
        let plantilla = ``;
        data.forEach((skill) => {
          plantilla += `<option value=${skill.id}>${skill.nombre}</option>`;
        });
        element.querySelector("#skillId").innerHTML = plantilla;
      },
    
      async post(e,element) {
        
        let data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        let data_fetch = await this.fetchs(data.skill);
        let nombre_skill = data_fetch.nombre
        let plantilla = ``
        data_fetch.modulosskill.forEach((e) => {
          plantilla += `
                    <div class="recluta" style="display: block !important;">
                          <h3>
                          nombre de la skill : ${nombre_skill}
                      </h3>
                      <h3>
                          modulo : ${e.nombre}
                      </h3>
                      </div>
                          `;
        });
    
        element.querySelector(".skill_divs").innerHTML = plantilla;
      },
}