import React from "react";

const UserEditModal = ({
  editingUser,
  setEditingUser,
  updateUser,
  setShowUserModal,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({
      ...editingUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white rounded-[8px] p-6 w-full max-w-[500px] mx-4">
        <h2 className="text-[20px] font-semibold text-[#2d3748] mb-6">
          Edit User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-[14px] text-[#4a5568] mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                value={editingUser.name}
                onChange={handleChange}
                type="text"
                className="w-full border border-[#e1e4e8] rounded-[4px] px-3 py-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-[14px] text-[#4a5568] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                value={editingUser.email}
                onChange={handleChange}
                type="email"
                className="w-full border border-[#e1e4e8] rounded-[4px] px-3 py-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-[14px] text-[#4a5568] mb-2"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={editingUser.role}
                onChange={handleChange}
                className="w-full border border-[#e1e4e8] rounded-[4px] px-3 py-2"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="bg-[#00a3bf] text-white px-4 py-2 rounded-[4px] font-medium"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                className="border border-[#e1e4e8] px-4 py-2 rounded-[4px] text-[#4a5568]"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
