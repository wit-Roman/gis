import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{ find: /^cesium$/, replacement: path.resolve(__dirname, "node_modules/cesium/Source/Cesium.js") },
			{ find: /^cesium\/(.*)/, replacement: path.resolve(__dirname, "node_modules/cesium/Source/$1") },
		],
	},
	optimizeDeps: {
		include: ["cesium"],
	},
	define: {
		CESIUM_BASE_URL: JSON.stringify("/cesium"),
	},
});
