import styled from 'styled-components';

export const FilterBlock = styled.div`
  .filter__field {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  .filter__label {
    font-size: 25px;
    font-weight: 700;
  }

  .filter__input {
    height: 70px;
    width: 100%;
    padding-left: 30px;
    font-size: 24px;
    font-weight: 600;
    color: #f66fa5;
    border: 5px solid #fab7d2;
    border-radius: 10px;
    &:focus {
      outline: none;
      border: 5px solid #f787b4;
    }
  }
`;

export const Info = styled.p`
  font-size: 25px;
  margin-top: 15px;
  font-style: italic;
  span {
    font-weight: 700;
  }
`;
