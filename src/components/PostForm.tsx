"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONTENT_MAX, createPost, TITLE_MAX, validatePost, type PostErrors } from "@/lib/posts";
import { useAuth } from "./AuthProvider";

export function PostForm() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<PostErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Chưa đăng nhập → chuyển sang trang Đăng nhập, quay lại đây sau khi đăng nhập.
  useEffect(() => {
    if (!loading && !user) router.replace("/dang-nhap?next=/thong-bao/dang-bai");
  }, [loading, user, router]);

  if (loading || !user) return <p className="muted">Đang kiểm tra đăng nhập…</p>;

  if (!isAdmin) {
    return (
      <div className="alert alert-error" role="alert">
        Tài khoản <strong>{user.email}</strong> chưa được cấp quyền đăng thông báo. Vui lòng liên hệ quản trị trung tâm.
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    const found = validatePost(title, content);
    setErrors(found);
    // Giữ nguyên phần đã nhập, đưa con trỏ tới ô lỗi đầu tiên.
    if (found.title) return titleRef.current?.focus();
    if (found.content) return contentRef.current?.focus();

    setSubmitting(true);
    try {
      const id = await createPost({ title, content, authorUid: user!.uid });
      router.push(`/thong-bao?moi=${id}`);
    } catch (err) {
      const code = (err as { code?: string }).code;
      setSubmitError(
        code === "permission-denied"
          ? "Không đăng được: tài khoản không có quyền đăng bài hoặc dữ liệu không hợp lệ."
          : "Không đăng được do lỗi kết nối. Nội dung vẫn được giữ, bạn hãy thử lại."
      );
      setSubmitting(false);
    }
  }

  const missing = [errors.title && "Tiêu đề", errors.content && "Nội dung"].filter(Boolean);

  return (
    <form className="post-form" onSubmit={onSubmit} noValidate>
      {missing.length > 0 && (
        <div className="alert alert-error" role="alert">
          <strong>Chưa đăng được.</strong> Vui lòng kiểm tra: {missing.join(", ")}.
        </div>
      )}
      {submitError && (
        <div className="alert alert-error" role="alert">
          {submitError}
        </div>
      )}

      <div className={errors.title ? "field has-error" : "field"}>
        <label htmlFor="title">
          Tiêu đề <span className="req">*</span>
        </label>
        <input
          id="title"
          ref={titleRef}
          className="input"
          value={title}
          maxLength={TITLE_MAX + 50}
          placeholder="VD: Khai giảng lớp Luyện thi IELTS tháng 12/2026"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((x) => ({ ...x, title: undefined }));
          }}
        />
        {errors.title && (
          <p id="title-error" className="field-error">
            {errors.title}
          </p>
        )}
      </div>

      <div className={errors.content ? "field has-error" : "field"}>
        <label htmlFor="content">
          Nội dung <span className="req">*</span>
        </label>
        <textarea
          id="content"
          ref={contentRef}
          className="input textarea"
          rows={12}
          value={content}
          maxLength={CONTENT_MAX + 500}
          placeholder="Ngày khai giảng, lịch học, giờ học, địa điểm, cách đăng ký…"
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? "content-error" : undefined}
          onChange={(e) => {
            setContent(e.target.value);
            if (errors.content) setErrors((x) => ({ ...x, content: undefined }));
          }}
        />
        {errors.content && (
          <p id="content-error" className="field-error">
            {errors.content}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Đang đăng…" : "Đăng thông báo"}
        </button>
        <Link href="/thong-bao" className="btn btn-ghost">
          Hủy
        </Link>
      </div>
    </form>
  );
}
