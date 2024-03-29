import * as THREE from 'three';
import {renderEnvironment} from "../environment.js";
import sound1 from '/src/sounds/forest/forest-wind-and-birds-6881.mp3';
import sound2 from '/src/sounds/forest/mystic-forest-ambient-23812.mp3';


let renderer = undefined;
let soundObjects = undefined;
let scene = undefined

export function renderForestEnvironment() {
    scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    const renderingData = {renderer: renderer, camera: camera, scene: scene}
    
    const forestEnvironmentData = [
        {
            soundPath: sound1, 
            replayDelay: 0,
            x: 2,
            y: 0,
            z: 0
        },
        {
            soundPath: sound2, 
            replayDelay: 0,
            x: 0,
            y: 2,
            z: 0
        }
    ]

    soundObjects = renderEnvironment(renderingData, forestEnvironmentData);

    document.body.appendChild( renderer.domElement );
}

export function removeForestEnvironment() {
    if(soundObjects !== undefined) {
        soundObjects.forEach(element => {      
            element.sound.stop()
            scene.remove(element.mesh)
            clearTimeout(element.timer)
        });
    }
    if(renderer !== undefined) {
        document.body.removeChild( renderer.domElement );
        renderer.dispose()
        renderer = undefined;
    }
}