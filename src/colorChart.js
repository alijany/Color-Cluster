import Chart from 'chart.js';
import { hexOf } from './index';

let chart = new Chart($('#myChart'), {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [1, 1, 1, 1, 1],
            backgroundColor: ['#f35633', '#29a69e', '#f9e9bb', '#c9dee0']
        }]
    },
    options: {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return hexOf(data['datasets'][0]['backgroundColor'][tooltipItem['index']]);
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