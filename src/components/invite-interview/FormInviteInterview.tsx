import React, { useState } from "react"
import { Form, Input, Button, DatePicker, message } from "antd"
import { MailOutlined, UserOutlined, CalendarOutlined } from "@ant-design/icons"

export default function FormInviteInterview() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (values[key]) {
                    if (key === 'start_day') {
                        formData.append(key, values[key].format('YYYY-MM-DD HH:mm'));
                    } else {
                        formData.append(key, values[key]);
                    }
                }
            });

            const response = await fetch("https://n8n.rockship.co/webhook/send-email-invitation", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Submission failed");
            message.success("Form submitted successfully!");
            form.resetFields();
        } catch (error) {
            message.error("An error occurred. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-8 py-6 text-white">
                        <h1 className="text-3xl font-black tracking-tight">Invite Interview</h1>
                        <p className="text-blue-100 mt-1 text-sm">Complete the form below to invite an interview</p>
                    </div>

                    <div className="p-8">
                        <Form
                            form={form}
                            onFinish={onSubmit}
                            layout="vertical"
                            requiredMark={true}
                            className="space-y-8"
                            initialValues={{
                                email: "",
                                full_name: "",
                                start_day: "",
                            }}
                        >
                            <div>
                                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                                    <UserOutlined className="mr-2 text-indigo-500" />
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Form.Item
                                        label="Email Address"
                                        name="email"
                                        required
                                        rules={[{ required: true, message: 'Please input your email!' }]}
                                    >
                                        <Input
                                            prefix={<MailOutlined className="text-gray-400" />}
                                            placeholder="Enter email address"
                                            className="rounded-lg"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Full Name"
                                        name="full_name"
                                        rules={[{ required: true, message: 'Please input your full name!' }]}
                                    >
                                        <Input
                                            prefix={<UserOutlined className="text-gray-400" />}
                                            placeholder="Enter full name"
                                            className="rounded-lg"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                                    <CalendarOutlined className="mr-2 text-indigo-500" />
                                    Additional Details
                                </h3>
                                <Form.Item
                                    label="Start Date"
                                    name="start_day"
                                    rules={[{ required: true, message: 'Please select start date!' }]}
                                >
                                    <DatePicker
                                        className="w-full rounded-lg"
                                        showTime={{ format: 'HH:mm' }}
                                        format="YYYY-MM-DD HH:mm"
                                        onChange={(value, dateString) => {
                                            console.log('Selected Time: ', value);
                                            console.log('Formatted Selected Time: ', dateString);
                                        }}
                                        placeholder="Select start date"
                                    />
                                </Form.Item>
                            </div>
                            <div className="pt-6 border-t border-gray-100 w-full flex justify-center">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    className="w-full md:w-auto h-12 px-8 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 border-none shadow-lg"
                                >
                                    {loading ? 'Processing...' : 'Booking interview'}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="text-center mt-6 text-gray-500 text-xs">
                    © {new Date().getFullYear()} Rockship. All rights reserved.
                </div>
            </div>
        </div>
    )
}