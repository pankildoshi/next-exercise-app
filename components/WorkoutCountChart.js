import React from "react";
import Chart from "react-apexcharts";
import { getWorkoutsPerWeek } from "@/utils/chartData";

export default function WorkoutCountChart({ workouts }) {
  const [dates, counts] = getWorkoutsPerWeek(workouts);

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
        name: "Workouts Per Week",
        data: counts,
      },
    ],
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="bar"
      width="400"
    />
  );
}
