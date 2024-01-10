import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hide legend
    },
    title: {
      display: false, // Hide title
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Hide x-axis grid lines
      },
    },
    y: {
      display: false, // Hide y-axis
      grid: {
        display: false, // Hide y-axis grid lines
      },
    },
  },
};

export const UserData = [
  {
    id: 1,
    year: `1 star`,
    userGain: 1,
  },
  {
    id: 2,
    year: `2 star`,
    userGain: 1,
  },
  {
    id: 3,
    year: `3 star`,
    userGain: 0,
  },
  {
    id: 4,
    year: `4 star`,
    userGain: 3,
  },
  {
    id: 5,
    year: `5 star`,
    userGain: 91,
  },
];

const ReviewsBarChart = () => {
  const data = {
    labels: UserData.map((o) => o.year),
    datasets: [
      {
        label: "Users Gained",
        backgroundColor: "rgb(0, 255, 0)",
        borderColor: "rgb(0, 255, 0)",
        borderWidth: 1,
        data: UserData.map((o) => o.userGain),
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default ReviewsBarChart;
