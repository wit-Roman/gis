import { RMap } from "maplibre-react-components";
import "maplibre-gl/dist/maplibre-gl.css";
import "./style.css";

export const maplibrereact = `
function Map() {
	return (
		<RMap
			initialViewState={{
				longitude: 37.5855,
				latitude: 55.7651,
				zoom: 12,
			}}
			style={{ width: "100%", height: "400px" }}
			mapStyle="http://localhost:8085/xyz/tiles.style.json"
			
			// mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=cctloEOtgU4XafZvqEL8"
			// mapboxAccessToken="cctloEOtgU4XafZvqEL8"
			/*source={{
				type: "vector",
				url: "http://localhost:8080/data/crimean-fed-district-shortbread/{z}/{x}/{y}.pbf",
				tileSize: 256,
			}}
			layers={[
				{
					id: "crimea-layer", // Идентификатор слоя
					type: "fill", // Тип слоя
					source: "vector_layer", // Источник данных
					"source-layer": "boundaries", // Указываем нужный слой из JSON
					paint: {
						"fill-color": "#4a90e2", // Цвет заливки
						"fill-opacity": 0.5, // Прозрачность
					},
				},
			]}*/
		/>
	);
};

 render(<Map />);
`;

export const maplibrereact_scope = {
	RMap,
};
