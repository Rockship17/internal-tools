import CheckInButton from "@/components/admin/checkin-form/CheckInButton"
import CheckOutButton from "@/components/admin/checkin-form/CheckOutButton"
import CheckInTable from "@/components/admin/checkin-form/CheckInTable"
import { CalendarDays, Clock } from "lucide-react"

export default function CheckInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Attendance Management</h1>
          <p className="mt-4 text-lg text-gray-600">Track your daily check-in and check-out records</p>
        </div>

        <div className="mb-12 grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <Clock className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <CheckInButton />
              <CheckOutButton />
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Today's Summary</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <p className="text-sm text-green-600">Check-in Time</p>
                <p className="mt-1 text-2xl font-bold text-green-700">--:--</p>
              </div>
              <div className="rounded-lg bg-red-50 p-4 text-center">
                <p className="text-sm text-red-600">Check-out Time</p>
                <p className="mt-1 text-2xl font-bold text-red-700">--:--</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Attendance History</h2>
          <CheckInTable />
        </div>
      </div>
    </div>
  )
}
