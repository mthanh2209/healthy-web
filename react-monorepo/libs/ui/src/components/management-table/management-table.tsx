import { memo, useState } from 'react'
import {
  AspectRatio,
  ChakraProps,
  Flex,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from '@chakra-ui/react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  ColumnDef,
  Row,
  RowData,
} from '@tanstack/react-table'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import isEqual from 'react-fast-compare'

import { isOverDue } from '@react-monorepo/utils'
import noDataImg from '../../../assets/images/no-data.webp'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    getRowStyles: (row: Row<TData>) => ChakraProps['sx']
  }
}

export interface ManagementTableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T, unknown>[]
  caption?: string
}

const ManagementTable = memo(<T extends object>({ data, caption, columns }: ManagementTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    meta: {
      getRowStyles: (row: Row<T & Partial<Record<'borrow_date', string>>>): ChakraProps['sx'] => {
        if (!row.original.borrow_date) return {}

        return {
          bgColor: isOverDue(row.original.borrow_date) ? 'red.200' : 'white',
          color: isOverDue(row.original.borrow_date) ? 'white' : 'black',
        }
      },
    },
  })

  if (!data.length)
    return (
      <>
        <AspectRatio ratio={1} maxW="300px" m="0 auto">
          <Image src={noDataImg} objectFit="contain" alt="no data found image" />
        </AspectRatio>
        <Heading fontSize={24} textAlign="center" fontWeight={'medium'} color="dust.200">
          There's no data!!!
        </Heading>
      </>
    )

  return (
    <TableContainer shadow="form" borderRadius="xl">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    py={3}
                    fontWeight="medium"
                    cursor="pointer"
                    color="dust.200"
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex align="center" pos="relative">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <chakra.span pos="absolute" right={0}>
                        {header.column.getIsSorted() &&
                          (header.column.getIsSorted() === 'asc' ? (
                            <FiChevronUp size={20} />
                          ) : (
                            <FiChevronDown size={20} />
                          ))}
                      </chakra.span>
                    </Flex>
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} sx={table.options.meta?.getRowStyles(row)}>
              {row.getVisibleCells().map((cell) => (
                <Td fontSize="14px" py={2} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}, isEqual)

export default ManagementTable
