import styled from "styled-components";
import { Button, Flex, Grid } from "antd";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Flex)`
  text-align: left;
  padding: 20px;
  background-color: #343434;
  border-radius: 5px;
`;

const Status = styled("div")`
  background-color: #8d8d8d;
  color: #d9d9d9;
  border-radius: 10px;
  align-self: start;
  padding: 5px 10px;
`;

export const FeedItem = ({ id, name, count, status, errors }) => {
  const navigate = useNavigate();

  return (
    <Wrapper vertical gap={10}>
      <Flex align="center" justify={"space-between"}>
        <h3>{name}</h3>
        <Flex>
          <Button
            style={{
              paddingBlock: 5,
              color: "#e05151",
              borderColor: "#e05151",
            }}
          >
            Удалить
          </Button>
        </Flex>
      </Flex>
      <div>Количество товара: {count}</div>
      {status && <Status>{status}</Status>}
      <Flex gap={10}>
        <Button
          color="#3493FF"
          style={{
            flexGrow: 1,
            paddingBlock: 30,
          }}
          onClick={() => navigate("/feed/" + id)}
        >
          Редактировать
        </Button>
        <Button
          color="#808080"
          style={{
            flexGrow: 1,
            paddingBlock: 30,
          }}
        >
          Скопировать ссылку
        </Button>
      </Flex>
    </Wrapper>
  );
};
