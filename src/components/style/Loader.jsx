import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled("div")`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 3s linear infinite;
`;

export const Loader = () => {
  return (
    <Wrapper>
      <FontAwesomeIcon fontSize={24} icon={faCircleNotch} />
    </Wrapper>
  );
};
