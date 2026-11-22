import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <strong>{SITE.name}</strong>
        <span>{SITE.address}</span>
        <span>
          Điện thoại: <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
        </span>
      </div>
    </footer>
  );
}
