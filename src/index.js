import './style/costume.scss';
import 'tippy.js/dist/tippy.css';

import './chart.js';
import { initChart } from './chart';
import { clusters } from './kmeans';
import copy from 'copy-to-clipboard';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/toast';
import tippy from 'tippy.js';

import 'img-slider/distr/imgslider.min.js';
$('.slider').slider({ instructionText: 'drag to compare' });

let originalImage = new Image();

let imageData;
let reducedCanvas = document.getElementById('image-canvas');
let canvas = document.getElementById('original-canvas');

function setImageSize() {
    let imgHeight = originalImage.height;
    let imgWidth = originalImage.width;

    let width = $('.tab-content').width() * .2; // TODO: add slider 
    let height = width / imgWidth * imgHeight;

    canvas.width = width;
    canvas.height = height;

    reducedCanvas.width = width;
    reducedCanvas.height = height;

    let context = canvas.getContext('2d');
    context.drawImage(originalImage, 0, 0, imgWidth, imgHeight, 0, 0, width, height);

    context = reducedCanvas.getContext('2d');
    context.drawImage(originalImage, 0, 0, imgWidth, imgHeight, 0, 0, width, height);

    return context;
}

// ----------------------------------------------------

function imageOnload() {
    let context = setImageSize(originalImage, originalImage);

    $('#image-tab').removeClass('disabled');
    $('#run').removeClass('disabled');
    $('#image-tab').tab('show');

    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    initChart(imageData);
}

$(window).on('resize', function () {
    // TODO: while algo is running
    let context = setImageSize();
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    initChart(imageData);
});

// ----------------------------------------------------

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

$('.drop_zone').on('click', function () {
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

    tippy('.color', {
        content: '',
        onTrigger: (instance) => {
            let val = $(instance.reference).css('background-color');
            instance.setContent(hexOf(val));
        }
    });
}

// ----------------------------------------------------

$('.toast').toast({
    delay: 3000
});

$('.colors').on('click', '.color', function (event) {
    let val = $(event.target).css('background-color');
    copy(hexOf(val));
    $('.toast').toast('show');
});

// ----------------------------------------------------

import { run } from './chart';
$('#run').on('click', function () {
    run();
});

// -----------------------------------------------------

function hexOf(colorval) {
    let parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete (parts[0]);
    for (let i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
}

// ------------------------------------------------------
let $sliderBtn = $('.slider-btn');
let $imgOverly = $('.img-overly');
let clicking = false;

$('#image').mousedown(function () {
    clicking = true;
    $(this).css('cursor', 'e-resize');
});

$('#image').mouseup(function () {
    clicking = false;
    $(this).css('cursor', 'default');
});

$('#image').mousemove(function (e) {
    if (clicking == false) return;
    var offset = e.pageX - $(this).offset().left;
    if (offset < $(this).width() && offset > 0) {
        $sliderBtn.css('left', offset);
        $imgOverly.css('width', offset);
    }
});