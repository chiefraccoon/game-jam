import * as BABYLON from "babylonjs";

import { vecToLocal } from '../utils';
import * as CONSTANTS from './constants';

const {BULLET_SPEED} = CONSTANTS

class Player {
    constructor(game, config) {
        this._game = game;
        this._config = config;

        this.model = BABYLON.Mesh.CreateSphere(config.name, 16, 1, this._game.scene);
        this.model.physicsImpostor = new BABYLON.PhysicsImpostor(this.model, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, this._game.scene);

        this.model.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        this.model.ellipsoidOffset = new BABYLON.Vector3(0, 0, 0);
        this.model.checkCollisions = true;

        this.model.position.z = config.position.z || 0;
        this.model.position.x = config.position.x || 0;
        this.model.position.y = config.position.y || 0;
        this.model.firesTimes = 0;
        this.model.scaling.x = 2;
        //this.model.rotation = new BABYLON.Vector3(0, 1, 0);

        this._attachMove();

        this.temp();
    }

    temp(){
        window.addEventListener("keydown",  (e) => {
            // Press space key to fire
            if (e.keyCode === 32) {
                this.shoot();
            }
        });
        const origin = this.model.position;
        let target = BABYLON.Mesh.CreateSphere('target', 1,2,  this._game.scene);
        target.position.x = origin.x+15;
        target.position.y = origin.y;
    }

    _attachMove() {
        window.addEventListener('keypress', (event) => {
            const direction = this._config.controls[event.keyCode];
            this._move(direction);
        });
    }

    _move(direction) {
        const speedCharacter = 0.1;

        switch (direction) {
            case CONSTANTS.UP:
                this.model.moveWithCollisions(new BABYLON.Vector3(0, 0, 1 * speedCharacter));
                break;
            case CONSTANTS.DOWN:
                this.model.moveWithCollisions(new BABYLON.Vector3(0, 0, -1 * speedCharacter));
                break;
            case CONSTANTS.LEFT:
                this.model.moveWithCollisions(new BABYLON.Vector3(-1 * speedCharacter, 0, 0));
                break;
            case CONSTANTS.RIGHT:
                this.model.moveWithCollisions(new BABYLON.Vector3(1 * speedCharacter, 0, 0));
                break;
        }
    }

    shoot(){
        const origin = this.model.position;
        let bullet = BABYLON.Mesh.CreateSphere('bullet'+this.model.firesTimes, 1, 0.1,  this._game.scene);
        let animationBox = new BABYLON.Animation("bulletAnim", "position", 200, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
        let keys = [];

        bullet.position.x = origin.x ;
        bullet.position.y = origin.y;
        bullet.animations = [];

        keys.push({
            frame: 0,
            value: this.model.absolutePosition.clone()
        });
        keys.push({
            frame: 100,
            value: this.model.absolutePosition.add(vecToLocal(new BABYLON.Vector3(BULLET_SPEED, 0,0), this.model))
        });
        animationBox.setKeys(keys);
        bullet.animations.push(animationBox);

        this._game.scene.beginAnimation(bullet, 0, 30 , true);

        this.model.firesTimes++;
    }
}

export default Player;