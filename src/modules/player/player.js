import * as BABYLON from "babylonjs";

class Player {
    constructor(game, config) {
        this._game = game;
        this._model = BABYLON.Mesh.CreateSphere(config.name, 16, 1, this._game.scene);
        this._model.position.x = config.position.x;
        this._model.position.y = config.position.y;
    }

    move() {
    }
}

export default Player;