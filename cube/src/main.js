import * as THREE from "three";
//three 설치하고 불러오기

window.addEventListener("load", function () {
  init();
});
//load가 되면 init실행

function init() {
  const renderer = new THREE.WebGLRenderer({
    //alpha: true, //까만 배경으로 뜨지 않게 하려면
    antialias: true, //모서리가 까끌하지 않게
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  //캔버스 사이즈 조절
  document.body.appendChild(renderer.domElement); //캔버스 요소

  const scene = new THREE.Scene(); //씬 추가

  const camera = new THREE.PerspectiveCamera(
    75, //field of view = 시야각
    window.innerWidth / window.innerHeight, //카메라의 종횡비
    1, //near
    500 //far
  ); //카메라 추가

  const geometry = new THREE.BoxGeometry(2, 2, 2); //높이, 넓이, 길이
  const material = new THREE.MeshBasicMaterial({ color: 0xff8b94 });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // camera.position.z=5
  camera.position.set(3, 4, 5); //앞방향으로 이동
  camera.lookAt(cube.position);

  renderer.render(scene, camera);
}
