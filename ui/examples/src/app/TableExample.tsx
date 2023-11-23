import { createRef, useEffect, useState } from 'react';
import { Person, makeData } from './data/data';
import { Button, Field, Radio, RadioGroup } from '@fluentui/react-components';
import { EditRegular, DeleteRegular } from '@fluentui/react-icons';
import {
  ColumnDef,
  Table,
  TableRef,
  TableState,
  TableView,
  createColumnHelper,
} from '@prt-ts/fluent-react-table-v2';
import { useNavigate } from 'react-router-dom';
import * as React from "react";
import {
  FontIncrease24Regular,
  FontDecrease24Regular,
  TextFont24Regular,
  MoreHorizontal24Filled,
} from "@fluentui/react-icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components";
import { tableViews as views } from './data/tableView';

export function TableExample() {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Person>();
  const tableRef = createRef<TableRef<Person>>();
  const [data, setData] = useState<Person[]>([]);
  const [tableViews, setTableViews] = useState<TableView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectionMode, setSelectionMode] = useState<
    'single' | 'multiple' | undefined
  >('multiple');

  const logSelectedRows = () => {
    const table = tableRef.current?.table;
    const selectedRow = table
      ?.getSelectedRowModel()
      .flatRows.map((row) => row.original);
    console.log(selectedRow);
  };

  const logTableState = () => {
    const tableState = tableRef.current?.getTableState();
    console.log(tableState);
  };

  const saveCurrentTableState = () => {
    const tableState = tableRef.current?.getTableState();
    localStorage.setItem('view1', JSON.stringify(tableState));
    console.log(tableState);
  };

  const applyLastSavedTableState = () => {
    const tableState = JSON.parse(localStorage.getItem('view1') || '') as TableState;
    tableRef.current?.applyTableState(tableState);
    console.log(tableState);
  };

  const applyBeforeEditState = () => {
    const localStorageString = localStorage.getItem('table1_edit_temp');
    if (!localStorageString) return;

    const tableState = JSON.parse(localStorageString) as TableState;
    tableRef.current?.applyTableState(tableState);
    console.log(tableState);
  };

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => 'ID',
      cell: ({ row }) => {
        return (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button
              icon={<EditRegular />}
              aria-label="Edit"
              size="small"
              onClick={async () => {
                const tableState = tableRef.current?.getTableState();
                localStorage.setItem('table1_edit_temp', JSON.stringify(tableState));
                navigate(`/dummy-edit/${row.getValue('id')}/edit`);
              }}
            />
            <Button
              icon={<DeleteRegular />}
              aria-label="Delete"
              size="small"
              onClick={() => {
                const confirm = window.confirm(
                  'Are you sure you want to delete this row?'
                );
                if (confirm) {
                  alert('Deleted');
                }
              }}
            />
            <strong>{row.getValue('id')}</strong>
          </div>
        );
      },
      aggregatedCell: () => null,
      filterFn: 'includeArray',
      enableGrouping: false,
      enableHiding: false,
    }),
    columnHelper.accessor('firstName', {
      id: 'firstName',
      header: () => 'First Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: 'lastName',
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
      aggregatedCell: () => null,
    }),
    columnHelper.accessor('age', {
      id: 'age',
      header: () => 'Age (Additional text for Long header)',
      cell: (info) => info.renderValue(),
      filterFn: 'includesString',
      aggregationFn: 'mean',
      size: 200,
      maxSize: 800,
      enableGrouping: false,
    }),
    columnHelper.accessor('visits', {
      id: 'visits',
      header: () => <span>Visits</span>,
      filterFn: 'inNumberRange',
      enableHiding: false,
    }),
    columnHelper.accessor('progress', {
      id: 'progress',
      header: 'Profile Progress',
      aggregatedCell: () => null,
    }),
    columnHelper.group({
      id: 'address',
      header: 'Address',
      columns: [
        columnHelper.accessor('address.street', {
          id: 'street',
          header: 'Street',
          aggregatedCell: () => null,
        }),
        columnHelper.accessor('address.city', {
          id: 'city',
          header: 'City',
          aggregatedCell: () => null,
        }),
        columnHelper.accessor('address.state', {
          id: 'state',
          header: 'State',
          aggregatedCell: () => null,
          filterFn: 'arrIncludesSome',
        }),
        columnHelper.accessor('address.zipCode', {
          id: 'zipCode',
          header: 'Zip Code',
          aggregatedCell: () => null,
          enableColumnFilter: false,
          enableGlobalFilter: false,
          enableGrouping: false,
          enableHiding: false,
          enablePinning: false,
          enableSorting: false,
        }),
        columnHelper.accessor('address.country', {
          id: 'country',
          header: 'Country',
          aggregatedCell: () => null,
          filterFn: 'arrIncludes',
        }),
      ],
    }),
    columnHelper.group({
      id: 'additionalInfo',
      header: 'Additional Info',
      columns: [
        columnHelper.accessor('status', {
          id: 'status',
          header: 'Status',
          aggregatedCell: () => null,
          filterFn: 'arrIncludesSome',
        }),
        columnHelper.accessor(({createdAt}) => createdAt, {
          id: 'createdAt',
          header: 'Created At',
          cell: (info) =>
            info.renderValue()
              ? new Date(info.renderValue() as Date)?.toLocaleDateString()
              : '',
          aggregatedCell: () => null,
          filterFn: 'dateRange',
        }) as ColumnDef<Person>,
      ],
    }),
  ] as ColumnDef<Person>[];

  // const columns: ColumnDef<Person>[] = [
  //   {
  //     id: 'id',
  //     accessorKey: 'id',
  //     header: () => 'ID',
  //     cell: ({ row }) => {
  //       return (
  //         <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
  //           <Button
  //             icon={<EditRegular />}
  //             aria-label="Edit"
  //             size="small"
  //             onClick={async () => {
  //               const tableState = tableRef.current?.getTableState();
  //               localStorage.setItem('table1_edit_temp', JSON.stringify(tableState));
  //               navigate(`/dummy-edit/${row.getValue('id')}/edit`);
  //             }}
  //           />
  //           <Button
  //             icon={<DeleteRegular />}
  //             aria-label="Delete"
  //             size="small"
  //             onClick={() => {
  //               const confirm = window.confirm(
  //                 'Are you sure you want to delete this row?'
  //               );
  //               if (confirm) {
  //                 alert('Deleted');
  //               }
  //             }}
  //           />
  //           <strong>{row.getValue('id')}</strong>
  //         </div>
  //       );
  //     },
  //     aggregatedCell: () => null,

  //     filterFn: 'arrIncludesSome',
  //     enableGrouping: false,
  //     enableHiding: false,
  //   },
  //   {
  //     id: 'firstName',
  //     accessorKey: 'firstName',
  //     header: () => 'First Name',
  //     cell: (info) => info.getValue(),
  //   },
  //   {
  //     id: 'lastName',
  //     accessorKey: 'lastName',
  //     cell: (info) => <i>{info.getValue() as string}</i>,
  //     header: () => <span>Last Name</span>,
  //     aggregatedCell: () => null,
  //   },
  //   {
  //     id: 'age',
  //     accessorKey: 'age',
  //     header: () => 'Age (Additional text for Long header)',
  //     cell: (info) => info.renderValue(),
  //     filterFn: 'includesString',
  //     aggregationFn: 'mean',
  //     size: 200,
  //     maxSize: 800,
  //     enableGrouping: false,
  //   },
  //   {
  //     id: 'visits',
  //     accessorKey: 'visits',
  //     header: () => <span>Visits</span>,
  //     filterFn: 'inNumberRange',
  //     enableHiding: false,
  //   },
  //   {
  //     id: 'progress',
  //     accessorKey: 'progress',
  //     header: 'Profile Progress',
  //     aggregatedCell: () => null,
  //   },
  //   {
  //     id: 'address',
  //     header: 'Address',
  //     columns: [
  //       {
  //         id: 'street',
  //         accessorFn: (row) => row.address.street,
  //         header: 'Street',
  //         aggregatedCell: () => null,
  //       },
  //       {
  //         id: 'city',
  //         accessorFn: (row) => row.address.city,
  //         header: 'City',
  //         aggregatedCell: () => null,
  //       },
  //       {
  //         id: 'state',
  //         accessorFn: (row) => row.address.state,
  //         header: 'State',
  //         aggregatedCell: () => null,
  //         filterFn: 'arrIncludesSome',
  //       },
  //       {
  //         id: 'zipCode',
  //         accessorFn: (row) => row.address.zipCode,
  //         header: 'Zip Code',
  //         aggregatedCell: () => null,
  //         enableColumnFilter: false,
  //         enableGlobalFilter: false,
  //         enableGrouping: false,
  //         enableHiding: false,
  //         enablePinning: false,
  //         enableSorting: false,
  //       },
  //       {
  //         id: 'country',
  //         accessorFn: (row) => row.address.country,
  //         header: 'Country',
  //         aggregatedCell: () => null,
  //         filterFn: 'arrIncludes',
  //       },
  //     ],
  //   },
  //   {
  //     id: 'additionalInfo',
  //     header: 'Additional Info',
  //     columns: [
  //       {
  //         id: 'status',
  //         accessorFn: (row) => row.status,
  //         header: 'Status',
  //         aggregatedCell: () => null,
  //         filterFn: 'arrIncludesSome',
  //       },
  //       {
  //         id: 'createdAt', 
  //         accessorFn: (row) => row.createdAt,
  //         aggregatedCell: () => null,
  //         header: 'Created At',
  //         filterFn: 'dateRange' as any,
  //         cell: (info) =>
  //           info.renderValue()
  //             ? new Date(info.renderValue() as Date)?.toLocaleDateString()
  //             : '',
  //       }
  //     ]
  //   }
  // ];


  // get data from server
  useEffect(
    () => {
      const timeout = setTimeout(() => {
        setData(() => makeData(10000));
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    []
  );

  // get data from server
  useEffect(
    () => {
      const timeout = setTimeout(() => {
        setTableViews(() => views);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    []
  );

  // apply before edit state so that the table state is applied after the data is loaded
  useEffect(
    () => {
      applyBeforeEditState();
      if (data?.length > 0) {
        localStorage.removeItem('table1_edit_temp');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );



  return (
    <div>
      <button onClick={logSelectedRows}>Log Selected Rows</button>
      <button onClick={logTableState}>Get Table State</button>
      <button onClick={saveCurrentTableState}>Save Current View</button>
      <button onClick={applyLastSavedTableState}>
        Apply Last Saved Table State
      </button>
      <Field label="Selection Mode">
        <RadioGroup
          value={selectionMode}
          onChange={(_, data) =>
            setSelectionMode(data.value as unknown as 'single' | 'multiple')
          }
          layout="horizontal"
        >
          <Radio value={''} label="None" />
          <Radio value={'single'} label="Single" />
          <Radio value={'multiple'} label="Multiple" />
        </RadioGroup>
      </Field>
      <Table
        ref={tableRef}
        data={data}
        columns={columns}
        pageSize={100}
        pageSizeOptions={[10, 20, 100, 1000, 10000]}
        isLoading={isLoading}
        gridTitle={<strong>Grid Header</strong>}
        headerMenu={(selectedItems) => <TopToolbar selectedItems={selectedItems} />}
        rowSelectionMode={selectionMode}
        columnVisibility={{
          progress: false,
          firstName: false,
        }}
        // sortingState={[
        //   { id: "id", desc: false }
        // ]}
        // columnPinningState={
        //   {
        //     left: ["state"],
        //   }
        // }
        // groupingState={["status"]}
        // expandedState={{
        //   "status:complicated": true
        // }}
        // noItemPage={<div>No Item</div>}
        // noFilterMatchPage={<div>No Filter Match</div>}
        views={tableViews}
      />
    </div>
  );
}

export const TopToolbar: React.FC<{
  selectedItems: Person[];
}> = ({ selectedItems }) => {

  console.log(selectedItems);
  return (
    <>
      Selected Items: {selectedItems?.length}
      <Toolbar aria-label="Default" >
        <ToolbarButton
          aria-label="Increase Font Size"
          appearance="primary"
          icon={<FontIncrease24Regular />}
        />
        <ToolbarButton
          aria-label="Decrease Font Size"
          icon={<FontDecrease24Regular />}
        />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
        {selectedItems?.length === 1 && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button
              icon={<EditRegular />}
              aria-label="Edit"
              size="small"
              onClick={async () => {
                alert('Edit');
              }}
            />
            <Button
              icon={<DeleteRegular />}
              aria-label="Delete"
              size="small"
              onClick={() => {
                const confirm = window.confirm(
                  'Are you sure you want to delete this row?'
                );
                if (confirm) {
                  alert('Deleted');
                }
              }}
            />
          </div>
        )}
        {selectedItems?.length === 1 && (
          <><ToolbarDivider />
            <Menu>
              <MenuTrigger>
                <ToolbarButton aria-label="More" icon={<MoreHorizontal24Filled />} />
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem>New </MenuItem>
                  <MenuItem>New Window</MenuItem>
                  <MenuItem disabled>Open File</MenuItem>
                  <MenuItem>Open Folder</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu></>)}
      </Toolbar></>
  );
}
