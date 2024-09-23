import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./style.css";

export const maplibre = `
function Map() {
	React.useEffect(() => {
		// Создаем карту
    const map = new maplibregl.Map({
     container: "map", // ID контейнера для карты
     style: {
       version: 8,
       sources: {
         // Определение источника тайлов
         "custom-tiles": {
           type: "vector", // Или "raster" для растровых тайлов
           tiles: ["http://localhost:8080/tiles/{z}/{x}/{y}.pbf"], // URL для тайлов
           minzoom: 12,
           maxzoom: 14
         }
       },
       layers: [
         {
           id: "custom-layer",
           type: "fill", // Тип слоя (например, "line", "fill", "symbol" и т.д.)
           source: "custom-tiles", // Используем источник, определенный выше
           "source-layer": "water", // Указываем название слоя, которое есть в данных тайлов
           paint: {
             "fill-color": "#888888",
             "fill-opacity": 0.5
           }
         }
       ]
     },
     center: [30.3158, 59.9386], // Центр карты (координаты Санкт-Петербурга)
     zoom: 13 // Начальный зум
   });

   // Очищаем карту при размонтировании компонента
   return () => map.remove();
	}, []);

	return <div id="map" className="maplibre-wrapper"></div>;
};

 render(<Map />);
`;

export const maplibre_scope = {
	maplibregl,
};
