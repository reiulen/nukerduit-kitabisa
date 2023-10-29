export const numberFormatDescimals = (n: string) => {
  const formattedAmount = parseFloat(n).toFixed(2);
  return formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

type QueryParams = {
  baseUrl: string;
  query: {
    [key: string]: string | number | boolean | null | undefined;
  };
};

export const buildUrl = ({ baseUrl, query }: QueryParams) => {
  const queryString = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");

  return `${baseUrl}?${queryString}`;
};