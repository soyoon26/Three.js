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
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xff8b94), //0xff8b94, '#시작','색이름'
    //transparent: true,
    //opacity: 0.5, transparent가 flase면 영향x
    //visible: flase,
    //wireframe: true, 뼈대 확인
    //side: THREE.DoubleSide 양면은 컴퓨터 리소스가 더 많이 필요
  }); //MeshBasicMaterial은 조명에 W영향받지 않음

  //material.color = new THREE.Color(0xff8b94) 로도 가능

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // camera.position.z=5
  camera.position.set(3, 4, 5); //앞방향으로 이동
  camera.lookAt(cube.position);
  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1); //조명의 색과 강도

  directionalLight.position.set(-1, 2, 3);

  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

  ambientLight.position.set(3, 2, 1);
  scene.add(ambientLight);

  renderer.render(scene, camera);

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight; //이렇게 바꾸면
    camera.updateProjectionMatrix(); //를 반드시 호출해야 함
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera); //새롭게 반영되도록
  }
  window.addEventListener("resize", handleResize);
  //카메라의 종횡비도 다시 설정해야 함
}
