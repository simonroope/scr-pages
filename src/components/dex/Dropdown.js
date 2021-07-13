import React, { useState } from 'react';
import { Row } from "react-bootstrap"

const Dropdown = ({onSelect, activeItem, items}) => {

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const selectItem = (e, item) => {
    e.preventDefault();
    setDropdownVisible(!dropdownVisible);
    onSelect(item);
  }

  return (
    <Row>
      <div className='dropdown d-inline-flex'>
      <div className='mr-3'>
      <label className='small-font'>Select Market</label>
    </div>
    <div className='mx-6'>
      <button 
        className="btn btn-secondary dropdown-toggle mx-3" 
        type="button" 
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        DAI - {activeItem.label}
      </button>
      </div>
      <div className={`dropdown-menu ${dropdownVisible ? 'visible' : ''}`}>
        {items && items.map((item, i) => ( 
          <a 
            className={`dropdown-item ${item.value === activeItem.value ? 'active' : null}`} 
            href='#'
            key={i}
            onClick={e => selectItem(e, item.value)}
          >
           DAI - {item.label}
          </a>
        ))}
      </div>
    </div>
    </Row>
  );
}

export default Dropdown;
