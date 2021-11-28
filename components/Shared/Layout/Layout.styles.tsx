import styled from "styled-components";

export const Container = styled.div`
  min-width: 300px;
  height: 100vh;
  width: 100vw;
  background: ${({ theme: { colors } }) => colors.black};
  color: ${({ theme: { colors } }) => colors.light};
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const NavBar = styled.div`
  background: ${({ theme: { colors } }) => colors.black};
  box-shadow: 3px 0 5px ${({ theme: { colors } }) => colors.dark};
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;
  align-content: flex-end;
  margin-right: 10px;
  width: 150px;
`;

export const NavBarItem = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottomNavBarItem = styled.div`
  bottom: 0;
  left: 0;
  padding: 10px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  justify-content: flex-end;
  box-shadow: 0 -3px 5px ${({ theme: { colors } }) => colors.dark};
  width: 150px;
  min-height: 75px;
`;