"use client";
import { useFetch } from "@/hooks/useFetch";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Food Noun",
    },
  },
};

const Pet = () => {
  const {
    loading,
    data: petData,
    error,
  } = useFetch("?category=pet&type=negative");
  const labels = petData?.food_noun?.map((i) => i.item);
  const foodNounData = {
    labels: labels,
    datasets: [
      {
        label: "food noun",
        data: petData?.food_noun?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  if (loading) {
    return <div>LOADING ...</div>;
  }
  return (
    <div>
      <Bar options={options} data={foodNounData} />
    </div>
  );
};

export default Pet;
