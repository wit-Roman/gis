import { Fragment } from "react";
import { jsxDEV } from "react/jsx-dev-runtime";

import maplibregl, { StyleSpecification } from "maplibre-gl";
import { RMap } from "maplibre-react-components";
import "maplibre-gl/dist/maplibre-gl.css";

import "./style.css";

const a = function Map() {
	// const mapRef = useRef(null);

	const mapStyle = {
		version: 8,
		name: "PgTileserv demo",
		glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",

		sources: {
			poi: {
				type: "vector",
				tiles: [`http://localhost:7800/public.poi_demo/{z}/{x}/{y}.pbf`],
				minzoom: 0,
				maxzoom: 14,
			},
			square: {
				type: "vector",
				tiles: ["http://localhost:7800/public.square_demo/{z}/{x}/{y}.pbf"],
				minzoom: 0,
				maxzoom: 14,
			},
		},

		layers: [
			{
				id: "squares-fill",
				type: "fill",
				source: "square",
				"source-layer": "public.square_demo",
				paint: {
					"fill-color": "#2196f3",
					"fill-opacity": 0.3,
				},
			},
			{
				id: "poi-circle",
				type: "circle",
				source: "poi",
				"source-layer": "public.poi_demo",
				paint: {
					"circle-radius": 6,
					"circle-color": ["get", "color"],
					"circle-stroke-width": 1,
					"circle-stroke-color": "#fff",
				},
			},
		],
	} as StyleSpecification;

	const handleClick = async () => {
		await fetch("http://localhost:8083/api/update-point", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: 4, lon: 37.65, lat: 55.75, color: "#f50707" }),
		});
		// Способ А:
		//setVersion(Date.now());
		// Способ Б:
		// refreshTiles();

		// map.getSource('poi').reload();
	};

	return (
		<>
			<button onClick={handleClick}>Move / repaint point</button>
			<RMap
				// ref={mapRef}
				mapStyle={mapStyle}
				initialViewState={{
					longitude: 37.62,
					latitude: 55.75,
					zoom: 12,
				}}
				style={{ width: "100%", height: "400px" }}
				// mapLib={maplibregl}
				// mapStyle="http://localhost:8085/xyz/tiles.style.json"

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
		</>
	);
};

export const maplibrereact = `${a.toString()};
render(<Map />);`;

export const maplibrereact_scope = {
	RMap,
	maplibregl,
	jsxDEV,
	// useRef,
	Fragment,
};
