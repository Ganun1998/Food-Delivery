import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import "./Users.css";

const initialUserData = [
	{ id: 1, name: "Ganun Gattang", email: "ganun@example.com", role: "Admin", status: "Active" },
	{ id: 2, name: "Chuol Phar", email: "jane@example.com", role: "Admin", status: "Active" },
	{ id: 3, name: "Koang Ruach", email: "ruach@example.com", role: "Customer", status: "Inactive" },
	{ id: 4, name: "Kueth Chuol", email: "alice@example.com", role: "Customer", status: "Active" },
	{ id: 5, name: "Char Koang", email: "charlie@example.com", role: "Customer", status: "Active" },
];

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [userData, setUserData] = useState(initialUserData);
	const [filteredUsers, setFilteredUsers] = useState(userData);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
	};

	const handleDelete = (id) => {
		const updatedUsers = userData.filter(user => user.id !== id);
		setUserData(updatedUsers);
		setFilteredUsers(updatedUsers); // Update filteredUsers to reflect the deletion
	};

	return (
		<motion.div className='users-container' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
			<div className='header'>
				<h2 className='title'>Users</h2>
				<div className='search-container'>
					<input
						type='text'
						placeholder='Search users...'
						className='search-input'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='search-icon' size={18} />
				</div>
			</div>

			<div className='table-container'>
				<table className='user-table'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map((user) => (
							<motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
								<td>
									<div className='user-info'>
										<div className='user-name'>{user.name}</div>
									</div>
								</td>
								<td>{user.email}</td>
								<td>
									<span className='role-badge'>{user.role}</span>
								</td>
								<td>
									<span className={`status-badge ${user.status === "Active" ? "active" : "inactive"}`}>
										{user.status}
									</span>
								</td>
								<td>
									<button className='edit-btn'>Edit</button>
									<button className='delete-btn' onClick={() => handleDelete(user.id)}>Delete</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default UsersTable;