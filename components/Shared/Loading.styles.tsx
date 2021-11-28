import { ImSpinner9 } from '@react-icons/all-files/im/ImSpinner9'
import styled from 'styled-components'

export const Loading = styled(ImSpinner9)`
  color: ${({ theme: { colors } }) => colors.primary};
  animation: rotation 2s infinite linear;
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  };
`;

export const Center = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-content: center;
  justify-content: center;
  align-items: center;
`;
