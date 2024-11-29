import { useAddFeedMutation } from "@/api/baseApi.js";
import { useState } from "react";
import { Input, Modal } from "antd";

export const AddFeedModal = ({ open, setOpen }) => {
  const [addFeed, { isLoading }] = useAddFeedMutation();

  const [url, setUrl] = useState("");

  const onSubmit = async () => {
    await addFeed({ url });
    setOpen(false);
  };

  return (
    <Modal
      onOk={onSubmit}
      cancelText="Отмена"
      okButtonProps={{ type: "default", loading: isLoading }}
      title="Добавить новый фид"
      open={open}
      onCancel={() => {
        setUrl("");
        setOpen(false);
      }}
    >
      <Input
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
    </Modal>
  );
};
