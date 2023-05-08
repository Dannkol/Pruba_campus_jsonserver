export default {
  async fetchs(tipo, busca, relacion) {
    let result
    switch (tipo) {
      case "get":
        const teams = await fetch(
          `http://localhost:4000/${relacion}?_embed=${busca}`
        );
        result = await teams.json();
        break;
      case "get_all":
        const recluta = await fetch(
          `http://localhost:4000/reclutas`
        );
        result = await recluta.json();
        break;
      default:
        break;
    }
    return result;
  },

  async teamIds() {
    const teams = await fetch(`http://localhost:4000/team`);
    let result = await teams.json();
    return result;
  },

  getreclutas(element) {
    element.querySelector("#menor").addEventListener("click", async (e) => {
      let plantilla = ``;
      let data = await this.fetchs("get_all");
      let team = await this.teamIds();
      let menor = data.filter((e) => {
        return parseInt(e.edad) <= 18
      })

      menor.forEach((e) => {
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
                  </div>
                      `;
      })
      element.querySelector(".reclutas_divs").innerHTML = plantilla;
    });
    element.querySelector("#mayores").addEventListener("click", async (e) => {
        let plantilla = ``;
        let data = await this.fetchs("get_all");
        let team = await this.teamIds();
        let menor = data.filter((e) => {
          return parseInt(e.edad) >= 18
        })
  
        menor.forEach((e) => {
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
                    </div>
                        `;
        })
        element.querySelector(".reclutas_divs").innerHTML = plantilla;
      });
    element.querySelectorAll("#submit").forEach((e) => {
        console.log(e);
      element.querySelector('#getALL').addEventListener("click", async (e) => {
        let dataset = e.target.dataset;
        let data = await this.fetchs(dataset.tipo, dataset.name, "team");
        let team = await this.teamIds();
        console.log(team);
        let plantilla = ``;
        team.forEach((team) => {
          plantilla += `<option value=${team.id}>${team.nombre}</option>`;
        });
        element.querySelector("#reclutas #teamId").innerHTML = plantilla;
        plantilla = ``;
        data.forEach(async (e) => {
          let team = e.nombre;
          e.reclutas.forEach((e) => {
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
                  <button id='${e.id}'>eliminar</button>
                  </div>
                      `;
          });
        });

        element.querySelector(".reclutas_divs").innerHTML = plantilla;

        element.querySelector("#reclutas");
      });
    });
  },
  delete(element) {
    element.querySelector(".reclutas_divs").addEventListener("click", (e) => {
      e.target.textContent === "eliminar"
        ? fetch(`http://localhost:4000/reclutas/${e.target.id}`, {
            method: "DELETE",
          }).then(() => alert("Delete successful"))
        : undefined;
    });
  },
  post(element) {
    let data = Object.fromEntries(new FormData(element.target));
    data = {
      nombre: data.nombre,
      edad: data.edad,
      telefono: data.telefono,
      email: data.email,
      fecha_nacimiento: data.fecha_nacimiento,
      numero_id: data.numero_id,
      fecha_ingreso: data.fecha_ingreso,
      teamId: parseInt(data.team),
    };
    console.log(JSON.stringify(data));
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`http://localhost:4000/reclutas`, settings);
  },
};
