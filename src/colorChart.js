import Chart from 'chart.js';
let chart = new Chart($('#myChart'), {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [],
            backgroundColor: []
        }]
    },
    options: {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return data['datasets'][0]['backgroundColor'][tooltipItem['index']];
                },
                afterLabel: function (tooltipItem, data) {
                    let dataset = data['datasets'][0];
                    let percent = Math.round((dataset['data'][tooltipItem['index']] / dataset['_meta'][0]['total']) * 100);
                    return '' + percent + '%';
                }
            },
            displayColors: false
        }
    }
});

export function addData(data, color) {
    let dataset = chart.data.datasets[0];
    dataset.data = data;
    dataset.backgroundColor = color;
    chart.update();
}