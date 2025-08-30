"use client";
import { useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUpdateStockOutMutation,
  useUpdatePopularStatusMutation,
} from "@/redux/api/productApi";
import { useGetAllSubCategoriesQuery } from "@/redux/api/subCategoryApi";
import { ProductForm } from "@/interface/productInterface";
import { useState, useEffect } from "react";
import { CheckCircle, Info, Pencil, Trash2, X, XCircle } from "lucide-react";
import Pagination from "@/components/Pagination/Pagination";

export default function Product() {
  const { register, handleSubmit, reset, watch } = useForm<ProductForm>();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 200; // 👈 backend-driven items per page
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [updateStockOut] = useUpdateStockOutMutation();
  const [updatePopular] = useUpdatePopularStatusMutation();

  const { data, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit,
  });
  const { data: subCategories } = useGetAllSubCategoriesQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [viewProduct, setViewProduct] = useState<any>(null); // for modal view
  const { data: products, meta } = data || {};
  const totalPages = meta?.totalPage || 1;
  const isFlashSale = watch("isFlashSale");

  // preload form values when editing
  useEffect(() => {
    if (editingProduct) {
      reset(editingProduct);
    } else {
      reset({
        title: "",
        description: "",
        price: 0,
        discountPrice: 0,
        image: "",
        subCategory: "",
        isFlashSale: false,
        flashSalePrice: 0,
        flashSaleStart: "",
        flashSaleEnd: "",
      });
    }
  }, [editingProduct, reset]);
  const onSubmit = async (formData: ProductForm) => {
    try {
      if (editingProduct) {
        let payload = { ...formData };

        // Convert datetime-local to ISO (only if flash sale is enabled)
        if (payload.isFlashSale) {
          if (payload.flashSaleStart) {
            payload.flashSaleStart = new Date(
              payload.flashSaleStart
            ).toISOString();
          }
          if (payload.flashSaleEnd) {
            payload.flashSaleEnd = new Date(payload.flashSaleEnd).toISOString();
          }
        }

        await updateProduct({
          id: editingProduct._id,
          data: payload,
        }).unwrap();

        setEditingProduct(null);
      } else {
        // Prevent flash sale on create
        const {
          isFlashSale,
          flashSalePrice,
          flashSaleStart,
          flashSaleEnd,
          ...cleanData
        } = formData;

        await createProduct(cleanData).unwrap();
      }

      reset();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
  };
  const handleStockOutToggle = async (id: string, currentStatus: boolean) => {
    try {
      await updateStockOut({
        productId: id,
        stockOut: !currentStatus,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update stock status", error);
    }
  };
  const handlePopularToggle = async (id: string, currentStatus: boolean) => {
    try {
      await updatePopular({
         id,
        isPopular: !currentStatus,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update popular status", error);
    }
  };
  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow p-6 rounded-xl space-y-4"
      >
        <h2 className="text-lg font-semibold">
          {editingProduct ? "Update Product" : "Create Product"}
        </h2>
        <input
          {...register("title")}
          placeholder="Title"
          className="w-full border rounded p-2"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Price"
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          {...register("discountPrice", { valueAsNumber: true })}
          placeholder="Discount Price"
          className="w-full border rounded p-2"
        />
        <input
          {...register("image")}
          placeholder="Image URL"
          className="w-full border rounded p-2"
        />

        {/* SubCategory Select */}
        <select
          {...register("subCategory")}
          className="w-full border rounded p-2"
        >
          <option value="">Select SubCategory</option>
          {subCategories?.data?.map((sub: any) => (
            <option key={sub._id} value={sub._id}>
              {sub.name} ({sub.category?.name})
            </option>
          ))}
        </select>

        {/* Flash Sale only when updating */}
        {editingProduct && (
          <div className="space-y-2 border-t pt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("isFlashSale")} />
              Flash Sale
            </label>

            {isFlashSale && (
              <div className="space-y-2">
                <input
                  type="number"
                  {...register("flashSalePrice", { valueAsNumber: true })}
                  placeholder="Flash Sale Price"
                  className="w-full border rounded p-2"
                />
                <input
                  type="datetime-local"
                  {...register("flashSaleStart")}
                  className="w-full border rounded p-2"
                />
                <input
                  type="datetime-local"
                  {...register("flashSaleEnd")}
                  className="w-full border rounded p-2"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {editingProduct ? "Update Product" : "Save Product"}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Product Table */}
      <div>
        {Object.entries(
          data?.data?.reduce((groups: Record<string, any[]>, product: any) => {
            const categoryName =
              product?.subCategory?.category?.name || "Others";
            if (!groups[categoryName]) groups[categoryName] = [];
            groups[categoryName].push(product);
            return groups;
          }, {}) || {}
        ).map(([categoryName, products]) => {
          const typedProducts = products as any[];

          return (
            <div key={categoryName} className="mb-10">
              <h2 className="text-xl font-bold mb-3">{categoryName}</h2>

              <div className="overflow-x-auto bg-white shadow rounded-xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left">#</th>
                      <th className="px-6 py-3 text-left">Image</th>
                      <th className="px-6 py-3 text-left">Title</th>
                      <th className="px-6 py-3 text-left">Price</th>
                      <th className="px-6 py-3 text-left">Discount Price</th>
                      <th className="px-6 py-3 text-left">SubCategory</th>
                      <th className="px-6 py-3 text-left">
                        Product Upload Time
                      </th>
                      <th className="px-6 py-3 text-left">Flash Sale</th>
                      <th className="px-6 py-3 text-left">Popular</th>
                      <th className="px-6 py-3 text-left">Stock</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {typedProducts.map((product: any, index: number) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">
                          <img
                            src={product?.image}
                            alt={product?.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          {product?.title}
                        </td>
                        <td className="px-6 py-4">${product?.price}</td>
                        <td className="px-6 py-4">
                          {product?.discountPrice
                            ? `$${product?.discountPrice}`
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {product?.subCategory?.name}
                        </td>
                        <td className="px-6 py-4">
                          {product?.createdAt
                            ? new Date(product?.createdAt).toLocaleString()
                            : "-"}
                          <br />
                          {product?.updatedAt
                            ? new Date(product?.updatedAt).toLocaleString()
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {product.isFlashSale ? (
                            <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                              Yes
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {product.isPopular ? (
                            <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-600">
                              Yes
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {product?.stockOut ? (
                            <span className="flex items-center gap-1 text-red-600">
                              <XCircle className="w-4 h-4" /> Out of Stock
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="w-4 h-4" /> In Stock
                            </span>
                          )}
                          <button
                            onClick={() =>
                              handleStockOutToggle(
                                product._id,
                                product.stockOut
                              )
                            }
                            className={`ml-2 px-2 py-1 text-xs rounded ${
                              product.stockOut
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {product.stockOut ? "Mark In" : "Mark Out"}
                          </button>
                        </td>
                        <td className="px-6 py-4 flex gap-2 items-center">
                          <button
                            onClick={() => setViewProduct(product)}
                            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                            title="View"
                          >
                            <Info className="w-4 h-4 text-gray-700" />
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 bg-blue-100 rounded hover:bg-blue-200"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() =>
                              handlePopularToggle(
                                product._id,
                                product.isPopular
                              )
                            }
                            className={`p-2 rounded ${
                              product.isPopular
                                ? "bg-yellow-100 hover:bg-yellow-200"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                            title={
                              product.isPopular
                                ? "Unmark Popular"
                                : "Mark as Popular"
                            }
                          >
                            ⭐
                          </button>

                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 bg-red-100 rounded hover:bg-red-200"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 👇 Pagination directly under each category group */}
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                    pageSiblings={2}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal for product details */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setViewProduct(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-3">{viewProduct.title}</h2>
            <img
              src={viewProduct.image}
              alt={viewProduct.title}
              className="w-full h-60 object-cover rounded mb-4"
            />

            <p className="text-gray-700 mb-3">{viewProduct.description}</p>

            <div className="space-y-2">
              <p>
                <strong>Price:</strong> ${viewProduct.price}
              </p>
              {viewProduct.discountPrice && (
                <p>
                  <strong>Discount Price:</strong> ${viewProduct.discountPrice}
                </p>
              )}
              <p>
                <strong>SubCategory:</strong> {viewProduct.subCategory?.name}
              </p>
              <p>
                <strong>Uploaded:</strong>{" "}
                {new Date(viewProduct.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {new Date(viewProduct.updatedAt).toLocaleString()}
              </p>
            </div>

            {/* Flash Sale Info */}
            {viewProduct.isFlashSale && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-red-600 font-semibold mb-2">
                  🔥 Flash Sale
                </h3>
                <p>
                  <strong>Price:</strong> ${viewProduct.flashSalePrice}
                </p>
                <p>
                  <strong>Start:</strong>{" "}
                  {new Date(viewProduct.flashSaleStart).toLocaleString()}
                </p>
                <p>
                  <strong>End:</strong>{" "}
                  {new Date(viewProduct.flashSaleEnd).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
