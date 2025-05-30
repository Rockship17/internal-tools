import React from "react"

interface RockshipBlackProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string
}

export function RockshipBlack({ size, ...props }: RockshipBlackProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        id="Vector"
        d="M13.0242 16.5748V14.1073L21.9363 20.1318V15.9008L11.9951 9.17603L8.86175 11.2921L10.959 12.6941V15.1779L7.0441 12.5246L2.06374 15.8933V22.6018L0 23.9987V8.11923L12.0021 0L24 8.11923V10.5868L13.0284 3.15909V7.40132L24 14.8227V24L13.0242 16.5748ZM2.03857 9.19611V13.3969L10.959 7.40132V3.15909L2.03857 9.19611Z"
        fill="#191A15"
      />
    </svg>
  )
}
