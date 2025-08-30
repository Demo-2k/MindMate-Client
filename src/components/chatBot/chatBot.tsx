// // export const ChatBot = () =>{
// //     return <div>Hi</div>
// // }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import { sendMessage } from "../action";
// import { ChatDialogBreath } from "./chatBotBreath";

// export const ChatBot = () => {
//   const [messages, setMessages] = useState<{ role: string; text: string }[]>(
//     []
//   );

//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const [showBreathing, setShowBreathing] = useState(false);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage = { role: "user", text: input };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       // Chat history-ийг зөв формат руу хөрвүүлэх
//       const chatHistory = messages.map((msg) => ({
//         role: msg.role === "user" ? "user" : "model",
//         parts: [{ text: msg.text }],
//       }));

//       console.log("chat history", chatHistory);

//       // API руу шинэ мессеж болон хөрвүүлсэн түүхийг дамжуулах
//       console.log("too::", userMessage);

//       const aiReply = await sendMessage(userMessage.text, chatHistory);

//       console.log("ai Reply", aiReply);

//       if (typeof aiReply === "string") {
//         const aiMessage = { role: "ai", text: aiReply };
//         setMessages((prev) => [...prev, aiMessage]);
//       } else {
//         const aiMessage = { role: "ai", text: aiReply.text };
//         setMessages((prev) => [...prev, aiMessage]);

//         if (aiReply?.triggerExercise) {
//           setShowBreathing(true);
//         } else {
//           setShowBreathing(false);
//         }
//       }
//     } catch (error) {
//       console.error("Чатбот алдаа:", error);
//       const errorMessage = { role: "ai", text: "Уучлаарай, алдаа гарлаа." };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Дасгал дууссан үед ажиллах функц
//   const handleBreathingExerciseDone = async () => {
//     // 1. Амьсгалын дасгалын компонентыг нуух
//     setShowBreathing(false);

//     // 2. Чатбот руу мессеж илгээх
//     const doneMessage = "Амьсгалын дасгалыг хийж дууслаа.";
//     const userDoneMessage = { role: "user", text: doneMessage };

//     // Хэрэглэгчийн мессежийг чат руу нэмнэ
//     setMessages((prev) => [...prev, userDoneMessage]);
//     setIsLoading(true);

//     try {
//       // Backend-ээс "хийсэн" гэсэн хариулт авах
//       const aiReply = await sendMessage(doneMessage, []); // энд хоосон history дамжуулж болно.

//       // AI-н хариултыг чат руу нэмнэ
//       const aiMessage = { role: "ai", text: aiReply.text };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error("Чатбот алдаа:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       {showBreathing && (
//         <ChatDialogBreath
//           onDone={handleBreathingExerciseDone}
//           setOpen={setShowBreathing}
//           open = {showBreathing}
//         />
//         // <div className="w-[200] h-[200] bg-blue-200"></div>
//       )}
//       <main className="flex flex-col items-center justify-between h-[400px] w-[400px] p-4 bg-gray-100 absolute bottom-0 right-0">
//         <div className="flex flex-col w-full max-w-2xl h-[80vh] bg-white rounded-lg shadow-xl overflow-hidden">
//           <div className="flex-1 p-6 overflow-y-auto">
//             {messages.length === 0 && (
//               <div className="flex items-center justify-center h-full text-center text-gray-500">
//                 <p>Сайн уу, би танд туслахад бэлэн байна.</p>
//               </div>
//             )}
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`mb-4 p-3 rounded-lg max-w-[80%] ${
//                   msg.role === "user"
//                     ? "bg-blue-500 text-white ml-auto"
//                     : "bg-gray-200 text-gray-800 mr-auto"
//                 }`}
//               >
//                 <ReactMarkdown>{msg.text}</ReactMarkdown>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           <form
//             onSubmit={handleSendMessage}
//             className="p-4 border-t border-gray-200 bg-white"
//           >
//             <div className="flex">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Мессеж бичнэ үү..."
//                 className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//                 disabled={isLoading}
//               />
//               <button
//                 type="submit"
//                 className="p-2 px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors duration-200"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Илгээж байна..." : "Илгээх"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

import { Dispatch, SetStateAction, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { sendMessage } from "../action";

import { DiaryNote } from "@/types";
import { AchievementsType } from "@/types/aiAnalyze";
import { ChatDialogBreath } from "./chatBotBreath";
import axios from "axios";

type analysisType = {
  summary: string;
  emotions: string[];
  needs: AchievementsType[];
};
export type diaryTypemock = {
  id: number;
  userId: number;
  note: string;
  analysis: analysisType;
};

type chatBotType = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  diaries: DiaryNote;
};

export const ChatBot = ({ diaries }: { diaries: DiaryNote[] }) => {
  const setCurrentDiary = diaries[0];

  const diaryData = {
    id: setCurrentDiary.id,
    userId: setCurrentDiary.userId,
    note: setCurrentDiary.note,
    analysis: {
      summary: setCurrentDiary.analysis?.summary || "",
      emotions: setCurrentDiary.analysis?.emotions || [],
      needs: setCurrentDiary.aiInsight?.achievements || [],
    },
  };

  // const diaryData = {
  //   id: 325,
  //   userId: 1,
  //   note: "Мэдэхгүй төслөөс болоод хэд хоног бүр аймар муухай стрессдээд. Багийнхантай ч ойлгоцож чадахгүй хүн болгон намайг муулаад зүхээдч байгаа юм шиг тийм л мэдрэмж төрөөд байна",
  //   analysis: {
  //     summary:
  //       "Төслийн учир нь гайгүй ойлгогдож байгаа ч хангалтгүй мэдрэмж төрөөд, өөрийгөө байнга дутуу үнэлээд байгаа бололтой. Хичээгээд ч хангалттай биш санагдаад байгаа юм шиг байна.",
  //     emotions: ["ГУНИГТАЙ", "СТРЕССТЭЙ"],
  //     needs: ["encouragement", "focus"],
  //   },
  // };

  const [showBreathing, setShowBreathing] = useState(false);

  const [done, setDone] = useState(false);

  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  //   const handleSendMessage = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!input.trim() || isLoadingChat) return;

  //     const userMessage = { role: "user", text: input };

  //     setMessages((prev) => [...prev, userMessage]);
  //     setInput("");
  //     setIsLoadingChat(true);

  //     try {
  //       // Chat history-ийг зөв формат руу хөрвүүлэх
  //       const chatHistory = messages.map((msg) => ({
  //         role: msg.role === "user" ? "user" : "model",
  //         parts: [{ text: msg.text }],
  //       }));

  //       console.log("chat history", chatHistory);

  //       // API руу шинэ мессеж болон хөрвүүлсэн түүхийг дамжуулах
  //       console.log("too::", userMessage);

  //       const aiReply = await sendMessage(
  //         userMessage.text
  //         //   chatHistory,
  //         //   diaryData
  //       );
  //       //   const aiReply = akk;

  //       console.log("ai Reply", aiReply);

  //       if (typeof aiReply === "string") {
  //         const aiMessage = { role: "ai", text: aiReply };
  //         setMessages((prev) => [...prev, aiMessage]);
  //       } else {
  //         const aiMessage = { role: "ai", text: aiReply.text };
  //         setMessages((prev) => [...prev, aiMessage]);

  //         // if (aiReply?.triggerExercise) {
  //         //   setShowBreathing(true);
  //         // } else if (aiReply?.endChat) {
  //         //   handleEndChat();
  //         // } else {
  //         //   setShowBreathing(false);
  //         // }
  //       }
  //     } catch (error) {
  //       console.error("Чатбот алдаа:", error);
  //       const errorMessage = { role: "ai", text: "Уучлаарай, алдаа гарлаа." };
  //       setMessages((prev) => [...prev, errorMessage]);
  //     } finally {
  //       setIsLoadingChat(false);
  //     }
  //   };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoadingChat) return;

    const userMessage = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoadingChat(true);

    try {
      // Chat history-ийг зөв формат руу хөрвүүлэх
      const chatHistory = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      console.log("chat history", chatHistory);

      // API руу шинэ мессеж болон хөрвүүлсэн түүхийг дамжуулах
      console.log("too::", userMessage);

      // const response = await axios.post(`http://localhost:4001/api/chat`, {
      //   userMessage,
      //   chatHistory,
      //   diaryData,
      // });
      // const aiReply = response.data;
      const aiReply = await sendMessage(
        userMessage.text,
        chatHistory,
        diaryData
      );

      console.log("ai Reply", aiReply);

      if (typeof aiReply === "string") {
        const aiMessage = { role: "ai", text: aiReply };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const aiMessage = { role: "ai", text: aiReply.text };
        setMessages((prev) => [...prev, aiMessage]);

        if (aiReply?.triggerExercise) {
          console.log("show breathing ajilaj baina");

          setShowBreathing(true);
        } else {
          setShowBreathing(false);
        }
      }
    } catch (error) {
      console.error("Чатбот алдаа:", error);
      const errorMessage = { role: "ai", text: "Уучлаарай, алдаа гарлаа." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const handleBreathingExerciseDone = async () => {
    console.log("amsigaliin dasgal hiij duusgah");

    // 1. Амьсгалын дасгалын компонентыг нуух
    // setLocalBreathOpen(false);
    setShowBreathing(false);

    // 2. Чатбот руу мессеж илгээх
    const doneMessage = "Амьсгалын дасгалыг хийж дууслаа.";
    const userDoneMessage = { role: "user", text: doneMessage };

    // Хэрэглэгчийн мессежийг чат руу нэмнэ
    setMessages((prev) => [...prev, userDoneMessage]);
    setIsLoadingChat(true);

    try {
      // Backend-ээс "хийсэн" гэсэн хариулт авах
      const chatHistory = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const aiReply = await sendMessage(doneMessage, chatHistory, diaryData); // энд хоосон history дамжуулж болно.

      // AI-н хариултыг чат руу нэмнэ
      if (typeof aiReply === "string") {
        const aiMessage = { role: "ai", text: aiReply };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const aiMessage = { role: "ai", text: aiReply.text };
        setMessages((prev) => [...prev, aiMessage]);

        if (aiReply?.triggerExercise) {
          setShowBreathing(true);
        } else {
          setShowBreathing(false);
        }
      }
    } catch (error) {
      console.error("Чатбот алдаа:", error);
    } finally {
      setIsLoadingChat(false);
    }
  };

  //   handleBreathingExerciseDone()

  console.log("done", done);

  return (
    <div>
      <main className="flex flex-col items-center justify-between p-4 bg-gray-100 absolute bottom-0 right-0">
        <div className="flex flex-col h-[400px] w-[400px] bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-center text-gray-500">
                <p>Сайн уу, би танд туслахад бэлэн байна.</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800 mr-auto"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-200 bg-white"
          >
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Мессеж бичнэ үү..."
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                disabled={isLoadingChat}
              />
              <button
                type="submit"
                className="p-2 px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors duration-200"
                disabled={isLoadingChat}
              >
                {isLoadingChat ? "Илгээж байна..." : "Илгээх"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* <button onClick={handleBreathingExerciseDone}>DAGAL HIITY</button> */}
      {showBreathing && !done && (
        <ChatDialogBreath
          //   setDone={setDone}
          done={done}
          setOpen={setShowBreathing}
          open={showBreathing}
          onDone={handleBreathingExerciseDone}
        />
      )}

      {/* {done && !showBreathing && (
        <DoneBreathExercise onDone={handleBreathingExerciseDone} />
      )} */}
      {/* {showBreathing && (
        <BreathingExerciseHoyr onDone={handleBreathingExerciseDone} />
      )} */}
    </div>
  );
};
