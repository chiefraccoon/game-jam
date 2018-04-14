import Bullet from "../bullet";
import { getRandomArbitrary } from '../utils';

class Enemy {
    constructor({game, mesh}) {
        this._game = game;
        this._damage = 25;
        this._bullets = [];
        this._healPoints = 100;
        this._shootTimeout = null;
        this._firesTimes = 0;

        this.bullet = new Bullet(this._game, true);
        this.model = mesh;
        this.model.checkCollisions = true;

        this._game.scene.registerBeforeRender(() => {
            this._bullets.map(bullet =>
                bullet.moveWithCollisions(bullet.directionVector)
            );
        });

        this._shootCycle();
    }

    _shootCycle() {
        this._shootTimeout = setTimeout(() => {
            this._shoot();
            this._shootCycle();
        }, getRandomArbitrary(500, 2500));
    }

    setDamage(damage) {
        console.log('setDamage', this.model.name);
        this._healPoints = this._healPoints - damage;
        if (this._healPoints < 0) {
            window.clearTimeout(this._shootTimeout);
            this.model.dispose();
        }
    }

    _shoot() {
        let bullet = this.bullet.model.clone('enemy_bullet_' + this._firesTimes);

        bullet.position.z = this.model.position.z;
        bullet.position.x = this.model.position.x;
        bullet.position.y = this.model.position.y + 1;

        const direction = this.bullet.getDirectionString(this.model.forward);
        bullet.directionVector = this.bullet.getDirectionVector(direction, 0.5);
        bullet.rotationQuaternion = this.bullet.getRotationAxis(direction);

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

        setTimeout(() => {
            bullet.dispose()
        }, 500);
    }
}

export default Enemy;