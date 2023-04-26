import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';

const inputMixin = `
  width: 100%;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
   border: 3px solid #fab7d2;
  border-radius: 10px;
`;
export const Form = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;
export const FormList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 25px;
`;
export const FormItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  label {
    font-size: 14px;
    font-weight: 700;
    @media screen and (min-width: ${props => props.theme.devices.tablet}) {
      font-size: 16px;
    }
  }
`;
export const Name = styled.input`
  ${inputMixin}
  font-weight: 600;
  line-height: 1.5;
  color: #f66fa5;
  font-size: 14px;
  &:focus {
    outline: none;
    border: 3px solid #f787b4;
  }
  @media screen and (min-width: ${props => props.theme.devices.tablet}) {
    font-size: 16px;
  }
`;
export const Phone = styled(PhoneInput)`
  ${inputMixin}

  &.PhoneInput--focus {
    outline: none;
    border: 3px solid #f787b4;
  }

  .PhoneInputCountryIcon {
    height: 20px;
    width: auto;
  }
  .PhoneInputCountryIcon--border {
    box-shadow: none;
    border: 1px solid black;
  }

  .PhoneInputCountrySelect:focus + .PhoneInputCountryIcon--border {
    box-shadow: none;
  }

  .PhoneInputCountrySelectArrow {
    color: black;
  }

  .PhoneInputCountrySelect:focus
    + .PhoneInputCountryIcon
    + .PhoneInputCountrySelectArrow {
    opacity: 1;
    color: #f66fa5;
  }
  .PhoneInputInput {
    border: none;
    outline: none;
    height: 100%;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    @media screen and (min-width: ${props => props.theme.devices.tablet}) {
      font-size: 16px;
    }
    color: #f66fa5;
  }

  .PhoneInputCountrySelect {
    font-size: 12px;
    border: none;
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      border-radius: 12px;
      margin-left: 10px;
      background: #fde7f0;
    }
    ::-webkit-scrollbar-thumb {
      background: #fde7f0;
      border-radius: 12px;
      margin-left: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #f66fa5;
    }
    option {
      color: black;
      background-color: #fde7f0;
    }
  }
`;
export const BackButton = styled(NavLink)`
  button {
    display: flex;
    align-self: center;
    align-items: center;
    background-color: transparent;
    color: black;
    border: none;
    cursor: pointer;
    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
      color 300ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      color: #f787b4;
    }
  }

  svg {
    width: 30px;
    height: 30px;
    @media screen and (min-width: ${props => props.theme.devices.tablet}) {
      width: 50px;
      height: 50px;
    }
  }
`;
export const Error = styled.p`
  position: absolute;
  bottom: -25px;
  @media screen and (min-width: ${props => props.theme.devices.mobile}) {
    bottom: -15px;
  }
  width: 100%;
  margin: 0;
  margin-top: 5px;
  font-size: 10px;
  font-weight: 700;
  color: red;
`;
