// src/pages/ModificarPlantasPage.ts
import { store } from "../flux/Store";
import { AppDispatcher } from "../flux/Dispatcher";
import { Plant } from "../services/Plants";

class ModificarPlantasPage extends HTMLElement {
  shadow: ShadowRoot;
  state = store.getState();
  editingPlant: Plant | null = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    store.subscribe(this.handleStateChange.bind(this));
    this.render();
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleStateChange(newState: any) {
    this.state = newState;
    this.render();
  }

  startEditing(common_name: string) {
    const plant = this.state.plants.find((p: Plant) => p.common_name === common_name);
    if (plant) {
      this.editingPlant = { ...plant };
      this.render();
    }
  }

  handleInputChange(field: keyof Plant, value: string) {
    if (this.editingPlant) {
      this.editingPlant = { ...this.editingPlant, [field]: value };
    }
  }

  saveChanges() {
    if (this.editingPlant) {
      AppDispatcher.dispatch({ type: "EDIT_PLANT", payload: this.editingPlant });
      this.editingPlant = null;
      this.render();
    }
  }

  cancelEditing() {
    this.editingPlant = null;
    this.render();
  }

  render() {
    const { plants } = this.state;

    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', sans-serif;
          color: #2e3a59;
          background: #f4f6f9;
          min-height: 100vh;
          padding: 2rem;
          box-sizing: border-box;
        }

        h1 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .plant-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .plant-item {
          background: white;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          cursor: pointer;
          transition: transform 0.2s ease;
          text-align: center;
        }

        .plant-item:hover {
          transform: translateY(-3px);
          background-color: #e9f7f9;
        }

        .edit-form {
          margin-top: 2rem;
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
          max-width: 500px;
          margin-inline: auto;
        }

        .edit-form label {
          display: block;
          margin-top: 1rem;
          font-weight: 600;
        }

        .edit-form input {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.25rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-sizing: border-box;
          font-size: 0.95rem;
        }

        .buttons {
          margin-top: 2rem;
          text-align: center;
        }

        button {
          padding: 0.6rem 1.2rem;
          margin: 0 0.5rem;
          font-size: 0.95rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        button.save {
          background-color: #28a745;
          color: white;
        }

        button.save:hover {
          background-color: #218838;
        }

        button.cancel {
          background-color: #dc3545;
          color: white;
        }

        button.cancel:hover {
          background-color: #c82333;
        }
      </style>

      <h1>Modificar Plantas (Modo Admin)</h1>

      <div class="plant-list">
        ${plants
          .map(
            (plant: Plant) => `
              <div class="plant-item" data-name="${plant.common_name}">
                <strong>${plant.common_name}</strong><br/>
                <em>${plant.scientific_name}</em>
              </div>
            `
          )
          .join("")}
      </div>

      ${
        this.editingPlant
          ? `
          <form class="edit-form">
            <label>Nombre Común</label>
            <input type="text" value="${this.editingPlant.common_name}" disabled />

            <label>Nombre Científico</label>
            <input type="text" id="scientific_name" value="${this.editingPlant.scientific_name}" />

            <label>Tipo</label>
            <input type="text" id="type" value="${this.editingPlant.type}" />

            <label>Origen</label>
            <input type="text" id="origin" value="${this.editingPlant.origin}" />

            <label>Temporada de Floración</label>
            <input type="text" id="flowering_season" value="${this.editingPlant.flowering_season}" />

            <label>Exposición al Sol</label>
            <input type="text" id="sun_exposure" value="${this.editingPlant.sun_exposure}" />

            <label>Riego</label>
            <input type="text" id="watering" value="${this.editingPlant.watering}" />

            <label>Imagen URL</label>
            <input type="text" id="img" value="${this.editingPlant.img}" />

            <div class="buttons">
              <button type="button" class="save">Guardar Cambios</button>
              <button type="button" class="cancel">Cancelar</button>
            </div>
          </form>
        `
          : ""
      }
    `;

    this.shadow.querySelectorAll(".plant-item").forEach((el) =>
      el.addEventListener("click", () => {
        const name = el.getAttribute("data-name");
        if (name) this.startEditing(name);
      })
    );

    if (this.editingPlant) {
      const fields: (keyof Plant)[] = [
        "scientific_name",
        "type",
        "origin",
        "flowering_season",
        "sun_exposure",
        "watering",
        "img",
      ];

      fields.forEach((field) => {
        const input = this.shadow.querySelector(`#${field}`) as HTMLInputElement;
        input?.addEventListener("input", (e: Event) => {
          this.handleInputChange(field, (e.target as HTMLInputElement).value);
        });
      });

      this.shadow.querySelector(".save")?.addEventListener("click", () => this.saveChanges());
      this.shadow.querySelector(".cancel")?.addEventListener("click", () => this.cancelEditing());
    }
  }
}

export default ModificarPlantasPage;