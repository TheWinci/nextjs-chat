import styled from "styled-components";

export const Spacer = styled.div<{ y?: number; x?: number }>`
  margin: ${({ y = 0, x = 0 }) => `${y * 2}px ${x * 2}px`};
  width: 0px;
  height: 0px;
`;