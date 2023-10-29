import { mockQuery } from "@/utils/libs/axios-mock";
import { buildUrl } from "@/utils/helpers/helper";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

type Query = {
  [key: string]: string | number | boolean | null | undefined;
};

export const FetchListRateCurrencyQuery = (query: Query) => {
  const link = buildUrl({
    baseUrl: "currency/rate-currency",
    query: query,
  });

  const resQuery = useQuery({
    queryKey: [link],
    queryFn: mockQuery,
    staleTime: 300000, // 5 minutes
    refetchInterval: 300000,
  });
  
  if(resQuery?.isError) {
    const err = resQuery?.error as AxiosError<{ message: string }>;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response?.data ? err?.response?.data?.message : err?.message || "Network Error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Refresh",
    }).then((result) => {
      if (result.isConfirmed) {
        resQuery.refetch();
      }
    });
  }
  return resQuery;
};
