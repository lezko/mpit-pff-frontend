import styled from "styled-components";
import { Container } from "@/components/style/Container.js";
import pffLogo from "@/assets/pff-logo.svg";

const Wrapper = styled("nav")`
  border-bottom: 2px solid white;
  padding-block: 20px;
  margin-bottom: 40px;
`;

export const HeadBar = () => {
  return (
    <Wrapper>
      <Container>
        <img src={pffLogo} />

      </Container>
    </Wrapper>
  );
};
