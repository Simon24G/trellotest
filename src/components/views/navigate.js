import React from "react";
import PropTypes from "prop-types";

const Navigate = ({ name, colName, authorName }) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      <li className="breadcrumb-item">Card name: {name}</li>
      <li className="breadcrumb-item"> Col name: {colName} </li>
      <li className="breadcrumb-item active" aria-current="page">
        Author Card name: {authorName}{" "}
      </li>
    </ol>
  </nav>
);

Navigate.propTypes = {
  name: PropTypes.string.isRequired,
  colName: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired
};

export default Navigate;
