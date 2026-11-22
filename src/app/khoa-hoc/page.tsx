import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Khóa học" };

type Course = { name: string; desc: string; level: string };

const GROUPS: { id: string; title: string; courses: Course[] }[] = [
  {
    id: "ngoai-ngu",
    title: "Ngoại ngữ",
    courses: [
      { name: "Tiếng Anh tổng quát Cambridge", desc: "Lộ trình KET – PET – FCE, phát triển đều 4 kỹ năng nghe, nói, đọc, viết.", level: "Học sinh, sinh viên" },
      { name: "Luyện thi IELTS", desc: "Xếp lớp theo trình độ đầu vào, luyện đề và chiến thuật làm bài từng kỹ năng.", level: "THPT, sinh viên, người đi làm" },
      { name: "TOEIC 4 kỹ năng", desc: "Ôn luyện Listening – Reading và Speaking – Writing theo cấu trúc đề thi.", level: "Sinh viên, người đi làm" },
      { name: "Tiếng Anh bậc 3 – bậc 4 (VSTEP)", desc: "Theo Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam.", level: "Sinh viên, viên chức" },
      { name: "TOEFL Primary & TOEFL Junior", desc: "Làm quen định dạng thi quốc tế cho học sinh tiểu học và THCS.", level: "Thiếu nhi, thiếu niên" },
      { name: "Tiếng Trung HSK 1", desc: "Phát âm, chữ Hán cơ bản và giao tiếp thông dụng, hướng tới kỳ thi HSK 1.", level: "Người mới bắt đầu" },
    ],
  },
  {
    id: "tin-hoc",
    title: "Tin học",
    courses: [
      { name: "Ứng dụng CNTT cơ bản", desc: "Ôn thi chứng chỉ theo chuẩn kỹ năng sử dụng công nghệ thông tin cơ bản.", level: "Mọi đối tượng" },
      { name: "Ứng dụng CNTT nâng cao", desc: "Xử lý văn bản, bảng tính, trình chiếu nâng cao theo chuẩn kỹ năng.", level: "Người đi làm, viên chức" },
      { name: "IC3 & IC3 Spark", desc: "Chứng chỉ tin học quốc tế; IC3 Spark dành cho học sinh tiểu học.", level: "Học sinh" },
      { name: "MOS Word – Excel – PowerPoint", desc: "Luyện thi chứng chỉ Microsoft Office Specialist trên máy.", level: "Sinh viên, người đi làm" },
      { name: "AI trong thiết kế bài dạy", desc: "Ứng dụng trí tuệ nhân tạo để soạn bài, làm học liệu số.", level: "Giáo viên" },
    ],
  },
];

export default function KhoaHocPage() {
  return (
    <div className="container section">
      <header className="page-head">
        <p className="eyebrow">Chương trình đào tạo</p>
        <h1>Khóa học</h1>
        <nav className="tabs" aria-label="Nhóm khóa học">
          {GROUPS.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="tab">
              {g.title}
            </a>
          ))}
        </nav>
      </header>

      {GROUPS.map((g) => (
        <section key={g.id} id={g.id} className="course-group">
          <h2>{g.title}</h2>
          <div className="card-grid">
            {g.courses.map((c) => (
              <article key={c.name} className="card course-card">
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
                <p className="course-meta">Đối tượng: {c.level}</p>
              </article>
            ))}
          </div>
        </section>
      ))}

      <div className="callout">
        Lịch khai giảng từng lớp được cập nhật tại mục <Link href="/thong-bao">Thông báo</Link>.
      </div>
    </div>
  );
}
