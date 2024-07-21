<template>
	<div ref="rendererContainer" class="renderer-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { INFORMATIONSPLANETESIRL } from "./assets/Constantes.js";
import Planete from "./classes/planete.js";
import skyBoxTop from "./assets/textures/skybox/top.png";
import skyBoxBottom from "./assets/textures/skybox/bottom.png";
import skyBoxFront from "./assets/textures/skybox/front.png";
import skyBoxBack from "./assets/textures/skybox/back.png";
import skyBoxLeft from "./assets/textures/skybox/left.png";
import skyBoxRight from "./assets/textures/skybox/right.png";

export default {
	name: "App",
	setup() {
		const rendererContainer = ref(null);
		let scene,
			camera,
			renderer,
			sun,
			mercury,
			venus,
			earth,
			mars,
			jupiter,
			saturn,
			uranus,
			neptune;

		const skyboxImages = [
			skyBoxRight,
			skyBoxLeft,
			skyBoxTop,
			skyBoxBottom,
			skyBoxFront,
			skyBoxBack,
		];

		const initThreeJS = () => {
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				10000
			);

			renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			rendererContainer.value.appendChild(renderer.domElement);

			const controls = new OrbitControls(camera, renderer.domElement);
			camera.position.set(0, 10, 10);
			controls.update();

			createSkybox();
			renderPlanetes();

			window.addEventListener("resize", onWindowResize, false);
		};

		const onWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		const animate = () => {
			requestAnimationFrame(animate);
			if (sun && mercury) {
				// Optional: Rotate the Sun for a better effect
				sun.rotation.y += 0.0005;
				mercury.rotation.y += 0.01;
			}

			renderer.render(scene, camera);
		};

		/**
		 * Permet de créer le skybox
		 */

		const createSkybox = () => {
			let cubeMaterial = [];
			let geometry = new THREE.BoxGeometry(10000, 10000, 10000);
			skyboxImages.forEach((image) => {
				cubeMaterial.push(
					new THREE.MeshBasicMaterial({
						map: new THREE.TextureLoader().load(image),
						side: THREE.DoubleSide,
					})
				);
			});
			let skybox = new THREE.Mesh(geometry, cubeMaterial);
			scene.add(skybox);
		};

		/**
		 * Permet de créer tous les planètes
		 */
		const renderPlanetes = () => {
			Object.entries(INFORMATIONSPLANETESIRL).forEach((planete) => {
				console.log(planete);
				let newPlanete = new Planete(
					planete[1].nom,
					planete[1].rayonIrl,
					planete[1].distanceIrl,
					1
				);
				newPlanete.CreatePlanetMesh(scene);
			});
		};
		onMounted(() => {
			initThreeJS();
			animate();
		});

		onBeforeUnmount(() => {
			window.removeEventListener("resize", onWindowResize);
		});

		return {
			rendererContainer,
		};
	},
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
}

.renderer-container {
	image-rendering: crisp-edges;
}
</style>
