import {
	INFORMATIONSPLANETESIRL,
	rayonSoleilRender,
	rayonSoleilIrl,
} from "../assets/Constantes.js";
import * as THREE from "three";
import textureSun from "../assets/textures/sun_texture.jpg";
class Planete {
	constructor(nom, rayonIrl, distanceIrl, rotationEnHeure) {
		this.nom = nom;
		this.rayonIrl = rayonIrl;
		this.distanceIrl = distanceIrl;
		this.rayonRender = this.CalculerRayonRender(rayonIrl);
		this.distanceRender = this.CalculerDistanceRender(distanceIrl);
		this.mesh = null;
		this.vitesseRotation = 360 / (this.vitesseRotation * 3600);
		this.angleRotation = 0; // Angle de rotation actuel en degrés
		this.texture = new URL(`/src/assets/textures/${nom}_texture.jpg`, import.meta.url).href
    }

	/**
	 * Calculer le rayon de la planète en fonction du rayon du soleil
	 * @param rayonPlanete Vrai rayon de la planète en KM
	 * @returns {number} Rayon de la planète à l'échelle pour le rendu
	 */
	CalculerRayonRender(rayonPlaneteIrl) {
		return (rayonPlaneteIrl * rayonSoleilRender) / rayonSoleilIrl;
	}

	/**
	 * Calculer la distance de la planète en fonction de la distance
	 * @param distancePlaneteIrl Vraie distance de la planète en KM
	 * @returns {number} Distance de la planète à l'échelle pour le rendu
	 */
	CalculerDistanceRender(distancePlaneteIrl) {
        console.log(distancePlaneteIrl)
		return (distancePlaneteIrl * rayonSoleilRender) / rayonSoleilIrl;
	}

	/**
	 * Créer la planète dans la scène
	 * @param scene Scène dans laquelle ajouter la planète
	 */
	CreatePlanetMesh(scene) {
		const textureLoader = new THREE.TextureLoader();
		const texture = textureLoader.load(this.texture, () => {
			const geometry = new THREE.SphereGeometry(this.rayonRender, 32, 32);
			const material = new THREE.MeshBasicMaterial({map: texture});

			let object = new THREE.Mesh(geometry, material);
			this.mesh = object;
			scene.add(object);
			object.position.x = this.distanceRender;
		});
	}

}

export default Planete;