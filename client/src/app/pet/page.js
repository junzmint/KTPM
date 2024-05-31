"use client";
import React, { useState } from 'react';
import { useFetch } from "@/hooks/useFetch";
import './style.css'
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

const getOptions = (title) => ({
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
      text: title,
    },
  },
});

const Pet = () => {
  
  const [selectedType, setSelectedType] = useState('negative');
  const [selectedChart, setSelectedChart] = useState('foodnoun');

  const {
    loading,
    data: petDataNega,
    error,
  } = useFetch("?category=pet&type=negative"); 

  const {
    loading: loadingPos,
    data: petDataPos,
    error: errorPos,
  } = useFetch("?category=pet&type=positive");

  const petData = selectedType === 'negative' ? petDataNega : petDataPos;


  const labelFoodNoun = petData?.food_noun?.map((i) => i.item);  // dinh gop noun va adj thanh 1 bieu do
  const foodNounData = {
    labels: labelFoodNoun,
    datasets: [
      {
        label: "food noun",
        data: petData?.food_noun?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const labelFoodAdj = petData?.food_adj?.map((i) => i.item);
  const foodAdjData = {
    labels: labelFoodAdj,
    datasets: [
      {
        label: "food adj",
        data: petData?.food_adj?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const labelFashionNoun = petData?.fashion_noun?.map((i) => i.item);
  const fashionNounData = {
    labels: labelFashionNoun,
    datasets: [
      {
        label: "fashion noun",
        data: petData?.fashion_noun?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  

  const labelFashionAdj = petData?.fashion_adj?.map((i) => i.item);
  const fashionAdjData = {
    labels: labelFashionAdj,
    datasets: [
      {
        label: "fashion adj",
        data: petData?.fashion_adj?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const labelDrugsNoun = petData?.drugs_noun?.map((i) => i.item);
  const drugsNounData = {
    labels: labelDrugsNoun,
    datasets: [
      {
        label: "drugs noun",
        data: petData?.drugs_noun?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const labelDrugsAdj = petData?.drugs_adj?.map((i) => i.item);
  const drugsAdjData = {
    labels: labelDrugsAdj,
    datasets: [
      {
        label: "drugs adj",
        data: petData?.drugs_adj?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const labelAccNoun = petData?.accessories_noun?.map((i) => i.item);
  const accNounData = {
    labels: labelAccNoun,
    datasets: [
      {
        label: "accessories noun",
        data: petData?.accessories_noun?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const labelAccAdj = petData?.accessories_adj?.map((i) => i.item);
  const accAdjData = {
    labels: labelAccAdj,
    datasets: [
      {
        label: "accessories adj",
        data: petData?.accessories_adj?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };



  const getData = () => {
    switch (selectedChart) {
      case 'foodnoun':
        return { data: foodNounData, title: "Food Noun" };
      case 'foodadj':
        return { data: foodAdjData, title: "Food Adjective" };
      case 'fashionnoun':
        return { data: fashionNounData, title: "Fashion Noun" };
      case 'fashionadj':
        return { data: fashionAdjData, title: "Fashion Adjective" };
      case 'drugsnoun':
        return { data: drugsNounData, title: "Drugs Noun" };
      case 'drugsadj':
        return { data: drugsAdjData, title: "Drugs Adjective" };
      case 'accnoun':
        return { data: accNounData, title: "Accessories Noun" };
      case 'accadj':
        return { data: accAdjData, title: "Accessories Adjective" };
      default:
        return { data: foodNounData, title: "Food Noun" };
    }
  };

  const { data, title } = getData();
  const options = getOptions(title);


  if (loading) {
    return <div>LOADING ...</div>;
  }
  return (
    <div>
      <div className="button-container">
      <button
          className={`red-button ${selectedType === 'positive' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedType('positive');
            setSelectedChart('foodnoun'); 
          }}
        >
          Positive
        </button>
        <button
          className={`red-button ${selectedType === 'negative' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedType('negative');
            setSelectedChart('foodnoun'); 
          }}
        >
          Negative
        </button>
      </div>

      <div className="button-container">
        <button
          className={`blue-button ${selectedChart === 'foodnoun' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('foodnoun')}
        >
          Food Noun
        </button>
        <button
          className={`blue-button ${selectedChart === 'foodadj' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('foodadj')}
        >
          Food Adj
        </button>
        <button
          className={`blue-button ${selectedChart === 'fashionnoun' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('fashionnoun')}
        >
          Fashion Noun
        </button>
        <button
          className={`blue-button ${selectedChart === 'fashionadj' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('fashionadj')}
        >
          Fashion Adj
        </button>
        <button
          className={`blue-button ${selectedChart === 'drugsnoun' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('drugsnoun')}
        >
          Drugs Noun
        </button>
        <button
          className={`blue-button ${selectedChart === 'drugsadj' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('drugsadj')}
        >
          Drugs Adj
        </button>
        <button
          className={`blue-button ${selectedChart === 'accnoun' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('accnoun')}
        >
          Accessories Noun
        </button>
        <button
          className={`blue-button ${selectedChart === 'accadj' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('accadj')}
        >
          Accessories Adj
        </button>
      </div>
      <div > 
        <Bar options={options} data={data} />
      </div>
    </div>
  ); 
  
};

export default Pet;
