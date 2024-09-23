import { useState, useEffect } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { maplibre, maplibre_scope } from "./listings/MapLibre";

import "./App.css";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const scope = {
	reactLogo,
	viteLogo,
	...maplibre_scope,
};

function App() {
	const [code, setCode] = useState(helloWord);

	return (
		<>
			<Map />
			<nav className="navigation">
				<a onClick={() => setCode(helloWord)}>helloWord</a>
				<a onClick={() => setCode(maplibre)}>MapLibre</a>
			</nav>

			<LiveProvider code={code} scope={scope} noInline>
				<LiveEditor />
				<LiveError />
				<LivePreview />
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

function Map() {
	useEffect(() => {
		// Создаем карту
		const map = new maplibre_scope.maplibregl.Map({
			container: "map", // ID контейнера для карты
			style: {
				version: 8,
				sources: {
					// Определение источника тайлов
					"custom-tiles": {
						type: "vector", // Или "raster" для растровых тайлов
						tiles: ["http://localhost:8080/tiles/{z}/{x}/{y}.pbf"], // URL для тайлов
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
			center: [30.3158, 59.9386], // Центр карты (координаты Санкт-Петербурга)
			zoom: 13, // Начальный зум
		});

		// Очищаем карту при размонтировании компонента
		return () => map.remove();
	}, []);

	return <div id="map" className="maplibre-wrapper"></div>;
}
