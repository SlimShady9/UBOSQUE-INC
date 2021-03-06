import React from "react";
import Chart from "chart.js";

export default function UserDocsChart() {

  const getDates = (data) => {
    let dates = [0,0,0,0,0,0];
    if(data[0] != null){
      data.forEach((item) => {
        
        var date = new Date(item.date);
        var month = date.getMonth();
        
        if (new Date().getFullYear() === date.getFullYear()) 
          switch (month % 6 ) {
            case 0: dates[0]++; break;
            case 1: dates[1]++; break;
            case 2: dates[2]++; break;
            case 3: dates[3]++; break;
            case 4: dates[4]++; break;
            case 5: dates[5]++; break;
            default: break;
          }
      });
    } 
    return dates;
  }

  React.useEffect(() => {
    var month = new Date().getMonth();
    const URL = process.env.NODE_ENV === 'production' ? 'https://mondsinc.herokuapp.com/api/v1/' : 'http://localhost:8080/api/v1/';
    fetch(`${URL}userdocuments/${JSON.parse(localStorage.getItem('User')).id}`)
      .then((res) => res.json())
      .then((data) => getDates(data))
      .then(labels => {
        var config = {
          type: "line",
          data: {
            labels: [
              month<6? "Enero" : "Julio",
              month<6? "Febrero": "Agosto",
              month<6? "Marzo"  : "Septiembre",
              month<6? "April": "Octubre",
              month<6? "Mayo" : "Noviembre",
              month<6? "Junio" : "Diciembre",
            ],
            datasets: [
              {
                label: new Date().getFullYear(),
                backgroundColor: "#4c51bf",
                borderColor: "#4c51bf",
                data: labels,
                fill: false,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Sales Charts",
              fontColor: "white",
            },
            legend: {
              labels: {
                fontColor: "white",
              },
              align: "end",
              position: "bottom",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Month",
                    fontColor: "white",
                  },
                  gridLines: {
                    display: false,
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(0, 0, 0, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                    fontColor: "white",
                  },
                  gridLines: {
                    borderDash: [3],
                    borderDashOffset: [3],
                    drawBorder: false,
                    color: "rgba(255, 255, 255, 0.15)",
                    zeroLineColor: "rgba(33, 37, 41, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        };
        var ctx = document.getElementById("line-chart2").getContext("2d");
        window.myLine = new Chart(ctx, config);
      });
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-white text-xl font-semibold">Cantidad de documentos registrados por mes</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart2"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
