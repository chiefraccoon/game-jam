import * as BABYLON from "babylonjs";

export function vecToLocal(vector, mesh){
    let m = mesh.getWorldMatrix();
    let v = BABYLON.Vector3.TransformCoordinates(vector, m);
    return v;
}

export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
