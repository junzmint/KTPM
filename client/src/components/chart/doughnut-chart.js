'use client'
import React from 'react'
import { useState, useEffect } from "react";
import{
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function DoughnutChart (){
    const [statistic, setStatistic] = useState([]);
    const [citizen, setCitizen] = useState([]);
    const [userRoles, setUserRoles] = useState({});

  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      try {
        const response = await fetch("http://localhost:4000/citizen/statistic", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response2 = await fetch("http://localhost:4000/citizen/list", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        const statisticResponse = data.data;
        setStatistic(statisticResponse);
        
        const data2 = await response2.json();
        const citizenList = data2.data.list;
        setCitizen(citizenList);

        setUserRoles(localStorage.role);
       } catch (e) {
        console.error(e);
      }
    })();
  }, []);
    const data = {
        labels : ['Male','Female', 'Other'],
        datasets: [{
            label: 'So luong',
            data : [statistic.maleTotal, statistic.femaleTotal, statistic.otherTotal],
            backgroundColor: [      
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            borderColor: [      
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset : 4
        }]
    }

    
    return(
        <div >
            <Doughnut data = {data}>               
            </Doughnut>
        </div>
    );
}

export default DoughnutChart;