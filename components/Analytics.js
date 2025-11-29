// components/Analytics.js
import Head from 'next/head';

export default function Analytics() {
  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Head>
      {/* Plausible Analytics - Privacy-friendly, no cookies */}
      <script
        defer
        data-domain="injuredworkersunite.pages.dev"
        src="https://plausible.io/js/script.js"
      />
      
      {/* Optional: Plausible custom events */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.plausible = window.plausible || function() {
            (window.plausible.q = window.plausible.q || []).push(arguments)
          }
        `
      }} />
    </Head>
  );
}

// Usage: Add to pages/_app.js
// import Analytics from '../components/Analytics';
// 
// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//       <Analytics />
//       <Component {...pageProps} />
//     </>
//   );
// }
