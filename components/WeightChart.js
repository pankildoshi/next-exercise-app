import React from "react";
import Chart from "react-apexcharts";
import { getWeightsData, getWorkoutsPerWeek } from "@/utils/chartData";

export default function WeightChart({ workouts }) {
  const [dates, weights] = getWeightsData(workouts);
  getWorkoutsPerWeek(workouts);

  const state = {
    options: {
      colors: ["#e11d48"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: dates,
      },
      chart: {
        toolbar: {
          show: false,
        },
      },
      noData: {
        text: "No Data Available",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#e11d48",
          fontSize: "14px",
          fontFamily: undefined,
        },
      },
    },
    series: [
      {
        name: "Weights",
        data: weights,
      },
    ],
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="area"
      width="400"
    />
  );
}
