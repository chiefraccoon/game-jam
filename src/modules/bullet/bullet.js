import * as BABYLON from "babylonjs";

import { CONSTANTS } from '../player';

class Bullet {
    constructor(game, enemy ) {
        this._game = game;
        this.model = enemy ?  game.MEnemyBullet : game.MPlayerBullet;

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
        } else {
            return CONSTANTS.UP;
        }
    }

    getRotationAxis(direction) {
        switch (direction) {
            case CONSTANTS.UP:
                return  new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), (Math.PI + Math.PI / 2));
            case CONSTANTS.DOWN:
                return new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), Math.PI / 2);
            case CONSTANTS.LEFT:
                return new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), Math.PI);
            case CONSTANTS.RIGHT:
                return new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), 2 * Math.PI);
        }
    }
}

export default Bullet;