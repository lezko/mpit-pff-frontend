import styled from "styled-components";
import { Flex } from "antd";

const Status = styled("div")`
  background-color: #8d8d8d;
  color: #d9d9d9;
  border-radius: 10px;
  align-self: start;
  padding: 5px 10px;
`;

const Wrapper = styled(Flex)`
  text-align: left;
  padding: 20px;
  background-color: #343434;
  border-radius: 5px;
  flex-direction: column;
  gap: 10px;
`;

export const HistoryItem = ({ item }) => {
  return (
    <Wrapper>
      <div>{item.feedFile.fileName}</div>
      <div>Дата посещения: {new Date(item.invokedAt).toLocaleString()}</div>
      <div>Количество позиций: {item.feedFile.rowsCount}</div>
      <Status>{item.feedFile.status}</Status>
    </Wrapper>
  );
};
