"use client";
import {  useState } from "react";
import logo from "../../assests/logo.jpg";
import Image from "next/image";
import { Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {  useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

const Chatbot: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Good evening! How can I help you today?" },
  ]);
  const [isFirstMessageSent, setIsFirstMessageSent] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      // console.log("PDF file selected:", file.name);
    } else {
      alert("Please select a valid PDF file.");
    }
  };
  const searchParams = useSearchParams(); 
  const isNutrition = JSON.parse( searchParams.get("isNutrition"));
console.log("isNutrition",isNutrition)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: "Typing..." },
      ]);

      setInput("");
      setIsFirstMessageSent(true);
      const formData = new FormData();

      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append("query", input);

      try {
        let response;
      
        if (isNutrition) {

         const payload = JSON.parse(localStorage.getItem("formData")||"{}")
      payload.prompt = input
          response = await axios.post("http://localhost:8000/nutrition", payload, {
            headers: {
              "Content-Type": "application/json",
              "authorization" : localStorage.getItem("access_token"),
            },
          });
        } else {
          const formData = new FormData();
          formData.append("query", input);
          if (selectedFile) {
            formData.append("pdf_file", selectedFile);
          }
      
          response = await axios.post("http://localhost:8000/recommendation", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "authorization" : localStorage.getItem("token"),
            },
          });
        }
      
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            role: "assistant",
            content: isNutrition ? response.data.assistant : response.data.doctor_suggestion, 
          },
        ]);
        setSelectedFile(null);
      } catch (error) {
        console.error("Error sending message to LLM:", error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, there was an error processing your request." },
        ]);
      } finally {
       
        setInput(""); 
        setSelectedFile(null);
        setIsFirstMessageSent(false);
      }
      
    }
  };

  

  return (
    <div className="h-screen flex items-center justify-center bg-white text-gray-800 p-6">
  
      <div className="w-full max-w-2xl mx-auto bg-white p-6 relative rounded-lg shadow-lg flex flex-col justify-between h-[80vh]">
     
        <div className="absolute top-4 left-4">
          <Image src={logo} alt="Logo" width={100} height={100} />
        </div>

        <h1 className="text-3xl font-semibold mb-4 text-center text-purple-600">Health Mate Bot</h1>
        <div className="flex-grow overflow-auto mb-6 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === "user" ? "bg-purple-100 text-purple-800" : "bg-gray-100"
                }`}
              >
                 {message.role === "assistant" ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            ))}
          </div>
        </div>

        {!isFirstMessageSent && (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex items-center border border-purple-300 rounded-lg overflow-hidden">
  
             { !isNutrition && <label className="flex items-center p-3 cursor-pointer">
                <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                <FileText className="w-6 h-6 text-purple-600" />
              </label>
}
              
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="How can Chatbot help you today?"
                  className="w-full p-3 pr-10 focus:outline-none"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </form>
        )}

     

        {isFirstMessageSent && (
          <div className="fixed bottom-0 left-0 w-full flex justify-center bg-white mb-8">
            <div className="w-full max-w-2xl">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center border border-purple-300 rounded-lg overflow-hidden">
                  <label className="flex items-center p-3 cursor-pointer">
                    <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                    <FileText className="w-6 h-6 text-purple-600" />
                  </label>

                  <div className="relative flex-grow">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="How can Chatbot help you today?"
                      className="w-full p-3 pr-10 focus:outline-none"
                    />
                    <Button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
