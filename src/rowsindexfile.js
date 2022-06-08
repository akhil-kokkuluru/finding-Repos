import React from 'react';
import './styles.css';

const Rowscomponent = (props) => {
  const { rows } = props;
  const { id, name, description, fork, size, language } = rows;

  return (
    <>
      <div>
        <div className="col">{name}</div>
        <div className="col">{language}</div>
        <div className="col">{description}</div>
        <div className="col">{size}</div>
      </div>
    </>
  );
};

export default Rowscomponent;
