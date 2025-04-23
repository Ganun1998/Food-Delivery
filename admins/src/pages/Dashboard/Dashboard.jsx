import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { ShoppingCartOutlined, UserOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Typography, Row, Col } from "antd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [orders, setOrders] = useState(0);
    const [listedItems, setListedItems] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [loading, setLoading] = useState(true);



    return (
        <div className='container' style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                <Typography.Title level={4} style={{ textAlign: 'center' }}>Dashboard</Typography.Title>
                <Row gutter={16} justify="center">
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <DashboardCard
                            icon={<ShoppingCartOutlined style={{ color: "gay" }} />}
                            title="Orders"
                            value={orders}
                            backgroundColor="green"
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <DashboardCard
                            icon={<ShoppingCartOutlined style={{ color: "blue" }} />}
                            title="Items"
                            value={listedItems}
                            backgroundColor="red"
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <DashboardCard
                            icon={<UserOutlined style={{ color: "red" }} />}
                            title="Customers"
                            value={customers}
                            backgroundColor="blue"
                        />
                    </Col>
                   
                </Row>
                <Row style={{ marginTop: 20 }} justify="center">
                    <Col xs={24}>
                        <DashboardChart />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

const DashboardCard = ({ title, value, icon, backgroundColor }) => {
    return (
        <Card style={{ backgroundColor, borderRadius: 20, padding: 16 }}>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
};

const DashboardChart = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Dashoaard Chart',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June',
         'July', 'August', 'September', 'October', 'November', 'December'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Orders',
                data: labels.map(() => Math.random() * 1000),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Items',
                data: labels.map(() => Math.random() * 1000),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Customers',
                data: labels.map(() => Math.random() * 1000),
                backgroundColor: 'rgba(53, 235, 93, 0.5)',
            },
        ],
    };

    return (
        <Card style={{ width: '100%', height: 500, position: "relative" }}>
            <Bar options={options} data={data} />
        </Card>
    );
};

export default Dashboard;