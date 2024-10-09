import React from "react";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../context/financeRecord.jsx";

function FinanceForm(){
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const {addRecord} = useFinancialRecords();

  const { user } = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: parseFloat(amount),
      category: category,
      paymentMethod: paymentMethod,
    };

    console.log(newRecord);

    addRecord(newRecord);

    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };
    
    return(
        <div className="max-w-md mx-auto p-6">
            <h2 className="font-semibold text-center">Add Your Expense Here:</h2>
  
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                <div className="form-field mb-4 flex items-center">
                    <label className="block text-sm font-medium text-gray-700 w-1/3">Description:</label>
                    <input
                    type="text"
                    required
                    className="mt-1 p-2 block w-2/3 border border-gray-300 rounded-md focus:ring-blue-600"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-field mb-4 flex items-center">
                    <label className="block text-sm font-medium text-gray-700 w-1/3">Amount:</label>
                    <input
                    type="number"
                    required
                    className="mt-1 p-2 block w-2/3 border border-gray-300 rounded-md focus:ring-blue-600"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="form-field mb-4 flex items-center">
                    <label className="block text-sm font-medium text-gray-700 w-1/3">Category:</label>
                    <select
                    required
                    className="mt-1 p-2 block w-2/3 border border-gray-300 rounded-md focus:ring-blue-600"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                    <option value="">Select a Category</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Salary">Salary</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-field mb-4 flex items-center">
                    <label className="block text-sm font-medium text-gray-700 w-1/3">Payment Method:</label>
                    <select
                    required
                    className="mt-1 p-2 block w-2/3 border border-gray-300 rounded-md focus:ring-blue-600"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    <option value="">Select a Payment Method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Add Record
                </button>
            </form>
        </div>
    </div>


);
}

export default FinanceForm;