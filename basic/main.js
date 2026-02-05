import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Geometry
const geometry = new THREE.BoxGeometry();

// Material
const material = new THREE.MeshLambertMaterial({
  color: 'black',
  emissive: 'pink'
});

// Mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Light
const light = new THREE.DirectionalLight(0x9cdbA5, 1);
light.position.set(1, 1, 1);
scene.add(light);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
function animate(){
    requestAnimationFrame(animate);
    cube.rotation.x+=0.01;
    cube.rotation.y+=0.01;
    renderer.render(scene, camera);
}
// Render

animate();