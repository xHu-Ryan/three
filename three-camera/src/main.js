import * as THREE from "three";

// 1. 创建场景
// 场景用于存放所有的物体、光源和相机，是整个三维世界的容器
const scene = new THREE.Scene(); // 创建场景
scene.background = new THREE.Color(0x101820); // 设置场景背景色
scene.add(new THREE.AxesHelper(5)); // 添加坐标轴辅助器 x 轴红色，y 轴绿色，z 轴蓝色

// 2. 创建透视相机
// 透视相机模拟人眼的视觉效果，物体离相机越远看起来越小
const camera = new THREE.PerspectiveCamera(
  75, // 视野角度
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近裁剪面
  1000, // 远裁剪面
);
camera.position.set(6, 5, 8); // 设置相机位置
camera.lookAt(0, 0, 0); // 让相机始终朝向原点

// 3. 创建 WEBGL 渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 开启抗锯齿
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = "0";
document.body.appendChild(renderer.domElement);

// 4. 创建立方体
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5); // 创建一个边长为 2 的立方体几何体
const nearCube = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial()); // 创建立方体网格
nearCube.position.set(-1.4, 0, 0);
const farCube = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
farCube.position.set(1.4, 0, -3);
scene.add(nearCube, farCube);

renderer.render(scene, camera);

// 5. 显示相机参数
const info = document.createElement("div");
info.style.cssText = `position:fixed;top:16px;left:16px;color:white;font:14px monospace;line-height:1.8`;
document.body.appendChild(info);

function updateInfo() {
  info.textContent = `FOV: ${camera.fov}° | Camera Z: ${camera.position.z} | Aspect: ${camera.aspect}`;
}
updateInfo();

// 6. 处理窗口大小变化
window.addEventListener("keydown", (e) => {
  if (e.key === "+" || e.key === "=") {
    camera.fov = Math.max(20, camera.fov - 5);
  }
  if (e.key === "-") {
    camera.fov = Math.min(110, camera.fov + 5);
  }
  if (e.key === "ArrowUp") {
    camera.position.z = Math.max(3, camera.position.z - 0.5);
  }
  if (e.key === "ArrowDown") {
    camera.position.z = Math.min(15, camera.position.z + 0.5);
  }

  camera.updateProjectionMatrix();
  updateInfo();
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
