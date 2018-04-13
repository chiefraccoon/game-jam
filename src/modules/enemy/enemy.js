import * as BABYLON from "babylonjs";

class Enemy {
    constructor(game, config) {
        this._game = game;
        this.model = BABYLON.Mesh.CreateSphere(config.name, 1, 2, this._game.scene);
        this.model.position.x = config.position.x;
        this.model.position.y = config.position.y;
    }
}

export default Enemy;