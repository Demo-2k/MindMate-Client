"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import HomeDiary from "@/components/home/homeDiary";
import { UserContext } from "@/provider/userProvider";
import Loader from "@/components/loading";

export default function Home() {
  const { userProvider, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !userProvider) {
      router.replace("/sign-in");
    }
  }, [loading, userProvider, router]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!userProvider) {
    return null;
  }

  return <HomeDiary />;
}
