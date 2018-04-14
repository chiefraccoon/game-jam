import * as BABYLON from "babylonjs";

import { CONSTANTS } from '../player';

class Bullet {
    constructor(game) {
        this._game = game;
        this.model = BABYLON.Mesh.CreateSphere('bullet', 3, 1, this._game.scene);
    }

    getDirectionVector(direction) {
        switch (direction) {
            case CONSTANTS.UP:
                return new BABYLON.Vector3(0, 0, 1);
            case CONSTANTS.DOWN:
                return new BABYLON.Vector3(0, 0, -1);
            case CONSTANTS.LEFT:
                return new BABYLON.Vector3(-1, 0, 0);
            case CONSTANTS.RIGHT:
                return new BABYLON.Vector3(1, 0, 0);
        }
    }
}

export default Bullet;