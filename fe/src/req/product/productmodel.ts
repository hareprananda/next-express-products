export type ChartResponse = {
  comparator: string;
  value: number;
};

export type Product = {
  id: string;
  name: string;
  price: {
    amount: number;
    formattedAmount: string;
  };
  type: string;
  stock: number;
  year: string;
};

export type ProductListResponse = {
  metadata: {
    count: number;
    limit: number;
    page: number;
  };
  data: Product[];
};
export type ProductPayload = {
  name: string;
  price: string;
  type: string;
  stock: string;
  year: string;
};
