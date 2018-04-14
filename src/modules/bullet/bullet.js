import * as BABYLON from "babylonjs";

import { CONSTANTS } from '../player';

class Bullet {
    constructor(game) {
        this._game = game;
        this.model = game.MPlayerBullet;
        this.model.setEnabled(false);
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