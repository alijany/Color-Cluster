import './style/costume.scss';
import './chart.js';

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
function imageOnload() {
    let canvas = document.getElementById('original-canvas');
    let width = $('.tab-content').width();
    let height = width / originalImage.width * originalImage.height;

    canvas.width = width;
    canvas.height = height;

    let context = canvas.getContext('2d');
    context.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height, 0, 0, width, height);

    $('#image-tab').tab('show');
    $('#drop_zone').hide();
    $('#upload').show();
    // imageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

let reader = new FileReader();
reader.addEventListener('load', function (event) {
    originalImage.onload = imageOnload;
    originalImage.src = event.target.result;
});

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