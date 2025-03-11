import { Map as MapTiler, MapStyle, config } from "@maptiler/sdk";

export const mapTilerMap = `
function Map() {

export const MapTilerMap = () => {
	const mapContainer = React.useRef(null);
	const map = React.useRef(null);

	React.useEffect(() => {
		if (map.current || !mapContainer.current) return;
		config.apiKey = "JUBbhzA6eP48DTH3H8rP";

		map.current = new MapTiler({
			container: mapContainer.current,
			style: MapStyle.STREETS,
			center: [37.62, 55.75]
			zoom: 10,
			hash: true,
		});

		map.current.on("error", (e) => {
			console.error("Ошибка карты:", e);
		});

		map.current.on("load", () => {
			console.log(map.current);
			map.current.resize();
		});

		return () => map.current?.remove();
	}, []);

	return <div ref={mapContainer} style={{ width: "400px", height: "400px" }} />;
};

render(<Map />);`;

export const mapTilerMap_scope = {
	MapTiler,
	MapStyle,
	config,
};
