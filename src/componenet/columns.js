import { format } from 'date-fns';
import { ColumnFilter } from './ColumnFilter'
import { isDisabled } from '@testing-library/user-event/dist/utils';

// columns.js
export const COLUMNS = [
  {
    Header: 'S.No',
    accessor: 'id',
    Filter: ColumnFilter,
    disableFilters : true,
    sticky: "left",
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
    Filter: ColumnFilter,
    sticky: "left",
  },
  {
    Header: 'Email',
    accessor: 'email',
    Filter: ColumnFilter,
  },
  {
    Header: 'DOB',
    accessor: 'date_of_birth',
    Cell: ({ value }) => {
      return value ? format(new Date(value), 'yyyy/MM/dd') : '';
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'Age',
    accessor: 'age',
    Filter: ColumnFilter,
  },
  {
    Header: 'Country',
    accessor: 'country',
    Filter: ColumnFilter,
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    Filter: ColumnFilter,
    sticky: 'right',
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: 'S.No',
    accessor: 'id',
  },
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
    
    ],
  },
  {
    Header: 'info',
    columns: [
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'DOB',
        accessor: 'date_of_birth',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
    
    ],
  },

];