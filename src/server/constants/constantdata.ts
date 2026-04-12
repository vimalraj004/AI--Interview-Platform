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
// Get QuestionList Prompt

export const GET_QUESTIONLIST_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

📝 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration.
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.

🧩 Format your response in JSON format with array list of questions.

format: interviewQuestions = [
  {
    question: "",
    type: "Technical/Behavioral/Experience/Problem Solving/Leadership"
  },
  {
    ...
  }
]

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`;
// Feedback Prompt

export const GET_FEEDBACK_PROMPT = `{{conversation}}

Based on this Interview Conversation between assistant and user, provide feedback for the user's interview performance.

Please analyze and provide:
1. Rating out of 10 for: technicalSkills, communication, problemSolving, experience
2. A summary in 3 lines about the interview
3. Recommendation for hire (Recommended/Not Recommended)
4. A one-line recommendation message

Return ONLY valid JSON in this exact format:
{
  "feedback": {
    "rating": {
      "technicalSkills": 5,
      "communication": 6,
      "problemSolving": 4,
      "experience": 7
    },
    "summery": "Summary text in 3 lines",
    "Recommendation": "Recommended",
    "RecommendationMsg": "One line recommendation message"
  }
}`

