import { mockQuery } from "../libs/axios-mock";
import { buildUrl } from "../helpers/helper";
import { useQuery } from "@tanstack/react-query";

type Query = {
  [key: string]: string | number | boolean | undefined;
};

const FetchListRateCurrency = (query: Query) => {
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

  return resQuery;
};
export default FetchListRateCurrency;
