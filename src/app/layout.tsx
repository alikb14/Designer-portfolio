import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { DeveloperCredit } from "@/components/site/DeveloperCredit";
import "./globals.css";

export const metadata: Metadata = {
  description: "Yaad is a 2D motion designer from planet Earth.",
  title: {
    default: "Yaad — Motion Designer",
    template: "%s — Yaad",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`.site-nav { display: flex !important; position: static !important; flex-wrap: wrap; } .site-header { display: flex; flex-wrap: wrap; gap: 1rem; } .menu-toggle, .theme-toggle, .work-preview-control, .play-details-toggle { display: none !important; } .play-description { display: block !important; opacity: 1 !important; max-height: none !important; } .typewriter-text-measure { visibility: visible !important; } .typewriter-text-live { display: none !important; }`}</style>
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('yaad-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <PageTransition>
          {children}
          <DeveloperCredit />
        </PageTransition>
      </body>
    </html>
  );
}
