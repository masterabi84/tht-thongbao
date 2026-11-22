import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export const POSTS = "posts";
export const TITLE_MAX = 200;
export const CONTENT_MAX = 10000;

export type Post = {
  id: string;
  title: string;
  content: string;
  /** Mili-giây kể từ epoch; null khi chưa có dấu thời gian từ server. */
  createdAt: number | null;
};

function toPost(id: string, data: Record<string, unknown>): Post {
  const ts = data.createdAt;
  return {
    id,
    title: String(data.title ?? ""),
    content: String(data.content ?? ""),
    createdAt: ts instanceof Timestamp ? ts.toMillis() : null,
  };
}

/** Danh sách thông báo, bài mới nhất ở đầu. */
export async function listPosts(max = 50): Promise<Post[]> {
  const snap = await getDocs(query(collection(db, POSTS), orderBy("createdAt", "desc"), limit(max)));
  return snap.docs.map((d) => toPost(d.id, d.data()));
}

export async function getPost(id: string): Promise<Post | null> {
  const snap = await getDoc(doc(db, POSTS, id));
  return snap.exists() ? toPost(snap.id, snap.data()) : null;
}

/** Gọi từ trình duyệt khi người phụ trách đã đăng nhập. Rules kiểm tra quyền và dữ liệu. */
export async function createPost(input: { title: string; content: string; authorUid: string }) {
  const ref = await addDoc(collection(db, POSTS), {
    title: input.title.trim(),
    content: input.content.trim(),
    authorUid: input.authorUid,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export type PostErrors = { title?: string; content?: string };

export function validatePost(title: string, content: string): PostErrors {
  const errors: PostErrors = {};
  if (!title.trim()) errors.title = "Vui lòng nhập tiêu đề thông báo.";
  else if (title.trim().length > TITLE_MAX) errors.title = `Tiêu đề tối đa ${TITLE_MAX} ký tự.`;
  if (!content.trim()) errors.content = "Vui lòng nhập nội dung thông báo.";
  else if (content.trim().length > CONTENT_MAX) errors.content = `Nội dung tối đa ${CONTENT_MAX} ký tự.`;
  return errors;
}

export function formatDate(ms: number | null) {
  if (ms === null) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(ms));
}
