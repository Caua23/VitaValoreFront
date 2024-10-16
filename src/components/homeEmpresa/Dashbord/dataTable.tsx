  "use client"

  import * as React from "react"
  import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
  } from "@radix-ui/react-icons"
  import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"

  import { Button } from "@/components/ui/button"

  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { VendasProps } from "@/interface/VendasProps"



  // eslint-disable-next-line react-refresh/only-export-components
  export const columns: ColumnDef<VendasProps>[] = [

    {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => {
        const status = row.getValue("status"); 
        return (
          <div>{typeof status === "string" ? status.toLowerCase() : ""}</div>
        );
      },
    },
    
    {
      accessorKey: "produto",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Produto
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("produto")}</div>,
    },
    {
      accessorKey: "pago",
      header: () => <div className="text-right">Pago</div>,
      cell: ({ row }) => {
        const pago = parseFloat(row.getValue("pago"))

        
        const formatted = new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(pago)

        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original

        return (
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-neutral-900">
              <DropdownMenuLabel className="text-neutral-50">Ações</DropdownMenuLabel>
              <DropdownMenuItem
              className="text-neutral-50"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copiar id de transferencia
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-neutral-50">Ver cliente</DropdownMenuItem>
              <DropdownMenuItem className="text-neutral-50">Ver detalhes do pagamento</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  function DataTable({ data }: { data: VendasProps[] })  {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    )
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })

    return (
      <div className="max-w-screen-2xl  bg-black p-7 rounded-3xl m-2 mb-2">
        <p className="text-neutral-50 font-semibold">Ultimos Produtos vendidos: </p>
        <div className="flex items-center py-4">
          
          <Input
            placeholder="Filtrar por Produto"
            value={(table.getColumn("produto")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("produto")?.setFilterValue(event.target.value)
            }
            className="max-w-sm text-white"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Colunas <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                    
                      key={column.id}
                      className="capitalize "  
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border-none">
          <Table className="">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-white ">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            
                              header.column.columnDef.header,
                              header.getContext(),
                              
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="text-white ">
              {table.getRowModel().rows?.length ? (
                
                table.getRowModel().rows.map((row) => (
                  <TableRow
                  className=""
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {
                    row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))
                    }
                  </TableRow>
                ))
              ) : (
                <TableRow >
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center " 
                  >
                    Sem resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
      </div>
    )
  }

  export default DataTable;