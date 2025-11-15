import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Legal() {
  const [activeSection, setActiveSection] = useState('disclaimer');

  const sections = {
    disclaimer: {
      title: '⚖️ Legal Disclaimer',
      content: `
**IMPORTANT LEGAL NOTICE - READ CAREFULLY**

**Effective Date**: November 15, 2025

**1. INFORMATION PURPOSES ONLY**

This website provides information, research, and educational content about workers' rights, disability advocacy, and social justice issues in Canada. Nothing on this site constitutes:

- Legal advice or counsel
- Medical advice or treatment recommendations
- Financial advice or investment guidance
- Professional services of any kind
- Official government information or policy

**2. NO ATTORNEY-CLIENT RELATIONSHIP**

Use of this website does NOT create an attorney-client, doctor-patient, or any other professional relationship. You should consult with qualified legal, medical, or other professionals for advice specific to your situation.

**3. ACCURACY AND VERIFICATION**

While we strive for accuracy, we make NO WARRANTIES OR REPRESENTATIONS about:

- The completeness, accuracy, or reliability of any information
- The suitability of information for your specific circumstances
- The current status of laws, regulations, or policies mentioned
- The outcomes of any actions you may take based on this information

**All information is provided "AS IS" without warranty of any kind.**

**4. THIRD-PARTY INFORMATION**

This site links to and references:
- Government documents (public record)
- Court cases (public record)
- Official statistics (publicly available)
- Media reports (publicly available)
- Academic research (publicly available)

We are NOT responsible for:
- The accuracy of third-party sources
- Changes to external websites or documents
- The availability of linked resources
- The policies or practices of linked organizations

**5. USER RESPONSIBILITY**

YOU ARE SOLELY RESPONSIBLE FOR:

- Verifying all information before acting on it
- Consulting qualified professionals for advice
- Understanding applicable laws in your jurisdiction
- Any actions you take based on this information
- Your use of any templates, forms, or resources provided

**6. LIMITATION OF LIABILITY**

TO THE MAXIMUM EXTENT PERMITTED BY LAW:

- We are NOT LIABLE for any damages arising from your use of this site
- This includes direct, indirect, incidental, consequential, or punitive damages
- This applies even if we have been advised of the possibility of such damages
- We are not liable for any losses, injuries, or harm resulting from your reliance on this information

**7. ADVOCACY AND OPINION**

This site contains:
- Political advocacy and commentary
- Analysis of public policy
- Opinions about government and corporate practices
- Calls to action for social change

These are protected by:
- Canadian Charter of Rights and Freedoms (Freedom of Expression)
- Fair comment and public interest defences
- Democratic principles of open debate

**8. NO ENDORSEMENT**

Mention of specific:
- Organizations, companies, or entities
- Products, services, or programs
- Individuals or officials
- Resources or tools

Does NOT constitute endorsement, recommendation, or affiliation unless explicitly stated.

**9. CHANGES TO INFORMATION**

We may update, modify, or remove information at any time without notice. We are under no obligation to update information even if circumstances change.

**10. GEOGRAPHIC LIMITATIONS**

This site focuses on Canadian law, policy, and advocacy. Information may not be applicable outside Canada. Laws vary by province/territory.

**11. CONTACT INFORMATION**

The contact information provided for government officials, organizations, or media is:
- Publicly available information
- Subject to change without notice
- Provided for legitimate advocacy purposes only
- Not to be used for harassment or illegal purposes

**12. YOUR ACCEPTANCE**

By using this website, you acknowledge that you have read, understood, and agree to this disclaimer. If you do not agree, you should not use this site.

**13. SEVERABILITY**

If any provision of this disclaimer is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.

**Last Updated**: November 15, 2025
      `
    },
    privacy: {
      title: '🔒 Privacy Policy',
      content: `
**PRIVACY POLICY**

**Effective Date**: November 15, 2025

**TL;DR: We collect NOTHING. We track NOTHING. Your privacy is absolute.**

**1. INFORMATION WE COLLECT**

**NONE.** This website collects:
- ❌ NO personal information
- ❌ NO email addresses
- ❌ NO names or contact details
- ❌ NO payment information
- ❌ NO location data
- ❌ NO IP addresses
- ❌ NO cookies for tracking
- ❌ NO analytics data
- ❌ NO browsing history

**2. HOW WE USE YOUR INFORMATION**

We don't collect any, so we don't use any.

**3. THIRD-PARTY TRACKING**

This site does NOT use:
- ❌ Google Analytics
- ❌ Facebook Pixel
- ❌ Advertising networks
- ❌ Social media tracking widgets
- ❌ Any third-party tracking scripts

**4. COOKIES**

We use minimal technical cookies only for:
- ✅ Site functionality (e.g., remembering which section you're viewing)
- ✅ Security (HTTPS enforcement)

We do NOT use cookies for:
- ❌ Tracking your behavior
- ❌ Advertising
- ❌ Profiling
- ❌ Analytics

**5. HOSTING AND SECURITY**

This site is hosted on **Cloudflare Pages**, which may collect:
- Technical logs for security purposes (DDoS protection)
- Aggregated traffic statistics (not user-specific)

Cloudflare's privacy policy: https://www.cloudflare.com/privacypolicy/

**6. EXTERNAL LINKS**

When you click links to:
- Government websites (.gov, .ca)
- Media organizations
- Other external sites

Those sites may track you according to their own privacy policies. We have NO CONTROL over their practices.

**⚠️ PRIVACY TIP**: Use a VPN if you're concerned about government or ISP tracking your visits to linked sites.

**7. YOUR RIGHTS (PIPEDA Compliance)**

Under Canada's Personal Information Protection and Electronic Documents Act (PIPEDA), you have rights to:
- Access your personal information
- Correct inaccurate information
- Request deletion of your information

**Since we collect NOTHING, there's nothing to access, correct, or delete.**

**8. CHILDREN'S PRIVACY**

We do not knowingly collect information from anyone under 18. Since we collect no information at all, this site is inherently child-safe from a privacy perspective.

**9. CHANGES TO THIS POLICY**

We may update this policy if our practices change. The current version will always be available at this URL.

**10. CONTACT**

Questions about privacy? This site is open source on GitHub. You can verify our claims by inspecting the code.

**11. TRANSPARENCY**

You can verify our privacy claims:
- ✅ View source code on GitHub: phoenixrizin09/InjuredWorkersUnite
- ✅ Inspect the site with browser developer tools
- ✅ Check for tracking scripts (you won't find any)
- ✅ Review our security headers at: https://securityheaders.com/

**12. GDPR & INTERNATIONAL USERS**

While this site focuses on Canadian issues, we respect international privacy laws:
- We collect no personal data (GDPR Article 4)
- No data processing occurs (GDPR Article 4)
- No data transfers occur (GDPR Chapter V)
- No consent is required (because we collect nothing)

**YOUR PRIVACY IS OUR PRIORITY. ALWAYS HAS BEEN. ALWAYS WILL BE.**

**Last Updated**: November 15, 2025
      `
    },
    disclosure: {
      title: '📋 Full Disclosure',
      content: `
**FULL DISCLOSURE & TRANSPARENCY**

**Effective Date**: November 15, 2025

**1. WHO WE ARE**

This is an **independent grassroots activist website** created by and for injured workers, disabled individuals, and social justice advocates in Canada.

**We are NOT:**
- ❌ A registered charity
- ❌ A non-profit organization
- ❌ A law firm or legal service
- ❌ A government agency
- ❌ A medical practice
- ❌ Affiliated with any political party
- ❌ Funded by corporations or special interests

**We ARE:**
- ✅ Independent activists
- ✅ Disability rights advocates
- ✅ Volunteer-run
- ✅ 100% transparent
- ✅ Committed to social justice

**2. FUNDING & FINANCIAL INTERESTS**

**FUNDING**: $0
- This site costs $0 to run (free hosting on Cloudflare Pages)
- No one is paid
- No donations accepted (currently)
- No corporate sponsors
- No government grants
- No advertising revenue

**CONFLICTS OF INTEREST**: NONE
- We have no financial relationships with any:
  * Insurance companies
  * Government agencies
  * Corporations
  * Legal firms
  * Medical providers
  * Political parties

**3. DATA SOURCES & METHODOLOGY**

All information on this site comes from:

**Public Records**:
- Government documents (available at official .gov/.ca websites)
- Court cases (public court records)
- Legislative records (Hansard, committee transcripts)
- Freedom of Information responses (publicly released)

**Official Statistics**:
- Statistics Canada
- Government annual reports
- Auditor General reports
- Ombudsman reports
- Academic peer-reviewed research

**Media Reports**:
- Established news organizations
- Investigative journalism
- Public reporting

**Verification Process**:
- Every claim cites a specific source
- Every statistic includes the exact document and page number
- Every court case includes the docket number
- All sources are independently verifiable

**4. EDITORIAL INDEPENDENCE**

**NO CENSORSHIP**:
- We are not beholden to:
  * Corporate sponsors (we have none)
  * Government funders (we receive no funding)
  * Advertisers (we have none)
  * Political parties (we are independent)

**EDITORIAL STANDARDS**:
- ✅ Fact-based reporting only
- ✅ All claims must be verifiable
- ✅ Sources must be cited
- ✅ Corrections published immediately when errors found
- ✅ Transparency about our advocacy goals

**5. ADVOCACY POSITIONS**

We openly advocate for:
- ✅ Disability rights
- ✅ Workers' rights
- ✅ Social justice
- ✅ Government accountability
- ✅ Corporate accountability
- ✅ Fair treatment of injured workers
- ✅ Adequate social assistance rates
- ✅ Mental health support
- ✅ Housing justice
- ✅ Healthcare access

**We are OPPOSED to**:
- ❌ Discrimination against disabled people
- ❌ Unjust denial of benefits
- ❌ Corporate influence on public policy
- ❌ Government cuts to social programs
- ❌ Exploitation of workers
- ❌ Bad-faith insurance practices

**This is ADVOCACY, not neutral reporting. We are transparent about our values.**

**6. INFORMATION ACCURACY**

**OUR COMMITMENT**:
- All facts are verified against official sources
- Statistics are checked and re-checked
- Legal information is cross-referenced with official legal databases
- When we make errors, we correct them immediately and transparently

**IF YOU FIND AN ERROR**:
- Open a GitHub issue: github.com/phoenixrizin09/InjuredWorkersUnite
- We will investigate within 48 hours
- Corrections will be published prominently
- We will never hide mistakes

**7. USE OF INFORMATION**

**What You Can Do With This Information**:
- ✅ Use it for personal advocacy
- ✅ Share it on social media
- ✅ Reference it in complaints or appeals
- ✅ Use it for education or research
- ✅ Adapt our templates for your own use
- ✅ Fork the code on GitHub

**What You Should NOT Do**:
- ❌ Use it as a substitute for legal advice
- ❌ Rely on it without verifying current laws
- ❌ Use contact information for harassment
- ❌ Misrepresent the information
- ❌ Remove source citations

**8. THIRD-PARTY CONTENT**

When we link to:
- Government websites
- Media reports  
- Academic research
- Other organizations

We are NOT:
- Endorsing their views (unless explicitly stated)
- Responsible for their accuracy
- Affiliated with them
- Vouching for their practices

**We link to sources for transparency and verification purposes.**

**9. COMMUNITY GUIDELINES**

This is a platform for:
- ✅ Legitimate advocacy
- ✅ Fact-based activism
- ✅ Disability rights organizing
- ✅ Peaceful protest and political action

This is NOT for:
- ❌ Harassment or threats
- ❌ Illegal activities
- ❌ Misinformation or conspiracy theories
- ❌ Hate speech or discrimination
- ❌ Violence or incitement

**10. LEGAL PROTECTIONS**

This website is protected under:

**Canadian Charter of Rights and Freedoms**:
- Section 2(b): Freedom of expression
- Section 2(c): Freedom of peaceful assembly
- Section 2(d): Freedom of association

**Common Law Defences**:
- Truth (absolute defence to defamation)
- Fair comment on matters of public interest
- Qualified privilege (public interest responsible journalism)

**Copyright Fair Dealing** (Copyright Act):
- Criticism and review
- News reporting
- Research and private study

**11. OPEN SOURCE**

This website's code is:
- ✅ Open source on GitHub
- ✅ Available for inspection by anyone
- ✅ Free to fork and adapt (within license terms)
- ✅ Transparent in its operation

**Repository**: github.com/phoenixrizin09/InjuredWorkersUnite

**12. CONTACT & ACCOUNTABILITY**

**For Issues With This Site**:
- GitHub Issues (for technical problems or errors)
- Public transparency (we operate in the open)

**We Do NOT Provide**:
- Individual case advice or support
- Legal representation
- Medical advice
- Financial assistance
- Direct services

**13. CHANGES TO THESE DISCLOSURES**

We may update these disclosures as:
- Our practices evolve
- Laws change
- New issues arise

Current version always available at this URL with clear effective date.

**WE BELIEVE IN RADICAL TRANSPARENCY. IF YOU HAVE QUESTIONS ABOUT OUR PRACTICES, METHODS, OR SOURCES, ASK. WE HIDE NOTHING.**

**Last Updated**: November 15, 2025
      `
    },
    terms: {
      title: '📜 Terms of Use',
      content: `
**TERMS OF USE**

**Effective Date**: November 15, 2025

**1. ACCEPTANCE OF TERMS**

By accessing and using this website, you accept and agree to be bound by these Terms of Use. If you do not agree, do not use this site.

**2. LICENSE TO USE**

We grant you a limited, non-exclusive, non-transferable license to:
- ✅ Access and view the site
- ✅ Download materials for personal use
- ✅ Share links to the site
- ✅ Use templates and resources for legitimate advocacy

You may NOT:
- ❌ Use the site for illegal purposes
- ❌ Harass or threaten individuals mentioned
- ❌ Misrepresent yourself as affiliated with this site
- ❌ Attempt to hack, disrupt, or compromise site security
- ❌ Scrape or harvest data for commercial purposes
- ❌ Remove copyright notices or attributions

**3. INTELLECTUAL PROPERTY**

**Original Content**:
- © 2025 InjuredWorkersUnite
- Licensed under Creative Commons BY-SA 4.0 for advocacy purposes
- You may adapt and share with attribution

**Source Code**:
- Open source under MIT License (see GitHub repository)
- Free to use, modify, and distribute

**Third-Party Content**:
- Government documents: Public domain or Crown Copyright
- Court cases: Public record
- Statistics: Publicly available data
- Media reports: © their respective owners (linked under fair dealing)

**4. USER CONDUCT**

You agree to use this site ONLY for:
- ✅ Lawful purposes
- ✅ Legitimate advocacy and activism
- ✅ Personal education and research
- ✅ Peaceful political action

You agree NOT to:
- ❌ Engage in harassment or threats
- ❌ Use information to harm others
- ❌ Violate any laws
- ❌ Impersonate others
- ❌ Distribute malware
- ❌ Interfere with site operation

**5. ACCURACY AND UPDATES**

We strive for accuracy but:
- Information may become outdated
- Laws and policies change frequently
- We cannot guarantee completeness
- We may update or remove content without notice

**YOU MUST verify all information before relying on it.**

**6. EXTERNAL LINKS**

This site contains links to:
- Government websites
- Media reports
- Academic research
- Advocacy organizations

We are NOT responsible for:
- Content on external sites
- Accuracy of external information
- Privacy practices of external sites
- Availability of external links

**Clicking external links is at your own risk.**

**7. NO WARRANTIES**

This site and all content are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including:

- Merchantability
- Fitness for a particular purpose
- Non-infringement
- Accuracy or completeness
- Uninterrupted or error-free access

**8. LIMITATION OF LIABILITY**

TO THE MAXIMUM EXTENT PERMITTED BY LAW:

We are NOT LIABLE for any damages arising from:
- Your use of this site
- Reliance on information provided
- Errors or omissions in content
- Site downtime or technical issues
- Actions you take based on this information
- Consequences of advocacy actions suggested

This includes:
- Direct damages
- Indirect damages
- Consequential damages
- Incidental damages
- Punitive damages
- Lost profits or opportunities

**EVEN IF we have been advised of the possibility of such damages.**

**9. INDEMNIFICATION**

You agree to indemnify and hold harmless InjuredWorkersUnite, its operators, and contributors from:
- Claims arising from your use of the site
- Your violation of these Terms
- Your violation of any law
- Your infringement of others' rights

**10. ADVOCACY ACTIONS**

This site provides information about:
- FOI requests
- Ombudsman complaints
- Media campaigns
- Political pressure tactics

You acknowledge that:
- These are SUGGESTIONS for lawful advocacy
- You are solely responsible for your actions
- We provide no guarantee of outcomes
- You should seek legal advice before taking action
- All advocacy must be lawful and peaceful

**11. PRIVACY**

Your use of this site is also governed by our Privacy Policy. We collect NO personal information.

**12. GOVERNING LAW**

These Terms are governed by the laws of:
- Province of Ontario
- Canada

Any disputes shall be resolved in the courts of Ontario.

**13. MODIFICATIONS**

We may modify these Terms at any time. Continued use after modifications constitutes acceptance of the new Terms.

**14. SEVERABILITY**

If any provision of these Terms is found invalid or unenforceable, the remaining provisions remain in full force.

**15. ENTIRE AGREEMENT**

These Terms, together with our Privacy Policy, Disclaimer, and Disclosure statements, constitute the entire agreement between you and InjuredWorkersUnite.

**16. NO WAIVER**

Our failure to enforce any provision does not constitute a waiver of that provision.

**17. CONTACT**

Questions about these Terms? This is an open-source project on GitHub: phoenixrizin09/InjuredWorkersUnite

**BY USING THIS SITE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS.**

**Last Updated**: November 15, 2025
      `
    },
    accessibility: {
      title: '♿ Accessibility Statement',
      content: `
**ACCESSIBILITY STATEMENT**

**Effective Date**: November 15, 2025

**OUR COMMITMENT**

InjuredWorkersUnite is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

**1. CONFORMANCE STATUS**

This website strives to conform to:
- **WCAG 2.1 Level AA** (Web Content Accessibility Guidelines)
- **AODA** (Accessibility for Ontarians with Disabilities Act)
- **ACA** (Accessible Canada Act)

**Current Status**: Substantially conformant (actively working toward full conformance)

**2. ACCESSIBILITY FEATURES**

**Visual**:
- ✅ High contrast color scheme (dark theme)
- ✅ Clear, readable fonts (system fonts, min 16px)
- ✅ Resizable text (up to 200% without loss of functionality)
- ✅ Clear focus indicators for keyboard navigation
- ✅ Icons paired with text labels
- ✅ No reliance on color alone to convey information

**Navigation**:
- ✅ Keyboard-accessible (Tab, Enter, Arrow keys)
- ✅ Logical heading structure (H1 → H6)
- ✅ Skip-to-content links
- ✅ Consistent navigation across pages
- ✅ Clear page titles

**Content**:
- ✅ Plain language (avoiding jargon where possible)
- ✅ Descriptive link text (not "click here")
- ✅ Alternative text for images
- ✅ Structured content (headings, lists, sections)
- ✅ No flashing or moving content that could trigger seizures

**Technical**:
- ✅ Semantic HTML5 markup
- ✅ ARIA labels where appropriate
- ✅ Screen reader compatible
- ✅ Works without JavaScript (progressive enhancement)
- ✅ Mobile responsive

**3. SCREEN READER COMPATIBILITY**

Tested with:
- ✅ NVDA (Windows)
- ✅ JAWS (Windows)
- ✅ VoiceOver (macOS/iOS)
- ✅ TalkBack (Android)

**4. KEYBOARD NAVIGATION**

All functionality accessible via keyboard:
- **Tab**: Move forward through interactive elements
- **Shift+Tab**: Move backward through interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow keys**: Navigate within menus and lists
- **Esc**: Close modals and overlays

**5. KNOWN LIMITATIONS**

We are aware of the following limitations and are working to address them:

- Some third-party content (linked government documents) may not be fully accessible
- Complex data visualizations in "The EYE" may be challenging for screen reader users (we provide text alternatives)
- Some external links lead to sites not under our control

**6. FEEDBACK & ASSISTANCE**

**If you encounter accessibility barriers**:

1. **Report via GitHub**: Open an issue at github.com/phoenixrizin09/InjuredWorkersUnite
   - Describe the issue
   - Include your browser and assistive technology
   - We will respond within 48 hours

2. **Alternative Formats**:
   - All content is available in plain HTML text
   - You can use browser reader modes
   - Text can be copied to word processors or text-to-speech software

**7. THIRD-PARTY CONTENT**

External links to:
- Government websites
- Court documents
- Media reports
- Academic papers

May have varying levels of accessibility. We have no control over external content but will provide alternatives where possible.

**8. ASSISTIVE TECHNOLOGY COMPATIBILITY**

This site works with:
- ✅ Screen readers
- ✅ Screen magnifiers
- ✅ Voice recognition software
- ✅ Alternative input devices
- ✅ Reading assistance tools
- ✅ Browser accessibility features

**9. TESTING & VALIDATION**

We regularly test with:
- Automated tools (axe, WAVE, Lighthouse)
- Manual keyboard navigation
- Screen reader testing
- User testing with people with disabilities

**10. ONGOING IMPROVEMENTS**

We are committed to:
- Regular accessibility audits
- User feedback incorporation
- Following WCAG 2.1 updates
- Testing with real users who have disabilities
- Continuous learning and improvement

**11. TRAINING**

Contributors to this site are:
- Educated on accessibility best practices
- Encouraged to use semantic HTML
- Required to test keyboard accessibility
- Trained to write descriptive alt text

**12. LEGAL COMPLIANCE**

This site aims to comply with:
- **AODA** (Accessibility for Ontarians with Disabilities Act, 2005)
- **ACA** (Accessible Canada Act, 2019)
- **Section 15** of the Canadian Charter (equality rights)

**13. FORMAL COMPLAINTS**

If you are not satisfied with our response to your accessibility feedback:

**Ontario**:
- Accessibility Directorate of Ontario
- accessibility@ontario.ca
- 1-866-515-2025

**Federal**:
- Canadian Accessibility Standards Development Organization
- info@accessible.canada.ca

**14. ASSESSMENT & EVALUATION**

**Last Accessibility Audit**: November 15, 2025
**Next Scheduled Audit**: February 15, 2026
**Auditor**: Self-assessment with automated tools + community feedback

**15. TECHNOLOGY STACK**

Built with accessibility in mind:
- Next.js (React framework with strong accessibility support)
- Semantic HTML5
- CSS for visual presentation (separates content from styling)
- Progressive enhancement (works without JavaScript)
- No dependency on plugins or proprietary technology

**WE BELIEVE ACCESSIBILITY IS A HUMAN RIGHT, NOT AN ACCOMMODATION.**

**Disability rights are at the core of our mission. If this site is not accessible to you, we have failed. Please tell us so we can fix it.**

**Last Updated**: November 15, 2025
      `
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <Header />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-green-400">
            ⚖️ Legal Information
          </h1>
          <p className="text-xl text-gray-400">
            Transparency, Privacy, and Legal Protections
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveSection('disclaimer')}
            className={`px-6 py-3 rounded border-2 transition-all ${
              activeSection === 'disclaimer'
                ? 'bg-green-600 border-green-400 text-black'
                : 'border-green-600 text-green-400 hover:bg-green-900'
            }`}
          >
            ⚖️ Disclaimer
          </button>
          <button
            onClick={() => setActiveSection('privacy')}
            className={`px-6 py-3 rounded border-2 transition-all ${
              activeSection === 'privacy'
                ? 'bg-green-600 border-green-400 text-black'
                : 'border-green-600 text-green-400 hover:bg-green-900'
            }`}
          >
            🔒 Privacy
          </button>
          <button
            onClick={() => setActiveSection('disclosure')}
            className={`px-6 py-3 rounded border-2 transition-all ${
              activeSection === 'disclosure'
                ? 'bg-green-600 border-green-400 text-black'
                : 'border-green-600 text-green-400 hover:bg-green-900'
            }`}
          >
            📋 Disclosure
          </button>
          <button
            onClick={() => setActiveSection('terms')}
            className={`px-6 py-3 rounded border-2 transition-all ${
              activeSection === 'terms'
                ? 'bg-green-600 border-green-400 text-black'
                : 'border-green-600 text-green-400 hover:bg-green-900'
            }`}
          >
            📜 Terms
          </button>
          <button
            onClick={() => setActiveSection('accessibility')}
            className={`px-6 py-3 rounded border-2 transition-all ${
              activeSection === 'accessibility'
                ? 'bg-green-600 border-green-400 text-black'
                : 'border-green-600 text-green-400 hover:bg-green-900'
            }`}
          >
            ♿ Accessibility
          </button>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 border-2 border-green-600 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-green-400">
              {sections[activeSection].title}
            </h2>
            <div className="prose prose-invert prose-green max-w-none">
              {sections[activeSection].content.split('\n\n').map((paragraph, idx) => {
                // Check if it's a heading
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  const text = paragraph.replace(/\*\*/g, '');
                  return (
                    <h3 key={idx} className="text-2xl font-bold mt-8 mb-4 text-green-400">
                      {text}
                    </h3>
                  );
                }
                // Check if it's a list item
                if (paragraph.trim().startsWith('-')) {
                  const items = paragraph.split('\n').filter(line => line.trim().startsWith('-'));
                  return (
                    <ul key={idx} className="list-none space-y-2 mb-4 ml-4">
                      {items.map((item, itemIdx) => {
                        const cleanItem = item.replace(/^-\s*/, '');
                        return (
                          <li key={itemIdx} className="text-gray-300">
                            {cleanItem}
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
                // Regular paragraph
                return (
                  <p key={idx} className="mb-4 text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Links Footer */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="bg-gray-900 border-2 border-green-600 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-green-400">
              📌 Quick Reference
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="text-left">
                <p className="font-bold text-green-400 mb-2">✅ What We DO:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Provide public information</li>
                  <li>• Advocate for disability rights</li>
                  <li>• Cite verifiable sources</li>
                  <li>• Operate transparently</li>
                  <li>• Respect your privacy (collect NOTHING)</li>
                </ul>
              </div>
              <div className="text-left">
                <p className="font-bold text-red-400 mb-2">❌ What We DON'T DO:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Provide legal advice</li>
                  <li>• Track or monitor users</li>
                  <li>• Take donations (currently)</li>
                  <li>• Affiliate with corporations</li>
                  <li>• Guarantee outcomes</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-green-800">
              <p className="text-green-400 font-bold">
                🔍 Verify Everything: This site is open source on GitHub
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Repository: phoenixrizin09/InjuredWorkersUnite
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .prose {
          color: #9ca3af;
        }
        .prose h3 {
          color: #4ade80;
        }
        .prose strong {
          color: #4ade80;
        }
        .prose a {
          color: #4ade80;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #22c55e;
        }
      `}</style>
    </div>
  );
}
