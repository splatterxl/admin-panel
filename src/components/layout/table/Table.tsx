import React from "react"
import { TableData } from "./TableData"
import { TableRows } from "./rows/TableRows"

export const Table: React.FC<{
  children: React.ReactNode
  data?: Record<string, React.ReactNode>
}> = ({ children, data }) => {
  if (children && !data) {
    return <TableRows>{children}</TableRows>
  } else if (data && !children) {
    return <TableData data={data} />
  } else {
    throw "Violation: tables must have only one of data or children"
  }
}
