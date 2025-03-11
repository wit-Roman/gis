import { MapContainer, useMap } from "react-leaflet";
import Tangram from "tangram";
import "leaflet/dist/leaflet.css";

export const tangramMap = `
function Map() {

const TANGRAM_SCENE = "/tangram/refill-style.yaml";

const TangramMap = () => (
	<MapContainer center={[55.75, 37.62]} zoom={11} style={{ width: "100%", height: "400px" }}>
		<TangramLayer />
	</MapContainer>
);

const TangramLayer = () => {
	const map = useMap();
	const tangramLayerRef = React.useRef(null);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			tangramLayerRef.current = Tangram.leafletLayer({
				scene: TANGRAM_SCENE,
				attribution: "",
			});

			tangramLayerRef.current.addTo(map);
		}, 200);

		return () => {
			clearTimeout(timeout);
			if (tangramLayerRef.current) tangramLayerRef.current.remove();
		};
	}, [map]);

	return null;
};

return <TangramMap />

}
render(<Map />);`;

export const tangramMap_scope = {
	Tangram,
	useMap,
	MapContainer,
};
