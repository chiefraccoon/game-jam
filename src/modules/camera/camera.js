import * as BABYLON from "babylonjs";

class Camera {
    constructor(game, config) {
        this._game = game;
        this._config = config;

        const initialCenterBetweenPlayers = this._getVectorCenterBetweenPlayers();

        this._abstractMeshBetweenPlayers = this._initAbstractMeshBetweenPlayers(initialCenterBetweenPlayers);
        this._camera = this._initCamera(initialCenterBetweenPlayers);

        this._game.scene.registerBeforeRender(() => {
            const distanceBetweenPlayers = this._getVectorDistanceBetweenPlayers();

            if (distanceBetweenPlayers > this._config.maxDistanceBetweenPlayers) {
                this._camera.radius = distanceBetweenPlayers + this._config.maxDistanceBetweenPlayers;
            } else if (distanceBetweenPlayers < this._config.maxDistanceBetweenPlayers) {
                this._camera.radius = this._config.camera.radius;
            }

            this._abstractMeshBetweenPlayers.setAbsolutePosition(this._getVectorCenterBetweenPlayers());
        });
    }

    _initCamera(initialVectorBetweenPlayers) {
        const _camera = new BABYLON.FollowCamera("camera1", new BABYLON.Vector3(initialVectorBetweenPlayers.x, initialVectorBetweenPlayers.y, -10), this._game.scene);
        _camera.radius = this._config.camera.radius; // how far from the object to follow
        _camera.heightOffset = this._config.camera.heightOffset; // how high above the object to place the camera
        _camera.rotationOffset = this._config.camera.rotationOffset; // the viewing angle
        _camera.cameraAcceleration = this._config.camera.cameraAcceleration; // how fast to move
        _camera.maxCameraSpeed = this._config.camera.maxCameraSpeed; // speed limit

        this._game.scene.activeCamera = _camera; // remember to notify your scene about a new active camera

        _camera.target = this._abstractMeshBetweenPlayers;
        _camera.lockedTarget = this._abstractMeshBetweenPlayers;

        _camera.attachControl(this._game.canvas, true);

        return _camera;
    }

    _initAbstractMeshBetweenPlayers(initialVectorBetweenPlayers) {
        const _abstractMeshBetweenPlayers = new BABYLON.AbstractMesh('players_camera', this._game.scene);
        _abstractMeshBetweenPlayers.setAbsolutePosition(initialVectorBetweenPlayers);
        return _abstractMeshBetweenPlayers;
    }

    _getVectorCenterBetweenPlayers() {
        return BABYLON.Vector3.Center(this._game.players.player_1.model.position, this._game.players.player_1.model.position);
    }

    _getVectorDistanceBetweenPlayers() {
        return BABYLON.Vector3.Distance(this._game.players.player_1.model.position, this._game.players.player_1.model.position);

    }
}

export default Camera;