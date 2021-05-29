let globalXLables = [];
let globalYTemps = [];
let northernHemispherYTemps = [];
let southernHemispherYTemps = [];

//  Getting Data

async function gettingGlobalData() {
  let data = await fetch("ZonAnn.Ts+dSST.csv");
  let table = await data.text();
  let values = table.split(/\n/);
  values.forEach((row) => {
    const column = row.split(",");
    const year = column[0];
    globalXLables.push(year);
    const temp = column[1];
    globalYTemps.push(parseFloat(temp) + 14);
    const nrTemps = column[2];
    northernHemispherYTemps.push(parseFloat(nrTemps) + 14);
    const srTemps = column[3];
    southernHemispherYTemps.push(parseFloat(srTemps) + 14);
  });
}

// creatingGraph();

async function creatingGraph(graph) {
  await gettingGlobalData();
  let ctx = document.getElementById("chart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: globalXLables,
      datasets: [
        {
          label: "Global Mean Temperatures in °C",
          data: globalYTemps,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderWidth: 1,
        },
        {
          label: "Northern Hemisphere Temperature in °C",
          data: northernHemispherYTemps,
          borderColor: "rgba(99, 132, 255, 1)",
          backgroundColor: "rgba(99, 132, 255, 0.5)",
          borderWidth: 1,
        },
        {
          label: "Southern Hemisphere Temperature in °C",
          data: southernHemispherYTemps,
          borderColor: "rgba(0,0,0,1)",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderWidth: 1,
        },
      ],
    },
  });
}
window.addEventListener("load", creatingGraph());
