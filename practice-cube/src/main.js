import * as THREE from "three";
//three 설치하고 불러오기

window.addEventListener("load", function () {
  init();
});
//load가 되면 init실행

function init() {
  const renderer = new THREE.WebGLRenderer({
    //웹 브라우저에서 하드웨어 가속 그래픽을 사용하여 3D 그래픽을 효율적으로 렌더링할 수 있게 해주는 웹 그래픽스 API
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  //domElement: HTML 요소, <canvas> 엘리먼트
  //renderer.domElement를 <body>에 추가
  //WebGLRenderer에서 만든 캔버스를 바디에 추가한다는 뜻
  const scene = new THREE.Scene(); //new는 새 객체를 생성한다는 뜻
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight, //비율
    1, //가까운 투영평면
    500
  );

  const geometry = new THREE.BoxGeometry(2, 2, 2); //박스생성코드
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xff8b94),
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.set(3, 4, 5);
  camera.lookAt(cube.position);
  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1);
  directionalLight.position.set(-1, 2, 3);
  scene.add(directionalLight);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  ambientLight.position.set(3, 2, 1);
  scene.add(ambientLight);
  renderer.render(scene, camera);

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  window.addEventListener("resize", handleResize);
  //resize가 감지되면 handleResize라는 콜백함수 실행
}
