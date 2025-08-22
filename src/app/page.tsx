"use client";
import { HomePage } from "@/components/homePage";
import { useContext, useState } from "react";
import axios from "axios";
import { AnalyzePage } from "./(main)/components/analyzePage";
import { UserContext } from "@/provider/userProvider";
import { AiAnalysis } from "@/types";
import { useRouter } from "next/navigation";
import FloatMain from "@/components/home/motionBackground";

export default function Home() {
  return <FloatMain />;
}
