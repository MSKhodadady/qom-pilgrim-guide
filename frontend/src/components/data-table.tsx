"use client";

import { flexRender, type RowData, type Table, type TableFeatures } from "@tanstack/react-table";
import { cn } from "cn";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Table as ShadcnTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TablePagination = {
  state: {
    pagination: {
      pageIndex: number;
      pageSize: number;
    };
  };
  firstPage(): void;
  previousPage(): void;
  nextPage(): void;
  lastPage(): void;

  getPageCount: () => number;
  getRowCount: () => number;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  previousPage: () => void;
  setPageSize: (updater: number) => void;
};

type DataTableProps<TFeatures extends TableFeatures, TData extends RowData> = {
  table: Table<TFeatures, TData>;
  className?: string;
  emptyMessage?: ReactNode;
  pagination?: TablePagination;
};

export function DataTable<TFeatures extends TableFeatures, TData extends RowData>(P: DataTableProps<TFeatures, TData>) {
  const { table, className, emptyMessage = "بدون داده." } = P;

  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();
  const visibleColumnIds = new Set(headerGroups.at(-1)?.headers.map((header) => header.column.id) ?? []);

  const columnCount = visibleColumnIds.size || 1;

  return (
    <div className="space-y-4">
      <ShadcnTable className={cn("min-w-full", className)}>
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.id}>
                {row
                  .getAllCells()
                  .filter((cell) => visibleColumnIds.has(cell.column.id))
                  .map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnCount} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ShadcnTable>

      {P.pagination !== undefined && <DataTablePagination paginationTable={P.pagination} />}
    </div>
  );
}

export function DataTablePagination(props: { paginationTable: TablePagination }) {
  const t = props.paginationTable;

  const { pageSize } = t.state.pagination;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground" aria-live="polite">
        نمایش {t.state.pagination.pageIndex + 1} از {t.getPageCount()}
      </p>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          تعداد در صفحه
          <select
            className="h-8 rounded-md border border-input bg-background px-2 text-foreground"
            value={pageSize}
            onChange={(event) => t.setPageSize(Number(event.currentTarget.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </label>
        <Button variant="outline" size="sm" disabled={!t.getCanPreviousPage()} onClick={t.previousPage}>
          قبلی
        </Button>
        <Button variant="outline" size="sm" disabled={!t.getCanNextPage()} onClick={t.nextPage}>
          بعدی
        </Button>
      </div>
    </div>
  );
}
