const casesByCountyByDay = {
  "3/13": {
    "All counties": 123,
    "Berkshire": 9,
    "Essex": 2,
    "Middlesex": 60,
    "Norfolk": 24,
    "Suffolk": 26,
    "Worcester": 2
  },
  "3/14": {
    "All counties": 138,
    "Barnstable": 1,
    "Berkshire": 9,
    "Bristol": 1,
    "Essex": 5,
    "Middlesex": 65,
    "Norfolk": 28,
    "Suffolk": 27,
    "Worcester": 2
  },
  "3/15": {
    "All counties": 164,
    "Barnstable": 1,
    "Berkshire": 9,
    "Bristol": 1,
    "Essex": 6,
    "Hampden": 1,
    "Middlesex": 75,
    "Norfolk": 31,
    "Plymouth": 1,
    "Suffolk": 31,
    "Worcester": 6,
    "Unknown": 2
  },
  "3/16": {
    "All counties": 197,
    "Barnstable": 1,
    "Berkshire": 11,
    "Bristol": 2,
    "Essex": 8,
    "Hampden": 1,
    "Middlesex": 83,
    "Norfolk": 36,
    "Plymouth": 3,
    "Suffolk": 36,
    "Worcester": 6,
    "Unknown": 10
  },
  "3/17": {
    "All counties": 218,
    "Barnstable": 2,
    "Berkshire": 14,
    "Bristol": 5,
    "Essex": 8,
    "Hampden": 1,
    "Middlesex": 89,
    "Norfolk": 43,
    "Plymouth": 5,
    "Suffolk": 42,
    "Worcester": 8,
    "Unknown": 1
  },
  "3/18": {
    "All counties": 256,
    "Barnstable": 2,
    "Berkshire": 17,
    "Bristol": 5,
    "Essex": 14,
    "Hampden": 2,
    "Middlesex": 100,
    "Norfolk": 45,
    "Plymouth": 5,
    "Suffolk": 51,
    "Worcester": 10,
    "Unknown": 4
  },
  "3/19": {
    "All counties": 328,
    "Barnstable": 5,
    "Berkshire": 18,
    "Bristol": 6,
    "Essex": 19,
    "Hampden": 3,
    "Hampshire": 1,
    "Middlesex": 119,
    "Norfolk": 52,
    "Plymouth": 5,
    "Suffolk": 72,
    "Worcester": 14,
    "Unknown": 13
  },
}

let ctx = document.getElementById("chart").getContext("2d");
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: '# confirmed or presumptive positive cases',
      data: [],
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

const countySelector = document.getElementById("county-selector");

function setCounty(countyName) {
  for (const child of countySelector.children) {
    child.classList.remove("active");
  }
  let labels = [];
  let data = [];
  for (date in casesByCountyByDay) {
    labels.push(date);
    if (countyName in casesByCountyByDay[date]) {
      data.push(casesByCountyByDay[date][countyName]);
    }
    else {
      data.push(0);
    }
  }
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.update();
}

window.onload = function() {
  setCounty("All counties");
  const lastDay = "3/19";
  const lastDaysData = casesByCountyByDay[lastDay];
  for (const county in lastDaysData) {
    let option = document.createElement("a");
    option.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center";
    option.href = "#";
    option.text = county;
    option.onclick = function() {
      console.log(county);
      setCounty(county);
      option.classList.add("active");
    }
    let badge = document.createElement("span");
    badge.className = "badge badge-warning badge-pill";
    badge.innerHTML = lastDaysData[county];
    option.appendChild(badge);
    countySelector.appendChild(option);
  }
}