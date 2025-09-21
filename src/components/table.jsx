// src/components/CustomTable.jsx
import React from "react";
import Button from "./button"; // tu componente de botones

const CustomTable = ({ title = "Lista", columns = [], data = [], onEdit, onDelete }) => {
  return (
    <div>
      <table className="min-w-full table-auto">
        <thead className="justify-between">
          <tr className="bg-gray-800">
            {columns.map((col, index) => (
              <th key={index} className="px-16 py-2">
                <span className="text-gray-300">{col}</span>
              </th>
            ))}
            <th className="px-16 py-2">
              <span className="text-gray-300">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-4 border-gray-200">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-16 py-2">
                  <span>{row[col]}</span>
                </td>
              ))}
              <td className="px-16 py-2 flex gap-2">
                <Button variant="editar" onClick={() => onEdit(row)}>
                  Editar
                </Button>
                <Button variant="cancelar" onClick={() => onDelete(row.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;