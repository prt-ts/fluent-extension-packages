import { Table } from '@prt-ts/fluent-react-table-v2';
import { Form } from "@prt-ts/fluent-react-hook-form";
import { Button } from "@fluentui/react-components";
import { useEditableGrid } from "./useEditableGrid";
// define schema for the form

export function EditableGrid() {

    const {
        form,
        columns,
        gridData,
        handleError,
        handleSubmit
    } = useEditableGrid();

    return (
        <div>
            <Form form={form} onSubmit={handleSubmit} onError={handleError}>
                <Button type="submit">
                    Submit
                </Button>
                <Table
                    data={[...gridData]}
                    columns={columns}
                    pageSize={1_000_000}
                    tableHeight="750px"
                    disableTableHeader
                    disablePagination
                    columnPinningState={{
                        left: ["id"],
                        right: []
                    }}
                    isLoading={!gridData?.length}
                />
            </Form>
        </div>
    );
}
