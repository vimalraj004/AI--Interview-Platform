import { useGlobalStore } from "@/app/Hooks/useGlobalStore";
import {
  FormDataDTOResponse,
  NewFormData,
} from "@/app/types/newInterivewFormpage";
import {
  question,
  QuestionResponse,
  saveInterviewResponse,
} from "@/app/types/questionListPage";
import { commonService } from "@/lib/utils";
import { ArrowRight, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "../ui/button";
import { Audio } from "react-loader-spinner";

interface QuestionListProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setInterviewLinkId: React.Dispatch<React.SetStateAction<string>>;
  fetchQuestions:boolean;
  setFetchQuestions:React.Dispatch<React.SetStateAction<boolean>>
}

const QuestionList = ({ setStep, setInterviewLinkId,fetchQuestions,setFetchQuestions }: QuestionListProps) => {
  const formData = useGlobalStore();
  const { jobPosition, jobDescription, duration, interviewTypes } = formData;
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [questionList, setQuestionList] = useState<question[]>([]);
  const getQuestions = async (formData: NewFormData): Promise<void> => {
    try {
      setLoading(true);
      const result = await commonService<QuestionResponse>(
        "/api/getQuestionList",
        "POST",
        formData,
      );
      console.log(result, "resultfromfe");
      if (result.status === 200) {
        setQuestionList(result?.data?.interviewQuestions);
        toast.success(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (fetchQuestions === true) {
      getQuestions(formData);
      setFetchQuestions(false);
    }
  }, [fetchQuestions]);
  const finish = async () => {
    try {
      setSaveLoading(true);
      let payload = {
        jobPosition,
        jobDescription,
        duration,
        interviewTypes,
        questionList,
      };
      const response = await commonService<saveInterviewResponse>(
        "/api/saveInterview",
        "POST",
        payload,
      );
      console.log(response, "responsefromquestionLIst");
      if (response.status === 200) {
        setStep((prev) => prev + 1);
        setInterviewLinkId(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setSaveLoading(false);
    }
  };
  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-100 border border-gray-100 flex items-center gap-5 rounded-xl">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium ">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions based on your job
              position
            </p>
          </div>
        </div>
      )}
      {questionList.length > 0 && (
        <div>
          <h2 className="font-bold text-lg mb-5 text-white">
            Generated Interview Questions:
          </h2>
          <div className=" p-5 border border-gray-50 rounded-xl bg-white">
            {questionList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="p-3 border border-gray-300 mb-2 rounded-lg"
                >
                  <h2 className="font-medium">{item.question}</h2>
                  <h2 className="text-primary">Type: {item.type}</h2>
                </div>
              );
            })}
            <div className=" flex justify-end ju items-end mt-10 ">
              <Button
                onClick={() => {
                  finish();
                }}
                disabled={saveLoading}
              >
                {!saveLoading ? (
                  <div className="flex gap-1">
                    <span className="text-sm ">
                      Create Interview Link & Finish
                    </span>
                    <ArrowRight size={16} />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Audio
                      height="30"
                      width="30"
                      color="#4fa94d"
                      ariaLabel="audio-loading"
                      visible={true}
                    />
                    <span className="text-sm text-gray-600">Loading...</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
