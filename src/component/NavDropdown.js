import styled from 'styled-components';
import React from 'react';

const NavDropdownStyles = styled.div`
  background-color: #d3d3d3;
  overflow-x: hidden;
  button {
    padding: 10px 20px;
    text-decoration: none;
    font-size: 12px;
    text-align: left;
    display: block;
    color: black;
    background: none;
    &:hover {
      color: #f1f1f1;
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 600px) {
    display: none;
  }
  @media only screen and (min-width: 992px) {
  }
`;

export default function NavDropdown({ itemNum, handleSelect, categoryData }) {
  return (
    <NavDropdownStyles itemNum={itemNum}>
      {/* {
        <select>
          <option value='' selected='selected'>
            Select
          </option>

          {categoryData.map((item) => (
            // <option key={item.id} value={item.name}>
            //   {item.name}
            // </option>
            <button onClick={(e) => handleSelect(e)} key={item.id}>
              {item.name}
            </button>
          ))}
        </select>
      } */}
    </NavDropdownStyles>
  );
}
