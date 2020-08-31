import React, {useState, usEffect, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

 

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        const fetchApi = async () => {
            setDailyData( await fetchDailyData());
        }


        fetchApi();
    }, []);

    const lineChart = (
        dailyData.length
        ? (
           <Line 
            data={{
                labels: dailyData.map(({date})=> date),
                datasets: [{
                    data: dailyData.map(({confirmed})=> confirmed),
                    label: "Infected", 
                    borderColor: "#3333ff", 
                    fill: true,
                    pointBorderColor: 'rgba(0,0,0,0)',
                }, {
                    data: dailyData.map(({deaths})=> deaths),
                    label: "Deaths", 
                    borderColor: 'rgba(200, 200, 200, 200)', 
                    fill: true,
                    pointBorderColor: 'rgba(0,0,0,0)',
                }],
            }}
        /> 
        ) : null
        
    );

    const barChart = (
        confirmed 
            ? (
              <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                        'rgba(56, 212, 17, 0.753)', 
                        'rgba(0, 204, 255, 0.5)', 
                        'rgba(44, 1, 28, 0.5)'
                    ],
                    data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false},
                    title: { display: true, text: `Current state in ${country}`},
                }}
              
              />  
            ) : null
    );
    

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;