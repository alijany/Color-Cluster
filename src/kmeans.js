let THREE = require('three');
import { clusterCount, appendLabels, onlyShowResult, hexOf } from './index.js';
import { addData } from './colorChart.js';


export let vertexes = [];
export let clusters = [];

let step_Num = 0;
// eslint-disable-next-line no-unused-vars
let lastChange = 0;

function createLabel(color) {
    let $color = $(`<div class="mr-2 rounded" style="background-color:${color}"></div>`);
    let $colorHex = $(`<p class="mb-0 text-secondary">${hexOf(color)}</p>`);
    let label = $('<div class="color d-inline-flex align-items-center rounded shadow-sm m-2 p-2"></div>')
        .append($color)
        .append($colorHex);

    return { $color, $colorHex, label };
}


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
        // TODO: use color direct
        let x = vertexes[index].pos.x;
        let y = vertexes[index].pos.y;
        let z = vertexes[index].pos.z;

        let color = `rgb(${x + 127},${y + 127},${z + 127})`;

        clusters.push({
            pos: new THREE.Vector3(x, y, z),
            sum: new THREE.Vector3(0, 0, 0),
            vertexCount: 0,
            label: createLabel(color),
            color: color
        });
    }

    appendLabels(clusters.map(c => c.label));
    addData(clusters.map(c => c.vertexCount + 1), clusters.map(c => c.color));
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
        clusters[index].vertexCount += 1;
    }

    addData(clusters.map(c => c.vertexCount), clusters.map(c => c.color));

    for (i = 0; i < clusterCount; i++) {
        if (clusters[i].vertexCount)
            clusters[i].pos = clusters[i].sum.divideScalar(clusters[i].vertexCount);
        clusters[i].sum = new THREE.Vector3(0, 0, 0);
        clusters[i].vertexCount = 0;
        // update color whit pos
        let x = Math.floor(clusters[i].pos.x) + 127;
        let y = Math.floor(clusters[i].pos.y) + 127;
        let z = Math.floor(clusters[i].pos.z) + 127;
        let rgb = `rgb(${x},${y},${z})`;
        clusters[i].color = rgb;
        if (!onlyShowResult) {
            clusters[i].label.$color.css('background-color', rgb);
            clusters[i].label.$colorHex.text(hexOf(rgb));
        }
    }
}

// ------------------------------------------------------------

export function runKmeans(draw) {
    let loop = setInterval(() => {
        if (step_Num - lastChange < 2) {
            step_Num++;

            choseClusters();
            updateCentroid();
            if (!onlyShowResult)
                draw();
        }
        else {
            if (onlyShowResult) {
                for (let i = 0; i < clusterCount; i++) {
                    clusters[i].label.$color.css('background-color', clusters[i].color);
                    clusters[i].label.$colorHex.text(hexOf(clusters[i].color));
                }
                draw();
            }
            step_Num = 0;
            lastChange = 0;
            clearInterval(loop);
        }
    }, 0);
}