<template>
  <div ref="rendererContainer" class="renderer-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import skyBoxTop from './assets/textures/skybox/top.png';
import skyBoxBottom from './assets/textures/skybox/bottom.png';
import skyBoxFront from './assets/textures/skybox/front.png';
import skyBoxBack from './assets/textures/skybox/back.png';
import skyBoxLeft from './assets/textures/skybox/left.png';
import skyBoxRight from './assets/textures/skybox/right.png';

import textureSun from './assets/textures/sun_texture.jpg';
import textureMercury from './assets/textures/mercury_texture.jpg';
import textureVenus from './assets/textures/venus_texture.jpg';
import textureMars from './assets/textures/mars_texture.jpg';
import textureEarth from './assets/textures/earth_day_texture.jpg';
import textureJupiter from './assets/textures/jupiter_texture.jpg';
import textureSaturn from './assets/textures/saturn_texture.jpg';
import textureUranus from './assets/textures/uranus_texture.jpg';
import textureNeptune from './assets/textures/neptune_texture.jpg';

export default {
name: 'App',
setup() {
  const rendererContainer = ref(null);
  let scene, camera, renderer, sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto;

  const initThreeJS = () => {
    // Scene, Camera, Renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

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
    createVenusMesh();
    creatEarthMesh();
    createMarsMesh();
    createJupiterMesh();
    createSaturneMesh();
    createUranusMesh();
    createNeptuneMesh();
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
    let geometry = new THREE.BoxGeometry(2000, 2000, 2000);
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
          const sunGeometry = new THREE.SphereGeometry(10, 32, 32); // Adjust size as needed
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
          const mercuryGeometry = new THREE.SphereGeometry(0.035, 32, 32); // Adjust size as needed

          const mercuryMaterial = new THREE.MeshBasicMaterial({map: mercuryTexture});

          // Create Sun mesh
          mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
          scene.add(mercury);
          mercury.position.x = 15;
        });
  };
  const createVenusMesh = () => {
    const textureLoader = new THREE.TextureLoader();
        const venusTexture = textureLoader.load(textureVenus, () => {
          const venusGeometry = new THREE.SphereGeometry(0.087, 32, 32);
          const venusMaterial = new THREE.MeshBasicMaterial({map: venusTexture});

          venus = new THREE.Mesh(venusGeometry, venusMaterial);
          scene.add(venus);
          venus.position.x = 20;
        });
  };

const creatEarthMesh = () => {
    const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load(textureEarth, () => {
          const earthGeometry = new THREE.SphereGeometry(0.091, 32, 32);
          const earthMaterial = new THREE.MeshBasicMaterial({map: earthTexture});

          earth = new THREE.Mesh(earthGeometry, earthMaterial);
          scene.add(earth);
          earth.position.x = 25;
        });
  };

  const createMarsMesh = () => {
    const textureLoader = new THREE.TextureLoader();
        const marsTexture = textureLoader.load(textureMars, () => {
          const marsGeometry = new THREE.SphereGeometry(0.049, 32, 32);
          const marsMaterial = new THREE.MeshBasicMaterial({map: marsTexture});

          mars = new THREE.Mesh(marsGeometry, marsMaterial);
          scene.add(mars);
          mars.position.x = 30;
        });
  };

  const createJupiterMesh = () => {
    const textureLoader = new THREE.TextureLoader();
        const jupiterTexture = textureLoader.load(textureJupiter, () => {
          const jupiterGeometry = new THREE.SphereGeometry(1.004, 32, 32);
          const jupiterMaterial = new THREE.MeshBasicMaterial({map: jupiterTexture});

          jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
          scene.add(jupiter);
          jupiter.position.x = 35;
        });
  };

  const createSaturneMesh = () => {
    const textureLoader = new THREE.TextureLoader();
        const saturnTexture = textureLoader.load(textureSaturn, () => {
          const saturnGeometry = new THREE.SphereGeometry(0.836, 32, 32);
          const saturnMaterial = new THREE.MeshBasicMaterial({map: saturnTexture});

          saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
          scene.add(saturn);
          saturn.position.x = 40;
        });
  };

  const createUranusMesh = () => {
    const textureLoader = new THREE.TextureLoader();
        const uranusTexture = textureLoader.load(textureUranus, () => {
          const uranusGeometry = new THREE.SphereGeometry(0.364, 32, 32);
          const uranusMaterial = new THREE.MeshBasicMaterial({map: uranusTexture});

          uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
          scene.add(uranus);
          uranus.position.x = 45;
        });
  };

  const createNeptuneMesh = () => {
    const textureLoader = new THREE.TextureLoader();
        const neptuneTexture = textureLoader.load(textureNeptune, () => {
          const neptuneGeometry = new THREE.SphereGeometry(0.354, 32, 32);
          const neptuneMaterial = new THREE.MeshBasicMaterial({map: neptuneTexture});

          neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
          scene.add(neptune);
          neptune.position.x = 50;
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
*
{
  margin: 0;
  padding: 0;
}

.renderer-container {
image-rendering: crisp-edges;
}
</style>
