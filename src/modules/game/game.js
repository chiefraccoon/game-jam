import * as BABYLON from "babylonjs";

import Player, { CONSTANTS } from '../player';
import Camera from '../camera';

class Game {
    constructor() {
        this.canvas = document.getElementById('render-canvas');
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.level = null;
        this.scene = null;
        this.camera = null;
        this.players = {};

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
        this.scene.enablePhysics();


        this.ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 100, this.scene);
        this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, this.scene);
        this.ground.isVisible = false;
        this.ground.checkCollisions = true;

        // const gravityVector = new BABYLON.Vector3(0,-9.81, 0);
        // const physicsPlugin = new BABYLON.CannonJSPlugin();
        this.scene.collisionsEnabled = true;

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this.scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        BABYLON.SceneLoader.ImportMesh("", "./models/", "stage1.babylon", this.scene, function (newMeshes) {
            // Set the target of the camera to the first imported mesh
            this.level = newMeshes[0];
        });
    }

    _initGame() {
        // debug layer
        // this.scene.debugLayer.show();

        this.players.player_1 = new Player(
            this,
            {
                name: 'player_1',
                position: {
                    // x: this.level.position.x,
                    x: -1,
                    y: 2,
                    z: 0
                },
                controls: {
                    119: CONSTANTS.UP, // w
                    115: CONSTANTS.DOWN, // s
                    97: CONSTANTS.LEFT, // a
                    100: CONSTANTS.RIGHT // d
                }
            }
        );

        this.players.player_2 = new Player(
            this,
            {
                name: 'player_2',
                position: {
                    // x: -275.6614,
                    x: 1,
                    y: 2,
                    z: 0
                },
                controls: {
                    56: CONSTANTS.UP, // 8
                    53: CONSTANTS.DOWN, // 5
                    52: CONSTANTS.LEFT, // 4
                    54: CONSTANTS.RIGHT // 6
                }
            }
        );

        this.camera = new Camera(
            this,
            {
                camera: {
                    radius: 20,
                    heightOffset: 20,
                    rotationOffset: 180,
                    cameraAcceleration: 0.01,
                    maxCameraSpeed: 20,
                },
                maxDistanceBetweenPlayers: 20
            }
        );
    }
}

export default Game;