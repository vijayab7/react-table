import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import { COLUMNS,GROUPED_COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';
import '../styles/taa.css'

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setPageSize,
    prepareRow,
  } = useTable({ columns, data }, usePagination);

  const {pageIndex,pageSize} = state

  return (
    <><table {...getTableProps()} className="table">
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
        {page.map(row => {
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
    </table><div style={ {textAlign : 'center'}}>
      <span>page{''}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{''}
      </span>
      <span> | Go to Page : {''}
        <input type='number' defaultValue={pageIndex + 1}
        onChange={(e) => {
          const pageNumber = e.target.value ? Number(e.target.value)-1 : 0
          gotoPage(pageNumber)
        }}
        style={{width:'50px'}}/>
      </span>
<span>
  <select
  value={pageSize}
  onChange={(e) => setPageSize(Number(e.target.value))}
  >
    {[5,10,20].map((pageSize) => (
      <option key={pageSize} value={pageSize}>
        show{pageSize}
      </option>
    ))}
  </select>
</span>
      <button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>

      <button onClick={()=> previousPage()} disabled={!canPreviousPage}>Previous</button>
      <button onClick={()=> nextPage()} disabled={!canNextPage}>Next</button>
      <button onClick={()=> gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>

      </div></>
  );
};
