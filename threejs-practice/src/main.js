import * as THREE from "three";

// 1. 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101820);
scene.add(new THREE.AxesHelper(5));

// 2. 创建透视相机
/**
 * 相机配置对象，包含视野角度、宽高比、近裁剪面和远裁剪面
 * @property {number} fov - 视野角度 越大视野越宽，越小视野越窄 取值一般在 1-179 之间，单位为度
 * @property {number} aspect - 宽高比，通常为画布的宽度除以高度
 * @property {number} near - 近裁剪面，距离相机最近的可见距离
 * @property {number} far - 远裁剪面，距离相机最远的可见距离
 */
const camera_config = {
  fov: 75, // 视野角度 角度怎么理解，
  aspect: window.innerWidth / window.innerHeight, // 宽高比
  near: 0.1, // 近裁剪面
  far: 1000, // 远裁剪面
};
const camera = new THREE.PerspectiveCamera(
  camera_config.fov,
  camera_config.aspect,
  camera_config.near,
  camera_config.far,
);

camera.position.set(6, 5, 8); // 设置相机位置，使其能够看到立方体
camera.lookAt(0, 0, 0); // 让相机始终朝向原点，即立方体的位置

// 3. 创建 WEBGL 渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 开启抗锯齿
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = "0";
document.body.appendChild(renderer.domElement);

// 4. 创建立方体
const geometry = new THREE.BoxGeometry(2, 2, 2); // 创建一个边长为 2 的立方体几何体
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
}); // 开启线框模式
const cube = new THREE.Mesh(geometry, material); // 创建立方体网格
scene.add(cube);

// 5. 动画循环
function animate(time) {
  cube.rotation.x = time * 0.0005;
  cube.rotation.y = time * 0.001;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// 6. 处理窗口大小变化
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 更新相机投影矩阵以适应新的宽高比

  renderer.setSize(window.innerWidth, window.innerHeight);
});
