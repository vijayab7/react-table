import React, { useMemo } from 'react';
import { useTable , useGlobalFilter, useFilters   } from 'react-table';
import { COLUMNS,GROUPED_COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';
import '../styles/taa.css'
import { Globalfilter } from './GlobalFilter';

export const BasicWithFilter = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,state, setGlobalFilter
  } = useTable({ columns, data }, useGlobalFilter , useFilters);
  const  { globalFilter } = state
  return (
    <>
    <Globalfilter filter={globalFilter} setFilter={setGlobalFilter} />
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
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
