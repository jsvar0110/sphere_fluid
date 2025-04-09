import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

// Vertex shader


// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  100);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true,
  alpha:true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// Create icosahedron geometry
const sphereSize = window.innerWidth < 768 ? 1.3 : 2;
const geometry = new THREE.IcosahedronGeometry(sphereSize, 50, 50);

// Create shader material
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  wireframe:false,

  uniforms:{
    uTime:{
      value:0,
    },
    uColorChange:{
      value:0,
    },
  },
});

// Create mesh and add to scene
const sphere = new THREE.Mesh(geometry, material);
sphere.position.y = -2.4
scene.add(sphere);

// Set camera position
camera.position.z = 3;

// Add orbit controls


// Handle window resize
window.addEventListener('resize', () => {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


var tl = gsap.timeline({
  scrollTrigger:{
    trigger:".landing",
    start:"top top",
    end:"bottom center",
    scrub:2,
  },
});

tl.to(sphere.position,{
  y:0,
  z:-2,
  ease:"power2.inOut",
},"a").to(material.uniforms.uColorChange,{
  value:1,
  ease:"power2.inOut",
},"a")
.to(".landing h1",{
  opacity:0,
},"a")
.to(".landing p",{
  opacity:1,
},);
// Animation loop
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  
  // Update uniforms
  material.uniforms.uTime.value = clock.getElapsedTime();
  
  // Update controls
  
  // Render
  renderer.render(scene, camera);
  
  // Call animate again on the next frame
  requestAnimationFrame(animate);
}

animate();
