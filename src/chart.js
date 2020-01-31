var webglDetect = require('webgl-detect');
let THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

import { vertexes, clusters, initKmeans, runKmeans } from './kmeans';
import { updateImage } from './index';

let scene;
let camera;
let renderer;
let $chartContainer;
let chart;
let pointsCloud;
let img;
let controls;
let disableChart;
let animationReq;
let sprite;
let pointMaterial;

// -------------------

function newMaterial(args = {}) {
    return new THREE.PointsMaterial({
        size: 10,
        sizeAttenuation: false,
        map: sprite,
        alphaTest: 0.5,
        transparent: true,
        ...args
    });
}

// ------------------------------------------------------

export function addPoints(points, colors) {
    if (!webglDetect)
        return;

    let geometry = new THREE.Geometry();
    for (let i = 0; i < points.length; i++) {
        geometry.vertices.push(points[i]);
        geometry.colors.push(new THREE.Color(colors ? colors[i] : 'white'));
    }
    let pointCloud = new THREE.Points(geometry, pointMaterial);
    scene.add(pointCloud);
    return pointCloud;
}

export function setPointColor(pointCloud, num, color) {
    pointCloud.geometry.colors[num] = new THREE.Color(color);
}

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

export function removeFromScene(i) {
    if (!webglDetect)
        return;

    let len = scene.children.length - 1;
    for (len; len >= i; len--) {
        scene.remove(scene.children[len]);
    }
}

// -------------------------

function initialize3D() {
    removeFromScene(3);
    // add data
    let colors = vertexes.map(a => a.color);
    pointsCloud = addPoints(vertexes.map(a => a.pos), colors);
    // add clusters
    colors = clusters.map(a => a.color);
    addPoints(clusters.map(a => a.pos), colors);
}

export function initChart(imageData) {
    initKmeans(imageData);
    initialize3D();
}

function draw() {
    if (!webglDetect)
        return;

    removeFromScene(4);
    let colors = clusters.map(a => a.color);
    addPoints(clusters.map(a => a.pos), colors);
    for (let i = 0; i < vertexes.length; i++) {
        setPointColor(pointsCloud, i, clusters[vertexes[i].cluster].color);
    }
    updateImage(vertexes);
    pointsCloud.geometry.colorsNeedUpdate = true;
}

export function run() {
    runKmeans(draw);
}

export function animate() {
    animationReq = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

export function CancelAnimation() {
    cancelAnimationFrame(animationReq);
}

// -------------------------

$(window).on('resize load', function () {
    if (!webglDetect)
        return;

    renderer.setSize($chartContainer.width(), $chartContainer.width() * .625);
    camera.updateProjectionMatrix();
});

if (webglDetect) {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(75, 800 / 500, 0.1, 2000);
    camera.position.set(200, 200, 200);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    $chartContainer = $('#chart-container');
    renderer.setSize($chartContainer.width(), $chartContainer.width() * .625);
    chart = $chartContainer[0];
    chart.appendChild(renderer.domElement);

    // --------------------
    img = new Image();
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sHDgwCEMBJZu0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAABM5JREFUWMO1V0tPG2cUPZ4Hxh6DazIOrjFNqJs0FIMqWFgWQkatsmvVbtggKlSVRVf5AWz4AWz4AUSKEChll19QJYSXkECuhFxsHjEhxCYm+DWGMZ5HF72DJq4bAzFXurI0M/I5997v3u9cC65vTJVn2lX/xHINQOYSBLTLEuIuCWw4Z3IGAEvf6ASmVHjNzHCXBG4A0AjACsAOwEbO0nsFQBnAGYASAIl+ZRMR7SolMEdsByD09fV5R0ZGgg8ePPjW5/N1iqLYpuu6RZblciKR2I9Go69evnwZnZ+fjwI4IS8AKBIRzeQfJWCANwKwh0KhtrGxsYehUOin1tbW+zzP23ietzY2NnIAoGmaLsuyUiqVyvl8XtrY2NiamZn589mzZxsAUgCOAeQAnFI2tI+VxIjaAeDzoaGh7xYWFuZOTk6OZVk+12uYqqq6JEnn0Wg0OT4+/geAXwGEAdwDIFJQXC1wO4DWR48e/RCPxxclSSroVzRFUbSDg4P848ePFwH8DuAhkWih83TRQWxFOXgAwvDwcOfo6OhvXV1d39tsNtuVBwTDWBwOh1UUxVsMw1hXVlbSdCgNV43uYSvrHg6H24aHh38eHBz85TrgF9FYLHA4HLzH43FvbW2d7u/vG+dANp8FpqIlbd3d3V8Fg8EfBUFw4BONZVmL3+9vHhkZCQL4AoAHgJPK8G+yzC0XDofdoVAo5PP5vkadTBAEtr+/39ff3x8gAp/RPOEqx2qjx+NpvXv3bk9DQ0NDvQgwDIOWlhZrMBj8kgi0UJdxRgYMArzL5XJ7vd57qLPZ7Xamp6fnNgBXtQxcjFuHw+Hyer3t9SYgCAITCAScAJoBNNEY/08GOFVVrfVMv7kMNDntFD1vjIAPrlRN0xjckOm6biFQ3jwNPwDMZrOnqVTqfb3Bi8Wivru7W/VCYkwPlKOjo0IikXh7EwQikYgE4Nw0CfXKDCipVCoTj8df3QABbW1tLUc6oUgkFPMkVACUNjc337148eKvw8PDbJ2jP1taWkoCyNDVXDSECmNSK4qiKNLq6urW8+fPI/UicHx8rD59+jSVy+WOAKSJhKENwFItLtoxk8mwsixzHR0dHe3t7c5PAU+n09rs7OzJkydPYqVSaQfANoDXALIk31S2smU1TWMPDg7K5XKZ7+3t9TudTut1U7+wsFCcmJiIpdPpbQBxADsAknQWymYCOukBHYCuKApisdhpMpnURFEU79y503TVyKenpzOTk5M7e3t7MQKPV0Zv1gNm+awB0MvlshqLxfLb29uyJElWURSbXC4XXyvqxcXFs6mpqeTc3Nzu3t7e3wQcA7BPZ8Cov1pNlJplmQtAG8MwHV6v95tAINA5MDBwPxAIuLu6upr8fr/VAN3c3JQjkcjZ+vp6fnl5+d2bN29SuVzuNYAEpf01CdRChUL+X1VskHACuA3Ay3Fcu9vt7nA6nZ7m5uYWQRCaNE3jVVW15PP580KhIGUymWw2m00DOAJwSP4WwPtq4LX2Ao6USxNlQyS/RcQcdLGwlNIz6vEMAaZpNzCk2Pll94LK/cDYimxERiBwG10sxjgvEZBE0UpE6vxj+0Ct5bTaXthgEhRmja8QWNkkPGsuIpfdjpkK+cZUWTC0KredVmtD/gdlSl6EG4AMvQAAAABJRU5ErkJggg==';

    sprite = new THREE.TextureLoader().load(img.src);
    pointMaterial = newMaterial({ vertexColors: THREE.VertexColors });

    drawLine(new THREE.Vector3(-700, 0, 0), new THREE.Vector3(700, 0, 0), 0xc6c6c6);
    drawLine(new THREE.Vector3(0, -500, 0), new THREE.Vector3(0, 500, 0), 0xc6c6c6);
    drawLine(new THREE.Vector3(0, 0, -700), new THREE.Vector3(0, 0, 700), 0xc6c6c6);

    controls = new OrbitControls(camera, chart);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.update();

    disableChart = false;
    $('#customCheck1').change(function () {
        disableChart = $(this).prop('checked');
        if (disableChart) {
            CancelAnimation();

            $('.chart-guid')
                .text('Chart is Disabled in image setting')
                .removeClass('text-muted')
                .addClass('text-warning');
        } else {
            animate();

            $('.chart-guid')
                .text('Click and drag to rotate the view')
                .addClass('text-muted');
        }
    });

    animate();
} else {
    $('#customCheck1').attr('disabled', true);

    $('.chart-guid')
        .text('Sorry, your Device does not support WebGL')
        .removeClass('text-muted')
        .addClass('text-warning');
}