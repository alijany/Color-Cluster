let THREE = require('three');
import { clusterCount, appendLabels } from './index.js';

export let vertexes = [];
export let clusters = [];

let step_Num = 0;
// eslint-disable-next-line no-unused-vars
let lastChange = 0;


// ------------------------------------------------------------

function imageDataToVertexes(imageData) {
    vertexes = [];

    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            let index = (y * imageData.width + x) * 4;
            let red = imageData.data[index];
            let green = imageData.data[index + 1];
            let blue = imageData.data[index + 2];
            // let alpha = imageData.data[index + 3];

            vertexes.push({
                pos: new THREE.Vector3(red - 127, green - 127, blue - 127),
                color: 'rgb(' + red + ',' + green + ',' + blue + ')'
            });
        }
    }
}

export function randomCluster() {
    clusters = [];

    for (let i = 0; i < clusterCount; i++) {
        let index = Math.floor(Math.random() * (vertexes.length - 1));

        let x = vertexes[index].pos.x;
        let y = vertexes[index].pos.y;
        let z = vertexes[index].pos.z;

        let color = `rgb(${x + 127},${y + 127},${z + 127})`

        clusters.push({
            pos: new THREE.Vector3(x, y, z),
            sum: new THREE.Vector3(0, 0, 0),
            dataCount: 0,
            label: $('<div></div>').addClass('color').css('background-color', color),
            color: color
        });
    }

    appendLabels(clusters.map(c => c.label));
}

export function initKmeans(imageData) {
    imageDataToVertexes(imageData);
    randomCluster();
}

// ------------------------------------------------------------

function choseClusters() {
    for (let i = 0; i < vertexes.length; i++) {
        let minDistance = clusters[0].pos.distanceTo(vertexes[i].pos);
        let minDistanceIndex = 0;

        for (let j = 1; j < clusterCount; j++) {
            let distance = clusters[j].pos.distanceTo(vertexes[i].pos);
            if (distance < minDistance) {
                minDistance = distance;
                minDistanceIndex = j;
            }
        }

        if (vertexes[i].cluster != minDistanceIndex)
            lastChange = step_Num;
        vertexes[i].cluster = minDistanceIndex;
    }
}


function updateCentroid() {
    // sum of each cluster points
    let i;

    for (i = 0; i < vertexes.length; i++) {
        let index = vertexes[i].cluster;
        clusters[index].sum = clusters[index].sum.add(vertexes[i].pos);
        clusters[index].dataCount += 1;
    }

    for (i = 0; i < clusterCount; i++) {
        if (clusters[i].dataCount)
            clusters[i].pos = clusters[i].sum.divideScalar(clusters[i].dataCount);
        clusters[i].sum = new THREE.Vector3(0, 0, 0);
        clusters[i].dataCount = 0;
        // update color whit pos
        let rgb = clusters[i].pos;
        let red = Math.floor(rgb.x + 127);
        let green = Math.floor(rgb.y + 127);
        let blue = Math.floor(rgb.z + 127);
        clusters[i].color = 'rgb(' + red + ',' + green + ',' + blue + ')';
    }
}

// ------------------------------------------------------------

export function runKmeans(draw) {
    let loop = setInterval(() => {
        if (step_Num - lastChange < 2) {
            step_Num++;

            choseClusters();
            updateCentroid();
            draw();
        }
        else {
            step_Num = 0;
            lastChange = 0;
            clearInterval(loop);
        }
    }, 100);
}