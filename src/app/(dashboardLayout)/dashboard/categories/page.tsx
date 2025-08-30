"use client";

import { useForm } from "react-hook-form";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/api/categoryApi";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

const Category = () => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, isLoading: isFetching } = useGetAllCategoriesQuery(null);
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<{ name: string }>();

  // ✅ Handle Create / Update
  const onSubmit = async (formData: { name: string }) => {
    try {
      if (editingId) {
        await updateCategory({ categoryId: editingId, ...formData }).unwrap();
        setEditingId(null);
      } else {
        await createCategory(formData).unwrap();
      }
      reset();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // ✅ Handle Edit
  const handleEdit = (category: Category) => {
    setEditingId(category._id);
    setValue("name", category.name);
  };

  // ✅ Handle Delete
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id).unwrap();
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className=" mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Category Management</h1>

      {/* ✅ Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex space-x-2 items-center"
      >
        <input
          {...register("name")}
          placeholder="Enter category name"
          className="flex-1 border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        />
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {(isCreating || isUpdating) && (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          )}
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* ✅ Table */}
     <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
  <table className="min-w-full divide-y divide-gray-200 text-sm">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="px-6 py-3 text-left">#</th>
        <th className="px-6 py-3 text-left">Name</th>
        <th className="px-6 py-3 text-left">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {data?.data?.map((category: Category, index: number) => (
        <tr
          key={category._id}
          className="hover:bg-gray-50 transition-colors"
        >
          <td className="px-6 py-4 text-gray-600">{index + 1}</td>
          <td className="px-6 py-4 font-medium text-gray-800">
            {category.name}
          </td>
          <td className="px-6 py-4">
            <div className="flex space-x-2">
              {/* Edit */}
              <button
                onClick={() => handleEdit(category)}
                className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700"
                title="Edit Category"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M9 13h3l9-9a1.5 1.5 0 00-3-3l-9 9v3z"
                  />
                </svg>
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(category._id)}
                disabled={isDeleting}
                className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 disabled:opacity-50"
                title="Delete Category"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a2 2 0 002-2V5a2 2 0 00-2-2h-2.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0012.586 1H11.414a1 1 0 00-.707.293L9.293 2.707A1 1 0 018.586 3H6a2 2 0 00-2 2v1a2 2 0 002 2h12z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </td>
        </tr>
      ))}
      {data?.data?.length === 0 && (
        <tr>
          <td colSpan={3} className="text-center py-4 text-gray-500">
            No categories found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Category;
