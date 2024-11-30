import { useParams } from "react-router-dom";
import { Flex, Input, Table } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { Error } from "@/components/Error.jsx";
import {
  useLazyGetFeedDataQuery,
  useLazyGetFeedErrorsQuery,
  useLazyGetFeedPagesCountQuery,
  useSolveErrorMutation,
} from "@/api/baseApi.js";
import { createStyles } from "antd-style";

const { TextArea } = Input;

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

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
  const [page, setPage] = useState(1);

  const [trigger] = useLazyGetFeedDataQuery();
  const [triggerErrors] = useLazyGetFeedErrorsQuery();
  const [triggerPages] = useLazyGetFeedPagesCountQuery();

  const fetchData = async (page) => {
    const result = await trigger({ feedId, page });
    setData(result.data);
    const errorsResult = await triggerErrors({ feedId });
    setErrors(errorsResult.data);
    const pagesResult = await triggerPages({ feedId });
    setTotalPages(pagesResult.data.count);
  };

  const [data, setData] = useState();
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    fetchData(page);
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
  }, [selectedError]);

  const [solution, setSolution] = useState("");

  const tableData = useMemo(() => {
    if (!data || !data.length) {
      return { dataSource: [], columns: [] };
    }

    const columnsNames = data[0].data;
    const columns = columnsNames.map((item, index) => ({
      title: item,
      dataIndex: item,
      key: item,
      render(text, record) {
        if (
          index === selectedError?.columnIndex - 1 &&
          record.key === selectedError?.rowIndex
        ) {
        }
        return {
          props: {
            style: {
              backgroundColor:
                index === selectedError?.columnIndex - 1 &&
                record.key === selectedError?.rowIndex
                  ? "#474747"
                  : "unset",
            },
          },
          children:
            index === selectedError?.columnIndex - 1 &&
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
    setSolution(data[error.rowIndex].data[error.columnIndex - 1]);
    setPage(Math.ceil((error.rowIndex + 1) / 25));
    setSelectedError(error);
  };
  //
  // const pagesNumbers = [];
  // for (let i = Math.max(1, ); i < ; i++) {
  //
  // }

  const [solveError, { isLoading: isSolveLoading }] = useSolveErrorMutation();
  const handleSave = async () => {
    await solveError({ errorId: selectedError.id, value: solution });
    fetchData(page);
    setSelectedError(undefined);
  };

  const { styles } = useStyle();

  const rootHeight = document.body.getBoundingClientRect().height;

  console.log(rootHeight);
  return (
    <Flex vertical style={{ flexGrow: 1, minHeight: 0 }}>
      <Flex gap={10} style={{ minHeight: 0 }}>
        {tableData && (
          <>
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
              <Table
                bordered
                // className={styles.customTable}
                scroll={{
                  x: "max-content",
                  y: rootHeight - 106 - 2 * 56.48 + 15,
                }}
                pagination={false}
                columns={tableData.columns}
                dataSource={tableData.dataSource}
              ></Table>
            </div>

            <Flex
              style={{ width: "25%", minHeight: 0, overflowY: "auto" }}
              vertical
              gap={5}
            >
              {errors &&
                errors.length &&
                errors
                  .slice()
                  .filter((e) => e.rowIndex > 0 && e.columnIndex > 0)
                  .map((error) => (
                    <Error
                      loading={isSolveLoading}
                      active={error.id === selectedError?.id}
                      onSave={handleSave}
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
          </>
        )}
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
