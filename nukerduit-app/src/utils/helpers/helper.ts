export const numberFormat = (n: number) => {
  let numberSplit : string[] = [];
  numberSplit = (Number(n).toFixed(2) + "").split(".");
  return numberSplit?.[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

type QueryParams = {
  baseUrl: string;
  query: {
    [key: string]: string | number | boolean | undefined;
  };
};

export const buildUrl = ({ baseUrl, query }: QueryParams) => {
  const queryString = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");

  return `${baseUrl}?${queryString}`;
};