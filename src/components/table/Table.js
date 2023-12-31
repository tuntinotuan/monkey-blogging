import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TableStyles = styled.div`
  overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  table {
    width: 100%;
  }
  thead {
    background-color: #f7f7f8;
  }
  th,
  td {
    vertical-align: middle;
    white-space: nowrap;
  }
  th {
    padding: 20px 30px;
    font-weight: 600;
    text-align: left;
  }
  td {
    padding: 15px 30px;
  }
  tbody {
  }
`;
const Table = ({ children }) => {
  return (
    <TableStyles className="dark:bg-darkMain">
      <table className="dark:bg-darkMain">{children}</table>
    </TableStyles>
  );
};

Table.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Table;
