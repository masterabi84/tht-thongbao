import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = { title: "Đăng nhập" };

export default function DangNhapPage() {
  return (
    <div className="container section login-wrap">
      <LoginForm />
    </div>
  );
}
