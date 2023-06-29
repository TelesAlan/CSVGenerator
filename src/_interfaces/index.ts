/***************************
** DEFAULT TABLE
***************************/
export interface ColumnProps<props>{
    id: keyof props
    label: string
    style?: React.CSSProperties
    align?: 'right'|"left"|"center"
    actionCell?: boolean
}
export interface DefaultTableProps {
    columns: any[]

    tbody: React.ReactNode
    length: number

    page: number
    setPage: (data: number) => void

    rowsPerPage: number
    setRowsPerPage: (data: number) => void
}
export interface DefaultTableAttrProps<props>{
    onDelete?: (data: props) => void
    onEdit?: (data: props) => void
    onSelected?: (data: props) => void
    rows: props[] 
    defaultRowsPerPage?: number
}
export interface TagsTableHeadProps<T> {
    order: 'asc' | 'desc'
    orderBy: string | number | symbol
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
}