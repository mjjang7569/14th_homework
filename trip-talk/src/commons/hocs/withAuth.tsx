"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const withAuth = (컴포넌트: React.ComponentType) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        alert("로그인 후 이용 가능합니다.");
        router.push("/");
      }
    }, [router]);

    return <컴포넌트 />;
  };

  AuthenticatedComponent.displayName = `withAuth(${컴포넌트.displayName || 컴포넌트.name || "Component"})`;

  return AuthenticatedComponent;
};
