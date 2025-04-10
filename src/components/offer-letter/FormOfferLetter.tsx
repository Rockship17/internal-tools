"use client"

import React, { useState } from "react"
import { Form, Select, DatePicker, Checkbox, message } from "antd"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  CalendarOutlined,
  UserOutlined,
  BankOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"

const { RangePicker } = DatePicker

export default function FormOfferLetter() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [isIntern, setIsIntern] = useState(false)
  const [rawSalary, setRawSalary] = useState("")
  const defaultValue = "85/18 Pham Viet Chanh, Ward 19, Binh Thanh District, Ho Chi Minh City"
  const onSubmit = async (values: any) => {
    setLoading(true)
    try {
      const formData = new FormData()
      Object.keys(values).forEach((key) => {
        if (values[key]) {
          if (key === "probation_period") {
            formData.append("probation_period[start]", values[key][0].format("YYYY-MM-DD"))
            formData.append("probation_period[end]", values[key][1].format("YYYY-MM-DD"))
          } else if (key === "start_day") {
            formData.append(key, values[key].format("YYYY-MM-DD"))
          } else if (key === "salary") {
            formData.append(key, rawSalary)
          } else {
            formData.append(key, values[key])
          }
        }
      })

      const response = await fetch("https://n8n.rockship.co/webhook/f34eeb2c-cc23-44a7-984f-8dc97830dfc0", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Submission failed")
      message.success("Form submitted successfully!")
      form.resetFields()
    } catch (error) {
      message.error("An error occurred. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-8 py-6 text-white">
            <h1 className="text-3xl font-black tracking-tight">Offer Letter Details</h1>
            <p className="text-blue-100 mt-1 text-sm">
              Complete the form below to generate a professional offer letter
            </p>
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
                position: "",
                salary: "",
                salary_format: "VNĐ",
                holiday_days: "",
                office_address: defaultValue,
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
                    rules={[{ required: true, message: "Please input your email!" }]}
                  >
                    <Input placeholder="Enter email address" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    label="Full Name"
                    name="full_name"
                    rules={[{ required: true, message: "Please input your full name!" }]}
                  >
                    <Input placeholder="Enter full name" className="rounded-lg" />
                  </Form.Item>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <BankOutlined className="mr-2 text-indigo-500" />
                  Position Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    label="Position"
                    name="position"
                    rules={[{ required: true, message: "Please select a position!" }]}
                  >
                    <Select
                      placeholder="Select a position"
                      className="rounded-lg"
                      dropdownStyle={{ borderRadius: "0.5rem" }}
                    >
                      <Select.Option value="Frontend Engineer">Frontend Engineer</Select.Option>
                      <Select.Option value="Backend Engineer">Backend Engineer</Select.Option>
                      <Select.Option value="AI Engineer">AI Engineer</Select.Option>
                      <Select.Option value="Data Engineer">Data Engineer</Select.Option>
                      <Select.Option value="Designer">Designer</Select.Option>
                      <Select.Option value="QA">QA</Select.Option>
                    </Select>
                  </Form.Item>

                  <div className="flex items-end">
                    <Form.Item
                      className="flex-1 mr-2"
                      label="Salary"
                      name="salary"
                      rules={[{ required: true, message: "Please input salary!" }]}
                    >
                      <Input
                        placeholder="Enter salary"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          setRawSalary(value)
                          const formattedValue = value ? new Intl.NumberFormat().format(Number(value)) : ""
                          form.setFieldValue("salary", formattedValue)
                        }}
                        className="text-right rounded-lg"
                      />
                    </Form.Item>
                    <Form.Item name="salary_format" className="w-20">
                      <Select defaultValue="vnd" className="rounded-lg">
                        <Select.Option value="vnd">VND</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <Form.Item name="intern" valuePropName="checked" className="mt-2">
                  <Checkbox onChange={(e) => setIsIntern(e.target.checked)}>
                    <span className="text-gray-700">Intern Position</span>
                  </Checkbox>
                </Form.Item>
              </div>

              {/* Probation Period Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <ClockCircleOutlined className="mr-2 text-indigo-500" />
                  Probation Period
                </h3>
                <Form.Item
                  label="Select Period"
                  name="probation_period"
                  required={!isIntern}
                  rules={[
                    {
                      required: !isIntern,
                      message: "Please select probation period!",
                    },
                  ]}
                >
                  <RangePicker
                    className="w-full rounded-lg"
                    format="DD-MM-YYYY"
                    placeholder={["Start Date", "End Date"]}
                    disabled={isIntern}
                  />
                </Form.Item>
              </div>

              {/* Additional Details Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <CalendarOutlined className="mr-2 text-indigo-500" />
                  Additional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    label="Holidays (days per year)"
                    name="holiday_days"
                    required={!isIntern}
                    rules={[
                      {
                        required: !isIntern,
                        message: "Please enter holidays!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter holidays" className="rounded-lg" disabled={isIntern} />
                  </Form.Item>
                  <Form.Item
                    label="Start Date"
                    name="start_day"
                    rules={[{ required: true, message: "Please select start date!" }]}
                  >
                    <DatePicker className="w-full rounded-lg" format="DD-MM-YYYY" placeholder="Select start date" />
                  </Form.Item>
                </div>
              </div>

              {/* Office Address Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <EnvironmentOutlined className="mr-2 text-indigo-500" />
                  Office Address
                </h3>
                <Form.Item
                  label="Address"
                  name="office_address"
                  rules={[{ required: true, message: "Please input office address!" }]}
                >
                  <Input
                    placeholder="85/18 Pham Viet Chanh, Ward 19, Binh Thanh District, Ho Chi Minh City"
                    defaultValue={defaultValue}
                    className="rounded-lg"
                  />
                </Form.Item>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-100 w-full flex justify-center">
                <Button className="w-full md:w-auto h-12 px-8 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 border-none shadow-lg">
                  {loading ? "Processing..." : "Generate Offer Letter"}
                </Button>
              </div>
            </Form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-xs">
          © {new Date().getFullYear()} Rockship. All rights reserved.
        </div>
      </div>
    </div>
  )
}
