import styled from "styled-components";
import { Button, Flex } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSupressErrorMutation } from "@/api/baseApi.js";

const L = styled("span")`
  text-decoration: none;
  cursor: pointer;
  color: #9f9f9f;
  font-weight: 300;
`;

const ErrorHeader = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  justify-content: space-between;
`;

const ErrorBody = styled.div`
  max-height: ${({ $expanded }) =>
    $expanded ? "none" : "40px"}; /* Ограничение высоты */
  overflow: hidden; /* Скрыть текст, который не помещается */
  position: relative;
  cursor: ${({ $expandable }) =>
    $expandable
      ? "pointer"
      : "default"}; /* Курсор - указатель, если можно развернуть */
  //background: rgba(0, 0, 0, 0.1);
  padding: 5px;
  border-radius: 4px;
  transition: max-height 0.3s; /* Анимация плавного развертывания */
  color: #fff;

  /* Затенение через псевдоэлемент */

  &::after {
    content: "";
    display: ${({ $expanded, $expandable }) =>
      $expanded || !$expandable ? "none" : "block"};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px; /* Высота градиента */
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgb(32 32 32 / 80%)
    );
    pointer-events: none; /* Затенение не блокирует клики */
  }
`;

const Wrapper = styled("div")`
  background: ${({ $errorType }) =>
    $errorType === "TECHNICAL"
      ? "linear-gradient(to right, transparent, rgba(255, 0, 0, 1))"
      : $errorType === "LOGICAL" || $errorType === "AI"
        ? "linear-gradient(to right, transparent, #ffb700)"
        : $errorType === "SOLVED"
          ? "linear-gradient(to right, transparent, green)"
          : "linear-gradient(to right, transparent, #2c2c2c)"};
  padding: 10px;
  border-radius: 5px;
  background-size: 2% 100%;
  background-repeat: no-repeat;
  background-position: right;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #494949;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3); /* Add shadow if needed */
  transition:
    background-color 0.3s,
    border-color 0.3s;

  &:hover {
    border-color: ${({ $errorType }) =>
      $errorType === "TECHNICAL"
        ? "#ff1a1d"
        : $errorType === "LOGICAL" || $errorType === "AI"
          ? "#ffb700"
          : "#444444"};
  }
`;

const BottomButtons = styled(Flex)`
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
`;

const AIIcon = styled("div")`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #8a2be2;
  font-size: 20px;
`;

export const Error = ({
  id,
  title,
  loading,
  suppressed,
  description,
  row,
  col,
  active,
  solved,
  onSave,
  onSuppress,
  onClick,
  onFillAi,
  onCancel,
  errorType,
  aiSolution,
}) => {
  const [expanded, setExpanded] = useState(false);
  const expandable = title.length > 60;

  const [supressError, { isLoading }] = useSupressErrorMutation();

  const handleSuppress = async () => {
    await supressError({ errorId: id });
    onSuppress();
  };

  return (
    <Wrapper
      style={{ pointerEvents: suppressed || solved ? "none" : "all" }}
      $errorType={solved ? "SOLVED" : errorType}
    >
      <ErrorHeader>
        <h2
          style={{
            textDecoration: suppressed ? "line-through" : "none",
            margin: 0,
            color: "#fff",
          }}
        >
          {title}
        </h2>
        <L onClick={() => onClick(id)}>
          строка {row}, столбец {col}
        </L>
        <hr />
        {errorType === "AI" || errorType === "LOGICAL" ? (
          <span style={{ fontWeight: 300, color: "yellow" }}>
            Логическая ошибка
          </span>
        ) : null}
        {errorType === "TECHNICAL" && (
          <span style={{ fontWeight: 300, color: "red" }}>
            Техническая ошибка
          </span>
        )}

        {errorType === "AI" && (
          <AIIcon>
            <WarningOutlined />
          </AIIcon>
        )}
      </ErrorHeader>
      {active && (
        <Flex vertical gap={15}>
          <ErrorBody
            $expanded={expanded}
            $expandable={expandable}
            onClick={() => expandable && setExpanded(!expanded)}
          >
            {description || "Нет данных для отображения."}
          </ErrorBody>
          <Flex justify="space-between">
            <Flex vertical gap={5}>
              <Button loading={active && loading} onClick={onSave}>
                Сохранить
              </Button>
              <Button onClick={onCancel}>Отменить</Button>
            </Flex>

            <Flex gap={5} vertical>
              {aiSolution && (
                <Button onClick={onFillAi}>Предложить решение</Button>
              )}
              <Button
                onClick={handleSuppress}
                loading={isLoading}
                style={{
                  borderColor: "red",
                }}
              >
                Игнорировать
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Wrapper>
  );
};
