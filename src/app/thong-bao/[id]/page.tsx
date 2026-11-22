import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { formatDate, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/thong-bao/[id]">): Promise<Metadata> {
  await connection();
  const { id } = await params;
  const post = await getPost(id);
  return { title: post ? post.title : "Không tìm thấy thông báo" };
}

// Trang công khai: học viên mở link là đọc được, không cần tài khoản.
async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  return (
    <article className="post-detail">
      <nav className="breadcrumb">
        <Link href="/thong-bao">Thông báo</Link> › <span>{post.title}</span>
      </nav>
      <h1>{post.title}</h1>
      <p className="muted">
        Đăng ngày {formatDate(post.createdAt)} · {SITE.name}
      </p>
      <div className="detail-grid">
        <div className="post-content">{post.content}</div>
        <aside className="share-box">
          <h2>Chia sẻ thông báo</h2>
          <CopyLinkButton path={`/thong-bao/${post.id}`} />
        </aside>
      </div>
      <Link href="/thong-bao" className="back-link">
        ← Quay lại danh sách thông báo
      </Link>
    </article>
  );
}

export default function PostPage({ params }: PageProps<"/thong-bao/[id]">) {
  return (
    <div className="container section">
      <Suspense fallback={<p className="muted">Đang tải thông báo…</p>}>
        <PostDetail params={params} />
      </Suspense>
    </div>
  );
}
