import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    element: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    //includes a dollar sign in  the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};
function LineGraph(caseType = "cases") {
    const [data, setData] = useState({});

    const buildChartData = (data, caseType = "cases") => {

        const chartdata = [];
        let lastDataPoint;
        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[caseType][date] - lastDataPoint
                };
                chartdata.push(newDataPoint);
            }
            lastDataPoint = data[caseType][date];
        }
        return chartdata;
    };



    useEffect(() => {
        const fetchData = async() => {
           await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=75')
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                const chartData = buildChartData(data);
                setData(chartData);
            });
        };
        fetchData();
    },[caseType]);



    return (
        <div className="lineGraph">
            
            {data?.length > 0 &&(
                <Line
                data={{
                datasets: [{
                    backgroundColor: "rgba(204,16,52,0.5)",
                    borderColor: "#CC1034",
                    data: data
                },],
            }}
            options={options} 
            ></Line>
            )}
            
        </div>
    )
}

export default LineGraph
