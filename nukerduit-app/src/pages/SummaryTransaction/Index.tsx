import React, { useMemo, useState } from "react";
import LayoutBackOffice from "@/components/Layout/LayoutBackoffice/Layout.component";
import { numberFormatDescimals } from "@/utils/helpers/helper";
import InputLabel from "@/components/ui/Input/InputLabel";
import SelectLabel from "@/components/ui/Select/SelectLabel";
import { FetchListRateCurrencyQuery } from "@/services/useListRateCurrencyQuery";
import Button from "@/components/ui/Button/Button";
import Select from "react-select";
import { FetchListSummaryTransaction } from "@/services/useTransactionQuery";

type TableData = {
  columns: {
    Header: string;
    accessor: string | ((item: any) => JSX.Element | string | number);
  }[];
};

type DataTransaction = {
  [key: string]: string | number;
};

export default function SummaryTranscationIndex() {
  const [period, setPeriod] = useState<string>("today");
  const tableData: TableData = {
    columns: [
      {
        Header: "Currency",
        accessor: ({ currency }: { currency: string }) => (
          <div className="font-bold">{currency?.toUpperCase()}</div>
        ),
      },
      {
        Header: "Total Buy",
        accessor: ({ total_buy }: { total_buy: string }) => (
          <div className="text-green-600 font-semibold">
            {numberFormatDescimals(total_buy)}
          </div>
        ),
      },
      {
        Header: "Total Sell",
        accessor: ({ total_sell }: { total_sell: string }) => (
          <div className="text-red-600 font-semibold">
            {numberFormatDescimals(total_sell)}
          </div>
        ),
      },
      {
        Header: "Total",
        accessor: ({ total }: { total: string }) => (
          <div className=" font-semibold text-black">{numberFormatDescimals(total)}</div>
        ),
      },
    ],
  };

  const {
    data: dataListTransaction,
    isLoading,
    isPending,
    refetch,
  } = FetchListSummaryTransaction({
    period: period,
  });

  return (
    <LayoutBackOffice>
      <div className="flex items-center mb-6">
        <div className="text-2xl font-bold">Summary</div>
      </div>
      <div className="">
        <div className="w-[30%]">
          <Select
            options={[
              {
                label: "Today",
                value: "today",
              },
              {
                label: "1 Week",
                value: "1week",
              },
              {
                label: "1 Month",
                value: "1month",
              },
            ]}
            styles={{
              control: (provided, state) => ({
                ...provided,
                border: "0.5px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "0.5rem 0.3rem",
                fontSize: "14px",
                focus: state.isFocused ? "none" : "none",
              }),
            }}
            placeholder="Select Filter Period"
            isClearable={true}
            onChange={(e) => {
              setPeriod(e?.value || "");
              refetch();
            }}
          />
        </div>
        <div className="mt-6">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {tableData.columns.map((item, index) => (
                    <th key={index} scope="col" className="px-6 py-3">
                      {item.Header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading || isPending ? (
                  <tr>
                    {tableData.columns.map((item, index) => (
                      <td key={index} scope="col" className="px-6 py-3">
                        <div className="h-[20px] bg-gray-200 rounded-md animate-pulse "></div>
                      </td>
                    ))}
                  </tr>
                ) : dataListTransaction?.data?.length > 0 ? (
                  dataListTransaction?.data?.map(
                    (item: DataTransaction, index: number) => (
                      <tr key={index} className="bg-white border-b">
                        {tableData.columns.map((colum, index) => (
                          <td key={index} className="px-6 py-4 text-base">
                            {typeof colum.accessor == "string"
                              ? item[colum.accessor]
                              : colum?.accessor(item)}
                          </td>
                        ))}
                      </tr>
                    )
                  )
                ) : (
                  <tr className="bg-white border-b">
                    <td
                      colSpan={tableData.columns?.length}
                      className="px-6 py-4 text-base text-center"
                    >
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutBackOffice>
  );
}
