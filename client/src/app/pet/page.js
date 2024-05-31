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
  
  const [selectedType, setSelectedType] = useState('positive');
  const [selectedChart, setSelectedChart] = useState('food');

  const { 
    loading: loadingPosi, 
    data: petDataPosi, 
    error: errorPosi 
  } = useFetch("?category=pet&type=positive");
  
  const { 
    loading: loadingNega, 
    data: petDataNega, 
    error: errorNega 
  } = useFetch("?category=pet&type=negative");
  
  const petData = selectedType === 'positive' ? petDataPosi : petDataNega;
  

  const labelFoodNoun = petData?.food_noun?.map((i) => i.item) || [];
  const foodNounData = labelFoodNoun.length > 0 ? {
    labels: labelFoodNoun,
    datasets: [
      {
        label: "Food Noun",
        data: petData?.food_noun?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  } : null;

  const labelFoodAdj = petData?.food_adj?.map((i) => i.item) || [];
  const foodAdjData = labelFoodAdj.length > 0 ? {
    labels: labelFoodAdj,
    datasets: [
      {
        label: "Food Adj",
        data: petData?.food_adj?.map((i) => i.frequency),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  } : null;

  const labelFashionNoun = petData?.fashion_noun?.map((i) => i.item) || [];
  const fashionNounData = labelFashionNoun.length > 0 ? {
    labels: labelFashionNoun,
    datasets: [
      {
        label: "Fashion Noun",
        data: petData?.fashion_noun?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  } : null;

  const labelFashionAdj = petData?.fashion_adj?.map((i) => i.item) || [];
  const fashionAdjData = labelFashionAdj.length > 0 ? {
    labels: labelFashionAdj,
    datasets: [
      {
        label: "Fashion Adj",
        data: petData?.fashion_adj?.map((i) => i.frequency),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  } : null;

  const labelDrugsNoun = petData?.drugs_noun?.map((i) => i.item) || [];
  const drugsNounData = labelDrugsNoun.length > 0 ? {
    labels: labelDrugsNoun,
    datasets: [
      {
        label: "Drugs Noun",
        data: petData?.drugs_noun?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  } : null;

  const labelDrugsAdj = petData?.drugs_adj?.map((i) => i.item) || [];
  const drugsAdjData = labelDrugsAdj.length > 0 ? {
    labels: labelDrugsAdj,
    datasets: [
      {
        label: "Drugs Adj",
        data: petData?.drugs_adj?.map((i) => i.frequency),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  } : null;

  const labelAccNoun = petData?.accessories_noun?.map((i) => i.item) || [];
  const accNounData = labelAccNoun.length > 0 ? {
    labels: labelAccNoun,
    datasets: [
      {
        label: "Accessories Noun",
        data: petData?.accessories_noun?.map((i) => i.frequency),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  } : null;

  const labelAccAdj = petData?.accessories_adj?.map((i) => i.item) || [];
  const accAdjData = labelAccAdj.length > 0 ? {
    labels: labelAccAdj,
    datasets: [
      {
        label: "Accessories Adj",
        data: petData?.accessories_adj?.map((i) => i.frequency),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  } : null;


  const getData = () => {
    switch (selectedChart) {
      case 'food':
        return [
          { data: foodNounData, title: "Food Noun"},
          { data: foodAdjData, title: "Food Adj"},
        ].filter(chart => chart.data); 
      case 'fashion':
        return [
          { data: fashionNounData, title: "Fashion Noun"},
          { data: fashionAdjData, title: "Fashion Adj"},
        ].filter(chart => chart.data); 
      case 'drugs':
        return [
          { data: drugsNounData, title: "Drugs Noun"},
          { data: drugsAdjData, title: "Drugs Adj"},
        ].filter(chart => chart.data); 
      case 'accessories':
        return [
          { data: accNounData, title: "Accessories Noun"},
          { data: accAdjData, title: "Accessories Adj"},
        ].filter(chart => chart.data); 
      default:
        return [
          { data: foodNounData, title: "Food Noun"},
          { data: foodAdjData, title: "Food Adj"},
        ].filter(chart => chart.data); 
    }
  };

  const charts = getData().map(({ data, title }, index) => (
    <div key={index} style={{ height: '600px', marginBottom: '20px' }}>
      <Bar options={getOptions(title)} data={data} />
    </div>
  ));

  if (loadingNega || loadingPosi) {
    return <div>LOADING ...</div>;
  }
  return (
    <div>
      <div className="button-container">
      <button
          className={`red-button ${selectedType === 'positive' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedType('positive');
            setSelectedChart('food'); 
          }}
        >
          Positive
        </button>
        <button
          className={`red-button ${selectedType === 'negative' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedType('negative');
            setSelectedChart('food'); 
          }}
        >
          Negative
        </button>
      </div>

      <div className="button-container">
        <button
          className={`blue-button ${selectedChart === 'food' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('food')}
        >
          Food 
        </button>
        <button
          className={`blue-button ${selectedChart === 'fashion' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('fashion')}
        >
          Fashion
        </button>
        <button
          className={`blue-button ${selectedChart === 'drugs' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('drugs')}
        >
          Drugs
        </button>
        <button
          className={`blue-button ${selectedChart === 'accessories' ? 'selected' : ''}`}
          onClick={() => setSelectedChart('accessories')}
        >
          Food Noun
        </button>
      </div>
      {charts.length > 0 ? charts : <div>No data</div>}
    </div>
  ); 
};

export default Pet;