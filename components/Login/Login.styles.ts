import styled from "styled-components"

export const FlexContainer = styled.div`
  display: flex;
  height: 100%;
`

export const FlexItem = styled.div`
  margin: auto;
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin: auto;
`

export const ErrorText = styled.p`
  color: ${({theme}) => theme.colors.error};
  margin: 0;
  font-size: 12px;
  margin-left: 12px;
  margin-right: 12px;
`

export const Card = styled.div`
  border-radius: 6px;
  padding: 20px;
`;
