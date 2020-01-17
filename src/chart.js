let THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

let camera = new THREE.PerspectiveCamera(75, 700 / 500, 0.1, 2000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

let renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize($('#chart-container').width(), $('#chart-container').height());
let chart = document.getElementById('chart-container');
chart.appendChild(renderer.domElement);

// --------------------
let img = new Image();
img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sHDgwCEMBJZu0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAABM5JREFUWMO1V0tPG2cUPZ4Hxh6DazIOrjFNqJs0FIMqWFgWQkatsmvVbtggKlSVRVf5AWz4AWz4AUSKEChll19QJYSXkECuhFxsHjEhxCYm+DWGMZ5HF72DJq4bAzFXurI0M/I5997v3u9cC65vTJVn2lX/xHINQOYSBLTLEuIuCWw4Z3IGAEvf6ASmVHjNzHCXBG4A0AjACsAOwEbO0nsFQBnAGYASAIl+ZRMR7SolMEdsByD09fV5R0ZGgg8ePPjW5/N1iqLYpuu6RZblciKR2I9Go69evnwZnZ+fjwI4IS8AKBIRzeQfJWCANwKwh0KhtrGxsYehUOin1tbW+zzP23ietzY2NnIAoGmaLsuyUiqVyvl8XtrY2NiamZn589mzZxsAUgCOAeQAnFI2tI+VxIjaAeDzoaGh7xYWFuZOTk6OZVk+12uYqqq6JEnn0Wg0OT4+/geAXwGEAdwDIFJQXC1wO4DWR48e/RCPxxclSSroVzRFUbSDg4P848ePFwH8DuAhkWih83TRQWxFOXgAwvDwcOfo6OhvXV1d39tsNtuVBwTDWBwOh1UUxVsMw1hXVlbSdCgNV43uYSvrHg6H24aHh38eHBz85TrgF9FYLHA4HLzH43FvbW2d7u/vG+dANp8FpqIlbd3d3V8Fg8EfBUFw4BONZVmL3+9vHhkZCQL4AoAHgJPK8G+yzC0XDofdoVAo5PP5vkadTBAEtr+/39ff3x8gAp/RPOEqx2qjx+NpvXv3bk9DQ0NDvQgwDIOWlhZrMBj8kgi0UJdxRgYMArzL5XJ7vd57qLPZ7Xamp6fnNgBXtQxcjFuHw+Hyer3t9SYgCAITCAScAJoBNNEY/08GOFVVrfVMv7kMNDntFD1vjIAPrlRN0xjckOm6biFQ3jwNPwDMZrOnqVTqfb3Bi8Wivru7W/VCYkwPlKOjo0IikXh7EwQikYgE4Nw0CfXKDCipVCoTj8df3QABbW1tLUc6oUgkFPMkVACUNjc337148eKvw8PDbJ2jP1taWkoCyNDVXDSECmNSK4qiKNLq6urW8+fPI/UicHx8rD59+jSVy+WOAKSJhKENwFItLtoxk8mwsixzHR0dHe3t7c5PAU+n09rs7OzJkydPYqVSaQfANoDXALIk31S2smU1TWMPDg7K5XKZ7+3t9TudTut1U7+wsFCcmJiIpdPpbQBxADsAknQWymYCOukBHYCuKApisdhpMpnURFEU79y503TVyKenpzOTk5M7e3t7MQKPV0Zv1gNm+awB0MvlshqLxfLb29uyJElWURSbXC4XXyvqxcXFs6mpqeTc3Nzu3t7e3wQcA7BPZ8Cov1pNlJplmQtAG8MwHV6v95tAINA5MDBwPxAIuLu6upr8fr/VAN3c3JQjkcjZ+vp6fnl5+d2bN29SuVzuNYAEpf01CdRChUL+X1VskHACuA3Ay3Fcu9vt7nA6nZ7m5uYWQRCaNE3jVVW15PP580KhIGUymWw2m00DOAJwSP4WwPtq4LX2Ao6USxNlQyS/RcQcdLGwlNIz6vEMAaZpNzCk2Pll94LK/cDYimxERiBwG10sxjgvEZBE0UpE6vxj+0Ct5bTaXthgEhRmja8QWNkkPGsuIpfdjpkK+cZUWTC0KredVmtD/gdlSl6EG4AMvQAAAABJRU5ErkJggg==';

// -------------------

// let sprite = new THREE.TextureLoader().load(img.src);
// let pointMaterial = new THREE.PointsMaterial({
//     size: 10,
//     sizeAttenuation: false,
//     map: sprite,
//     wireframe: true,
//     alphaTest: 0.5,
//     transparent: true,
//     vertexColors: THREE.VertexColors
// });

// function addPoints(points, colors) {
//     let geometry = new THREE.Geometry();
//     for (let i = 0; i < points.length; i++) {
//         geometry.vertices.push(points[i]);
//         geometry.colors.push(new THREE.Color(colors ? colors[i] : 'yellow'));
//     }
//     let pointCloud = new THREE.Points(geometry, pointMaterial);
//     scene.add(pointCloud);
//     return pointCloud;
// }

// function setPointColor(pointCloud, num, color) {
//     pointCloud.geometry.colors[num] = new THREE.Color(color);
//     pointCloud.geometry.colorsNeedUpdate = true;
// }

// --------------------

function drawLine(from, to, color) {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(from);
    geometry.vertices.push(to);
    let material = new THREE.LineBasicMaterial({
        color: color
    });
    scene.add(new THREE.Line(geometry, material));
}

// -------------------------

// function removeFromScene(i) {
//     let len = scene.children.length - 1;
//     for (len; len >= i; len--) {
//         scene.remove(scene.children[len]);
//     }
// }

// -------------------------


drawLine(new THREE.Vector3(-700, 0, 0), new THREE.Vector3(700, 0, 0), 0xc6c6c6);
drawLine(new THREE.Vector3(0, -500, 0), new THREE.Vector3(0, 500, 0), 0xc6c6c6);
drawLine(new THREE.Vector3(0, 0, -700), new THREE.Vector3(0, 0, 700), 0xc6c6c6);

let controls = new OrbitControls(camera, chart);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.update();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();