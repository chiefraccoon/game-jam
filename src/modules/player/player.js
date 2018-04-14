import * as BABYLON from "babylonjs";

import Bullet from '../bullet';
import * as CONSTANTS from './constants';

class Player {
    constructor({game, mesh, controls, position}) {
        this._damage = 25;
        this._firesTimes = 0;
        this._healPoints = 100;
        this._bullets = [];
        this._lastDirection = null;
        this._currentDirection = null;

        this._game = game;
        this._controls = controls;

        this.bullet = new Bullet(this._game);
        this.model = mesh;
        this.model.position.x = position.x;
        this.model.position.y = position.y;
        this.model.position.z = position.z;
        this.model.checkCollisions = true;

        this._attachMove();
        this._attachShoot();

        this._game.scene.registerBeforeRender(() => {
            this._move();
            this._bullets.map(bullet =>
                bullet.moveWithCollisions(bullet.directionVector)
            );
        });
    }

    _attachShoot() {
        window.addEventListener("keydown", (event) => {
            if (this._controls[event.keyCode] === CONSTANTS.SHOOT) this._shoot();
        });
    }

    _attachMove() {
        window.addEventListener('keydown', (event) => {
            this._currentDirection = this._controls[event.keyCode];
        });
        window.addEventListener('keyup', () => {
            this._currentDirection = null;
        });
    }

    _move() {
        const speedCharacter = 0.07;

        switch (this._currentDirection) {
            case CONSTANTS.UP:
                this.model.moveWithCollisions(new BABYLON.Vector3(0, 0, 1 * speedCharacter));
                this.model.rotationQuaternion = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), (Math.PI + Math.PI / 2));
                this._lastDirection = CONSTANTS.UP;
                break;
            case CONSTANTS.DOWN:
                this.model.moveWithCollisions(new BABYLON.Vector3(0, 0, -1 * speedCharacter));
                this.model.rotationQuaternion = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), Math.PI / 2);
                this._lastDirection = CONSTANTS.DOWN;
                break;
            case CONSTANTS.LEFT:
                this.model.moveWithCollisions(new BABYLON.Vector3(-1 * speedCharacter, 0, 0));
                this.model.rotationQuaternion = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), Math.PI);
                this._lastDirection = CONSTANTS.LEFT;
                break;
            case CONSTANTS.RIGHT:
                this.model.moveWithCollisions(new BABYLON.Vector3(1 * speedCharacter, 0, 0));
                this.model.rotationQuaternion = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), 2 * Math.PI);
                this._lastDirection = CONSTANTS.RIGHT;
                break;
        }
    }

    setDamage(damage) {
        this._healPoints = this._healPoints - damage;
        if (this._healPoints < 0) {
            this.model.dispose();
        }
    }

    _shoot() {
        let bullet = this.bullet.model.clone('bullet_' + this._firesTimes);

        bullet.position.z = this.model.position.z;
        bullet.position.x = this.model.position.x;
        bullet.position.y = this.model.position.y;

        bullet.directionVector = this.bullet.getDirectionVector(this._lastDirection);

        bullet.onCollide = (event) => {
            setTimeout(() => {
                bullet.dispose();
                if (this._game.enemies[event.name]) {
                    this._game.enemies[event.name].setDamage(this._damage);
                }
            }, 0);
        };

        this._bullets.push(bullet);
        this._firesTimes++;
    }
}

export default Player;