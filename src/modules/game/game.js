import * as BABYLON from "babylonjs";
import * as _ from 'lodash';

import Player, { CONSTANTS } from '../player';
import Enemy from '../enemy';
import Camera from '../camera';

class Game {
    constructor() {
        this.canvas = document.getElementById('render-canvas');
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.level = null;
        this.scene = null;
        this.camera = null;
        this.player_1_Mesh = null;
        this.player_2_Mesh = null;
        this.players = {};
        this.enemies = [];

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

        this._initScene();
    }

    _initScene() {
        // This creates a basic Babylon Scene object (non-mesh)
        this.scene = new BABYLON.Scene(this.engine);
        // this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
        this.scene.collisionsEnabled = true;

        this.ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 100, this.scene);
        this.ground.position.y = 0.5;
        this.ground.isVisible = false;
        this.ground.checkCollisions = true;

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this.scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        BABYLON.SceneLoader.ImportMesh("", "./models/", "stage1.babylon", this.scene, (newMeshes) => {
            // Set the target of the camera to the first imported mesh
            this.player_1_Mesh = _.find(newMeshes, function (mesh) {
                return mesh.name === 'PLAYER1'
            });
            this.player_2_Mesh = _.find(newMeshes, function (mesh) {
                return mesh.name === 'PLAYER2'
            });

            this.enemies = _.reduce(newMeshes, function(result, item){
                if(/ROBOT/.test(item.name)){
                    result.push(item)
                }
                return result;
            }, []);

            this.level = newMeshes[0];


            this.scene.executeWhenReady(() => {
                this._initGame();
                this.engine.runRenderLoop(() => {
                    this.scene.render();
                });
            });
        });
    }

    _initGame() {
        // debug layer
        // this.scene.debugLayer.show();

        this.players.player_1 = new Player({
            game: this,
            mesh: this.player_1_Mesh,
            controls: {
                32: CONSTANTS.SHOOT, // space
                87: CONSTANTS.UP, // w
                83: CONSTANTS.DOWN, // s
                65: CONSTANTS.LEFT, // a
                68: CONSTANTS.RIGHT // d
            },
            position: {
                x: 0,
                y: 2,
                z: 2
            }
        });

        //remove 2nd tank
        this.player_2_Mesh.dispose();


        _.map(this.enemies, enemy =>{
            new Enemy({game: this, mesh: enemy});
        });

        this.camera = new Camera(
            this,
            {
                camera: {
                    radius: 50,
                    heightOffset: 50,
                    rotationOffset: 180,
                    cameraAcceleration: 0.01,
                    maxCameraSpeed: 20,
                },
                maxDistanceBetweenPlayers: 50
            }
        );
    }
}

export default Game;