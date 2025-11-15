import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO & Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="InjuredWorkersUnite - Independent activist platform advocating for disability rights, workers' rights, and social justice in Canada. Monitoring government accountability with verifiable facts and evidence." />
        <meta name="keywords" content="injured workers, disability rights, WSIB, ODSP, workers compensation, disability advocacy, social justice, Canada, Ontario, activism, government accountability" />
        <meta name="author" content="InjuredWorkersUnite - @PhoenixRizin09" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Injured Workers Unite - Disability Rights Activism" />
        <meta property="og:description" content="Independent activist platform for injured workers and disabled persons in Canada. 100% transparent, zero tracking, evidence-based advocacy." />
        <meta property="og:site_name" content="InjuredWorkersUnite" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Phoenixrizin09" />
        <meta name="twitter:title" content="Injured Workers Unite - Disability Rights Activism" />
        <meta name="twitter:description" content="Independent activist platform fighting for justice. Evidence-based advocacy, government accountability, zero corporate influence." />
        
        {/* Legal & Privacy */}
        <meta name="privacy-policy" content="/legal#privacy" />
        <meta name="terms-of-service" content="/legal#terms" />
        <link rel="canonical" href="https://injuredworkersunite.pages.dev/" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#000000" />
        
        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "d0257041f40548068ae192704a20eaa1"}'
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
