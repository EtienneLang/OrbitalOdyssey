export const rayonSoleilRender = 1;
export const rayonSoleilIrl = 696340;

export const INFORMATIONSPLANETESIRL = {
	sun: { rayonIrl: 696340, distanceIrl: 0, rotationHeure: 609.12 },
	mercury: { rayonIrl: 2439.7, distanceIrl: 57910000, rotationHeure: 1407.6 },
	venus: { rayonIrl: 6051.8, distanceIrl: 108200000, rotationHeure: -5832.5 },
	earth: { rayonIrl: 6371, distanceIrl: 149600000, rotationHeure: 24 },
	mars: { rayonIrl: 3389.5, distanceIrl: 227900000, rotationHeure: 24.6 },
	jupiter: { rayonIrl: 69911, distanceIrl: 778500000, rotationHeure: 9.9 },
	saturn: { rayonIrl: 58232, distanceIrl: 1433000000, rotationHeure: 10.7 },
	uranus: { rayonIrl: 25362, distanceIrl: 2877000000, rotationHeure: -17.2 },
	neptune: { rayonIrl: 24622, distanceIrl: 4503000000, rotationHeure: 16.1 },
};

export const INFORMATIONSPLANETESRENDER = {
	sun: { rayonRender: rayonSoleilRender, distanceRender: 0 },

	mercury: {
		rayonRender: CalculerRayonRender(
			INFORMATIONSPLANETESIRL.mercury.rayonIrl
		),
		distanceRender: CalculerDistanceRender(
			INFORMATIONSPLANETESIRL.mercury.distanceIrl
		),
	},
	venus: {
		rayonRender: CalculerRayonRender(
			INFORMATIONSPLANETESIRL.venus.rayonIrl
		),
		distanceRender: CalculerDistanceRender(
			INFORMATIONSPLANETESIRL.venus.distanceIrl
		),
	},
	earth: {
		rayonRender: CalculerRayonRender(
			INFORMATIONSPLANETESIRL.earth.rayonIrl
		),
		distanceRender: CalculerDistanceRender(
			INFORMATIONSPLANETESIRL.earth.distanceIrl
		),
	},
	mars: {
		rayonRender: CalculerRayonRender(INFORMATIONSPLANETESIRL.mars.rayonIrl),
		distanceRender: CalculerDistanceRender(
			INFORMATIONSPLANETESIRL.mars.distanceIrl
		),
	},
	jupiter: {
		rayonRender: CalculerRayonRender(
			INFORMATIONSPLANETESIRL.jupiter.rayonIrl
		),
		distanceRender: CalculerDistanceRender(
			INFORMATIONSPLANETESIRL.jupiter.distanceIrl
		),
	},
	saturn: {
		rayonRender: CalculerRayonRender(
			INFORMATIONSPLANETESIRL.saturn.rayonIrl
		),
		distanceRender: CalculerDistanceRender(
			INFORMATIONSPLANETESIRL.saturn.distanceIrl
		),
	},
	uranus: {
		rayonRender: CalculerRayonRender(
			INFORMATIONSPLANETESIRL.uranus.rayonIrl
		),
		distanceRender: CalculerDistanceRender(
			INFORMATIONSPLANETESIRL.uranus.distanceIrl
		),
	},
	neptune: {
		rayonRender: CalculerRayonRender(
			INFORMATIONSPLANETESIRL.neptune.rayonIrl
		),
		distanceRender: CalculerDistanceRender(
			INFORMATIONSPLANETESIRL.neptune.distanceIrl
		),
	},
};


