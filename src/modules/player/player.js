import * as BABYLON from "babylonjs";

import * as CONSTANTS from './constants';

class Player {
    constructor(game, config) {
        this._game = game;
        this._config = config;

        this.model = BABYLON.Mesh.CreateSphere(config.name, 16, 1, this._game.scene);
        this.model.position.z = config.position.z || 0;
        this.model.position.x = config.position.x || 0;
        this.model.position.y = config.position.y || 0;

        this._attachMove();
    }

    _attachMove() {
        window.addEventListener('keypress', (event) => {
            const direction = this._config.controls[event.keyCode];
            this._move(direction);
        });
    }

    _move(direction) {
        switch (direction) {
            case CONSTANTS.UP:
                this.model.position.z = this.model.position.z + 1;
                break;
            case CONSTANTS.DOWN:
                this.model.position.z = this.model.position.z - 1;
                break;
            case CONSTANTS.LEFT:
                this.model.position.x = this.model.position.x - 1;
                break;
            case CONSTANTS.RIGHT:
                this.model.position.x = this.model.position.x + 1;
                break;
        }
    }
}

export default Player;