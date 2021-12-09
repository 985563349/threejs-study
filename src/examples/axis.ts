import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  AxesHelper,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const app = document.getElementById('app');
app?.appendChild(renderer.domElement);

const scene = new Scene();

const fov = 105;
const aspect = window.innerWidth / window.innerHeight;
const near = 1;
const far = 1000;
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(4, 4, 10);

// 添加辅助轴线
const axis = new AxesHelper(6);
scene.add(axis);

// 添加几何体
const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: '#f40' });
const mesh = new Mesh(geometry, material);
mesh.position.set(3, 3, 3);
scene.add(mesh);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
