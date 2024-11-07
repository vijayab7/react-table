import React, { useMemo } from 'react';
import { useTable, useBlockLayout } from 'react-table';
import { COLUMNS,GROUPED_COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';
import {Styless} from '../styles/sticky.css'
import '../styles/sticky.css'
import { useSticky } from 'react-table-sticky';

export const StickyTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data },
    useBlockLayout,
    useSticky
  );
  const firstPageRows = rows.slice(0,20);

  return (
    <div
      {...getTableProps()}
      className="table sticky"
      style={{ width: 800, height: 400 }}
    >
      <div className="header">
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()} className="th">
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()} className="body">
        {firstPageRows.map((row, i) => {
          prepareRow(row);
          return (
            <div {...row.getRowProps()} className="tr">
              {row.cells.map(cell => {
                return (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render("Cell")}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
