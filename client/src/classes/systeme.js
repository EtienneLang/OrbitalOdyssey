class Systeme {
    constructor() {
        this.planetes = [];
        this.etoile;
    }

    addPlanet(planet) {
        this.planetes.push(planet);
    }

    setEtoile(etoile) {
        this.etoile = etoile;
    }
}
export default Systeme;