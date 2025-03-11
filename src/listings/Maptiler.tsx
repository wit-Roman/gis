import React, { useEffect, useRef } from "react";
import { Map, MapStyle, config } from "@maptiler/sdk";

export const MapTilerMap = () => {
	const mapContainer = useRef(null);
	const map = useRef(null);

	useEffect(() => {
		if (map.current || !mapContainer.current) return;
		config.apiKey = "JUBbhzA6eP48DTH3H8rP";

		map.current = new Map({
			container: mapContainer.current,
			style: MapStyle.STREETS, // или MapStyle.BASIC, SATELLITE и др.
			center: [37.62, 55.75], // долгота, широта (Москва, например)
			zoom: 10,
			hash: true,
		});

		map.current.on("error", (e) => {
			console.error("Ошибка карты:", e); // 👈 Добавляем логирование ошибок карты
		});

		map.current.on("load", () => {
			console.log(map.current);
			map.current.resize(); // 👈 принудительно обновляем размер после загрузки
		});

		return () => map.current?.remove();
	}, []);

	return <div ref={mapContainer} style={{ width: "400px", height: "400px" }} />;
};
