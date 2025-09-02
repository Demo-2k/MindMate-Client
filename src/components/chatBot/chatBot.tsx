// "use client";

// import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
// import ReactMarkdown from "react-markdown";
// import { sendMessage } from "../action";
// import { ChatDialogBreath } from "./chatBotBreath";
// import { ShowAvatarHome } from "../avatar/homeShowAvatar";
// import { AnimatePresence, motion } from "framer-motion";

// type ChatBotHomeType = {
//   setShowChatBotHome: Dispatch<SetStateAction<boolean>>;
// };

// export const ChatBot = ({ setShowChatBotHome }: ChatBotHomeType) => {
//   const [messages, setMessages] = useState<{ role: string; text: string }[]>(
//     []
//   );

//   const [done, setDone] = useState(false);
//   const [isLoadingChat, setIsLoadingChat] = useState(false);

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

// return (
//   <div>
//     <main className="flex flex-col items-center justify-between p-4 bg-black absolute bottom-0 right-0 p-10">
//       <div className="absolute bottom-16 right-16 z-50 flex flex-col h-[450px] w-[360px] bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-800 overflow-hidden">
//         <button
//           onClick={() => setShowChatBotHome(false)}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition text-lg font-bold"
//         >
//           ×
//         </button>

//         {/* Messages */}
//         <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#fec195] scrollbar-track-neutral-900 space-y-3">
//           {messages.length === 0 ? (
//             <div className="flex items-center justify-center h-full text-center text-gray-500">
//               <p>Сайн уу, би чамд туслахад бэлэн байна.</p>
//             </div>
//           ) : (
//             messages.map((msg, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className={`p-3 rounded-2xl max-w-[75%] break-words shadow-sm ${
//                   msg.role === "user"
//                     ? "bg-[#fec195] text-black ml-auto"
//                     : "bg-neutral-800 text-gray-100 mr-auto"
//                 }`}
//               >
//                 <ReactMarkdown>{msg.text}</ReactMarkdown>
//               </motion.div>
//             ))
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input */}
//         <form
//           onSubmit={handleSendMessage}
//           className="p-4 border-t border-neutral-800 bg-neutral-900 flex items-center gap-3"
//         >
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Мессеж бичнэ үү..."
//             className="flex-1 p-3 rounded-full bg-neutral-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fec195] transition"
//             disabled={isLoadingChat}
//           />
//           <button
//             type="submit"
//             className="p-3 bg-[#fec195] hover:bg-[#f7b973] rounded-full text-black font-bold transition"
//             disabled={isLoadingChat}
//           >
//             →
//           </button>
//         </form>
//       </div>
//     </main>

//     {/* <button onClick={handleBreathingExerciseDone}>DAGAL HIITY</button> */}
//     <AnimatePresence>
//       {showBreathing && !done && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//           className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
//         >
//           <ChatDialogBreath
//             done={done}
//             setOpen={setShowBreathing}
//             open={showBreathing}
//             onDone={handleBreathingExerciseDone}
//           />
//         </motion.div>
//       )}
//     </AnimatePresence>

//     {/* {done && !showBreathing && (
//       <DoneBreathExercise onDone={handleBreathingExerciseDone} />
//     )} */}
//     {/* {showBreathing && (
//       <BreathingExerciseHoyr onDone={handleBreathingExerciseDone} />
//     )} */}
//   </div>
// );
// };

import { Dispatch, SetStateAction, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { sendMessage } from "../action";

import { DiaryNote } from "@/types";
import { AchievementsType } from "@/types/aiAnalyze";
import { ChatDialogBreath } from "./chatBotBreath";
import { AnimatePresence, motion } from "framer-motion";

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

  diaries: DiaryNote[];
  setShowChatBotHome: Dispatch<SetStateAction<boolean>>;
};

export const ChatBot = ({ diaries,setShowChatBotHome }: chatBotType) => {
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
      //   history:chatHistory,
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
      <main className="flex flex-col items-center justify-between bg-black absolute bottom-0 right-0 ">
        <div className="absolute bottom-20 right-3 md:bottom-16 md:right-16 z-50 flex flex-col w-[340px] h-[450px] md:w-[360px] bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-800 overflow-hidden">
          <button
            onClick={() => setShowChatBotHome(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition text-lg font-bold"
          >
            ×
          </button>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#fec195] scrollbar-track-neutral-900 space-y-3">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center text-gray-500">
                <p>Сайн уу, би чамд туслахад бэлэн байна.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 rounded-2xl max-w-[75%] break-words shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#fec195] text-black ml-auto"
                      : "bg-neutral-800 text-gray-100 mr-auto"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </motion.div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-neutral-800 bg-neutral-900 flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Мессеж бичнэ үү..."
              className="flex-1 p-3 rounded-full bg-neutral-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fec195] transition"
              disabled={isLoadingChat}
            />
            <button
              type="submit"
              className="p-3 bg-[#fec195] hover:bg-[#f7b973] rounded-full text-black font-bold transition"
              disabled={isLoadingChat}
            >
              →
            </button>
          </form>
        </div>
      </main>

      {/* <button onClick={handleBreathingExerciseDone}>DAGAL HIITY</button> */}
      <AnimatePresence>
        {showBreathing && !done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <ChatDialogBreath
              done={done}
              setOpen={setShowBreathing}
              open={showBreathing}
              onDone={handleBreathingExerciseDone}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* {done && !showBreathing && (
        <DoneBreathExercise onDone={handleBreathingExerciseDone} />
      )} */}
      {/* {showBreathing && (
        <BreathingExerciseHoyr onDone={handleBreathingExerciseDone} />
      )} */}
    </div>
  );
};
