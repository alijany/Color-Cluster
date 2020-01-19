import './style/costume.scss';
import './chart.js';
import { initChart } from './chart';
import { clusters } from './kmeans';
// import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tab';

// import 'bootstrap/js/dist/collapse';

// import RunWorker from './run.worker';

// ***************************
// function sendToWorker(massage) {
//     runWorker.postMessage(massage);
//     return new Promise(resolve => sendToWorker.resolve = resolve);
// }

// function createWorker() {
//     runWorker = new RunWorker();
//     runWorker.onmessage = (response) => sendToWorker.resolve(response.data);
// }
// ***************************

//let runWorker;
//createWorker();

let originalImage = new Image();
let imageData;
let reducedCanvas = document.getElementById('reduced-canvas');

function imageOnload() {
    let canvas = document.getElementById('original-canvas');
    let width = $('.tab-content').width();
    let height = width / originalImage.width * originalImage.height;

    canvas.width = width;
    canvas.height = height;

    reducedCanvas.width = width;
    reducedCanvas.height = height;

    let context = canvas.getContext('2d');
    context.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height, 0, 0, width, height);
    
    context = reducedCanvas.getContext('2d');
    context.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height, 0, 0, width, height);

    $('#image-tab').tab('show');
    $('#drop_zone').hide();
    $('#upload').show();
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    initChart(imageData);
}


export function updateImage(vertexes) {
    let i = 0;
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {

            let rgb = clusters[vertexes[i].cluster].pos;
            i++;

            let index = (y * imageData.width + x) * 4;
            imageData.data[index] = rgb.x + 127;
            imageData.data[index + 1] = rgb.y + 127;
            imageData.data[index + 2] = rgb.z + 127;
            imageData.data[index + 3] = 255;
        }
    }

    reducedCanvas.getContext('2d').putImageData(imageData, 0, 0);
}

// file reader ---------------------------------------

let reader = new FileReader();
reader.addEventListener('load', function (event) {
    originalImage.onload = imageOnload;
    originalImage.src = event.target.result;
});

// file input ----------------------------------------

$('#browse,.drop_zone').on('click', function () {
    $('#file-input').trigger('click');
});

$('#file-input').on('change', function (event) {
    let file = event.target.files[0];
    reader.readAsDataURL(file);
});

// drop zone file handler ---------------------------- 

$('.drop_zone').on('drop', function (event) {
    event.preventDefault();
    event.dataTransfer = event.originalEvent.dataTransfer;
    let file;
    if (event.dataTransfer.items)
        file = event.dataTransfer.items[0].getAsFile();
    else
        file = event.dataTransfer.files[0].name;
    reader.readAsDataURL(file);
});

$('.drop_zone').on('dragover', function (event) {
    event.preventDefault();
});

// drop zone hover effect -----------------------------

var dragging = 0;
$('.drop_zone').on('dragenter', function (event) {
    dragging++;
    $('.drop_zone').css('background-color', '#f7f7f7');

    event.stopPropagation();
    event.preventDefault();
    return false;
});

$('.drop_zone').on('dragleave dragexit', function (event) {
    dragging--;
    if (dragging === 0)
        $('.drop_zone').css('background-color', '#fff');

    event.stopPropagation();
    event.preventDefault();
    return false;
});

// cluster slider ------------------------------------

export let clusterCount = 12; // default
let clusterLabel = $('#clusters');
import { randomCluster } from './kmeans';

$('#cluster-slider').on('input', function (event) {
    clusterCount = event.target.value;
    clusterLabel.html(clusterCount);
});

$('#cluster-slider').on('change', randomCluster);

// ---------------------------------------------------

export function appendLabels(labels) {
    let $color = $('.colors');
    $color.text('');
    labels.forEach(label => {
        $color.append(label);
    });
}

// ----------------------------------------------------

import { run } from './chart';
$('#run').on('click', function () {
    run();
});