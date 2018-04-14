import * as BABYLON from "babylonjs";

import Bullet from "../bullet";
import {getRandomArbitrary} from '../utils';

class Enemy {
    constructor({game, mesh}) {
        this._game = game;
        this._damage = 25;
        this._bullets = [];
        this._healPoints = 100;
        this._shootTimeout = null;
        this._firesTimes = 0;

        this.bullet = new Bullet(this._game);
        this.model = mesh;
        this.model.checkCollisions = true;
/*
        this._game.scene.registerBeforeRender(() => {
            this._bullets.map(bullet =>
                bullet.moveWithCollisions(new BABYLON.Vector3(bullet.position.x * 0.07, 0, 0))
            );
        });

        this._shootCycle();*/
    }

    _shootCycle() {
        this._shootTimeout = setTimeout(() => {
            this._shoot();
            this._shootCycle();
        }, getRandomArbitrary(500, 1500));
    }

    setDamage(damage) {
        this._healPoints = this._healPoints - damage;
        if (this._healPoints < 0) {
            window.clearTimeout(this._shootTimeout);
            this.model.dispose();
        }
    }

    _shoot() {
        let bullet = this.bullet.model.clone('enemy_bullet_' + this._firesTimes);
        bullet.position.z = this.model.position.z || 0;
        bullet.position.x = this.model.position.x + 2 || 0;
        bullet.position.y = this.model.position.y || 0;
        bullet.checkCollisions = true;

        bullet.onCollide = (event) => {
            setTimeout(() => {
                bullet.dispose();
                if (this._game.players[event.name]) {
                    this._game.players[event.name].setDamage(this._damage);
                }
            }, 0);
        };

        this._bullets.push(bullet);
        this._firesTimes++;
    }
}

export default Enemy;