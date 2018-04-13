import * as BABYLON from "babylonjs";

import Bullet from '../bullet';
import * as CONSTANTS from './constants';

class Player {
    constructor(game, config) {
        this._bullets = [];
        this._direction = null;
        this._game = game;
        this._config = config;

        this.bullet = new Bullet(this._game);
        this.model = BABYLON.Mesh.CreateBox(config.name, 0.5, this._game.scene);

        this.model.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        this.model.ellipsoidOffset = new BABYLON.Vector3(0, 0, 0);
        this.model.checkCollisions = true;

        this.model.position.z = config.position.z || 0;
        this.model.position.x = config.position.x || 0;
        this.model.position.y = config.position.y || 0;
        this.model.firesTimes = 0;
        this.model.scaling.x = 2;

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
            this._direction = this._config.controls[event.keyCode];
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