import { flexRender, type Table } from "@tanstack/react-table";

interface TableHeadProps<T> {
  table: Table<T>;
}

const TableHead = <T,>({ table }: TableHeadProps<T>) => {
  return (
    <thead className="bg-gradient-to-r from-red-100 to-green-100">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="text-xs">
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="px-6  py-3 text-left text-xs font-light md:font-medium text-gray-500 uppercase tracking-wider"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHead;
