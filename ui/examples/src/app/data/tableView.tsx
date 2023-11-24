import { TableView } from "@prt-ts/fluent-react-table-v2";

export const tableViews: TableView[] = [
  {
    id: 1,
    viewName: 'View 1',
    isGlobal: false,
    isViewOwner: true,
    tableState: {
      pagination: {
        pageSize: 20,
        pageIndex: 0,
      },
      sorting: [
        {
          id: 'firstName',
          desc: false,
        },
        {
          id: 'lastName',
          desc: false,
        },
      ],
      columnFilters: [
        {
          id: 'status',
          value: ['single'],
        },
        {
          id: 'country',
          value: ['United States of America'],
        },
      ],
      globalFilter: '',
      grouping: [],
      expanded: {},
      rowSelection: {
        0: true,
        1: true,
        2: true,
      },
      columnOrder: [
        'id',
        'firstName',
        'lastName',
        'age',
        'visits',
        'progress',
        'street',
        'zipCode',
        'city',
        'state',
        'country',
        'status',
        'createdAt',
      ],
      columnVisibility: {
        progress: false,
        firstName: true,
        lastName: false,
      },
      columnPinning: {
        left: ['id'],
        right: [],
      },
      columnSizing: {},
    },
  },
  {
    id: 2,
    viewName: 'View 2',
    isGlobal: false,
    isViewOwner: true,
    tableState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
      sorting: [
        {
          id: 'firstName',
          desc: true,
        },
        {
          id: 'lastName',
          desc: true,
        },
      ],
      columnFilters: [
        {
          id: 'status',
          value: ['relationship'],
        },
        {
          id: 'country',
          value: ['United States of America'],
        },
      ],
      globalFilter: '',
      grouping: ['status'],
      expanded: {
        'status:relationship': true,
        'status:single': true,
        'status:complicated': true,
      },
      rowSelection: {},
      columnOrder: [
        'id',
        'lastName',
        'firstName',
        'age',
        'visits',
        'progress',
        'street',
        'zipCode',
        'city',
        'state',
        'country',
        'status',
        'createdAt',
      ],
      columnVisibility: {
        progress: true,
        firstName: true,
      },
      columnPinning: {
        left: ['id'],
        right: [],
      },
      columnSizing: {},
    },
  },
];
