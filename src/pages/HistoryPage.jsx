import { Container } from "@/components/style/Container.js";
import { useGetLogsQuery } from "@/api/baseApi.js";
import { Flex } from "antd";
import { Loader } from "@/components/style/Loader.jsx";
import { HistoryItem } from "@/components/HistoryItem.jsx";

export const HistoryPage = () => {
  const { data, isLoading } = useGetLogsQuery();
  console.log(data);

  return (
    <Container>
      {isLoading && (
        <Flex justify="center">
          <Loader />
        </Flex>
      )}
      {!isLoading && !data.content?.length && (
        <Flex justify="center">Нет данных</Flex>
      )}

      {data && (
        <Flex vertical gap={10}>
          {data.content.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </Flex>
      )}
    </Container>
  );
};
