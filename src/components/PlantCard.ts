// src/components/PlantCard.ts

class PlantCard extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
      this.render();
  }

  render() {
      const name = this.getAttribute("data-name") || "";
      const img = this.getAttribute("data-image") || "";
      const type = this.getAttribute("data-type") || "";

      this.shadow.innerHTML = `
          <style>
              :host {
                  display: block;
                  font-family: 'Poppins', sans-serif;
              }

              .card {
                  background: rgba(255, 255, 255, 0.75);
                  border: 1px solid #c8e6c9;
                  border-radius: 18px;
                  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                  overflow: hidden;
                  transition: transform 0.3s ease, box-shadow 0.3s ease;
                  text-align: center;
                  backdrop-filter: blur(6px);
                  padding: 1rem;
              }

              .card:hover {
                  transform: scale(1.03);
                  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
              }

              img {
                  width: 100%;
                  height: 160px;
                  object-fit: cover;
                  border-radius: 12px;
                  margin-bottom: 0.75rem;
              }

              h3 {
                  margin: 0.5rem 0 0.2rem;
                  font-size: 1.2rem;
                  color: #2e7d32;
              }

              p {
                  margin: 0;
                  font-size: 0.95rem;
                  color: #4e6e5d;
                  font-style: italic;
              }
          </style>

          <div class="card">
              <img src="${img}" alt="${name}" />
              <h3>${name}</h3>
              <p>${type}</p>
          </div>
      `;
  }
}

export default PlantCard;