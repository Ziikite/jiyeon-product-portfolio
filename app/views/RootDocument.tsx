import Script from "next/script";
import LangSwitch from "@/app/components/LangSwitch";
import { LocaleProvider } from "@/app/lib/LocaleContext";
import type { Locale } from "@/app/lib/i18n";

const GA_MEASUREMENT_ID = "G-EF6DEZ4D0Q";

// Shared <html> shell for the (ko) and (en) root layouts.
export default function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale}>
          {children}
          <LangSwitch />
        </LocaleProvider>
      </body>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </html>
  );
}
