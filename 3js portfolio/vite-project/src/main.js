import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 20;

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xFF6347,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);

scene.add(pointLight, ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
function addStar(){
  const geometry=new THREE.SphereGeometry(0.25,24,24);
  const material=new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);
  const[x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(()=>addStar());
const spaceTexture=new THREE.TextureLoader().load('space.jpg');
const hridayeshtexture=new THREE.TextureLoader().load('hridayesh.jpeg');
const hridayesh=new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:hridayeshtexture})
);
const moontexture=new THREE.TextureLoader().load('moon.jpg');
const normalTexture=new THREE.TextureLoader().load('normal.jpg')
const moon=new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshStandardMaterial({
     map: moontexture,
     normalMap:normalTexture
  })
);
moon.position.z=30;
moon.position.setX(-10);
scene.add(moon);
scene.add(hridayesh);
scene.background=spaceTexture;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;

  controls.update();
  renderer.render(scene, camera);
}
function moveCamera(){
const t=document.body.getBoundingClientRect().top;
moon.rotation.x+=0.05;
moon.rotation.x+=0.05;
moon.rotation.x+=0.05;
hridayesh.rotation.y+=0.01;
hridayesh.rotation.y+=0.01;
hridayesh.rotation.y+=0.01;
camera.position.z=t* -0.01;
camera.position.z=t* -0.01;
camera.position.z=t* -0.01;
}
document.body.onscroll=moveCamera

animate();
