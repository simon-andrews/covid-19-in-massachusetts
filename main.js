const allDatasets = [
  barnstableDataset,
  berkshireDataset,
  bristolDataset,
  dukesAndNantucketDataset,
  essexDataset,
  franklinDataset,
  hampdenDataset,
  hampshireDataset,
  middlesexDataset,
  norfolkDataset,
  plymouthDataset,
  suffolkDataset,
  worcesterDataset,
  unknownDataset
];

allDatasets.sort(function (a, b) {
  const aMax = Math.max(...a.data);
  const bMax = Math.max(...b.data);
  return bMax - aMax;
});

let colorTemp = 0;
for (let i = 0; i < allDatasets.length; ++i) {
  const hue = Math.round(colorTemp);
  const saturation = 80;
  const lightness = 50;
  allDatasets[i].backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  colorTemp += 360 / 7;
  if (colorTemp > 360) {
    colorTemp = 0;
  }
}

let ctx = document.getElementById('chart').getContext('2d');
let chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['3/9', '3/10', '3/11', '3/12', '3/13', '3/14', '3/15', '3/16', '3/17', '3/18', '3/19', '3/20', '3/21', '3/22'],
    datasets: allDatasets
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
        type: undefined
      }]
    }
  }
});

function makeCountyOption(name, caseCount, datasets) {
  const countySelector = document.getElementById('county-selector');
  const option = document.createElement('a');
  option.classList.add('align-items-center');
  option.classList.add('d-flex');
  option.classList.add('justify-content-between');
  option.classList.add('list-group-item');
  option.classList.add('list-group-item-action');
  option.href = '#';
  option.text = name;
  option.onclick = function () {
    chart.data.datasets = datasets;
    chart.update(0);
    for (const child of countySelector.children) {
      child.classList.remove('active');
    }
    option.classList.add('active');
    console.log('aa');
  }
  const badge = document.createElement('span');
  badge.classList.add('badge');
  badge.classList.add('badge-pill');
  badge.classList.add('badge-warning');
  badge.innerHTML = caseCount;
  option.appendChild(badge);
  return option;
}

window.onload = function () {

  const logscaleCheckbox = document.getElementById('logscale-checkbox');
  logscaleCheckbox.onclick = function () {
    if (chart.options.scales.yAxes[0].type !== 'logarithmic') {
      chart.options.scales.yAxes[0].type = 'logarithmic';
    }
    else {
      chart.options.scales.yAxes[0].type = 'linear';
    }
    chart.update(0);
  }

  const countySelector = document.getElementById('county-selector');
  let totalCases = 0;
  for (const dataset of allDatasets) {
    const mostRecentCaseCount = dataset.data[dataset.data.length - 1];
    totalCases += mostRecentCaseCount;
  }
  const allCountiesOption = makeCountyOption('All counties', totalCases, allDatasets);
  allCountiesOption.classList.add('active');
  countySelector.appendChild(allCountiesOption);
  for (const dataset of allDatasets) {
    const name = dataset.countyName;
    const mostRecentCaseCount = dataset.data[dataset.data.length - 1];
    const option = makeCountyOption(name, mostRecentCaseCount, [dataset]);
    countySelector.appendChild(option);
  }
}
