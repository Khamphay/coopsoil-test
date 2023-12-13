import moment from "moment";
function suboption(title, titleY) {
  return {
    chart: {
      height: 240,
      type: "area",
      stacked: false,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleXaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 1
    },
    title: { text: title, align: "left" },
    xaxis: {
      type: "datetime",
      categories: [],
      tickAmount: 6,
      title: {
        text: "Time"
      },
      labels: {
        formatter: (val) => {
          return moment(val).format("hh:mm:ss");
        }
      }
    },
    tooltip: {
      x: {
        formatter: (val) => {
          return moment(val).format("DD-MM-yyyy hh:mm:ss");
        }
      }
      // y: { format: yFomate }
    },
    yaxis: {
      title: {
        text: titleY
      }
    }
  };
}

export var chartOptions = {
  options: [
    suboption("Diameter Sensor 1", "Voltage (V)", "00 V"),
    suboption("Diameter Sensor 2", "Voltage (V)"),
    suboption("Height Sensor", "Voltage (V)"),
    suboption("Weight", "Weight (g)"),
    suboption("CO2 Emission", "Emission (%)"),
    suboption("Air Humidity", "Air Humidity (rH)"),
    suboption("Temperature 1", "Temp (°C)"),
    suboption("Temperature 2", "Temp (°C)")
  ],
  series: [
    [{ name: "Sensor 1", data: [] }],
    [{ name: "Sensor 2", data: [] }],
    [{ name: "Sensor 3", data: [] }],
    [{ name: "Weight", data: [] }],
    [{ name: "CO2 Emission", data: [] }],
    [{ name: "Air Humidity", data: [] }],
    [{ name: "Temp 1", data: [] }],
    [{ name: "Temp 2", data: [] }]
  ]
};
