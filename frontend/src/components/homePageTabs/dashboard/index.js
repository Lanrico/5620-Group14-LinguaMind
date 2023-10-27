import React, { useState, useRef, useEffect } from "react";
// import 'chart.js/auto';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
// ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [data, setData] = useState([
        {
            "roleType": "SCHEDULE_GENERATOR",
            "day": "2023-10-27",
            "totalRecords": 3
        },
        {
            "roleType": "ARTICLE_POLISH",
            "day": "2023-10-27",
            "totalRecords": 1
        },
        {
            "roleType": "CHINESE",
            "day": "2023-10-27",
            "totalRecords": 1
        }
    ]);

    const [usesData, setUsesData] = useState({});

    useEffect(() => {
        const rawUsesData = {};
        for (const elem of data) {
            if (!rawUsesData[elem.roleType]) {
                rawUsesData[elem.roleType] = elem.totalRecords;
            } else {
                rawUsesData[elem.roleType] += elem.totalRecords;

            }
        }
        setUsesData(rawUsesData);
    }, []);

    return <>
        <h1>Dashboard</h1>
        <h3>Total function visits</h3>
        <div>
            {data.map((el, index) => (<div>
                <p>Date: {el.day}</p>
                <p>Visits: {el.totalRecords}</p>
            </div>))}
            {/* <div>
                <div>10 - 26 5</div>
                <div>xxxxxxxxxxxxxxxxx</div>
            </div>
            <div>
                <div>10 - 27 10</div>
                <div>xxxxxxxxxxxxxxxxx</div>
            </div>
            <div>
                <div>10 - 28 5</div>
                <div>xxxxxxxxxxxxxxxxx</div>
            </div> */}
        </div>
        <h3>Uses of function</h3>
        {Object.keys(usesData).map((el, index) => (<div>
            <p>Type: {el}</p>
            <p>Uses: {usesData[el]}</p>
        </div>))}
        <div>
          
        </div>
    </>
}

export default Dashboard;