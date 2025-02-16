import React, { ReactNode } from 'react';

// Table Component
interface TableProps {
  children: ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, className }) => {
  return <table className={`table ${className || ''}`}>{children}</table>;
};

// TableBody Component
interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return <tbody className={`table-body ${className || ''}`}>{children}</tbody>;
};

// TableCell Component
interface TableCellProps {
  children: ReactNode;
  className?: string;
  colspan?: number;
}

const TableCell: React.FC<TableCellProps> = ({ children, className }) => {
  return <td className={`table-cell ${className || ''}`}>{children}</td>;
};

// TableHead Component
interface TableHeadProps {
    children?: ReactNode; // Add the question mark to make it optional
    className?: string;
  }

const TableHead: React.FC<TableHeadProps> = ({ children, className }) => {
  return <thead className={`table-head ${className || ''}`}>{children}</thead>;
};

// TableHeader Component
interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return <th className={`table-header ${className || ''}`}>{children}</th>;
};

// TableRow Component
interface TableRowProps {
  children: ReactNode;
  className?: string;
}

interface TableCellProps {
    children: ReactNode; // Add the question mark to make it optional
    className?: string;
    colspan?: number;
    rowspan?: number;
    // ... other props
  }

const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <tr className={`table-row ${className || ''}`}>{children}</tr>;
};


export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };