import { BriefcaseBusinessIcon, Calendar, Code2Icon, Crown, LayoutDashboard, List, Plus, Puzzle, Search, Settings, User2Icon } from "lucide-react"

// Menu items.
export  const sideBarMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Scheduled Interview",
    url: "/scheduledInterview",
    icon: Calendar,
  },
  {
    title: "All Interview",
    url: "/allInterview",
    icon: List,
  },

]
// Interview types
export const interviewTypes = [
  {
    title:"Technical",
    icon:Code2Icon
  },
    {
    title:"Behavioral",
    icon:User2Icon
  },
    {
    title:"Experience",
    icon:BriefcaseBusinessIcon
  },
    {
    title:"Problem Solving",
    icon:Puzzle
  },
    {
    title:"Leadership",
    icon:Crown
  }
]
