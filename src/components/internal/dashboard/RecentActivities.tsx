type Activity = {
  id: number
  type: "leave_request" | "remote_request" | "new_employee" | "attendance" | "request_rejected"
  title: string
  description: string
  time: string
}

const activities: Activity[] = [
  {
    id: 1,
    type: "leave_request",
    title: "New Leave Request",
    description: "Nguyen Van A has submitted a leave request from 15/04 to 17/04",
    time: "5 minutes ago"
  },
  {
    id: 2,
    type: "remote_request",
    title: "Remote Work Request Approved",
    description: "Admin has approved Tran Thi B's remote work request for 16/04",
    time: "30 minutes ago"
  },
  {
    id: 3,
    type: "request_rejected",
    title: "Request Rejected",
    description: "Admin has rejected Phan Van C's leave request",
    time: "1 hour ago"
  },
  {
    id: 4,
    type: "new_employee",
    title: "New Employee",
    description: "Le Van D has been added to the system",
    time: "2 hours ago"
  },
  {
    id: 5,
    type: "attendance",
    title: "Attendance",
    description: "45/50 employees have checked in today",
    time: "3 hours ago"
  }
]

export function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className={`w-2 h-2 mt-2 rounded-full ${getActivityColor(activity.type)}`} />
          <div className="flex-1">
            <h4 className="text-sm font-medium">{activity.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function getActivityColor(type: Activity["type"]) {
  switch (type) {
    case "leave_request":
      return "bg-blue-500"
    case "remote_request":
      return "bg-purple-500"
    case "request_rejected":
      return "bg-red-500"
    case "new_employee":
      return "bg-green-500"
    case "attendance":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
} 