"use client";

import Link from "next/link";

export default function Page() {
  return (
    <section className="_social_login_wrapper _layout_main_wrapper" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10 text-center">
            <img src="/assets/images/logo.svg" alt="Buddy Script" style={{ height: 40, marginBottom: 24 }} />
            <h4 className="_titl4 _mar_b50">Groups</h4>
            <p className="_mar_b40">This page is a placeholder route — it isn't part of the original template's three pages, but is wired up so navigation from the feed works end-to-end.</p>
            <Link href="/feed" className="_social_login_content_btn" style={{ display: "inline-block", padding: "12px 32px" }}>
              Back to Feed
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
