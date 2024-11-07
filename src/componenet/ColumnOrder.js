import React, { useMemo } from 'react';
import { useTable ,useColumnOrder} from 'react-table';
import { COLUMNS,GROUPED_COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';
import '../styles/taa.css'

export const ColumnOrder = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setColumnOrder,
  } = useTable({ columns, data },
    useColumnOrder
  );

  const randomizeColumns = () => {
    setColumnOrder([
      //accessor
      'id',
      'first_name',
      'last_name',
      'phone',
      'country',
      'date_of_birth',
      'email'
    ])
  }
  return (
    <><button onClick={() => randomizeColumns({})}>Randomize Columns</button>
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map(cell => {
                const { key, ...cellProps } = cell.getCellProps(); // Extract unique key for each cell
                return (
                  <td key={key} {...cellProps}> {/* Use key directly */}
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table></>
  );
};
