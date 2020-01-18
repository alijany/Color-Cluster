let THREE = require('three');

export let data = [];

let cluster_Num = 12;
export let clusters = [];

let step_Num = 0;
// eslint-disable-next-line no-unused-vars
let lastChange = 0;


export function imageDataToVertexes(imageData) {
    data = [];

    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            let index = (y * imageData.width + x) * 4;
            let red = imageData.data[index];
            let green = imageData.data[index + 1];
            let blue = imageData.data[index + 2];
            // let alpha = imageData.data[index + 3];

            data.push({
                pos: new THREE.Vector3(red - 127, green - 127, blue - 127),
                color: 'rgb(' + red + ',' + green + ',' + blue + ')'
            });
        }
    }
}

export function randomCluster() {
    let clusters = [];

    for (let i = 0; i < cluster_Num; i++) {
        let index = Math.floor(Math.random() * (data.length - 1));

        let x = data[index].pos.x;
        let y = data[index].pos.y;
        let z = data[index].pos.z;

        let red = x + 127;
        let green = y + 127;
        let blue = z + 127;

        clusters.push({
            pos: new THREE.Vector3(x, y, z),
            sum: new THREE.Vector3(0, 0, 0),
            dataCount: 0,

            color: 'rgb(' + red + ',' + green + ',' + blue + ')'
        });
    }
}

export function initKmeans(imageData) {
    imageDataToVertexes(imageData);
    randomCluster();
}

function choseClusters() {
    for (let i = 0; i < data.length; i++) {
        let minDistance = clusters[0].pos.distanceTo(data[i].pos);
        let minDistanceIndex = 0;

        for (let j = 1; j < cluster_Num; j++) {
            let distance = clusters[j].pos.distanceTo(data[i].pos);
            if (distance < minDistance) {
                minDistance = distance;
                minDistanceIndex = j;
            }
        }

        if (data[i].cluster != minDistanceIndex)
            lastChange = step_Num;
        data[i].cluster = minDistanceIndex;
    }
}


function updateCentroid() {
    // sum of each cluster points
    let i;

    for (i = 0; i < data.length; i++) {
        let index = data[i].cluster;
        clusters[index].sum = clusters[index].sum.add(data[i].pos);
        clusters[index].dataCount += 1;
    }

    for (i = 0; i < cluster_Num; i++) {
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

export function runKmeans(draw) {
    let loop = setInterval(() => {
        if (step_Num - lastChange < 2) {
            step_Num++;

            choseClusters();
            updateCentroid();
            draw();
        }
        else clearInterval(loop);
    }, 100);
}