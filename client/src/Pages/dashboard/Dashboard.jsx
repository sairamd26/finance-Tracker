import {useUser} from "@clerk/clerk-react";
import FinanceForm from "./FinanceForm";
import FinanceList from "./FinanceList";
import { useFinancialRecords } from "../../context/financeRecord";
import { FinanceChart } from "./Dont";
import { useEffect, useState } from "react";

function Dashboard(){

    const {user} = useUser();
    const {records} = useFinancialRecords();
    const [total, setTotal] = useState(0);

    // Calculate the total 
    useEffect(() => {
        const calculatedTotal = records.reduce((acc, record) => {
        if (record.category === "Salary") {
            return acc + record.amount;
        } else {
            return acc - record.amount;
        }
        }, 0);

        setTotal(calculatedTotal);
    }, [records]);



    return(
        <div className="dashboard-container">
            <div className="flex justify-between p-5">
                <h1 className="font-bold text-xl">Welcome {user?.firstName}! here are your finances</h1>
                <h1 className="font-bold text-xl">Total:  {total}</h1>
            </div>
            
            <div className="grid grid-cols-2 gap-6 p-5">
                <div className="flex justify-center bg-white rounded-lg shadow-md"><FinanceForm /></div>
                <div className="flex justify-center bg-white rounded-lg shadow-md"><FinanceChart /></div>
                <div className="col-span-2 bg-white rounded-lg shadow-md"><FinanceList /></div>
            </div>
        </div>
    );
}

export default Dashboard;