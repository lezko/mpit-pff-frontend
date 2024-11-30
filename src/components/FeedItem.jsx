import styled from "styled-components";
import { Button, Flex, Grid } from "antd";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components/style/Loader.jsx";

const Wrapper = styled(Flex)`
  text-align: left;
  padding: 20px;
  background-color: #343434;
  border-radius: 5px;
`;

const statusColor = {
  CREATED: "#706d6d",
  PROCESSING: "#c49e25",
  PROCESSED: "#509f19",
  COMPLETED: "#356912",
};

const statusLabel = {
  CREATED: "СОЗДАН",
  PROCESSING: "В ОБРАБОТКЕ",
  PROCESSED: "ОБРАБОТАН",
  COMPLETED: "ЗАВЕРШЕН",
};

const Status = styled("div")`
  background-color: ${(p) => p.$color};
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
      <div>Количество позиций: {status === "PROCESSING" ? "-" : count}</div>
      {status && (
        <Status $color={statusColor[status]}>{statusLabel[status]}</Status>
      )}
      <Flex gap={10}>
        {status === "PROCESSED" && (
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
        {status === "PROCESSING" && <Loader />}
      </Flex>
    </Wrapper>
  );
};
