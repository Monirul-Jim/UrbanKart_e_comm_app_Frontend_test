// src/redux/api/subCategoryApi.ts
import { baseApi } from "./baseApi";

const subCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategory: builder.mutation({
      query: (data) => ({
        url: "/subcategories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subCategory"],
    }),

    getAllSubCategories: builder.query({
      query: () => ({
        url: "/subcategories",
        method: "GET",
      }),
      providesTags: ["subCategory"],
    }),

    updateSubCategory: builder.mutation({
      query: ({ subCategoryId, ...data }) => ({
        url: `/subcategories/${subCategoryId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["subCategory"],
    }),

    deleteSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `/subcategories/${subCategoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subCategory"],
    }),
  }),
});

export const {
  useCreateSubCategoryMutation,
  useGetAllSubCategoriesQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
