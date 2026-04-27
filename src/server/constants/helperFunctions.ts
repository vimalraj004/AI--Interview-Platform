import mammoth from "mammoth";
export const findFileType = async (fileType:string, buffer:Buffer, extractedText: string): Promise<string> => {
 if (fileType === "application/pdf") {
 const pdf = (await import("pdf-parse-fork")).default;
 const data = await pdf(buffer);
  extractedText = data.text;
    } 
  else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    }
return extractedText;
    
}