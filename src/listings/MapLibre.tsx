import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./style.css";

export const maplibre = `
function Map() {
  const [map, setMap] = React.useState(null);
	const mapContainer = React.useRef(null);

	React.useEffect(() => {
		if (!mapContainer.current) return;

		const initializeMap = async () => {
			const mapInstance = new maplibregl.Map({
				container: mapContainer.current, // элемент id для карты
				style: {
					version: 8,
					sources: {
						moscow_source: {
							type: "vector",
							tiles: ["http://localhost:8083/tiles/{z}/{x}/{y}.pbf"],
						},
					},
					layers: [], // оставляем пустым, позже добавим
				},
				center: [37.6173, 55.7558], // Москва
				zoom: 12,
			});

			mapInstance.on("load", async () => {
				// получаем метаданные слоев JSON от MBTileserver
				const res = await fetch("http://localhost:8082/services/moscow");
				const metadata = await res.json();

				metadata.vector_layers.forEach((vlayer) => {
					// добавляем слои автоматически
					mapInstance.addLayer({
						id: vlayer.id,
						type: "fill", // если хотите можно добавить условия по типу слоя в зависимости от слоя
						source: "moscow_source",
						"source-layer": vlayer.id,
						paint: {
							// пример простого оформления, можно усложнять по типам слоёв
							"fill-color": "#cccccc",
							"fill-opacity": 0.5,
						},
					});
				});
			});

			setMap(mapInstance);
		};

		if (!map) initializeMap();

		// Очистка карты при размонтировании компонента
		return () => {
			map?.remove();
		};
	}, [map]); // Запускается один раз при монтировании компонента

	return <div ref={mapContainer} className="maplibre-wrapper"></div>;
};

render(<Map />);`;

export const maplibre_scope = {
	maplibregl,
};
