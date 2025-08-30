// // app/actions.ts
// "use server";

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Part, Content } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// // Хүүхдийн өдрийн тэмдэглэл болон JSON анализ (Энэ өгөгдлийг хэрэглэгч бүрт өөрөөр оруулж ирнэ)
// const diaryData = {
//   id: 325,
//   userId: 1,
//   note: "Өнөөдөр төслийнхөө учирыг нь арай гайгүй олж байх шиг байна. Өмнөхөө бодоход эргэлзээ бага зэрэг бага байгаа ч одоо ч гэсэн нөгөөх дутуу юм шиг мэдрэмж намайг ороосоор л. Ерөн байнга энэ мэдрэмж төрдөг хангалттай биш юм шиг дахиад л хичээдэг гэхдээ бас л нөгөөх хангалтгүй байна гэх миний дотроос чанга орилж байгаа чимээ. Тэгээд л дахиад л бодно дахиад л хамаг чадлаарай хичээнэ хийж чадна гэхдээ эргээд хархан дахиад л надаас сайн хүн байж л байдаг тэгж их хичээж байхад лллл",
//   analysis: {
//     summary:
//       "Төслийн учир нь гайгүй ойлгогдож байгаа ч хангалтгүй мэдрэмж төрөөд, өөрийгөө байнга дутуу үнэлээд байгаа бололтой. Хичээгээд ч хангалттай биш санагдаад байгаа юм шиг байна.",
//     emotions: ["ГУНИГТАЙ", "СТРЕССТЭЙ"],
//     needs: ["encouragement", "focus"],
//   },
// };

// export async function sendMessage(userMessage: string, history: Content[]) {
//     console.log("userMessage back ennnddd", userMessage);

//   try {
//     // API дуудахаа болиод, mock хариулт буцаах

//     // Эхний хариултыг mock хийх логик
//     if (userMessage === "эхлэх") {
//       // "Эхлэх" гэсэн мессеж ирэхэд анхны хариултыг буцаах
//       const isSad = diaryData.analysis.emotions.includes("ГУНИГТАЙ");
//       const isStressed = diaryData.analysis.emotions.includes("СТРЕССТЭЙ");

//       if (isSad && isStressed) {
//         return {
//           text: "Одоо сэтгэлээ тайвшруулах **амьсгалын дасгал хийж үзэх үү?** Эсвэл өөр зүйл ярилцахыг хүсэж байна уу?",
//           emotions: ["СТРЕССТЭЙ"], // Энэ нь фронтендэд дасгал санал болгохыг илтгэнэ.
//         };
//       } else if (isSad) {
//         return {
//           text: "Сайн уу? Өнөөдөр бага зэрэг гунигтай байгаа юм шиг санагдлаа. Бидэнд ийм мэдрэмж төрөх нь хэвийн зүйл.",
//           emotions: ["ГУНИГТАЙ"], // Өөр дасгал идэвхжүүлэх
//         };
//       } else {
//         return {
//           text: "Сайн уу? Өнөөдөр төслийнхөө учир нь олдоод их гоё байгаа юм шиг санагдлаа. Үүнийгээ байнга санаж байгаарай.",
//           emotions: [], // Ямар нэгэн дасгал идэвхжүүлэхгүй
//         };
//       }
//     }

//     // Дасгалын дараах хариулт болон бусад харилцан яриаг mock хийх
//     if (userMessage.toLowerCase().includes("амьсгалын дасгалыг хийж дууслаа.")) {
//       return {
//         text: "Сайхан байна. Одоо арай тайвширсан уу? Эсвэл дахиад ярих зүйл байна уу?",
//         emotions: [],
//       };
//     }

//     if (userMessage.toLowerCase().includes("дасгал хийе")) {
//       return {
//         text: "За, сайн байна. Амьсгалын дасгалыг эхлүүлье.",
//         triggerExercise: true, // Фронтендэд дасгалыг гаргахыг дохиолох
//       };
//     }

//     // Бусад ерөнхий харилцан ярианы хариултыг mock хийх
//     return {
//       text: "Юуг хэлэх гэсэн юм бэ?",
//       emotions: [],
//     };

//   } catch (error) {
//     console.error("AI-аас хариу авахад алдаа гарлаа:", error);
//     return {
//       text: "Уучлаарай, одоогоор хариу өгөх боломжгүй байна.",
//       emotions: [],
//     };
//   }
// }

// app/actions.ts
"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Content } from "@google/generative-ai";
import { diaryTypemock } from "./chatBot/chatBot";
// import { diaryType } from "./page";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `Та бол өсвөр насны хүүхдийн дотно найз шиг AI дасгалжуулагч.
    Хариултаа хэт урт биш, 2-3 өгүүлбэрт багтаа.
    Энгийн ярианы хэллэг хэрэглэ ('ёоо', 'аа тийм шүү' гэх мэт).
    Сэтгэл зүйч шиг биш, найз шиг ойлгож байгаагаа харуул.
    Заримдаа богино асуулт асуу, эсвэл дэмжлэгийн мессеж үлдээ.
    Ярианы өнгө дулаан, энгийн, найз шиг байх ёстой.
    Хүүхдийг айдасгүй, тайван, эргэцүүлж бодоход тусал.
    
    // Дасгалыг санал болгох зааварчилгаа:
    // Хэрвээ ярианы явцад хүүхэд 'СТРЕССТЭЙ' эсвэл 'ГУНИГТАЙ' байгаа нь илэрвэл хариултынхаа төгсгөлд '[BREATHE_SUGGESTION]' гэсэн тэмдэг нэмээрэй.
    
    // Шинэ зааварчилгаа:
    // Яриаг үргэлжлүүлэхийн тулд үргэлж асуулт асуух шаардлагагүй.
    // Харин ч зөвлөгөө, дэмжлэг, эсвэл нэмэлт мэдээлэл өгч яриаг чиглүүл.
    // Хэрэв асуулт асуух шаардлагатай бол, богино, энгийн байх ёстой.
    `,
});

// Хүүхдийн өдрийн тэмдэглэл болон JSON анализ

interface AiResponse {
  text: string;
  triggerExercise?: boolean;
  diaryData?: diaryTypemock;
}

export async function sendMessage(
  userMessage: string,
  history: Content[],
  diaryData: diaryTypemock
): Promise<AiResponse | string> {
  try {
    // Яриаг эхлүүлэхэд, хэрэглэгчийн мессеж юу байхаас үл хамааран тэмдэглэл дээр үндэслэн хариулт өгнө.
    if (history.length === 0) {
      const chat = model.startChat({ history: [] });

      const initialPrompt = `
        Өдрийн тэмдэглэл: "${diaryData.note}"
        Энэ тэмдэглэлийг уншаад, энгийн, найз шиг үгээр хариулт өгөөрэй.
        Хэрвээ тэмдэглэлд 'СТРЕССТЭЙ', 'УУРТАЙ' эсвэл 'ГУНИГТАЙ' мэдрэмж илэрч байвал хариултынхаа төгсгөлд '[BREATHE_SUGGESTION]' гэсэн тэмдэг нэмэхээ мартуузай.
      `;
      const result = await chat.sendMessage(initialPrompt);
      console.log("result, ", result);

      const text = result.response.text();

      // [BREATHE_SUGGESTION] тэмдэг байгаа эсэхийг шалгах
      if (text.includes("[BREATHE_SUGGESTION]")) {
        const cleanedText = text.replace("[BREATHE_SUGGESTION]", "").trim();
        return {
          text: cleanedText + " Эсвэл амьсгалын дасгал хийж үзэх үү?",
          triggerExercise: false, // Энд шууд дасгал эхлүүлэхгүй, харин санал болгож байгаа.
        };
      } else {
        return {
          text: text,
          triggerExercise: false,
        };
      }
    }

    // Хэрэглэгч дасгал хийхийг зөвшөөрөхөд
    if (userMessage.toLowerCase().includes("дасгал хийе")) {
      return {
        text: "За, сайн байна. Амьсгалын дасгалыг эхлүүлье.",
        triggerExercise: true,
      };
    }

    // Хэрэглэгч дасгал хийж дуусахад
    if (
      userMessage.toLowerCase().includes("амьсгалын дасгалыг хийж дууслаа.")
    ) {
      const chat = model.startChat({ history });
      const prompt = `Хүүхэд амьсгалын дасгалыг хийж дууслаа. Одоо түүнд хандан, "Гоё! Амьсгалын дасгал хийсний дараа өөрийгөө ямар мэдэрч байна?" гэх мэтээр асуулт тавьж, яриаг үргэлжлүүлээрэй.`;

      const result = await chat.sendMessage(prompt);
      const text = result.response.text();

      return {
        text: text,
        triggerExercise: false,
      };
    }

    // Бусад ерөнхий харилцан яриа
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(userMessage);
    const text = result.response.text();

    return {
      text: text,
      triggerExercise: false,
    };
  } catch (error) {
    console.error("AI-аас хариу авахад алдаа гарлаа:", error);
    return {
      text: "Уучлаарай, одоогоор хариу өгөх боломжгүй байна.",
      triggerExercise: false,
    };
  }
}
