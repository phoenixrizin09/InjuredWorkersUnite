import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO & Meta Tags - Note: viewport should be in _app.js or next.config.js */}
        <meta charSet="UTF-8" />
        <meta name="description" content="InjuredWorkersUnite - Independent activist platform advocating for disability rights, workers' rights, and social justice in Canada. Monitoring government accountability with verifiable facts and evidence." />
        <meta name="keywords" content="injured workers, disability rights, WSIB, ODSP, workers compensation, disability advocacy, social justice, Canada, Ontario, activism, government accountability" />
        <meta name="author" content="InjuredWorkersUnite - @PhoenixRizin09" />
        <meta name="robots" content="index, follow" />
        
        {/* Brave Rewards Creator Verification */}
        <meta name="brave-rewards-verification" content="6b924d46f3c64bcd3d65daf1a9ced4fdd2e4c0e07bfa64c807ae845502853197" />
        
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
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Injured Workers Unite',
              url: 'https://injuredworkersunite.pages.dev',
              logo: 'https://injuredworkersunite.pages.dev/logo.png',
              description: 'Independent activist platform advocating for disability rights, workers\' rights, and social justice in Canada.',
              sameAs: [
                'https://twitter.com/Phoenixrizin09',
                'https://www.facebook.com/profile.php?id=61551426728894',
                'https://www.instagram.com/PhoenixRizin09',
                'https://www.tiktok.com/@PhoenixRizin09',
                'https://www.youtube.com/@InjuredWorkersVideoCampaign',
                'https://github.com/phoenixrizin09/InjuredWorkersUnite'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'injuredworker34@gmail.com',
                contactType: 'Customer Service'
              },
              foundingDate: '2023',
              areaServed: 'CA',
              keywords: 'disability rights, workers rights, WSIB, ODSP, social justice, Canada, activism'
            })
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Injured Workers Unite',
              url: 'https://injuredworkersunite.pages.dev',
              description: '100% transparent, zero tracking, evidence-based advocacy for injured workers and disabled persons.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://injuredworkersunite.pages.dev/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
        
        {/* Structured Data - FAQ Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is WSIB and how does it affect injured workers?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'WSIB (Workplace Safety and Insurance Board) is Ontario\'s workplace insurance system. It provides benefits to workers injured on the job. However, denial rates for mental health claims are around 67%, which is why advocacy platforms like Injured Workers Unite exist to help workers understand their rights.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What is ODSP and why is there concern about benefit levels?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ODSP (Ontario Disability Support Program) provides income and employment support to people with disabilities. Current benefit levels of approximately $1,308/month are significantly below the poverty line, leaving many disabled Ontarians struggling to afford basic necessities.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How can I track disability-related legislation in Canada?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'You can track federal bills at parl.ca/legisinfo, Ontario provincial bills at ola.org, and follow advocacy groups like ODSP Action Coalition and ARCH Disability Law Centre. Our Legislative Tracking page provides real-time monitoring of bills affecting injured workers and disabled persons.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Is this website accessible?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! Injured Workers Unite is committed to WCAG 2.2 Level AAA accessibility standards. We offer high contrast mode, large text options, dyslexia-friendly fonts, reduced motion settings, and full keyboard navigation. All features are designed with disability rights advocates in mind.'
                  }
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - Breadcrumb for Navigation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://injuredworkersunite.pages.dev'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'The Eye Oracle',
                  item: 'https://injuredworkersunite.pages.dev/the-eye-oracle'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Daily Reports',
                  item: 'https://injuredworkersunite.pages.dev/eye-oracle-reports'
                }
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
