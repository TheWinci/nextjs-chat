import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  height: 36px;
  line-height: 22px;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 23px;
  border: 0px;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.light};
`;