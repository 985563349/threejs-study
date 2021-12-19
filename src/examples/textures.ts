import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const app = document.getElementById('app');
app?.appendChild(renderer.domElement);

const scene = new Scene();

const fov = 100;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 20);

// 添加几何体
const geometry = new BoxGeometry(5, 5, 5);

const cubes = [];
const loader = new TextureLoader();

// 纹理
// const material = new MeshBasicMaterial({
//   map: loader.load(
//     'https://threejs.org/manual/examples/resources/images/wall.jpg'
//   ),
// });

// 多纹理（并非所有几何体都支持多纹理，BoxGeometry可以使用6种纹理）
const materials = [
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-1.jpg'
    ),
  }),
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-2.jpg'
    ),
  }),
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-3.jpg'
    ),
  }),
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-4.jpg'
    ),
  }),
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-5.jpg'
    ),
  }),
  new MeshBasicMaterial({
    map: loader.load(
      'https://threejs.org/manual/examples/resources/images/flower-6.jpg'
    ),
  }),
];
const cube = new Mesh(geometry, materials);
scene.add(cube);
cubes.push(cube);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
