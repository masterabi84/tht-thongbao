"use client";

import { useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** Hiển thị link đầy đủ của một trang và nút sao chép. `path` bắt đầu bằng "/". */
export function CopyLinkButton({ path, variant = "primary" }: { path: string; variant?: "primary" | "success" }) {
  // Origin chỉ có ở trình duyệt; khi render trên server tạm hiển thị đường dẫn tương đối.
  const origin = useSyncExternalStore(noopSubscribe, () => window.location.origin, () => "");
  const url = origin + path;
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="copy-link">
      <input className="input copy-input" value={url} readOnly aria-label="Link thông báo" onFocus={(e) => e.target.select()} />
      <button type="button" className={variant === "success" ? "btn btn-success" : "btn btn-primary"} onClick={copy}>
        {copied ? "Đã sao chép ✓" : "Sao chép link"}
      </button>
    </div>
  );
}
