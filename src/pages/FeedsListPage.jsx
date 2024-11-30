import { FeedItem } from "@/components/FeedItem.jsx";
import { Button, Flex } from "antd";
import { Container } from "@/components/style/Container.js";
import { useGetFeedsQuery } from "@/api/baseApi.js";
import { useState } from "react";
import { AddFeedModal } from "@/components/modals/AddFeedModal.jsx";
import { Loader } from "@/components/style/Loader.jsx";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const items = [
  {
    id: 0,
    fileName: "Товары 2024",
    rowsCount: 10000,
    status: "Обработан",
    errors: 5,
  },
  {
    id: 1,
    fileName: "Товары 2023",
    rowsCount: 10000,
    status: "Обработан",
    errors: 5,
  },
  {
    id: 2,
    fileName: "Товары 2022",
    rowsCount: 10000,
    status: "Обработан",
    errors: 5,
  },
];

export const FeedsListPage = () => {
  const { data, isLoading } = useGetFeedsQuery(undefined, {
    pollingInterval: 5000,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText('https://free.moscow/backend/file/fixed');
  }

  return (
    <>
      {isLoading && (
        <div style={{ marginTop: 60 }}>
          <Flex justify="center">
            <Loader />
          </Flex>
        </div>
      )}
      <AddFeedModal open={modalOpen} setOpen={setModalOpen} />
      <Container>
        {!!data?.length && (
          <Flex gap={10}>
            <Button
              onClick={() => setModalOpen(true)}
              style={{ marginBottom: 40 }}
            >
              Добавить фид
            </Button>
            <Button
              onClick={copy}
              style={{ marginBottom: 40 }}
            >
              Скопировать внешнюю ссылку
              <FontAwesomeIcon icon={faLink} />
            </Button>
          </Flex>
        )}

        {data && !data.length && (
          <Flex style={{ marginTop: 60 }} gap={10} vertical align={"center"}>
            <div>У вас нет загруженных фидов</div>
            <Button
              onClick={() => setModalOpen(true)}
              style={{ marginBottom: 40 }}
            >
              Добавить
            </Button>
          </Flex>
        )}

        <Flex gap={10} vertical>
          {data &&
            data.map((item, idx) => (
              <FeedItem
                key={item.id}
                id={item.id}
                name={item.fileName}
                count={item.rowsCount}
                errors={item.errors}
                status={item.status}
              />
            ))}
        </Flex>
      </Container>
    </>
  );
};
