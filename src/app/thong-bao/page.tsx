import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { NewPostButton } from "@/components/NewPostButton";
import { formatDate, listPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Thông báo" };

function excerpt(text: string, max = 180) {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? flat.slice(0, max).trimEnd() + "…" : flat;
}

// Đọc Firestore tại thời điểm request: bài vừa đăng hiện ngay, tải lại trang vẫn thấy.
async function PostList({ searchParams }: { searchParams: Promise<{ moi?: string }> }) {
  await connection();
  const [{ moi }, posts] = await Promise.all([searchParams, listPosts()]);
  const justPosted = moi ? posts.find((p) => p.id === moi) : undefined;

  return (
    <>
      {justPosted && (
        <div className="alert alert-success" role="status">
          <p>
            <strong>✓ Đã đăng thông báo.</strong> Gửi link dưới đây cho học viên để họ mở ra đọc ngay:
          </p>
          <CopyLinkButton path={`/thong-bao/${justPosted.id}`} variant="success" />
        </div>
      )}

      {posts.length === 0 ? (
        <p className="empty">Chưa có thông báo nào.</p>
      ) : (
        <ol className="post-list">
          {posts.map((p, i) => (
            <li key={p.id} className={p.id === moi ? "post-item highlight" : "post-item"}>
              <time className="post-date" dateTime={p.createdAt ? new Date(p.createdAt).toISOString() : undefined}>
                {formatDate(p.createdAt)}
              </time>
              <div className="post-body">
                <h2>
                  <Link href={`/thong-bao/${p.id}`}>{p.title}</Link>
                  {p.id === moi ? <span className="badge badge-success">Vừa đăng</span> : i === 0 ? <span className="badge">Mới</span> : null}
                </h2>
                <p>{excerpt(p.content)}</p>
              </div>
              <Link href={`/thong-bao/${p.id}`} className="read-more">
                Đọc tiếp →
              </Link>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

export default function ThongBaoPage({ searchParams }: PageProps<"/thong-bao">) {
  return (
    <div className="container section">
      <header className="page-head row">
        <div>
          <h1>Thông báo</h1>
          <p className="lead">Lịch khai giảng và tin tức mới nhất của trung tâm.</p>
        </div>
        <NewPostButton />
      </header>
      <Suspense fallback={<p className="muted">Đang tải thông báo…</p>}>
        <PostList searchParams={searchParams as Promise<{ moi?: string }>} />
      </Suspense>
    </div>
  );
}
