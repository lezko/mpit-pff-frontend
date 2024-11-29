import { useParams } from "react-router-dom";
import { Button, Flex, Input, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { Error } from "@/components/Error.jsx";
import { Container } from "@/components/style/Container.js";
import {
  useGetFeedColumnsNamesQuery,
  useLazyGetFeedDataQuery,
  useLazyGetFeedErrorsQuery,
  useLazyGetFeedPagesCountQuery,
} from "@/api/baseApi.js";

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
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    // console.log(ref.current)
    if (shouldUpdate) {
      if (ref.current?.scrollIntoView) {
        console.log(ref.current);
        ref.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);

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

  const [tableData, setTableData] = useState();

  const [data, setData] = useState();
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    if (!data || !data.length) {
      return;
    }

    const columnsNames = data[0].data;
    const columns = columnsNames.map((item, index) => ({
      title: item,
      dataIndex: item,
      key: item,
      render(text, record) {
        if (
          index === selectedError?.columnIndex &&
          record.key === selectedError?.rowIndex
        ) {
          console.log("sldkfjs;dlfkj");
          setShouldUpdate(true);
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
              <>
                <Input style={{ width: 120 }} ref={ref} defaultValue={text} />
              </>
            ) : (
              text
            ),
        };
      },
    }));
    const dataSource = data.slice(1).map(({ data, index }) => {
      const obj = { key: index };
      for (let i = 0; i < columnsNames.length; i++) {
        obj[columnsNames[i]] = data[i];
      }
      return obj;
    });
    setTableData({
      columns,
      dataSource,
    });
  }, [data, selectedError]);

  const handleErrorClick = (id) => {
    const error = errors.find((e) => e.id === id);
    setPage(Math.ceil(error.rowIndex / 25));
    setSelectedError(error);
  };
  //
  // const pagesNumbers = [];
  // for (let i = Math.max(1, ); i < ; i++) {
  //
  // }

  return (
    <div>
      <Flex gap={10} style={{ paddingInline: 10 }}>
        {tableData && (
          <>
            <Table
              // rowClassName={(record, index, indent) => {
              //     console.log(record, index, inde)
              // }}
              pagination={false}
              style={{
                width: "80%",
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "80vh",
              }}
              columns={tableData.columns}
              dataSource={tableData.dataSource}
            ></Table>
            <Flex style={{ width: "20%" }} vertical gap={5}>
              {errors &&
                errors.length &&
                errors.map((error) => (
                  <Error
                    active={error.id === selectedError?.id}
                    onClick={handleErrorClick}
                    onCancel={() => setSelectedError(undefined)}
                    key={error.id}
                    id={error.id}
                    name={error.error}
                    row={error.rowIndex}
                    col={error.columnIndex}
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
    </div>
  );
};