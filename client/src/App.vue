<template>
    <div ref="rendererContainer" class="renderer-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import skyBox from './assets/textures/stars_milky_way_texture.jpg';
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
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(skyBox, () => {
        const geometry = new THREE.BoxGeometry(1000, 1000, 1000);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide});
        const skybox = new THREE.Mesh(geometry, material);
        scene.add(skybox);
      });
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
