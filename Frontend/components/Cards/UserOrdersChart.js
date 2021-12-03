import React from "react";
import Chart from "chart.js";

export default function UserOrdersChart() {

  const getDates = (data) => {
    let dates = [0,0,0,0,0,0,0,0,0,0,0,0];
    let cont = [0,0,0,0,0,0,0,0,0,0,0,0];
    if(data[0] != null){
    data.forEach((item) => {
      var date = new Date(item.date);
      var month = date.getMonth();
      if (new Date().getFullYear() === date.getFullYear()) 
        switch (month) {
          case 0:
            cont[0]++;
            dates[0] += item.order.length;
            break;
          case 1:
            cont[1]++;
            dates[1] += item.order.length;
            break;
          case 2:
            cont[2]++;
            dates[2] += item.order.length;
            break;
          case 3:
            cont[3]++;
            dates[3] += item.order.length;
            break;
          case 4:
            cont[4]++;
            dates[4] += item.order.length;
            break;
          case 5:
            cont[5]++;
            dates[5] += item.order.length;
            break;
          case 6:
            cont[6]++;
            dates[6] += item.order.length;
            break;
          case 7:
            cont[7]++;
            dates[7] += item.order.length;
            break;
          case 8:
            cont[8]++;
            dates[8] += item.order.length;
            break;
          case 9:
            cont[9]++;
            dates[9] += item.order.length;
            break;
          case 10:
            cont[10]++;
            dates[10] += item.order.length;
            break;
          case 11:
            cont[11]++;
            dates[11] += item.order.length;
            break;
          default: break;
        }
    });}
    return dates;
  }

  React.useEffect(() => {
    const URL = process.env.NODE_ENV === 'production' ? 'https://mondsinc.herokuapp.com/api/v1/' : 'http://localhost:8080/api/v1/';
    fetch(`${URL}userdocuments/${JSON.parse(localStorage.getItem('User')).id}`)
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
        let ctx = document.getElementById("bar-chart2").getContext("2d");
        window.myBar = new Chart(ctx, config);
      });
  }, [])
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Cantidad de ordenes promedio por mes
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart2"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
