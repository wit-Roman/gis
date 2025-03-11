import OL_Map from "ol/Map";
import OL_View from "ol/View";
import OL_MVT from "ol/format/MVT";
import OL_VectorTileLayer from "ol/layer/VectorTile";
import OL_VectorTileSource from "ol/source/VectorTile";

import "./style.css";

export const oLMap = `
function Map() {
	const mapRef = React.useRef();
	const mapContainerRef = React.useRef(null);
	const infoContainerRef = React.useRef(null);

	React.useEffect(() => {
		if (!mapContainerRef.current || !infoContainerRef.current || mapRef.current) return;

		mapRef.current = new OL_Map({
			target: mapContainerRef.current,
			view: new OL_View({
				center: [4189973, 7507950],
				zoom: 12,
			}),
			layers: [
				new OL_VectorTileLayer({
					source: new OL_VectorTileSource({
						format: new OL_MVT(),
						url: "http://localhost:3000/moscow/{z}/{x}/{y}",
						//url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf",
					}),
				}),
			],
		});

		mapRef.current.on("pointermove", showInfo);

		function showInfo(event) {
			const features = mapRef.current.getFeaturesAtPixel(event.pixel);
			if (features.length == 0) {
				infoContainerRef.current.innerText = "";
				infoContainerRef.current.style.opacity = 0;
				return;
			}
			const properties = features[0].getProperties();
			infoContainerRef.current.innerText = JSON.stringify(properties, null, 2);
			infoContainerRef.current.style.opacity = 1;
		}
	}, []);

	return (
		<div ref={mapContainerRef} className="ol-map">
			<pre ref={infoContainerRef} className="ol-info" />
		</div>
	);
};

 render(<Map />);
`;

export const oLMap_scope = {
	OL_Map,
	OL_View,
	OL_MVT,
	OL_VectorTileLayer,
	OL_VectorTileSource,
};
