"use client";

import {
	flexRender,
	type RowData,
	type Table,
	type TableFeatures,
} from "@tanstack/react-table";
import { cn } from "cn";
import type { ReactNode } from "react";

import {
	Table as ShadcnTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

type DataTableProps<TFeatures extends TableFeatures, TData extends RowData> = {
	table: Table<TFeatures, TData>;
	className?: string;
	emptyMessage?: ReactNode;
};

export function DataTable<
	TFeatures extends TableFeatures,
	TData extends RowData,
>({
	table,
	className,
	emptyMessage = "بدون داده.",
}: DataTableProps<TFeatures, TData>) {
	const rows = table.getRowModel().rows;
	const headerGroups = table.getHeaderGroups();
	const visibleColumnIds = new Set(
		headerGroups.at(-1)?.headers.map((header) => header.column.id) ?? [],
	);
	const columnCount = visibleColumnIds.size || 1;

	return (
		<ShadcnTable className={cn("min-w-full", className)}>
			<TableHeader>
				{headerGroups.map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead key={header.id} colSpan={header.colSpan}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
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
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
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
	);
}
