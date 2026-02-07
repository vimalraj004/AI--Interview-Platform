import { NewFormData } from "../types/newInterivewFormpage";
 
const checkAllComponents = new Set<()=>void>();
  
 const initialFormData:NewFormData = {
     jobPosition:"",
    jobDescription:"",
    duration:"",
    interviewTypes:[]
  }
  let formData:NewFormData =initialFormData
export const FormDataStore = {
    // get Currnet state
    getsnapshot(){
        return formData
    },
    // SERVER snapshot
      getServerSnapshot() {
    return initialFormData;
  },
    // subcribe (like event listener)
    subscribe(listener:()=>void){
        checkAllComponents.add(listener);
        return()=>{
            checkAllComponents.delete(listener)
        }
    },
    // update state
    setFormData(newState:Partial<NewFormData>){
        formData = {...formData,...newState};
        checkAllComponents.forEach((listener)=> listener());

    }
}