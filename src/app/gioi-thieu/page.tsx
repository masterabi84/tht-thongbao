import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Giới thiệu" };

const PILLARS = [
  {
    title: "Đào tạo ngoại ngữ",
    text: "Tiếng Anh tổng quát và luyện thi theo chuẩn Cambridge, IELTS, TOEIC, Khung năng lực ngoại ngữ 6 bậc; tiếng Trung HSK.",
  },
  {
    title: "Đào tạo tin học",
    text: "Tin học ứng dụng cơ bản – nâng cao, ôn thi chứng chỉ Ứng dụng CNTT, IC3 và MOS Word, Excel, PowerPoint.",
  },
  {
    title: "Tổ chức thi & cấp chứng chỉ",
    text: "Ôn luyện sát cấu trúc đề, tổ chức kiểm tra năng lực và hướng dẫn đăng ký các kỳ thi chứng chỉ trong nước và quốc tế.",
  },
];

export default function GioiThieuPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Giới thiệu</p>
          <h1>Về {SITE.name}</h1>
          <p className="lead">
            Đào tạo ngoại ngữ và tin học ứng dụng cho học sinh, sinh viên, người đi làm và giáo viên. Chương trình được xây dựng theo từng cấp độ và từng
            đối tượng người học.
          </p>
          <div className="hero-actions">
            <Link href="/khoa-hoc" className="btn btn-primary">
              Xem khóa học
            </Link>
            <Link href="/thong-bao" className="btn btn-ghost">
              Lịch khai giảng mới
            </Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="two-col">
          <div>
            <h2>Giới thiệu chung</h2>
            <p>
              {SITE.name} tổ chức bồi dưỡng ngoại ngữ và tin học ứng dụng ở nhiều cấp độ, từ cơ bản đến nâng cao, phù hợp nhu cầu học tập và công việc.
              Bên cạnh các lớp học tại trung tâm, THT nhận tổ chức lớp theo yêu cầu cho trường học và doanh nghiệp.
            </p>
            <p>
              Mỗi đợt khai giảng đều được đăng ở mục <Link href="/thong-bao">Thông báo</Link> để học viên theo dõi và đăng ký kịp thời.
            </p>
          </div>
          <dl className="facts">
            <div>
              <dt>Địa chỉ</dt>
              <dd>{SITE.address}</dd>
            </div>
            <div>
              <dt>Điện thoại</dt>
              <dd>
                <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt>Lĩnh vực</dt>
              <dd>Ngoại ngữ · Tin học ứng dụng · Luyện thi chứng chỉ</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="container section">
        <div className="card-grid">
          {PILLARS.map((p) => (
            <article key={p.title} className="card">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
