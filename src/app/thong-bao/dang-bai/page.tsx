import type { Metadata } from "next";
import Link from "next/link";
import { PostForm } from "@/components/PostForm";

export const metadata: Metadata = { title: "Đăng thông báo" };

export default function DangBaiPage() {
  return (
    <div className="container section">
      <nav className="breadcrumb">
        <Link href="/thong-bao">Thông báo</Link> › <span>Đăng thông báo mới</span>
      </nav>
      <h1>Đăng thông báo mới</h1>
      <div className="form-layout">
        <PostForm />
        <aside className="card card-plain tips">
          <h2>Gợi ý nội dung</h2>
          <ul>
            <li>Tên lớp, khóa học</li>
            <li>Ngày khai giảng</li>
            <li>Lịch học, giờ học</li>
            <li>Địa điểm</li>
            <li>Số điện thoại đăng ký</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
