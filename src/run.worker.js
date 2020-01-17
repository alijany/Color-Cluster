
onmessage = function (event) {
    if (event.data) {
        // code ...
        postMessage('data');
    }
};