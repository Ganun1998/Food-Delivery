import React, { useEffect, useState } from 'react';
import './Users.css'; // Update the CSS file if needed
import axios from 'axios';
import { toast } from 'react-toastify';

const UserTable = ({ url }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/list`);
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error("Error fetching users");
      }
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  const removeUser = async (userId) => {
    try {
      const response = await axios.post(`${url}/api/user/remove`, { id: userId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUsers(); // Fetch list again to update count
      } else {
        toast.error("Error removing user");
      }
    } catch (error) {
      toast.error("Error removing user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-table flex-col">
      <p>All Users List</p>
      <div className="user-table-format title">
        <b>ID</b>
        <b>Name</b>
        <b>Email</b>
        <b>Role</b>
        <b>Action</b>
      </div>
      {users.map((user) => (
        <div className="user-table-format" key={user._id}>
          <p>{user._id}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
          <p onClick={() => removeUser(user._id)} className='cursor'>X</p>
        </div>
      ))}
    </div>
  );
};

export default UserTable;