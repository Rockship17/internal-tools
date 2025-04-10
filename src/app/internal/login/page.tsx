"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { message } from "antd"
// import { toast } from "sonner"
import { RockshipBlack } from "@/assets/icon/RockshipBlack"

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      remember: true,
    },
  })

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      const response = await fetch("https://n8n.rockship.co/webhook/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      })

      const data = await response.json()
      console.log("Response data:", data)

      const result = data[0]

      if (result.status_code === 404) {
        throw new Error(result.message)
      }

      if (result.status_code === 200) {
        message.success(result.message)
        router.push("/internal")
      } else {
        throw new Error(result.message || "Đăng nhập thất bại")
      }
    } catch (error: any) {
      message.error(error.message || "Đăng nhập thất bại")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50">
      <span className="!absolute !top-20 !left-20 flex items-center gap-2">
        <RockshipBlack />
        <span className="text-3xl font-bold font-[family-name:var(--font-dosis)]">ROCKSHIP</span>
      </span>
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex flex-col space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-gray-900">Welcome Back</h1>
            <p className="text-lg text-gray-600">Login to your account to continue.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                rules={{ required: "Please input your username!" }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="w-full px-4 py-2 rounded-lg" placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                rules={{ required: "Please input your password!" }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full px-4 py-2 rounded-lg"
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded border-gray-300"
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-600">Remember me</FormLabel>
                    </FormItem>
                  )}
                />
                <Link href="/forgot-password" className="text-sm">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full py-3 px-4 rounded-full h-12" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
