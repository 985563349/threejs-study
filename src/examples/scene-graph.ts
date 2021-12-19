import {
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from 'three';

function main() {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  const app = document.getElementById('app');
  app?.appendChild(renderer.domElement);

  const fov = 40;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 150, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  const scene = new Scene();

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new PointLight(color, intensity);
    scene.add(light);
  }

  // 要更新旋转角度的对象数组
  const objects: Object3D[] = [];

  // 一球多用
  const radius = 1;
  const widthSegments = 6;
  const heightSegments = 6;
  const sphereGeometry = new SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );

  const solarSystem = new Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  const sunMaterial = new MeshPhongMaterial({ emissive: 0xffff00 });
  const sunMesh = new Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
  solarSystem.add(sunMesh);
  objects.push(sunMesh);

  const earthOrbit = new Object3D();
  earthOrbit.position.x = 10;
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);

  const earthMaterial = new MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
  });
  const earthMesh = new Mesh(sphereGeometry, earthMaterial);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);

  const moonOrbit = new Object3D();
  moonOrbit.position.x = 2;
  earthOrbit.add(moonOrbit);

  const moonMaterial = new MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  });
  const moonMesh = new Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.set(0.5, 0.5, 0.5);
  moonOrbit.add(moonMesh);
  objects.push(moonMesh);

  function animate(time: number) {
    time *= 0.001;
    objects.forEach((obj) => {
      obj.rotation.y = time;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

main();
