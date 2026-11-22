"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";

/** Chỉ hiện với tài khoản được cấp quyền. Khách không thấy nút này. */
export function NewPostButton() {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;
  return (
    <Link href="/thong-bao/dang-bai" className="btn btn-primary">
      + Đăng thông báo
    </Link>
  );
}
