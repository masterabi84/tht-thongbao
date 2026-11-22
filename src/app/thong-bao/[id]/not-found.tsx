import Link from "next/link";

export default function PostNotFound() {
  return (
    <div className="container section">
      <h1>Không tìm thấy thông báo</h1>
      <p className="lead">Link có thể bị sai hoặc thông báo đã bị gỡ.</p>
      <Link href="/thong-bao" className="btn btn-primary">
        Xem danh sách thông báo
      </Link>
    </div>
  );
}
