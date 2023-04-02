import styled from 'styled-components';

export const Info = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  width: 800px;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

export const AddNewContactBtn = styled.button`
  position: absolute;
  right: 0;
  border-radius: 50%;
  display: flex;
  column-gap: 10px;
  min-width: 40px;
  align-self: center;
  align-items: center;
  padding: 10px 10px;
  background-color: #f787b4;
  color: black;
  border: 5px solid transparent;
  font-size: 20px;
  font-weight: 800;
  box-shadow: 5px 5px 8px 1px rgba(112, 111, 111, 1);
  cursor: pointer;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
    color 300ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    background-color: #ef4287;
    color: white;
  }
`;
