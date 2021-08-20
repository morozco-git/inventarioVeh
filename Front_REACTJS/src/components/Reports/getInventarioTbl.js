import React from 'react';
import PropTypes from 'prop-types';

const GetInventarioTbl = ({ tableData, headingColumns, breakOn = 'medium' }) => {
  let tableClass = 'table-container__table';

  if(breakOn === 'small') {
    tableClass += ' table-container__table--break-sm';
  }else if(breakOn === 'medium') {
    tableClass += ' table-container__table--break-md';
  }else if(breakOn === 'large') {
    tableClass += ' table-container__table--break-lg';
  }else if(breakOn === 'larger') {
    tableClass += ' table-container__table--break-lgr';
  }

  let data = [];

  if(tableData.length>0){
      data = tableData.map((row, index) => {
      let rowData = [];
      let i = 0;

      for(const key in row) {
        
        var getValue = row[key];
    
        if(row[key]===null){
          getValue=""
        }
        
        rowData.push({
          key: headingColumns[i],
          val: getValue
        });
        i++;
      }

      return <tr key={index}>
        {rowData.map((data, index) => (<td key={index} data-heading={data.key}>{data.val}</td>))}
      </tr>
    });
  }

  return(
    <div className="table-container">
      <table className={tableClass}>
        <thead>
          <tr>
            {headingColumns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>
    </div>
  );
}

GetInventarioTbl.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.array).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  breakOn: PropTypes.oneOf(['small', 'medium', 'large', 'larger']) 
}

export default GetInventarioTbl;