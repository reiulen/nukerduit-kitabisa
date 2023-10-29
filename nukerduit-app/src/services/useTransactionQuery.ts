import { mockMutation, mockQuery } from "@/utils/libs/axios-mock";
import { buildUrl } from "@/utils/helpers/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

type Query = {
  [key: string]: string | number | boolean | null | undefined;
};

export const FetchListSummaryTransaction = (query: Query) => {
  const link = buildUrl({
    baseUrl: "transaction-buy-sell/summary",
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

type QueryMutation = {
  [key: string]: string | number | boolean | null | undefined;
};

export const TransactionQuery = (query: QueryMutation) => {
  const link = buildUrl({
    baseUrl: "transaction-buy-sell/summary",
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

type InputTransction = {
  code_currency?: string;
  rate_exchange?: number;
  amount?: string;
  total?: string;
  type: 1 | 2,
};

type Error = {
  [key: string]: string[];
};

type Mutation = {
  onError : (error: AxiosError<{ errors: Error }>) => void;
  onSuccess : (data : {message: string}) => void;
}

export const MutationTransaction = ({onError, onSuccess} : Mutation) => {
  const url = "transaction-buy-sell";
  const mutationFn = async (data: InputTransction) => {
    return await mockMutation(url, data);
  };
  const resQuery = useMutation({
    mutationKey: [url],
    mutationFn: mutationFn,
    onError: onError,
    onSuccess: onSuccess
  });

  
  return resQuery;
};
