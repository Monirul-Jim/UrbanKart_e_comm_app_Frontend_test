"use client";

import { User } from "@/interface/userInterface";
import {
  useGetAllUserQuery,
  useUpdateIsDeletedMutation,
  useUpdateRoleMutation,
  useUpdateStatusMutation,
} from "@/redux/api/authApi";
import { Loader2, Trash2, UserCog, Shield } from "lucide-react";

interface GetAllUsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

const ManageUsers = () => {
  const { data, isLoading } = useGetAllUserQuery(null) as {
    data: GetAllUsersResponse | undefined;
    isLoading: boolean;
  };
  const [updateIsDeleted] = useUpdateIsDeletedMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [updateStatus] = useUpdateStatusMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-500" />
      </div>
    );
  }

  const handleDeleteToggle = async (userId: string, currentStatus: boolean) => {
    try {
      await updateIsDeleted({ userId, isDeleted: !currentStatus }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleUpdate = async (userId: string, role: string) => {
    try {
      await updateRole({ userId, role }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (userId: string, status: string) => {
    try {
      await updateStatus({ userId, status }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">👥 Manage Users</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Deleted</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.data?.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>

                {/* Role dropdown */}
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleUpdate(user._id, e.target.value)
                    }
                    className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>

                {/* Status badge */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Deleted badge */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.isDeleted
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.isDeleted ? "Yes" : "No"}
                  </span>
                </td>

                {/* Action buttons */}
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {/* Toggle Delete */}
                    <button
                      onClick={() =>
                        handleDeleteToggle(user._id, user.isDeleted)
                      }
                      className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                      title={user.isDeleted ? "Restore User" : "Delete User"}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    {/* Toggle Status */}
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          user._id,
                          user.status === "active" ? "blocked" : "active"
                        )
                      }
                      className={`p-2 rounded-lg ${
                        user.status === "active"
                          ? "bg-red-100 hover:bg-red-200 text-red-700"
                          : "bg-green-100 hover:bg-green-200 text-green-700"
                      }`}
                      title={
                        user.status === "active" ? "Block User" : "Activate User"
                      }
                    >
                      <Shield className="h-4 w-4" />
                    </button>

                    {/* Manage Role */}
                    <button
                      onClick={() =>
                        handleRoleUpdate(
                          user._id,
                          user.role === "admin" ? "user" : "admin"
                        )
                      }
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700"
                      title="Change Role"
                    >
                      <UserCog className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;


// <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
//           <Plus size={18} /> Add User
//         </button>
