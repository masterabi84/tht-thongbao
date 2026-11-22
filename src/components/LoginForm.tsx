"use client";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { app } from "@/lib/firebase";

function safeNext() {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/thong-bao";
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Vui lòng nhập email và mật khẩu.");
      return;
    }
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(getAuth(app), email.trim(), password);
      router.replace(safeNext());
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      setError(
        code === "auth/too-many-requests"
          ? "Đăng nhập sai quá nhiều lần. Vui lòng thử lại sau ít phút."
          : code === "auth/network-request-failed"
            ? "Không kết nối được máy chủ. Kiểm tra mạng và thử lại."
            : "Email hoặc mật khẩu không đúng."
      );
      setPassword("");
      setSubmitting(false);
    }
  }

  return (
    <form className="login-card" onSubmit={onSubmit} noValidate>
      <h1>Đăng nhập</h1>
      <p className="muted">Dành cho người phụ trách đăng thông báo</p>
      {error && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" className="input" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="password">Mật khẩu</label>
        <input id="password" className="input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
        {submitting ? "Đang đăng nhập…" : "Đăng nhập"}
      </button>
      <Link href="/gioi-thieu" className="back-link center">
        ← Về trang Giới thiệu
      </Link>
    </form>
  );
}
