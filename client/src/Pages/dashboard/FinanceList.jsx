import { useMemo, useState } from "react";
import { useFinancialRecords } from "../../context/financeRecord";
import { useTable } from "react-table";



const EditableCell = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
  options,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    setIsEditing(false);
    updateRecord(row.index, column.id, value);
  };

  return (
    <div
      onClick={() => editable && setIsEditing(true)}
      style={{ cursor: editable ? "pointer" : "default" }}
    >
      {isEditing ? (
        options ? ( // If options are provided, render a select dropdown
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            className="border p-1 w-full"
          >
            {options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            onBlur={onBlur}
            className="border p-1 w-full"
          />
        )
      ) : typeof value === "string" ? (
        value
      ) : (
        value.toString()
      )}
    </div>
  );
};



function FinanceList() {
  const { records, updateRecord, deleteRecord } = useFinancialRecords();
  

  const updateCellRecord = (rowIndex, columnId, value) => {
    const id = records[rowIndex]?._id;
    updateRecord(id ?? "", { ...records[rowIndex], [columnId]: value });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
            options={["Food", "Rent", "Salary", "Utilities", "Entertainment", "Other"]} // Options for category
          />
        ),
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
            options={["Credit Card", "Cash", "Bank Transfer"]} // Options for payment method
          />
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={false}
          />
        ),
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({ row }) => (
          <button
            onClick={() => deleteRecord(row.original._id ?? "")}
            className="button bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
        ),
      },
    ],
    [records]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: records,
  });


  

  return (
    <div className="table-container w-full mx-auto p-6">
  <table {...getTableProps()} className="table-auto w-full border-collapse border border-gray-300">
    <thead>
      {headerGroups.map((hg) => (
        <tr {...hg.getHeaderGroupProps()} className="bg-blue-600 text-white">
          {hg.headers.map((column) => (
            <th {...column.getHeaderProps()} className="px-4 py-2 border border-gray-300 text-left">
              {column.render("Header")}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row, idx) => {
        prepareRow(row);
        return (
          <tr
            {...row.getRowProps()}
            className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"} // Alternating row colors
          >
            {row.cells.map((cell) => (
              <td {...cell.getCellProps()} className="px-4 py-2 border border-gray-300">
                {cell.render("Cell")}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
  );
};

export default FinanceList;