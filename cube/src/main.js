import * as THREE from "three";
//three 설치하고 불러오기
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//빌트인 주변으로 회전하거나 줌인하도록 해줌
window.addEventListener("load", function () {
  init();
});
//load가 되면 init실행

function init() {
  const renderer = new THREE.WebGLRenderer({
    //웹 브라우저에서 하드웨어 가속 그래픽을 사용하여 3D 그래픽을 효율적으로 렌더링할 수 있게 해주는 웹 그래픽스 API
    //alpha: true, //까만 배경으로 뜨지 않게 하려면
    antialias: true, //모서리가 까끌하지 않게
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  //캔버스 사이즈 조절
  document.body.appendChild(renderer.domElement); //캔버스 요소
  //domElement: HTML 요소, <canvas> 엘리먼트
  //renderer.domElement를 <body>에 추가
  //WebGLRenderer에서 만든 캔버스를 바디에 추가한다는 뜻
  const scene = new THREE.Scene(); //씬 추가

  const camera = new THREE.PerspectiveCamera( //new는 새 객체를 생성한다는 뜻
    75, //field of view = 시야각
    window.innerWidth / window.innerHeight, //카메라의 종횡비
    1, //near 가까운 투영평면
    500 //far
  ); //카메라 추가

  const controls = new OrbitControls(camera, renderer.domElement);
  //카메라 위치가 변경됨, 움직일 html요소
  controls.autoRotate = true; //설정하면 업데이트 해야 함
  //const axesHelper = new THREE.AxesHelper(5);
  //scene.add(axesHelper);
  //controls.autoRotateSpeed = 30;
  controls.enableDamping = true; //관성 설정
  //controls.dampingFactor = 0.01; //더 오래 유지함
  controls.enableZoom = true; //기본값, 무한대로 가능
  controls.enablePan = true; //우클릭 기본값임

  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = Math.PI / 3;
  //수평은 minAzimuthAncgle
  //얼마나 돌릴 수 있는지 보는 각도 제한
  //controls.maxDistance = 50;
  //controls.minDistance = 10; zoom

  //const geometry = new THREE.BoxGeometry(2, 2, 2); //높이, 넓이, 길이
  const cubeGeometry = new THREE.IcosahedronGeometry(1); //반지름 길이
  //radius, detail
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color(0xff8b94), //0xff8b94, '#시작','색이름'
    emissive: 0x111111, // 빛 방출
    //transparent: true,
    //opacity: 0.5, transparent가 flase면 영향x
    //visible: flase,
    //wireframe: true, 뼈대 확인
    //side: THREE.DoubleSide 양면은 컴퓨터 리소스가 더 많이 필요
  }); //MeshBasicMaterial은 조명에 W영향받지 않음

  //material.color = new THREE.Color(0xff8b94) 로도 가능
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  const skeletonGeometry = new THREE.IcosahedronGeometry(2); //반지름 길이
  const skeletonMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: 0xff5675,
  });
  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial);
  scene.add(cube, skeleton);
  //scene.add(skeleton);

  camera.position.z = 5;
  //camera.position.set(3, 4, 5); //앞방향으로 이동
  //camera.lookAt(cube.position);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); //조명의 색과 강도

  //directionalLight.position.set(-1, 2, 3);

  scene.add(directionalLight);

  //const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

  //ambientLight.position.set(3, 2, 1);
  //scene.add(ambientLight);
  const clock = new THREE.Clock();
  render();
  function render() {
    //const elapsedTime = clock.getElapsedTime();
    //cube.rotation.x = THREE.MathUtils.degToRad(45); 라디안으로 적용됨
    //cube.rotation.x = elapsedTime;
    //cube.rotation.y = elapsedTime; 경과한 전체시간
    //cube.rotation.x += clock.getDelta(); 한 프레임에서 다른 프레임으로 넘어갈때까지 걸리는 시간
    //= clock.getElapsedTime();
    //Date.now() / 1000;
    //빌트인으로 제공하는 클락을 사용해도 됨

    //skeleton.rotation.x = elapsedTime * 1.5;
    //skeleton.rotation.y = elapsedTime * 1.5;

    //cube.position.y = Math.sin(cube.rotation.x); //1에서 -1사이
    //cube.scale.x = Math.cos(cube.rotation.x);
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render); //재귀적 사용
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight; //이렇게 바꾸면
    camera.updateProjectionMatrix(); //를 반드시 호출해야 함
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera); //새롭게 반영되도록
    controls.update();
  }
  window.addEventListener("resize", handleResize);
  //카메라의 종횡비도 다시 설정해야 함
  //resize가 감지되면 handleResize라는 콜백함수 실행
}
