export type ChartResponse = {
  comparator: string;
  value: number;
};

export type ProductListResponse = {
  metadata: {
    count: number;
    limit: number;
    page: number;
  };
  data: {
    id: string;
    name: string;
    price: {
      amount: number;
      formattedAmount: string;
    };
    type: string;
    stock: number;
    year: string;
  }[];
};
