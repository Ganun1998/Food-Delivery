import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import './Orders.css'; // Import your CSS file

const OrdersTable = ({ url }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(`${url}/api/order/list`);
            if (response.data.success) {
                setOrders(response.data.data);
                setFilteredOrders(response.data.data);
            } else {
                toast.error("Error fetching orders");
            }
        } catch (error) {
            toast.error("Error fetching orders");
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = orders.filter(
            (order) =>
                order._id.toLowerCase().includes(term) ||
                (order.address.firstName + " " + order.address.lastName).toLowerCase().includes(term)
        );
        setFilteredOrders(filtered);
    };

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(`${url}/api/order/status`, {
            orderId,
            status: event.target.value,
        });
        if (response.data.success) {
            await fetchAllOrders();
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <motion.div
            className="container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
        <h2>Order List</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="th">Order ID</th>
                            <th className="th">Customer</th>
                            <th className="th">Address</th>
                            <th className="th">Phone</th>
                            <th className="th">Total</th>
                            <th className="th">Status</th>
                            <th className="th">Date</th>
                            <th className="th">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredOrders.map((order) => (
                            <motion.tr
                                key={order._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="td">{order._id}</td>
                                <td className="td">
                                    {order.address.firstName} {order.address.lastName}
                                </td>
                                <td className="td">
                                    {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}, {order.address.country}
                                </td>
                                <td className="td">{order.address.phone}</td>
                                <td className="td">${order.amount.toFixed(2)}</td>
                                <td className="td">
                                    <select 
                                        value={order.status} 
                                        onChange={(event) => statusHandler(event, order._id)} 
                                        className="status-select"
                                    >
                                        <option value="Food Processing">Food Processing</option>
                                        <option value="Out for delivery">Out for delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                                <td className="td">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="td">
                                    <button className="button">
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default OrdersTable;