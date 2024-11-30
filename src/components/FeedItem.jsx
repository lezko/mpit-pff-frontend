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
      </Flex>
      <div>Количество товаров: {count}</div>
      {status && <Status>{status}</Status>}
      <Flex gap={10}>
        {status !== "COMPLETED" && (
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
        )}
      </Flex>
    </Wrapper>
  );
};
