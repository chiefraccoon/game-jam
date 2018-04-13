import * as BABYLON from "babylonjs";

import Bullet from '../bullet';
import * as CONSTANTS from './constants';

class Player {
    constructor({game,  mesh, controls, position}) {
        this._bullets = [];
        this._direction = null;
        this._game = game;
        this.controls = controls;

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
                bullet.moveWithCollisions(new BABYLON.Vector3(bullet.position.x * 0.07, 0, 0))
            );
        });
    }

    _attachShoot() {
        window.addEventListener("keydown", (event) => {
            if (event.keyCode === 32) this._shoot();
        });
    }

    _attachMove() {
        window.addEventListener('keydown', (event) => {
            this._direction = this.controls[event.keyCode];
        });
        window.addEventListener('keyup', () => {
            this._direction = null;
        });
    }

    _move() {
        const speedCharacter = 0.07;

        switch (this._direction) {
            case CONSTANTS.UP:
                this.model.moveWithCollisions(new BABYLON.Vector3(0, 0, 1 * speedCharacter));
                this.model.rotationQuaternion = new BABYLON.Quaternion.RotationAxis( new BABYLON.Vector3(0, 1, 0), (Math.PI+Math.PI/2)  );
                break;
            case CONSTANTS.DOWN:
                this.model.moveWithCollisions(new BABYLON.Vector3(0, 0, -1 * speedCharacter));
                this.model.rotationQuaternion = new BABYLON.Quaternion.RotationAxis( new BABYLON.Vector3(0, 1, 0), Math.PI / 2 );
                break;
            case CONSTANTS.LEFT:
                this.model.moveWithCollisions(new BABYLON.Vector3(-1 * speedCharacter, 0, 0));
                this.model.rotationQuaternion = new BABYLON.Quaternion.RotationAxis( new BABYLON.Vector3(0, 1, 0), Math.PI );
                break;
            case CONSTANTS.RIGHT:
                this.model.moveWithCollisions(new BABYLON.Vector3(1 * speedCharacter, 0, 0));
                this.model.rotationQuaternion = new BABYLON.Quaternion.RotationAxis( new BABYLON.Vector3(0, 1, 0), 2*Math.PI  );
                break;
        }
    }

    _shoot() {
        let bullet = this.bullet.model.clone('bullet' + this.model.firesTimes);
        bullet.position.z = this.model.position.z || 0;
        bullet.position.x = this.model.position.x + 2 || 0;
        bullet.position.y = this.model.position.y || 0;
        bullet.checkCollisions = true;

        bullet.onCollide = (event) => {
            setTimeout(() => {
                bullet.dispose();
                if (this._game.enemies[event.name]) {
                    this._game.enemies[event.name].setDamage(55);
                }
            }, 0);
        };

        this._bullets.push(bullet);
        this.model.firesTimes++;
    }
}

export default Player;