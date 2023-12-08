import * as THREE from "three";
//three 설치하고 불러오기

window.addEventListener("load", function () {
  init();
});
//load가 되면 init실행

function init() {
  const renderer = new THREE.WebGLRenderer({
    //alpha: true, //까만 배경으로 뜨지 않게 하려면
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

  renderer.render(scene, camera);
}
