import React from "react";
import Chart from "chart.js";

export default function AdminUserChart() {
  //get dates for last 6 months from data
  const getDates = (data) => {
    let dates = [0,0,0,0,0,0,0,0,0,0,0,0];
    data.forEach((item) => {
      var date = new Date(item.fechaCreacion);
      var month = date.getMonth();
      if (new Date().getFullYear() === date.getFullYear()) 
        switch (month) {
          case 0: dates[0]++; break;
          case 1: dates[1]++; break;
          case 2: dates[2]++; break;
          case 3: dates[3]++; break;
          case 4: dates[4]++; break;
          case 5: dates[5]++; break;
          case 6: dates[6]++; break;
          case 7: dates[7]++; break;
          case 8: dates[8]++; break;
          case 9: dates[9]++; break;
          case 10: dates[10]++; break;
          case 11: dates[11]++; break;
          default: break;
        }
    });
    return dates;
  }
  React.useEffect(() => {
    //get users from database
    const URL = process.env.NODE_ENV === 'production' ? 'https://mondsinc.herokuapp.com/api/v1/users' : 'http://localhost:8080/api/v1/users';
    fetch(URL)
      .then((res) => res.json())
      .then((data) => getDates(data))
      .then(labels => {
        let config = {
          type: "bar",
          data: {
            labels: [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre",
            ],
            datasets: [
              {
                label: new Date().getFullYear(),
                backgroundColor: "#ed64a6",
                borderColor: "#ed64a6",
                data: labels,
                fill: false,
                barThickness: 8,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Orders Chart",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            legend: {
              labels: {
                fontColor: "rgba(0,0,0,.4)",
              },
              align: "end",
              position: "bottom",
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  scaleLabel: {
                    display: true,
                    labelString: "Month",
                  },
                  gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(33, 37, 41, 0.3)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                  },
                  gridLines: {
                    borderDash: [2],
                    drawBorder: false,
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.2)",
                    zeroLineColor: "rgba(33, 37, 41, 0.15)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        };
        let ctx = document.getElementById("bar-chart").getContext("2d");
        window.myBar = new Chart(ctx, config);
      });
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Documentos registrados por mes
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
