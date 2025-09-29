// showNotification.ts
import { toast } from "sonner";

export const showNotification = (
  message: string,
  mood?: string,
  onNeedBreathing?: () => void
) => {
  if (mood === "БАЯРТАЙ" || mood === "ТАЙВАН") {
    toast(message, { style: { background: "#FDE68A", color: "#92400E" } });
  } else if (
    mood === "ГУНИГТАЙ" ||
    mood === "УУРТАЙ" ||
    mood === "СТРЕССТЭЙ"
  ) {
    // confirm popup-ыг HomeDiary дотор handle хийхээр callback дуудна
    if (onNeedBreathing) onNeedBreathing();
  } else {
    toast(message);
  }
};
