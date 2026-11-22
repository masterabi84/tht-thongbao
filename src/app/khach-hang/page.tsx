import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Khách hàng" };

const GROUPS = [
  { title: "Học sinh tiểu học", text: "Tiếng Anh thiếu nhi, TOEFL Primary, IC3 Spark – làm quen sớm với ngoại ngữ và máy tính." },
  { title: "Học sinh THCS – THPT", text: "Cambridge KET, PET, FCE, TOEFL Junior và luyện thi IELTS phục vụ xét tuyển." },
  { title: "Sinh viên & người đi làm", text: "TOEIC, VSTEP, chứng chỉ Ứng dụng CNTT và MOS đáp ứng chuẩn đầu ra, yêu cầu công việc." },
  { title: "Giáo viên", text: "Bồi dưỡng tin học nâng cao, ứng dụng AI trong thiết kế bài dạy và học liệu số." },
];

const SERVICES = [
  { title: "Lớp tại trung tâm", text: "Học viên đăng ký cá nhân, học theo lịch khai giảng định kỳ tại 123 Phạm Văn Đồng, Gò Vấp." },
  { title: "Lớp theo đơn vị", text: "Trường học, cơ quan, doanh nghiệp đăng ký theo tổ chức; trung tâm xếp lịch và nội dung riêng." },
  { title: "Kiểm tra năng lực", text: "Kiểm tra đầu vào để xếp lớp đúng trình độ và tư vấn lộ trình học phù hợp." },
];

export default function KhachHangPage() {
  return (
    <div className="container section">
      <header className="page-head">
        <p className="eyebrow">Khách hàng</p>
        <h1>Chúng tôi phục vụ ai</h1>
        <p className="lead">Chương trình của THT được thiết kế theo từng nhóm người học và từng hình thức tổ chức lớp.</p>
      </header>

      <section className="section-tight">
        <h2>Nhóm học viên</h2>
        <div className="card-grid four">
          {GROUPS.map((g) => (
            <article key={g.title} className="card">
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <h2>Hình thức hợp tác</h2>
        <div className="card-grid">
          {SERVICES.map((s) => (
            <article key={s.title} className="card card-plain">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="callout">
        Đơn vị muốn đặt lớp theo yêu cầu, vui lòng xem trang <Link href="/lien-he">Liên hệ</Link>.
      </div>
    </div>
  );
}
