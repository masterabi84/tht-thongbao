"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";

export function AuthArea() {
  const { user, isAdmin, loading, logout } = useAuth();
  return (
    <div className="auth-area">
      {loading ? null : user ? (
        <>
          <span className="hello">
            Xin chào, <strong>{isAdmin ? "Người phụ trách" : user.email}</strong>
          </span>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => logout()}>
            Đăng xuất
          </button>
        </>
      ) : (
        <Link href="/dang-nhap" className="btn btn-ghost btn-sm">
          Đăng nhập
        </Link>
      )}
    </div>
  );
}
