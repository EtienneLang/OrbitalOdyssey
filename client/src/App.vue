<template>
    <div ref="rendererContainer" class="renderer-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import skyBoxTop from './assets/textures/skybox/top_skybox.jpg';
import skyBoxBottom from './assets/textures/skybox/bottom_skybox.jpg';
import skyBoxFront from './assets/textures/skybox/front_skybox.jpg';
import skyBoxBack from './assets/textures/skybox/back_skybox.jpg';
import skyBoxLeft from './assets/textures/skybox/left_skybox.jpg';
import skyBoxRight from './assets/textures/skybox/right_skybox.jpg';
import textureSun from './assets/textures/sun_texture.jpg';
import textureMercury from './assets/textures/mercury_texture.jpg';

export default {
  name: 'App',
  setup() {
    const rendererContainer = ref(null);
    let scene, camera, renderer, sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto;

    const initThreeJS = () => {
      // Scene, Camera, Renderer
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererContainer.value.appendChild(renderer.domElement);

      // Initialize OrbitControls after renderer is defined
      const controls = new OrbitControls(camera, renderer.domElement);
      camera.position.set(0, 20, 100);
      controls.update();

      createSkybox();
      createSunMesh();
      createMercuryMesh();
      window.addEventListener('resize', onWindowResize, false);
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

    const createSkybox = () => {
      let geometry = new THREE.BoxGeometry(1000, 1000, 1000);
      let cubeMaterial = [
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(skyBoxRight), side: THREE.DoubleSide }), // Right
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(skyBoxLeft), side: THREE.DoubleSide }), // Left
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(skyBoxTop), side: THREE.DoubleSide }), // Top
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(skyBoxBottom), side: THREE.DoubleSide }), // Bottom
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(skyBoxFront), side: THREE.DoubleSide }), // Front
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(skyBoxBack), side: THREE.DoubleSide }) // Back
      ];

      let skybox = new THREE.Mesh(geometry, cubeMaterial);
      scene.add(skybox);
    };

    const createSunMesh = () => {
      const textureLoader = new THREE.TextureLoader();
          const sunTexture = textureLoader.load(textureSun, () => {
            // Create Sun geometry and material after texture is loaded
            const sunGeometry = new THREE.SphereGeometry(5, 32, 32); // Adjust size as needed
            const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture});

            // Create Sun mesh
            sun = new THREE.Mesh(sunGeometry, sunMaterial);
            scene.add(sun);
          });
    };
    const createMercuryMesh = () => {
      const textureLoader = new THREE.TextureLoader();
          const mercuryTexture = textureLoader.load(textureMercury, () => {
            // Create Sun geometry and material after texture is loaded
            const mercuryGeometry = new THREE.SphereGeometry(1, 32, 32); // Adjust size as needed

            const mercuryMaterial = new THREE.MeshBasicMaterial({map: mercuryTexture});

            // Create Sun mesh
            mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
            scene.add(mercury);
            mercury.position.x = 10;
          });
    };

    onMounted(() => {
      initThreeJS();
      animate();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onWindowResize);
    });

    return {
      rendererContainer
    };
  }
};
</script>

<style>
.renderer-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
