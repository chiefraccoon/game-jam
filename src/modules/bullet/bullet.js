class Bullet {
    constructor(game) {
        this._game = game;
        this.model = BABYLON.Mesh.CreateSphere('bullet', 3, 1, this._game.scene);
    }
}

export default Bullet;