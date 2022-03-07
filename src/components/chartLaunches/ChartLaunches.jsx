import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ChartLaunches = ({ locations }) => {
  const launchesObjs = locations.reduce((prevValue, currentValue) => {
    if (currentValue in prevValue) {
      prevValue[currentValue]++
    } else {
      prevValue[currentValue] = 1
    }
    return prevValue
  }, {})

  const labels = Object.keys(launchesObjs) 

  const data = {
    labels,
    datasets: [{
      label: 'Rocket Launches',
      data: labels.map(launch => launchesObjs[launch] )
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Rocket launches Chart',
      },
    },
  };

  return (
    locations.length > 0 && <Bar data={data} options={options}/>
  )
} 