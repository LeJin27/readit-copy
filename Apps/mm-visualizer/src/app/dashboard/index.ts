import { ReactElement } from "react"

export interface DashboardComponentProps {
  icon: ReactElement
  name: string

  number: number
  onClick? : () => void;
}