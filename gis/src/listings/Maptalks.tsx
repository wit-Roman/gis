import * as maptalks from "maptalks";
import { VectorTileLayer, GroupGLLayer } from "@maptalks/gl-layers";
import "maptalks/dist/maptalks.css";

export const maptalksGLMap = `
function Map() {

	const mapContainerRef = React.useRef(null);
	const mapRef = React.useRef(null);

	React.useEffect(() => {
		if (mapRef.current) return;

		mapRef.current = new maptalks.Map(mapContainerRef.current, {
			center: [37.6173, 55.7558],
			zoom: 12,
			pitch: 45,
			bearing: 0,
			baseLayer: new maptalks.TileLayer("base", {
				urlTemplate: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
				subdomains:['a','b','c'],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
			}),
		});

		const groupLayer = new GroupGLLayer("gl-layer", []).addTo(mapRef.current);

		const vectorTileLayer = new VectorTileLayer("mvt", {
			urlTemplate: "http://localhost:3000/moscow/{z}/{x}/{y}",
			styles: [
				{
					filter: ["==", "$layer", "buildings"],
					renderPlugin: {
						type: "fill",
						dataConfig: { type: "polygon" },
						style: { color: "#3498db", opacity: 0.75 },
					},
				},
			],
		});

		groupLayer.addLayer(vectorTileLayer);

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, []);

	return <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />;
};

render(<Map />);`;

export const maptalks_scope = {
	maptalks,
	VectorTileLayer,
	GroupGLLayer,
};
