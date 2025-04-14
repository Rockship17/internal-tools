export const REQUEST_TYPES = {
  LEAVE: "leave",
  REMOTE: "remote",
  DELAYED_ARRIVAL: "delayed_arrival",
  EARLY_DISMISSAL: "early_dismissal",
} as const

export const TIME_OFF_TYPES = {
  BY_DAY: "by_day",
  MORNING: "morning",
  AFTERNOON: "afternoon",
  BY_HOUR: "by_hour",
} as const

export const REMOTE_TYPES = {
  FULL_DAY: "full_day",
  MORNING: "morning",
  AFTERNOON: "afternoon",
  BY_HOUR: "by_hour",
} as const

export type FormValues = {
  requestType: string
  timeOffType?: string
  remoteType?: string
  date?: Date
  dateRange?: {
    from: Date
    to: Date
  }
  time?: Date
  duration: number
  reason: string
} 