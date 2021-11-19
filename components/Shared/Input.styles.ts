import styled from 'styled-components';

export const Input = styled.input`
  height: 36px;
  line-height: 22px;
  font-size: ${({theme: { fontSizes }}) => fontSizes.large}px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 23px;
  border: 0px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  background: ${({theme: { colors }, disabled}) => disabled ? colors.dark : colors.light};
`;