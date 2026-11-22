import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Liên hệ" };

export default function LienHePage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE.address)}&output=embed`;
  return (
    <div className="container section">
      <header className="page-head">
        <p className="eyebrow">Liên hệ</p>
        <h1>Liên hệ {SITE.name}</h1>
      </header>
      <div className="contact">
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
            <dt>Đăng ký học</dt>
            <dd>Gọi điện hoặc đến trực tiếp trung tâm để được tư vấn và xếp lớp.</dd>
          </div>
          <a href={`tel:${SITE.phone}`} className="btn btn-primary">
            Gọi {SITE.phoneDisplay}
          </a>
        </dl>
        <iframe className="map" title={`Bản đồ: ${SITE.address}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </div>
  );
}
