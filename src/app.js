import './style.scss'
const THREE = require('three')
import Tone from 'tone'
const CANNON = require('cannon')
import './debug.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()

const light = new THREE.DirectionalLight( 0xffffff )
light.position.set( 40, 25, 10 )
light.castShadow = true
scene.add(light)

//console.log(scene.scene)

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )



const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 3000 )
camera.position.z = 30
const controls = new OrbitControls( camera, renderer.domElement )
const timeStep = 1/60
const world = new CANNON.World()
world.gravity.set(0,-20,0)
world.broadphase = new CANNON.NaiveBroadphase()
world.solver.iterations = 10




var update = function() {






  updatePhysics()
  if(cannonDebugRenderer){
    //cannonDebugRenderer.update()
  }
}
const cannonDebugRenderer = new THREE.CannonDebugRenderer( scene, world )
function animate() {

  update()
  /* render scene and camera */
  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}
function updatePhysics() {
  // Step the physics world
  world.step(timeStep)

  // for(var j=0; j<balls.length; j++){
  //   ballMeshes[j].position.copy(balls[j].position)
  //   ballMeshes[j].quaternion.copy(balls[j].quaternion)
  // }
}


requestAnimationFrame(animate)
