"use client"

import React, { useState } from "react"
import { Form, DatePicker, Checkbox, message } from "antd"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  CalendarOutlined,
  UserOutlined,
  BankOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    <div className="py-12 bg-background">
      <div className="container mx-auto">
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
          <div className="bg-primary px-8 py-6 text-primary-foreground">
            <h1 className="text-3xl font-black tracking-tight">Offer Letter Details</h1>
            <p className="text-muted mt-1 text-sm">Complete the form below to generate a professional offer letter</p>
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
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <UserOutlined className="mr-2 text-primary" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    label={<span className="text-foreground">Email Address</span>}
                    name="email"
                    required
                    rules={[{ required: true, message: "Please input your email!" }]}
                  >
                    <Input
                      placeholder="Enter email address"
                      className="rounded-lg bg-input text-foreground border-border"
                    />
                  </Form.Item>
                  <Form.Item
                    label={<span className="text-foreground">Full Name</span>}
                    name="full_name"
                    rules={[{ required: true, message: "Please input your full name!" }]}
                  >
                    <Input
                      placeholder="Enter full name"
                      className="rounded-lg bg-input text-foreground border-border"
                    />
                  </Form.Item>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <BankOutlined className="mr-2 text-primary" />
                  Position Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    label={<span className="text-foreground">Position</span>}
                    name="position"
                    rules={[{ required: true, message: "Please select a position!" }]}
                  >
                    <Select
                      onValueChange={(value) => form.setFieldValue("position", value)}
                      defaultValue={form.getFieldValue("position")}
                    >
                      <SelectTrigger className="rounded-lg bg-input text-foreground border-border">
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Frontend Engineer">Frontend Engineer</SelectItem>
                        <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                        <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                        <SelectItem value="Data Engineer">Data Engineer</SelectItem>
                        <SelectItem value="Designer">Designer</SelectItem>
                        <SelectItem value="QA">QA</SelectItem>
                      </SelectContent>
                    </Select>
                  </Form.Item>

                  <div className="flex items-end">
                    <Form.Item
                      className="flex-1 mr-2"
                      label={<span className="text-foreground">Salary</span>}
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
                        className="text-right rounded-lg bg-input text-foreground border-border"
                      />
                    </Form.Item>
                    <Form.Item name="salary_format" className="w-20">
                      <Select onValueChange={(value) => form.setFieldValue("salary_format", value)} defaultValue="vnd">
                        <SelectTrigger className="rounded-lg bg-input text-foreground border-border">
                          <SelectValue placeholder="VND" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vnd">VND</SelectItem>
                        </SelectContent>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <Form.Item name="intern" valuePropName="checked" className="mt-2">
                  <Checkbox onChange={(e) => setIsIntern(e.target.checked)}>
                    <span className="text-foreground">Intern Position</span>
                  </Checkbox>
                </Form.Item>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <ClockCircleOutlined className="mr-2 text-primary" />
                  Probation Period
                </h3>
                <Form.Item
                  label={<span className="text-foreground">Select Period</span>}
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
                    className="w-full rounded-lg bg-input text-foreground border-border"
                    format="DD-MM-YYYY"
                    placeholder={["Start Date", "End Date"]}
                    disabled={isIntern}
                  />
                </Form.Item>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <CalendarOutlined className="mr-2 text-primary" />
                  Additional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    label={<span className="text-foreground">Holidays (days per year)</span>}
                    name="holiday_days"
                    required={!isIntern}
                    rules={[
                      {
                        required: !isIntern,
                        message: "Please enter holidays!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter holidays"
                      className="rounded-lg bg-input text-foreground border-border"
                      disabled={isIntern}
                    />
                  </Form.Item>
                  <Form.Item
                    label={<span className="text-foreground">Start Date</span>}
                    name="start_day"
                    rules={[{ required: true, message: "Please select start date!" }]}
                  >
                    <DatePicker
                      className="w-full rounded-lg bg-input text-foreground border-border"
                      format="DD-MM-YYYY"
                      placeholder="Select start date"
                    />
                  </Form.Item>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <EnvironmentOutlined className="mr-2 text-primary" />
                  Office Address
                </h3>
                <Form.Item
                  label={<span className="text-foreground">Address</span>}
                  name="office_address"
                  rules={[{ required: true, message: "Please input office address!" }]}
                >
                  <Input
                    placeholder="85/18 Pham Viet Chanh, Ward 19, Binh Thanh District, Ho Chi Minh City"
                    className="rounded-lg bg-input text-foreground border-border"
                  />
                </Form.Item>
              </div>

              <div className="pt-6 border-t border-border w-full flex justify-center">
                <Button
                  type="submit"
                  className="w-full md:w-auto h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Generate Offer Letter"}
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <div className="text-center mt-6 text-muted-foreground text-xs">
          © {new Date().getFullYear()} Rockship. All rights reserved.
        </div>
      </div>
    </div>
  )
}
