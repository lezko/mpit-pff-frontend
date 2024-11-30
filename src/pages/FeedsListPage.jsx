import { FeedItem } from "@/components/FeedItem.jsx";
import { Button, Flex } from "antd";
import { Container } from "@/components/style/Container.js";
import { useGetFeedsQuery } from "@/api/baseApi.js";
import { useState } from "react";
import { AddFeedModal } from "@/components/modals/AddFeedModal.jsx";

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
  const { data } = useGetFeedsQuery();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AddFeedModal open={modalOpen} setOpen={setModalOpen} />
      <Container>
        {!!data?.length ? (
          <Button
            onClick={() => setModalOpen(true)}
            style={{ marginBottom: 40 }}
          >
            Добавить
          </Button>
        ) : (
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
