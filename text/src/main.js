import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
//import typface from "three/examples/fonts/";
//제공은 한글은 깨지는 경우가 많다.
import typeface from "./assets/fonts/CookieRun Bold_Regular.json";
//자바스크립트에서 불러온 걸 three.js가 이해하기
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

  camera.position.z = 5;
  /**Font */
  const fontLoader = new FontLoader();
  // fontLoader.load(
  //   "./assets/fonts/CookieRun Bold_Regular.json",
  //   (font) => {
  //     console.log("load", font);
  //   },
  //   (event) => {
  //     console.log("progress", event);
  //   },
  //   (error) => {
  //     console.log("error", error);
  //   }
  // );
  const font = fontLoader.parse(typeface);

  render();
  function render() {
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  window.addEventListener("resize", handleResize);
}
