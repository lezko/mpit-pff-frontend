import styled from "styled-components";
import { Container } from "@/components/style/Container.js";
import pffLogo from "@/assets/Logo.svg";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const Wrapper = styled("nav")`
  border-bottom: 2px solid white;
  padding-block: 20px;
  margin-bottom: 40px;
`;

export const HeadBar = () => {
  const navigate = useNavigate();

  const isHome = window.location.href.includes("home");
  const isHistory = window.location.href.includes("history");

  return (
    <Wrapper>
      <Container>
        <Flex align="center" justify={"space-between"}>
          <img src={pffLogo} />
          <Flex gap={40}>
            <h3
              onClick={() => navigate("/home")}
              style={{
                paddingBlock: 10,
                fontWeight: 900,
                fontSize: 16,
                cursor: "pointer",
                borderBottom: isHome ? "1px solid white" : "none",
              }}
            >
              Главная
            </h3>
            <h3
              onClick={() => navigate("/history")}
              style={{
                paddingBlock: 10,
                fontWeight: 900,
                fontSize: 16,
                cursor: "pointer",
                borderBottom: isHistory ? "1px solid white" : "none",
              }}
            >
              История запросов
            </h3>
          </Flex>
        </Flex>
      </Container>
    </Wrapper>
  );
};
