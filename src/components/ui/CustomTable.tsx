import { flexRender, type Table } from "@tanstack/react-table";
import TableRow from "./TableRow";

type CustomTableProps<T> = {
  table: Table<T>;
};

const CustomTable = <T,>({ table }: CustomTableProps<T>) => {
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} row={row}>
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="px-6 py-4 whitespace-nowrap md:text-sm font-light text-xs"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default CustomTable;
