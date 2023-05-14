import { TableProps as FluentTableProps } from "@fluentui/react-components"

export type TableProps<TItem extends {}> =FluentTableProps & { 
    items : TItem[]

}
