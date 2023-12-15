import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

window.addEventListener("load", function () {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight, //비율
    1,
    500
  );

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = Math.PI / 3;

  const cubeGeometry = new THREE.IcosahedronGeometry(1);
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color(0xff8b94),
    emissive: 0x111111,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  const skeletonGeometry = new THREE.IcosahedronGeometry(2);
  const skeletonMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: 0xff5675,
  });
  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial);

  scene.add(cube, skeleton);
  camera.position.z = 5;

  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1);

  scene.add(directionalLight);

  const clock = new THREE.Clock();
  render();
  function render() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    controls.update();
  }
  window.addEventListener("resize", handleResize);
}
