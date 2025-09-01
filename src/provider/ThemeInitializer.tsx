"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "./userProvider"; 

const DEFAULT_THEME = "https://media.daily.dev/image/upload/s--r2ffZPB4--/f_auto/v1716969841/dailydev_where_developers_suffer_together_sfvfog";

export function ThemeInitializer() {
  const { userProvider } = useContext(UserContext);

  useEffect(() => {
    document.body.classList.add("my-bg");

    if (userProvider?.themeUrl) {
      document.body.style.backgroundImage = `url(${userProvider.themeUrl})`;
    } else {
      document.body.style.backgroundImage = `url(${DEFAULT_THEME})`;
    }
  }, [userProvider]);

  return null;
}
