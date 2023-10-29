import React from "react";
import LayoutBackOffice from "@/components/Layout/LayoutBackoffice/Layout.component";
import { numberFormatDescimals } from "@/utils/helpers/helper";
import { FetchListRateCurrencyQuery } from "@/services/useListRateCurrencyQuery";

type RateCurrency = {
  currency: string;
  rate: string;
};

export default function DashboardIndex() {
  const {
    data: dataList4Currency,
    isLoading,
    isPending,
  } = FetchListRateCurrencyQuery({
    list4Currency: true,
  });

  const { data: dataListAll } = FetchListRateCurrencyQuery({
    sort_by: "rate",
    sort_type: "desc",
    take: 4,
  });

  return (
    <LayoutBackOffice>
      <div className="flex flex-col gap-8">
        <div>
          <div className="text-lg font-bold mb-4 pl-2">
            4 All Big Currency Rate
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            {isLoading || isPending
              ? [1, 2, 3, 4].map((index: number) => (
                  <div
                    key={index}
                    className="h-[125px] bg-gray-200 rounded-md animate-pulse "
                  ></div>
                ))
              : dataListAll?.data?.length > 0
              ? dataListAll?.data?.map((item: RateCurrency, index: number) => (
                  <div
                    key={index}
                    className="block p-6 bg-white border border-gray-200 rounded-[8px] hover:bg-gray-50 "
                  >
                    <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                      {item?.currency?.toUpperCase()}
                    </h3>
                    <h1 className="font-bold text-red-600 text-2xl">
                      {numberFormatDescimals(item?.rate)}
                    </h1>
                  </div>
                ))
              : "Data not found"}
          </div>
        </div>
        <div>
          <div className="text-lg font-bold mb-4 pl-2">
            4 Internasional Big Currency Rate
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            {isLoading || isPending
              ? [1, 2, 3, 4].map((index: number) => (
                  <div
                    key={index}
                    className="h-[125px] bg-gray-200 rounded-md animate-pulse "
                  ></div>
                ))
              : dataListAll?.data?.length > 0
              ? dataList4Currency?.data?.map(
                  (item: RateCurrency, index: number) => (
                    <div
                      key={index}
                      className="block p-6 bg-white border border-gray-200 rounded-[8px] hover:bg-gray-50 "
                    >
                      <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                        {item?.currency?.toUpperCase()}
                      </h3>
                      <h1 className="font-bold text-red-600 text-4xl">
                        {numberFormatDescimals(item?.rate)}
                      </h1>
                    </div>
                  )
                )
              : "Data not found"}
          </div>
        </div>
      </div>
    </LayoutBackOffice>
  );
}