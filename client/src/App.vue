<template>
  <div id="app">
    <div ref="rendererContainer" class="renderer-container"></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import textureSun from './assets/images/chat.png';

export default {
  name: 'App',
  setup() {
    const rendererContainer = ref(null);
    let scene, camera, renderer, sun;

    const initThreeJS = () => {
      // Scene, Camera, Renderer
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 15;
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererContainer.value.appendChild(renderer.domElement);

      // Load Sun texture
      const textureLoader = new THREE.TextureLoader();
      const sunTexture = textureLoader.load(textureSun, () => {
        // Create Sun geometry and material after texture is loaded
        const sunGeometry = new THREE.SphereGeometry(5, 32, 32); // Adjust size as needed
        const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });

        // Create Sun mesh
        sun = new THREE.Mesh(sunGeometry, sunMaterial);

        // Add Sun to the scene
        scene.add(sun);
      });

      // Handle window resize
      window.addEventListener('resize', onWindowResize, false);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (sun) {
        // Optional: Rotate the Sun for a better effect
        sun.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
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
