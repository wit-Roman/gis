import { useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import "maplibre-gl/dist/maplibre-gl.css";

import "@maptiler/sdk/dist/maptiler-sdk.css";

import { maplibre, maplibre_scope } from "./listings/MapLibre";
import { mapbox, mapbox_scope } from "./listings/MapBox";
import { maplibrereact, maplibrereact_scope } from "./listings/MapLibreReact";
import { oLMap, oLMap_scope } from "./listings/OpenLayers";
import { cesiumMap, cesium_scope } from "./listings/Cesium";
import { maptalksGLMap, maptalks_scope } from "./listings/Maptalks";
import { pmtilesMap, pmtilesMap_scope } from "./listings/Leaflet";
import { tangramMap, tangramMap_scope } from "./listings/Tangram";
import { mapTilerMap, mapTilerMap_scope } from "./listings/Maptiler";

import "./App.css";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const scope = {
	reactLogo,
	viteLogo,
	...maplibre_scope,
	...mapbox_scope,
	...maplibrereact_scope,
	...oLMap_scope,
	...cesium_scope,
	...maptalks_scope,
	...pmtilesMap_scope,
	...tangramMap_scope,
	...mapTilerMap_scope,
};

function App() {
	const [code, setCode] = useState(maplibrereact);

	return (
		<>
			<nav className="navigation">
				<a onClick={() => setCode(helloWord)}>helloWord</a>
				<a onClick={() => setCode(maplibre)}>MapLibre + mbTiles</a>
				<a onClick={() => setCode(mapbox)}>MapBox + TileServerGL</a>
				<a onClick={() => setCode(maplibrereact)}>MapLibreReact + BBOX Server</a>
				<a onClick={() => setCode(oLMap)}>OLMap + Martin</a>
				<a onClick={() => setCode(cesiumMap)}>Cesium</a>
				<a onClick={() => setCode(maptalksGLMap)}>Maptalks png+mvt</a>
				<a onClick={() => setCode(pmtilesMap)}>Leaflet + PMTiles</a>
				<a onClick={() => setCode(tangramMap)}>Tangram + PMTiles</a>
				<a onClick={() => setCode(mapTilerMap)}>MapTiler</a>
			</nav>

			<LiveProvider code={code} scope={scope} noInline>
				<LivePreview />
				<LiveEditor />
				<LiveError />
			</LiveProvider>
		</>
	);
}

export default App;

const helloWord = `
  function Exam () {
    const [count, setCount] = React.useState(0);
    return(
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </>
    )
  }
    
  render(<Exam />);
`;
/*
function Map() {
	useEffect(() => {
		console.log(maplibre_scope.maplibregl);
		// Создаем карту
		const map = new maplibre_scope.maplibregl.Map({
			container: "map", // ID контейнера для карты
			style: {
				version: 8,
				sources: {
					// Определение источника тайлов
					"custom-tiles": {
						type: "vector", // Или "raster" для растровых тайлов
						tiles: ["http://localhost:8080/tiles/{z}/{x}/{y}.png"], // URL для тайлов
						minzoom: 12,
						maxzoom: 14,
					},
				},
				layers: [
					{
						id: "custom-layer",
						type: "fill", // Тип слоя (например, "line", "fill", "symbol" и т.д.)
						source: "custom-tiles", // Используем источник, определенный выше
						"source-layer": "water", // Указываем название слоя, которое есть в данных тайлов
						paint: {
							"fill-color": "#888888",
							"fill-opacity": 0.5,
						},
					},
				],
			},
			center: [37.3658, 55.4486], // Центр карты (координаты Санкт-Петербурга)
			zoom: 13, // Начальный зум
		});

		// Очищаем карту при размонтировании компонента
		return () => map.remove();
	}, []);

	return <div id="map" className="maplibre-wrapper"></div>;
}
*/
