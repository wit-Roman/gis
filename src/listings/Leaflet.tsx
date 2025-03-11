import { MapContainer, useMap } from "react-leaflet";
import { leafletLayer } from "protomaps-leaflet";
import "leaflet/dist/leaflet.css";

export const pmtilesMap = `
function Map() {

const PMTILES_URL = "https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=e4edeebe543ec940";

const PmtilesMap = () => (
	<MapContainer center={[55.75, 37.62]} zoom={11} style={{ width: "100%", height: "400px" }}>
		<PMTilesLayer />
	</MapContainer>
);

const PMTilesLayer = () => {
	const map = useMap();

	React.useEffect(() => {
		const layer = leafletLayer({ url: PMTILES_URL, style: {} }); // пустой стиль -> дефолтный стиль протомапс
		layer.addTo(map);

		return () => {
			map.removeLayer(layer);
		};
	}, [map]);

	return null;
};

return <PmtilesMap />

}
render(<Map />);`;

export const pmtilesMap_scope = {
	MapContainer,
	useMap,
	leafletLayer,
};
