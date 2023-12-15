import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffb6c1);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry01 = new THREE.BoxGeometry(1, 1, 1);
const material01 = new THREE.MeshStandardMaterial({
  color: 0x8b5f65,
});
const obj01 = new THREE.Mesh(geometry01, material01);
obj01.position.x = -1.5;
scene.add(obj01);

const geometry02 = new THREE.ConeGeometry(0.4, 0.7, 6);
const material02 = new THREE.MeshStandardMaterial({
  color: 0x8b5f65,
});
const obj02 = new THREE.Mesh(geometry02, material02);
scene.add(obj02);

const geometry03 = new THREE.IcosahedronGeometry(0.4, 0);
const material03 = new THREE.MeshStandardMaterial({
  color: 0x8b5f65,
});
const obj03 = new THREE.Mesh(geometry03, material03);
obj03.position.x = 1.5;
scene.add(obj03);

// const geometry04 = new THREE.BoxGeometry(1, 1, 1);
// const material04 = new THREE.MeshStandardMaterial({
//   color: 0x8b5f65,
// });
// const obj04 = new THREE.Mesh(geometry04, material04);
// scene.add(obj04);

function render(time) {
  time *= 0.0005;

  obj01.rotation.y = time;
  obj02.rotation.y = time;
  obj03.rotation.y = time;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight; // 없으면 도형도 같이 줄어듦
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
