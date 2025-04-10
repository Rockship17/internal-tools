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
    title: "Yêu cầu nghỉ phép mới",
    description: "Nguyễn Văn A đã gửi yêu cầu nghỉ phép từ 15/04 đến 17/04",
    time: "5 phút trước"
  },
  {
    id: 2,
    type: "remote_request",
    title: "Duyệt yêu cầu làm từ xa",
    description: "Admin đã duyệt yêu cầu làm từ xa của Trần Thị B vào ngày 16/04",
    time: "30 phút trước"
  },
  {
    id: 3,
    type: "request_rejected",
    title: "Từ chối yêu cầu",
    description: "Admin đã từ chối yêu cầu nghỉ phép của Phan Văn C",
    time: "1 giờ trước"
  },
  {
    id: 4,
    type: "new_employee",
    title: "Nhân viên mới",
    description: "Lê Văn D đã được thêm vào hệ thống",
    time: "2 giờ trước"
  },
  {
    id: 5,
    type: "attendance",
    title: "Điểm danh",
    description: "Có 45/50 nhân viên đã điểm danh hôm nay",
    time: "3 giờ trước"
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