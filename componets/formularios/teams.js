export default {
  async teamIds() {
    const teams = await fetch(`http://localhost:4000/team`);
    let result = await teams.json();
    return result;
  },

  async fetchs(id) {
    const teams = await fetch(
      `http://localhost:4000/team/${id}?_embed=reclutas`
    );
    let result = await teams.json();
    return result;
  },

  async get(element) {
    let data = await this.teamIds();
    let plantilla = ``;
    data.forEach((team) => {
      plantilla += `<option value=${team.id}>${team.nombre}</option>`;
    });
    element.querySelector("#teamId").innerHTML = plantilla;
  },

  async post(e, element) {
    let data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    let data_fetch = await this.fetchs(data.team);
    let team = data_fetch.nombre
    let plantilla = ``
    data_fetch.reclutas.forEach((e) => {
      plantilla += `
                <div class="recluta" style="display: block !important;">
                      <h3>
                      nombre : ${e.nombre}
                  </h3>
                  <h3>
                      edad : ${e.edad}
                  </h3>
                  <h3>
                      telefono : ${e.telefono}
                  </h3>
                  <h3>
                      email : ${e.email}
                  </h3>
                  <h3>
                      fecha nacimiento : ${e.fecha_nacimiento}
                  </h3>
                  <h3>
                      numero de identificacion: ${e.numero_id}
                  </h3>
                  <h3>
                      fecha ingreso: ${e.fecha_ingreso}
                  </h3>
                  <h3>
                      Team: ${team}
                  </h3>
                  </div>
                      `;
    });

    element.querySelector(".teams_divs").innerHTML = plantilla;
  },
};
