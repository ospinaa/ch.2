import Root from './Root/Root';
import './components/InicioPages'
import PlantCard from './components/PlantCard';
import InicioPage from './components/InicioPages';
import ModificarJardinPage from './screens/ModificarJardinPage';
import ModificarPlantasPage from './screens/ModificarPlantasPage';
import PantallaInicio from './screens/PantallaInicio';

customElements.define('main-root', Root);
customElements.define('inicio-page', InicioPage);
customElements.define("plant-card", PlantCard);
customElements.define("modificar-jardin-page", ModificarJardinPage);
customElements.define("modificar-plantas-page", ModificarPlantasPage);
customElements.define("pantalla-inicio", PantallaInicio);
