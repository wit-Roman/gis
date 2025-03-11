import * as Cesium from "cesium";
import "cesium/Widgets/widgets.css";

export const cesiumMap = `
function Map() {
	const cesiumContainerRef = React.useRef(null);

	React.useEffect(() => {
		if (!cesiumContainerRef.current) return;

		const viewer = new Cesium.Viewer(cesiumContainerRef.current, {
			baseLayer: Cesium.ImageryLayer.fromProviderAsync(
				Cesium.TileMapServiceImageryProvider.fromUrl(Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"))
			),
			baseLayerPicker: false,
			geocoder: false,
		});

		viewer.camera.setView({
			destination: Cesium.Cartesian3.fromDegrees(37.6173, 55.7558, 10000000),
		});

		return () => {
			if (!viewer.isDestroyed()) viewer.destroy();
		};
	}, []);

	return <div ref={cesiumContainerRef} style={{ width: "100%", height: "600px" }} />;
};

render(<Map />);`;

export const cesium_scope = {
	Cesium,
};
