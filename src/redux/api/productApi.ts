import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    getAllProducts: builder.query<
      {
        data: any[];
        meta: { page: number; limit: number; total: number; totalPage: number };
      },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) =>
        `/products?page=${page}&limit=${limit}`,
      providesTags: ["Product"],
    }),
    // ✅ Get single product
    getSingleProduct: builder.query<any, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateStockOut: builder.mutation({
      query: ({ productId, stockOut }) => ({
        url: `/products/${productId}/stock-out`,
        method: "PATCH",
        body: { stockOut },
      }),
      invalidatesTags: ["Product"],
    }),

    updatePopularStatus: builder.mutation<
      any,
      { id: string; isPopular: boolean }
    >({
      query: ({ id, isPopular }) => ({
        url: `/products/${id}/popular`,
        method: "PATCH",
        body: { isPopular },
      }),
      invalidatesTags: ["Product"],
    }),

    getFlashSaleProducts: builder.query({
      query: () => `/products/flash-sale`,
      providesTags: ["Product"],
    }),
    getPopularProducts: builder.query({
      query: () => "/products/popular",
       providesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateStockOutMutation,
  useGetSingleProductQuery,
  useGetFlashSaleProductsQuery,
  useUpdatePopularStatusMutation,
  useGetPopularProductsQuery
} = productApi;
