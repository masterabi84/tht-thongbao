import Link from "next/link";
import { Suspense } from "react";
import { NAV, SITE } from "@/lib/site";
import { ActiveNav } from "./ActiveNav";
import { AuthArea } from "./AuthArea";

function StaticNav() {
  return (
    <nav className="nav" aria-label="Menu chính">
      {NAV.map((item) => (
        <Link key={item.href} href={item.href} className="nav-link">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/gioi-thieu" className="brand">
          <span className="brand-mark" aria-hidden="true">THT</span>
          <span className="brand-name">{SITE.name}</span>
        </Link>
        {/* Đường dẫn hiện tại chỉ có lúc chạy → stream trong Suspense, tạm hiện menu không tô sáng. */}
        <Suspense fallback={<StaticNav />}>
          <ActiveNav />
        </Suspense>
        <AuthArea />
      </div>
    </header>
  );
}
