import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, Input, Table, Typography } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { Error } from "@/components/Error.jsx";
import {
  useConfirmChangesMutation,
  useGetFeedsQuery,
  useLazyGetFeedDataQuery,
  useLazyGetFeedErrorsPagesCountQuery,
  useLazyGetFeedErrorsQuery,
  useLazyGetFeedPagesCountQuery,
  useSolveErrorMutation,
} from "@/api/baseApi.js";
import { Container } from "@/components/style/Container.js";
import { Loader } from "@/components/style/Loader.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const { TextArea } = Input;

const BR_OPEN = "<";
const BR_CLOSE = ">";

const errors = [
  {
    id: "6f2f0b0d-7383-41c2-b7ea-b2b0b7db2072",
    fileRequest: {
      id: "9f5a9d00-b6d2-4b16-8c73-4d1a0b8e5642",
    },
    error: "Некорректное название продукта",
    errorType: "LOGICAL",
    rowIndex: 5,
    columnIndex: 1,
  },
  {
    id: "34b3b2b4-f3c9-49b3-98be-cb44b78f12ad",
    fileRequest: {
      id: "9f5a9d00-b6d2-4b16-8c73-4d1a0b8e5642",
    },
    error: "Некорректное название продукта",
    errorType: "TECHNICAL",
    rowIndex: 6,
    columnIndex: 1,
  },
  {
    id: "34b3b2b4-f3c9-49eewrb3-98be-cb44b78f12ad",
    fileRequest: {
      id: "9f5a9d00-b6d2-4b16-8c73-4d1a0b8e5642",
    },
    error: "Некорректная цена",
    errorType: "TECHNICAL",
    rowIndex: 2,
    columnIndex: 3,
  },
  {
    id: "34bwe3b2b4-f3c9-49b3-98be-cb44b78f12ad",
    fileRequest: {
      id: "9f5a9d00-b6d2-4b16-8c73-4d1a0b8e5642",
    },
    error: "Некорректная цена",
    errorType: "TECHNICAL",
    rowIndex: 1,
    columnIndex: 3,
  },
  {
    id: "34b3b2b4-f3c9-49b3-98be-cb44b78f1wer2ad",
    fileRequest: {
      id: "9f5a9d00-b6d2-4b16-8c73-4d1a0b8e5642",
    },
    error: "Некорректное название продукта",
    errorType: "TECHNICAL",
    rowIndex: 1,
    columnIndex: 1,
  },
];

const sampleData = [
  { data: ["Название продукта", "Бренд", "Цена"], index: 0 },
  { data: ["Холодильник", "Samsung", "25000"], index: 1 },
  { data: ["Смартфон", "Apple", "75000"], index: 2 },
  { data: ["Микроволновка", "LG", "12000"], index: 3 },
  { data: ["Телевизор", "Sony", "45000"], index: 4 },
  { data: ["Ноутбук", "Asus", "50000"], index: 5 },
  { data: ["Пылесос", "Dyson", "22000"], index: 6 },
  { data: ["Шкаф", "Ikea", "15000"], index: 7 },
  { data: ["Кофемашина", "Delonghi", "28000"], index: 8 },
  { data: ["Стол", "Ikea", "9000"], index: 9 },
  { data: ["Чайник", "Braun", "3000"], index: 10 },
  { data: ["Планшет", "Samsung", "25000"], index: 11 },
  { data: ["Робот-пылесос", "Xiaomi", "18000"], index: 12 },
  { data: ["Миксер", "Philips", "5000"], index: 13 },
  { data: ["Фен", "Braun", "4000"], index: 14 },
  { data: ["Смарт-часы", "Garmin", "15000"], index: 15 },
  { data: ["Кастрюля", "Tefal", "6000"], index: 16 },
  { data: ["Посудомоечная машина", "Bosch", "30000"], index: 17 },
  { data: ["Мороженица", "Moulinex", "8000"], index: 18 },
  { data: ["Утюг", "Philips", "2500"], index: 19 },
  { data: ["Часы", "Casio", "4000"], index: 20 },
];

export const FeedEditPage = () => {
  const { feedId } = useParams();

  const [selectedError, setSelectedError] = useState();

  const ref = useRef(null);
  const tableRef = useRef(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [totalErrorsPages, setTotalErrorsPages] = useState(0);
  const [page, setPage] = useState(1);
  const [errorsPage, setErrorsPage] = useState(1);

  const { data: allFeedsData } = useGetFeedsQuery();
  const [trigger, { isLoading: isFeedLoading }] = useLazyGetFeedDataQuery();
  const [triggerErrors, { isLoading: isErrorsLoading }] =
    useLazyGetFeedErrorsQuery();
  const [triggerPages] = useLazyGetFeedPagesCountQuery();
  const [triggerErrorsPages] = useLazyGetFeedErrorsPagesCountQuery();

  const navigate = useNavigate();
  useEffect(() => {
    const feed = allFeedsData?.find((f) => f.id === feedId);
    if (feed && feed.status === "COMPLETED") {
      navigate("/home");
    }
  }, [allFeedsData]);

  const fetchErrors = async (page) => {
    const errorsResult = await triggerErrors({ feedId, page: page - 1 });
    setErrors(errorsResult.data.content);
    setTotalErrorsPages(errorsResult.data.totalPages - 1);
  };

  const fetchData = async (page, error) => {
    const result = await trigger({ feedId, page });
    setData(result.data);
    if (error) {
      const row = data.find((r) => r.data.index === error.rowIndex);
      setSolution(row.data[error.columnIndex]);
    }

    const pagesResult = await triggerPages({ feedId });
    setTotalPages(pagesResult.data.count);
  };

  const [data, setData] = useState();
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    fetchData(page);
    fetchErrors(errorsPage);
  }, [page]);

  // todo handle request
  useEffect(() => {
    if (
      selectedError &&
      tableRef.current &&
      tableRef.current.scroll &&
      ref.current
    ) {
      console.log(ref.current);
      const tableRect = tableRef.current.getBoundingClientRect();
      const cellRect = ref.current.getBoundingClientRect();
      console.log(tableRect);

      // const t = cellRect.top - tableRect.height + cellRect.height
      // tableRef.current.scroll({ top: 100, left: 100 });
      console.log(ref.current);
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedError, data]);

  const [solution, setSolution] = useState("");

  const tableData = useMemo(() => {
    if (!data || !data.length) {
      return { dataSource: [], columns: [] };
    }

    const columnsNames = data[0].data;
    const columns = columnsNames.map((item, index) => ({
      title: (
        <Typography.Text title={item} ellipsis={true} style={{ minWidth: 50 }}>
          {item}
        </Typography.Text>
      ),
      dataIndex: item,
      key: item,
      render(text, record) {
        if (
          index === selectedError?.columnIndex &&
          record.key === selectedError?.rowIndex
        ) {
        }
        return {
          props: {
            style: {
              backgroundColor:
                index === selectedError?.columnIndex &&
                record.key === selectedError?.rowIndex
                  ? "#474747"
                  : "unset",
            },
          },
          children:
            index === selectedError?.columnIndex &&
            record.key === selectedError?.rowIndex ? (
              <div ref={ref}>
                <TextArea
                  style={{ width: 120, resize: "both" }}
                  ref={ref}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                />
              </div>
            ) : (
              text
            ),
        };
      },
    }));
    columns[0].fixed = "left";

    const dataSource = data.slice(1).map(({ data, index }) => {
      const obj = { key: index };
      for (let i = 0; i < columnsNames.length; i++) {
        obj[columnsNames[i]] = data[i];
      }
      return obj;
    });
    return {
      columns,
      dataSource,
    };
  }, [data, selectedError, solution]);

  useEffect(() => {
    // setTableData({
    //   dataSource: Array(50)
    //     .fill(null)
    //     .map((_, i) => ({
    //       key: i,
    //       name: "Mike",
    //       age: i,
    //       address: "10 Downing Street",
    //     })),
    //   columns: Array(50)
    //     .fill(null)
    //     .map((_, i) => ({
    //       title: i,
    //       dataIndex: "name",
    //       key: i,
    //     })),
    // });
  }, [data, selectedError, solution]);

  const handleErrorClick = (id) => {
    const error = errors.find((e) => e.id === id);
    setSelectedError(error);

    const row = data.find((r) => r.index === error.rowIndex);
    if (!row) {
      const newPage = Math.ceil(error.rowIndex / 25);
      setPage(newPage);
      fetchData(newPage, error);
    } else {
      setSolution(row.data[error.columnIndex]);
    }
  };

  const [solveError, { isLoading: isSolveLoading }] = useSolveErrorMutation();
  const handleSave = async () => {
    await solveError({ errorId: selectedError.id, value: solution });
    fetchData(page);
    fetchErrors(errorsPage);
    setSelectedError(undefined);
  };

  const handleSuppress = () => {
    fetchData(page);
    fetchErrors(errorsPage);
    setSelectedError(undefined);
  };

  const handleErrorsPageChange = (newPage) => {
    if (newPage < 1 || newPage > totalErrorsPages) {
      return;
    }

    setErrorsPage(newPage);
    fetchErrors(newPage);
  };

  const rootHeight = document.body.getBoundingClientRect().height;

  const [confirmChanges, { isLoading: confirmChangesLoading }] =
    useConfirmChangesMutation();
  const handleConfirmChanges = async () => {
    await confirmChanges({ feedId });
  };

  const [pageInput, setPageInput] = useState("");
  const gotoPage = () => {
    if (!isNaN(Number(pageInput))) {
      handleErrorsPageChange(Number(pageInput));
    }
  };

  return (
    <Flex gap={20} vertical style={{ flexGrow: 1, minHeight: 0 }}>
      <Flex gap={10} style={{ minHeight: 0 }}>
        <div
          ref={tableRef}
          style={{
            width: "75%",
            // overflowX: "auto",
            // overflowY: "auto",
            minHeight: 0,
            maxHeight: "100%",
          }}
        >
          {isFeedLoading && (
            <Flex justify="center">
              <Loader />
            </Flex>
          )}

          {/*{!isFeedLoading && !data &&*/}
          {/*  <Flex justify="center">Не удалось загрузить данные</Flex>*/}
          {/*}*/}

          {!isFeedLoading && tableData && (
            <Table
              bordered
              scroll={{
                x: "max-content",
                y: rootHeight - 106 - 2 * 56.48 - 20,
              }}
              pagination={false}
              columns={tableData.columns}
              dataSource={tableData.dataSource}
            ></Table>
          )}
        </div>

        <Flex
          style={{
            width: "25%",
            minHeight: 0,
            overflowY: "auto",
            paddingInline: 3,
          }}
          vertical
          gap={20}
        >
          <Flex
            style={{
              minHeight: 0,
              overflowY: isErrorsLoading ? "initial" : "auto",
            }}
            vertical
            gap={5}
          >
            {isErrorsLoading && (
              <Flex justify="center">
                <Loader />
              </Flex>
            )}


            {!isErrorsLoading &&
              errors &&
              !!errors.length &&
              errors
                .slice()
                .filter((e) => e.rowIndex > 0 && e.columnIndex > 0)
                .map((error) => (
                  <Error
                    suppressed={error.suppressed}
                    loading={isSolveLoading}
                    active={error.id === selectedError?.id}
                    solved={error.useSolve}
                    onSave={handleSave}
                    onSuppress={handleSuppress}
                    onClick={handleErrorClick}
                    onCancel={() => {
                      setSelectedError(undefined);
                      setSolution("");
                    }}
                    aiSolution={
                      error.errorType === "AI"
                        ? error.errorSolve.value
                        : undefined
                    }
                    onFillAi={() => setSolution(error.errorSolve.value)}
                    key={error.id}
                    id={error.id}
                    title={error.title}
                    description={error.description}
                    row={error.rowIndex}
                    col={error.columnIndex}
                    errorType={error.errorType}
                  />
                ))}
          </Flex>

          <Flex justify="space-between">
            <Flex gap={10} align="center">
              <Input
                placeholder="..."
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                style={{ width: 60 }}
              />
              <Button loading={isErrorsLoading} onClick={gotoPage}>
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </Flex>

            <Flex align="center" gap={15} style={{ padding: 10 }}>
              <Button onClick={() => handleErrorsPageChange(1)}>
                {BR_OPEN}
                {BR_OPEN}
              </Button>
              <Button onClick={() => handleErrorsPageChange(errorsPage - 1)}>
                {BR_OPEN}
              </Button>
              <div>
                {errorsPage}
                <span style={{ color: "#949494" }}> / {totalErrorsPages}</span>
              </div>
              <Button onClick={() => handleErrorsPageChange(errorsPage + 1)}>
                {BR_CLOSE}
              </Button>
              <Button onClick={() => handleErrorsPageChange(totalErrorsPages)}>
                {BR_CLOSE}
                {BR_CLOSE}
              </Button>
            </Flex>
          </Flex>

          <Button
            loading={confirmChangesLoading}
            onClick={handleConfirmChanges}
            style={{ paddingBlock: 20 }}
          >
            Подтвердить изменения
          </Button>
        </Flex>
      </Flex>
      {/*<Flex align="center" justify="center">*/}
      {/*  {Array(totalPages)*/}
      {/*    .fill(null)*/}
      {/*    .map((_, i) => (*/}
      {/*      <Button onClick={() => setPage(i + 1)}>{i + 1}</Button>*/}
      {/*    ))}*/}
      {/*</Flex>*/}
    </Flex>
  );
};
