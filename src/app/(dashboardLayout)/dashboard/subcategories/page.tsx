"use client";

import { useForm } from "react-hook-form";
import {
  useCreateSubCategoryMutation,
  useGetAllSubCategoriesQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} from "@/redux/api/subCategoryApi";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useState } from "react";
import { Loader2, Trash2, Edit3 } from "lucide-react";

interface SubCategory {
  _id: string;
  name: string;
  category: { _id: string; name: string };
}

const SubCategory = () => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: categories } = useGetAllCategoriesQuery(null);
  const { data, isLoading } = useGetAllSubCategoriesQuery(null);

  const [createSubCategory, { isLoading: creating }] =
    useCreateSubCategoryMutation();
  const [updateSubCategory, { isLoading: updating }] =
    useUpdateSubCategoryMutation();
  const [deleteSubCategory, { isLoading: deleting }] =
    useDeleteSubCategoryMutation();

  const { register, handleSubmit, reset, setValue } = useForm<{
    name: string;
    category: string;
  }>({
    defaultValues: {
      name: "",
      category: "",
    },
  });

  // ✅ Create / Update
  const onSubmit = async (formData: { name: string; category: string }) => {
    try {
      if (editingId) {
        await updateSubCategory({
          subCategoryId: editingId,
          ...formData,
        }).unwrap();
        setEditingId(null);
      } else {
        await createSubCategory(formData).unwrap();
      }
      reset();
    } catch (error) {
      console.error("Error saving subcategory:", error);
    }
  };

  // ✅ Edit
  const handleEdit = (subCategory: SubCategory) => {
    setEditingId(subCategory._id);
    setValue("name", subCategory.name);
    setValue("category", subCategory.category._id);
  };

  // ✅ Delete
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      await deleteSubCategory(id).unwrap();
    }
  };

  return (
    <div className=" mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">SubCategory Management</h1>

      {/* ✅ Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-3 items-center"
      >
        {/* Name Input */}
        <input
          {...register("name", { required: true })}
          placeholder="Enter subcategory name"
          className="flex-1 border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        />

        {/* Category Dropdown */}
        <select
          {...register("category", { required: true })}
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        >
          <option value="">Select Category</option>
          {categories?.data?.map((cat: { _id: string; name: string }) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={creating || updating}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2 disabled:opacity-50"
        >
          {(creating || updating) && (
            <Loader2 className="h-4 w-4 animate-spin" />
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
              <th className="px-6 py-3 text-left">SubCategory</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-indigo-600" />
                </td>
              </tr>
            ) : data?.data?.length > 0 ? (
              data.data.map((sub: SubCategory, index: number) => (
                <tr
                  key={sub._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {sub.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {sub.category?.name}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(sub)}
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(sub._id)}
                      disabled={deleting}
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 disabled:opacity-50"
                      title="Delete"
                    >
                      {deleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No subcategories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategory;
