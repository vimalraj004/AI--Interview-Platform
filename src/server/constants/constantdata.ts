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
    url: "/allInterviews",
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
- Analyze the job description to identify key responsibilities, required skills, and expected experience.
- Generate interview questions based on the interview duration.
- Adjust the number and depth of questions according to the duration.
- Ensure questions match a real {{type}} interview.

🧩 RESPONSE FORMAT (STRICT):

Return ONLY a valid JSON object with EXACTLY this structure:

{
  "interviewQuestions": [
    {
      "question": "string",
      "type": "Technical | Behavioral | Experience | Problem Solving | Leadership"
    }
  ]
}

🚨 STRICT RULES:
- Do NOT return an array directly
- Do NOT change the key name "interviewQuestions"
- Do NOT add any explanation or extra text
- Do NOT include markdown (no \`\`\`json or \`\`\`)
- Response must be pure JSON
- Ensure the JSON is valid and parsable

If the format is not followed exactly, the response will be rejected.

🎯 Goal:
Create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`;

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

