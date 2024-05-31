"use client";
import React, { useEffect,useState } from 'react';
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


const Healthcare = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState(0);
  const [nounData, setNounData] = useState([]);
  const [adjData, setAdjData] = useState([]);
  const {
    loading,
    data: petDataNega,
    error,
  } = useFetch("?category=health&type=negative");

  const {
    loading: loadingPos,
    data: petDataPos,
    error: errorPos,
  } = useFetch("?category=health&type=positive");
  
  useEffect(() => {
    if (selectedCategory && selectedType) {
      if (selectedType === "positive") {
        console.log(`${selectedCategory}_noun`);
        const noun = petDataPos[`${selectedCategory}_noun`];
        const adj = petDataPos[`${selectedCategory}_adj`];
        console.log(noun, adj);
        setNounData(noun);
        setAdjData(adj);
      } else {
        const noun = petDataNega[`${selectedCategory}_noun`];
        const adj = petDataNega[`${selectedCategory}_adj`];
        setNounData(noun);
        setAdjData(adj);
      }
    }
  }, [selectedCategory, selectedType]);
  const nounLabel = nounData?.map((i) => i?.item);
  const nounFrequency = {
    labels: nounLabel,
    datasets: [
      {
        label: "Vấn đề",
        data: nounData?.map((i) => i.frequency),
        borderColor:
          selectedType === "positive"
            ? "rgba(53, 162, 235, 0.5)"
            : "rgb(255, 99, 132)",
        backgroundColor:
          selectedType === "positive"
            ? "rgba(53, 162, 235, 0.5)"
            : "rgb(255, 99, 132)",
      },
    ],
  };
  const adjLabel = adjData?.map((i) => i?.item);
  const adjFrequency = {
    labels: adjLabel,
    datasets: [
      {
        label: "Cảm nhận người dùng",
        data: adjData?.map((i) => i.frequency),
        borderColor:
          selectedType === "positive"
            ? "rgba(53, 162, 235, 0.5)"
            : "rgb(255, 99, 132)",
        backgroundColor:
          selectedType === "positive"
            ? "rgba(53, 162, 235, 0.5)"
            : "rgb(255, 99, 132)",
      },
    ],
  };

  if (loading || loadingPos) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <div className="category-title">Lựa chọn danh mục</div>
      <select
        name="category"
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value={""}>Chọn một danh mục</option>
        <option value={"vitamins"}>Vitamins</option>
        <option value={"self-hygiene"}>Self-hygiene</option>
        <option value={"q-tip"}>Tăm bông</option>
        <option value={"massage"}>Massage</option>
        <option value={"mask"}>Mặt nạ</option>
        <option value={"heathcare"}>Healthcare</option>
        <option value={"drugs"}>Dược phẩm</option>
        <option value={"contact-lens"}>Kính áp tròng</option>
        <option value={"condoms"}>BCS</option>
        <option value={"accessories"}>Phụ kiện</option>
      </select>
      <select
        name="category"
        id="category"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value={""}>Chọn một danh mục</option>
        <option value={"positive"}>Comment tích cực</option>
        <option value={"negative"}>Comment tiêu cực</option>
      </select>
      <Bar options={getOptions("Vấn đề quan tâm")} data={nounFrequency} />
      <Bar options={getOptions("Nhận xét người dùng")} data={adjFrequency} />
    </div>
  );
};
export default Healthcare;
