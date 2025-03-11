import { Map as MapTiler, MapStyle as MapStyleTiler, config as configTiler } from "@maptiler/sdk";

export const mapTilerMap = `
function Map() {

	const mapContainer = React.useRef(null);
	const map = React.useRef(null);

	React.useEffect(() => {
		if (map.current || !mapContainer.current) return;
		configTiler.apiKey = "JUBbhzA6eP48DTH3H8rP";

		map.current = new MapTiler({
			container: mapContainer.current,
			style: MapStyleTiler.STREETS,
			center: [37.62, 55.75],
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

		return () => { 
			map.current?.remove()
		};
	}, []);

	return <div ref={mapContainer} style={{ width: "400px", height: "400px" }} />;
}

render(<Map />);`;

export const mapTilerMap_scope = {
	MapTiler,
	MapStyleTiler,
	configTiler,
};
