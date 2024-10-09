import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useFinancialRecords } from "../../context/financeRecord";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
  } from "chart.js";
  
  // Register the required components
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);
  



export const FinanceChart = () => {
    const { records = [] } = useFinancialRecords(); // Ensure records is at least an empty array
    const [chartData, setChartData] = useState({
      labels: [],
      datasets: [],
    });
  
    // Function to prepare chart data
    const prepareChartData = () => {
      if (records && records.length > 0) {
        const categories = [...new Set(records.map((record) => record.category))]; // Unique category labels
        const amounts = categories.map((category) => {
          return records
            .filter((record) => record.category === category)
            .reduce((sum, record) => sum + record.amount, 0);
        });
  
        // Transform data into format for Doughnut chart
        const data = {
          labels: categories,
          datasets: [
            {
              label: "Amount Spent",
              data: amounts,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        };
  
        setChartData(data);
      }
    };
  
    useEffect(() => {
      // Whenever records change, update the chart data
      prepareChartData();
    }, [records]);
    

    const options = {
        cutout: "70%", // Adjust this value to control the size of the hole in the center
        responsive: true,
        maintainAspectRatio: false, // Disable aspect ratio to control height and width manually
    };


    return (
        <div>
            <h2 className="font-semibold text-center">Spending By Category:</h2>
            <div className="h-5/6">
                {records && records.length > 0 ? (
                <Doughnut data={chartData} options={options} />
                ) : (
                <p>No financial data available</p>
                )}
            </div>
        </div>
    );
};