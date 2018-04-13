import * as BABYLON from "babylonjs";

class Enemy {
    constructor(game, config) {
        this._game = game;
        this._healPoints = 100;

        this.model = BABYLON.Mesh.CreateSphere(config.name, 1, 2, this._game.scene);
        this.model.position.x = config.position.x;
        this.model.position.y = config.position.y;
        this.model.checkCollisions = true;
    }

    setDamage(damage) {
        this._healPoints = this._healPoints - damage;
        if (this._healPoints < 0) {
            this.model.dispose();
        }
    }
}

export default Enemy;