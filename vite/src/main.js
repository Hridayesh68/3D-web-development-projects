import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/* Canvas */
const canvas = document.getElementById('canvas');

/* 1. Scene */
const scene = new THREE.Scene();
scene.background = new THREE.Color('pink');

/* 2. Camera */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

/* 3. Dodecahedron Geometry + Mesh */
const dodecaGeometry = new THREE.DodecahedronGeometry(1);
const dodecaMaterial = new THREE.MeshLambertMaterial({ color: 'violet' ,emissive:'grey'});
const dodecahedron = new THREE.Mesh(dodecaGeometry, dodecaMaterial);

/* 👉 make dodecahedron vertical (above the box) */
dodecahedron.position.y = 1.5;
scene.add(dodecahedron);

/* 4. Box Geometry + Mesh */
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshLambertMaterial({ color: 'blue' });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

/* box stays below */
box.position.y = -1.5;
scene.add(box);

/* 5. Light */
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 3, 4);
scene.add(light);

/* Ambient light */
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

/* 6. Renderer */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

/* 8. Resize handling */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
//9.add orbital controls
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.enableZoom = true;
controls.enablePan = true;


/* 7. Animation loop */
function animate() {
  requestAnimationFrame(animate);

  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.01;
controls.update();
  box.rotation.y -= 0.01;

  renderer.render(scene, camera);
}

animate();