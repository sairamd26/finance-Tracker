import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

// Define the structure of a financial record in a plain JavaScript object
export const FinancialRecordsContext = createContext(undefined);

export const FinancialRecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(
      `https://finance-tracker-server-git-main-sai-ram-dasarapus-projects.vercel.app/finance-records/getAllByUserID/${user.id}`
    );

    if (response.ok) {
      const records = await response.json();
      console.log(records);
      setRecords(records);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record) => {
    const response = await fetch("https://finance-tracker-server-git-main-sai-ram-dasarapus-projects.vercel.app/finance-records", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {
      console.error("Error adding record:", err);
    }
  };

  const updateRecord = async (id, newRecord) => {
    const response = await fetch(
      `https://finance-tracker-server-git-main-sai-ram-dasarapus-projects.vercel.app/finance-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const updatedRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => (record._id === id ? updatedRecord : record))
        );
      }
    } catch (err) {
      console.error("Error updating record:", err);
    }
  };

  const deleteRecord = async (id) => {
    const response = await fetch(
      `https://finance-tracker-server-git-main-sai-ram-dasarapus-projects.vercel.app/finance-records/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      }
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord}}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordsContext);

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};
