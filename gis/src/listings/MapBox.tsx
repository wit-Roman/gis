import { Map as Mapbox } from "react-map-gl/mapbox";
import "maplibre-gl/dist/maplibre-gl.css";
import "./style.css";

export const mapbox = `
function Map() {
	return (
		<Mapbox
			initialViewState={{
				longitude: 37.5855,
				latitude: 55.7651,
				zoom: 12,
			}}
			style={{ width: "100%", height: "400px" }}
			mapStyle="http://localhost:8080/styles/basic-preview/style.json"
			mapboxAccessToken="rabotat!"
			// mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=cctloEOtgU4XafZvqEL8"
			// mapboxAccessToken="cctloEOtgU4XafZvqEL8"
            hash={true}
			maxPitch={85}
		/>
	);
};

 render(<Map />);
`;

export const mapbox_scope = {
	Mapbox,
};
