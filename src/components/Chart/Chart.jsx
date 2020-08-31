import React, {useState, usEffect, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

 

const Chart = () => {
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        const fetchApi = async () => {
            setDailyData( await fetchDailyData());
        }


        fetchApi();
    });

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
                }, {
                    data: dailyData.map(({deaths})=> deaths),
                    label: "Deaths", 
                    borderColor: "rgba(255, 0, 255, 0.5)", 
                    fill: true,

                }],
            }}
        /> 
        ) : null
        
    );
    

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart;