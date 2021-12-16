import {
  BoxGeometry,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
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
const near = 1;
const far = 1000;
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(8, 8, 8);

// 添加网格辅助线
const gridHelper = new GridHelper(10, 10);
scene.add(gridHelper);

// 添加几何体
const geometry = new BoxGeometry(4, 4, 4);
const material = new MeshBasicMaterial({ color: '#f40' });
const mesh = new Mesh(geometry, material);
scene.add(mesh);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
