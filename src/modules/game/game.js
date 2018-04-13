import * as BABYLON from "babylonjs";

import Player from '../player';

class Game {
    constructor() {
        this.canvas = document.getElementById('render-canvas');
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.scene = null;

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

        this._initScene();

        this.scene.executeWhenReady(() => {

            this._initGame();

            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        });
    }

    _initScene() {
        // This creates a basic Babylon Scene object (non-mesh)
        this.scene = new BABYLON.Scene(this.engine);

        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), this.scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(this.canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this.scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        BABYLON.SceneLoader.ImportMesh("", "./models/", "stage1.babylon", this.scene, function (newMeshes) {
            // Set the target of the camera to the first imported mesh
            camera.target = newMeshes[0];
        });
    }

    _initGame() {
        // this.scene.debugLayer.show({popup: true});
        const player_1 = new Player(this, {name: 'player_1', position: {x: 1, y: 1}});
        const player_2 = new Player(this, {name: 'player_2', position: {x: 3, y: 3}});
    }
}

export default Game;