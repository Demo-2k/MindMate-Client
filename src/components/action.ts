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
  generationConfig: {
    maxOutputTokens: 150, // 2–3 өгүүлбэрээ бүрэн багтаахад хангалттай
    temperature: 0.3, // тогтвортой, хэт нуршуу биш
    stopSequences: ["\n"], // мөр шинэчлэгдэхэд таслах
  },
});

// Хүүхдийн өдрийн тэмдэглэл болон JSON анализ

interface AiResponse {
  text: string;
  triggerExercise?: boolean;
  diaryData?: diaryTypemock;
  endChat?: boolean;
}

export async function sendMessage(
  userMessage: string,
  history: Content[],
  diaryData: diaryTypemock
): Promise<AiResponse | string> {
  try {
    // Яриаг эхлүүлэхэд, хэрэглэгчийн мессеж юу байхаас үл хамааран тэмдэглэл дээр үндэслэн хариулт өгнө.
    // Сөрөг мэдрэмжүүдийн жагсаалт
    const negativeKeywords = /(СТРЕССТЭЙ|УУРТАЙ|ГУНИГТАЙ)/i;

    if (history.length === 0) {
      const chat = model.startChat({ history: [] });

      const result = await chat.sendMessage(`
Өдрийн тэмдэглэл: "${diaryData.note}"

Энэ тэмдэглэлийг уншаад, энгийн, найз шиг дэмжсэн үгээр хариулт өг.
Гэхдээ:
- Хэрэв тэмдэглэлд "${diaryData.analysis.emotions}" дотор 'СТРЕССТЭЙ', 'УУРТАЙ' эсвэл 'ГУНИГТАЙ' гэсэн сөрөг мэдрэмж байгаа бол
хариултынхаа төгсгөлд яг энэ тэмдэглэгээг нэмээрэй: [BREATHE_SUGGESTION]
- Бусад үед маркер нэмэх хэрэггүй.
`);

      const text = result.response.text();
      console.log("text chatbot", text);

      // ✅ Marker шалгах
      const hasMarker = text.includes("[BREATHE_SUGGESTION]");

      // ✅ Regex шалгах
      const hasNegativeEmotion =
        negativeKeywords.test(diaryData.note) ||
        diaryData.analysis.emotions.some((e) =>
          /(СТРЕССТЭЙ|УУРТАЙ|ГУНИГТАЙ)/i.test(e)
        );

      if (hasMarker || hasNegativeEmotion) {
        const cleanedText = text.replace("[BREATHE_SUGGESTION]", "").trim();
        return {
          text:
            cleanedText +
            " Хэрэв хүсвэл хамтдаа амьсгалын жижиг дасгал хийж болох шүү. 'дасгал хийе' гэж бичээрэй ✨",
          triggerExercise: false,
        };
      } else {
        return {
          text: text,
          triggerExercise: false,
        };
      }
    }

    console.log("history", history);

    if (
      userMessage.toLowerCase().includes("баярлалаа") ||
      userMessage.toLowerCase().includes("дуусгая") ||
      userMessage.toLowerCase().includes("баяртай") ||
      userMessage.toLowerCase().includes("bayrtai")
    ) {
      return {
        text: "Ярьсанд баярлалаа. Би дараагийн удаа туслахад бэлэн байна шүү.💗💗",
        endChat: true,
      };
    }

    // Хэрэглэгч дасгал хийхийг зөвшөөрөхөд
    if (
      userMessage.toLowerCase().includes("дасгал хийе") ||
      userMessage.toLowerCase().includes("dasgal hiiy")
    ) {
      return {
        text: "За, сайн байна. Амьсгалын дасгалыг эхлүүлье.🌬",
        triggerExercise: true,
      };
    }

    // Хэрэглэгч дасгал хийж дуусахад
    if (
      userMessage.toLowerCase().includes("амьсгалын дасгалыг хийж дууслаа.")
    ) {
      const chat = model.startChat({ history });
      const prompt = `Гоё байна! 👏 Амьсгалын дасгал хийсний дараа өөрийгөө ямар мэдэрч байна?`;

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
      text: "Уучлаарай, одоогоор хариу өгөх боломжгүй байна.🤒",
      triggerExercise: false,
    };
  }
}
