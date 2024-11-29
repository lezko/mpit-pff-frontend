import styled from "styled-components";
import { Button, Flex } from "antd";

const L = styled("span")`
  text-decoration: underline;
  cursor: pointer;
`;

const Wrapper = styled("div")`
  background-color: #343434;
  padding: 10px;
  border-radius: 5px;
`;

export const Error = ({ id, name, row, col, active, onClick, onCancel }) => {
  const test = () => {};
  return (
    <Wrapper>
      <h5>{name}</h5>
      <L onClick={() => onClick(id)}>
        Строка {row + 1}, столбец {col + 1}
      </L>
      {active && (
        <Flex>
          <Button>Созхранить</Button>
          <Button onClick={() => onCancel()}>Отменить</Button>
        </Flex>
      )}
    </Wrapper>
  );
};
