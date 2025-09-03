import type { Row } from "@tanstack/react-table";
import { type JSX, type PropsWithChildren } from "react";

type TableRowProps<T> = PropsWithChildren & {
  row: Row<T>;
};

const TableRow = <T,>({ children, row }: TableRowProps<T>): JSX.Element => {
  return (
    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
      {children}
    </tr>
  );
};

export default TableRow;
