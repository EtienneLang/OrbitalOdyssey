const rayonSoleilRender = 1;
const rayonSoleilIrl = 696340;

export const INFORMATIONSPLANETESIRL = {
    "sun" : { "rayonIrl" : 696340, "distanceIrl" : 0},
    "mercury" : { "rayonIrl" : 2439.7, "distanceIrl" : 57910000},
    "venus" : { "rayonIrl" : 6051.8, "distanceIrl" : 108200000},
    "earth" : { "rayonIrl" : 6371, "distanceIrl" : 149600000},
    "mars" : { "rayonIrl" : 3389.5, "distanceIrl" : 227900000},
    "jupiter" : { "rayonIrl" : 69911, "distanceIrl" : 778500000},
    "saturn" : { "rayonIrl" : 58232, "distanceIrl" : 1433000000},
    "uranus" : { "rayonIrl" : 25362, "distanceIrl" : 2877000000},
    "neptune" : { "rayonIrl" : 24622, "distanceIrl" : 4503000000},
}

export const INFORMATIONSPLANETESRENDER = {
    "sun" : { "rayonRender" : rayonSoleilRender, "distanceRender" : 0},
    "mercury" : { "rayonRender" : CalculerRayonRender(INFORMATIONSPLANETESIRL.mercury.rayonIrl), "distanceRender" : 8},
    "venus" : { "rayonRender" : CalculerRayonRender(INFORMATIONSPLANETESIRL.venus.rayonIrl), "distanceRender" : 1553},
    "earth" : { "rayonRender" : CalculerRayonRender(INFORMATIONSPLANETESIRL.earth.rayonIrl), "distanceRender" : 2148},
    "mars" : { "rayonRender" : CalculerRayonRender(INFORMATIONSPLANETESIRL.mars.rayonIrl), "distanceRender" : 3272},
    "jupiter" : { "rayonRender" : CalculerRayonRender(INFORMATIONSPLANETESIRL.jupiter.rayonIrl), "distanceRender" : 11182},
    "saturn" : { "rayonRender" : CalculerRayonRender(INFORMATIONSPLANETESIRL.saturn.rayonIrl), "distanceRender" : 20528},
    "uranus" : { "rayonRender" : CalculerRayonRender(INFORMATIONSPLANETESIRL.uranus.rayonIrl), "distanceRender" : 41232},
    "neptune" : { "rayonRender" : CalculerRayonRender(INFORMATIONSPLANETESIRL.neptune.rayonIrl), "distanceRender" : 64600},
}

/**
 * Calculer le rayon de la planète en fonction du rayon du soleil
 * @param rayonPlanete Vrai rayon de la planète en KM
 * @returns {number} Rayon de la planète à l'échelle pour le rendu
 */
function CalculerRayonRender(rayonPlanete) {
    return (rayonPlanete * rayonSoleilRender) / rayonSoleilIrl;
}

/**
 * Calculer la distance de la planète en fonction de la distance
 * @param distancePlaneteIrl Vraie distance de la planète en KM
 * @returns {number} Distance de la planète à l'échelle pour le rendu
 */
function CalculerDistanceRender(distancePlaneteIrl) {
    return (distancePlaneteIrl * rayonSoleilRender) / rayonSoleilIrl;
}