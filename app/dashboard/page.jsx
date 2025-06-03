"use client";
import MainContent from "../../components/MainContent";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();

  // Check authentication on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem("authenticated") === "true";
    if (!isAuth) {
      router.replace("/"); // Does not retain the previous url routes, if clicked on Back, no page will display, or BAck button will be disabled
    }
  }, [router]);

  return (
    <>
      <Navbar />
       <MainContent />
    </>
  );
};

export default page;
