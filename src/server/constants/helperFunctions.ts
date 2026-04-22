import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import mammoth from "mammoth";
export const findFileType = async (fileType:string, buffer:Buffer, extractedText: string): Promise<string> => {
 if (fileType === "application/pdf") {
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    text += textContent.items.map((item: any) => item.str).join("");
  }
  extractedText = text;
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