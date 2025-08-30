import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Category
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    // ✅ Get All Categories
    getAllCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    // ✅ Get Single Category
    getCategoryById: builder.query({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    // ✅ Update Category
    updateCategory: builder.mutation({
      query: ({ categoryId, ...data }) => ({
        url: `/category/${categoryId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    // ✅ Delete Category
    deleteCategory: builder.mutation({
      query: (categoryId: string) => ({
        url: `/category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
