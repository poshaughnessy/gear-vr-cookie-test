/**
 * Based on the WebVR Boilerplate example by Boris Smus.
 */

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene.
var scene = new THREE.Scene();

// Create a three.js camera.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

// Apply VR headset positional data to camera.
var controls = new THREE.VRControls(camera);
controls.standing = true;

// Apply VR stereo rendering to renderer.
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

var fontLoader = new THREE.FontLoader();

var font = null;

// Create a VR manager helper to enter and exit VR mode.
var params = {
  hideButton: false, // Default: false.
  isUndistorted: false // Default: false.
};

var manager = new WebVRManager(renderer, effect, params);

// Create 3D objects.
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);

// Position cube mesh to be right in front of you.
cube.position.set(0, controls.userHeight, -2);

// Add cube mesh to your three.js scene
scene.add(cube);

// Start the animation
requestAnimationFrame(animate);

window.addEventListener('resize', onResize, true);
window.addEventListener('vrdisplaypresentchange', onResize, true);

// Request animation frame loop function
var lastRender = 0;

function animate(timestamp) {
  var delta = Math.min(timestamp - lastRender, 500);
  lastRender = timestamp;
  // Apply rotation to cube mesh
  cube.rotation.y += delta * 0.0006;
  // Update VR headset position and apply to camera.
  controls.update();
  // Render the scene through the manager.
  manager.render(scene, camera, timestamp);
  requestAnimationFrame(animate);
}

function onResize(e) {
  effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

var display;

// Get the HMD, and if we're dealing with something that specifies
// stageParameters, rearrange the scene.
function setupStage() {
  navigator.getVRDisplays().then(function(displays) {
    if (displays.length > 0) {
      display = displays[0];
      if (display.stageParameters) {
        setStageDimensions(display.stageParameters);
      }
    }
  });
}

function setStageDimensions(stage) {
  // Make the skybox fit the stage.
  var material = skybox.material;
  scene.remove(skybox);
  // Size the skybox according to the size of the actual stage.
  var geometry = new THREE.BoxGeometry(stage.sizeX, boxSize, stage.sizeZ);
  skybox = new THREE.Mesh(geometry, material);
  // Place it on the floor.
  skybox.position.y = boxSize/2;
  scene.add(skybox);
  // Place the cube in the middle of the scene, at user height.
  cube.position.set(0, controls.userHeight, 0);
}

function loadFont(callback) {
  fontLoader.load( 'fonts/helvetiker_regular.typeface.json', function ( _font ) {
    font = _font;
    callback();
  });
}

function addText(text) {

  if (!font) {
    // Need to load the font first
    loadFont(function() { addText(text) });
    return;
  }

  var geometry = new THREE.TextGeometry( text, {
    font: font,
    size: 1,
    height: 0.1,
    curveSegments: 2
  });

  geometry.computeBoundingBox();

  var centerOffset = -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

  var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

  var mesh = new THREE.Mesh( geometry, material );

  mesh.position.x = centerOffset;
  mesh.position.y = controls.userHeight - 5;
  mesh.position.z = -10;

  mesh.rotation.x = 0;
  mesh.rotation.y = Math.PI * 2;

  scene.add( mesh );

}

// A somewhat hacky way to provide a hook in, to add text to the scene
window.DemoScene = {
  setMessage: function(text) {
    addText(text);    
  }
};