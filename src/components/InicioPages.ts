// src/components/InicioPage.ts

import { store } from "../flux/Store";
import { Plant } from "../services/Plants";

class InicioPage extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        store.subscribe(() => this.render());
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const state = store.getState();
        const { plants, gardenPlants, gardenName } = state;

        if (!plants || !gardenPlants) return;

        const selectedPlants = plants
            .filter((p: Plant) => gardenPlants.includes(p.common_name))
            .sort((a: Plant, b: Plant) => a.common_name.localeCompare(b.common_name));

        this.shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    min-height: 100vh;
                    background: url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1350&q=80') no-repeat center center/cover;
                    font-family: 'Poppins', sans-serif;
                    color: #2d4739;
                    position: relative;
                }

                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-thumb {
                    background: #a5d6a7;
                    border-radius: 4px;
                }

                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.4);
                    backdrop-filter: blur(6px);
                    z-index: 0;
                }

                h1 {
                    text-align: center;
                    font-size: 2.5rem;
                    margin: 2rem 0 1rem;
                    color: #256029;
                    text-shadow: 1px 1px 2px #a5d6a7;
                    position: relative;
                    z-index: 1;
                }

                .plant-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 2rem;
                    padding: 2rem;
                    position: relative;
                    z-index: 1;
                }

                .plant-card {
                    background: rgba(255, 255, 255, 0.75);
                    border-radius: 20px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    backdrop-filter: blur(5px);
                    border: 1px solid #c8e6c9;
                }

                .plant-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
                }

                img {
                    width: 100%;
                    height: 160px;
                    object-fit: cover;
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                }

                .plant-info {
                    padding: 1rem;
                    text-align: center;
                }

                .name {
                    font-weight: 600;
                    font-size: 1.2rem;
                    color: #388e3c;
                    margin-bottom: 0.4rem;
                }

                .sci-name {
                    font-style: italic;
                    font-size: 0.95rem;
                    color: #4e6e5d;
                }
            </style>

            <div class="overlay"></div>
            <h1>🌼 Jardín: ${gardenName || 'Mi Jardín Virtual'} 🌷</h1>
            <div class="plant-list">
                ${selectedPlants.map((p: Plant) => `
                    <div class="plant-card">
                        <img src="${p.img}" alt="${p.common_name}">
                        <div class="plant-info">
                            <div class="name">${p.common_name}</div>
                            <div class="sci-name">${p.scientific_name}</div>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    }
}

export default InicioPage;