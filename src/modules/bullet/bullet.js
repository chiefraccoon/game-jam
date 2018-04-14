import * as BABYLON from "babylonjs";

import { CONSTANTS } from '../player';

class Bullet {
    constructor(game) {
        this._game = game;
        this.model = BABYLON.Mesh.CreateSphere('bullet', 3, 1, this._game.scene);
    }

    getDirectionVector(direction, coeff) {
        switch (direction) {
            case CONSTANTS.UP:
                return new BABYLON.Vector3(0, 0, 1 * coeff);
            case CONSTANTS.DOWN:
                return new BABYLON.Vector3(0, 0, -1 * coeff);
            case CONSTANTS.LEFT:
                return new BABYLON.Vector3(-1 * coeff, 0, 0);
            case CONSTANTS.RIGHT:
                return new BABYLON.Vector3(1 * coeff, 0, 0);
        }
    }

    getDirectionString(forwardObject) {
        if (forwardObject.x > 0) {
            return CONSTANTS.UP;
        } else if (forwardObject.x < 0) {
            return CONSTANTS.DOWN;
        } else if (forwardObject.z === 1) {
            return CONSTANTS.LEFT;
        } else if (forwardObject.z === -1) {
            return CONSTANTS.RIGHT;
        }
    }
}

export default Bullet;