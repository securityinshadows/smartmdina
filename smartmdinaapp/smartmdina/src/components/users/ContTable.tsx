import React from 'react';

type DataItem = {
  [key: string]: string | number | boolean | undefined; // Same DataItem type as ContributorModule
};

type ContributorTableProps = {
  category: string;
  data: DataItem[];
  onEdit: (data: DataItem) => void;
};

const ContributorTable: React.FC<ContributorTableProps> = ({ category, data, onEdit }) => {
  if (!data.length) return <p>No data available for {category}</p>;

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => {
            // Exclude the 'author' key from the table headers
            if (key === 'author') return null;
            return <th key={key}>{key}</th>;
          })}
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.entries(item).map(([key, value], idx) => {
              // Skip rendering the 'author' field
              if (key === 'author') return null;

              return (
                <td key={idx}>
                  {value}
                </td>
              );
            })}
            <td>
              <button onClick={() => onEdit(item)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContributorTable;
