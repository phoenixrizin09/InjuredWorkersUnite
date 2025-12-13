/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - JUSTICE PACKAGES GENERATOR
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * AUTOMATED GENERATION OF READY-TO-USE JUSTICE PACKAGES
 * 
 * Automatically generates fully built packages for users:
 * 
 * 📂 1) Legal Challenge Package
 *    - Charter arguments
 *    - Human rights claims
 *    - Evidence exhibits
 *    - Jurisdictional citations
 * 
 * 📂 2) Media & Investigative Package
 *    - Headlines
 *    - Key findings
 *    - Verified data
 *    - Quotes from official documents
 * 
 * 📂 3) UNCRPD Shadow Report Package
 *    - Article-by-article violations
 *    - Data & documentation
 *    - Government failures
 * 
 * 📂 4) Public Accountability Package
 *    - Targets
 *    - Maps
 *    - Daily reports
 *    - Plain-language summaries
 * 
 * VERSION: 1.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LEGAL CHALLENGE PACKAGE GENERATOR
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function generateLegalChallengePackage(issue, jurisdiction = 'Ontario') {
  const pkg = {
    id: `legal_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    type: 'LEGAL_CHALLENGE_PACKAGE',
    issue: issue.title,
    jurisdiction,
    
    // 1. CHARTER ARGUMENTS
    charterArguments: [],
    
    // 2. HUMAN RIGHTS CLAIMS
    humanRightsClaims: [],
    
    // 3. EVIDENCE EXHIBITS
    evidenceExhibits: [],
    
    // 4. JURISDICTIONAL CITATIONS
    citations: [],
    
    // 5. PROCEDURAL GUIDANCE
    proceduralGuidance: {},
    
    // 6. TEMPLATE DOCUMENTS
    templates: []
  };

  // ═══════════════════════════════════════════════════════════════════════
  // CHARTER ARGUMENTS
  // ═══════════════════════════════════════════════════════════════════════
  
  // Section 7 Argument
  if (issue.category === 'workers' || issue.category === 'disabilities' || 
      /deny|reduce|cut|delay|inadequate/i.test(issue.evidence || issue.title)) {
    pkg.charterArguments.push({
      section: 'Section 7',
      right: 'Life, Liberty, and Security of the Person',
      argument: `The ${issue.target_entity?.name || 'respondent'}'s actions/policies deprive the applicant of security of the person by:
      
1. Denying or delaying essential benefits/services causing financial hardship and psychological harm.

2. The principles of fundamental justice require that benefit decisions be:
   - Based on accurate evidence (not theoretical "deeming")
   - Made in a timely manner
   - Subject to fair appeal processes

3. The psychological harm caused by adversarial claims processes and repeated denials engages security of the person (Blencoe v. BC, 2000 SCC 44).

4. Where the state provides a benefit scheme, it must do so in a manner consistent with the Charter (Gosselin v. Quebec, 2002 SCC 84 - Chief Justice McLachlin dissent).`,
      
      keyPrecedents: [
        {
          case: 'Carter v. Canada (Attorney General)',
          citation: '2015 SCC 5',
          principle: 'Section 7 protects against state-imposed suffering and psychological harm',
          url: 'https://www.canlii.org/en/ca/scc/doc/2015/2015scc5/2015scc5.html'
        },
        {
          case: 'Chaoulli v. Quebec (Attorney General)',
          citation: '2005 SCC 35',
          principle: 'Denial of timely healthcare can violate Section 7',
          url: 'https://www.canlii.org/en/ca/scc/doc/2005/2005scc35/2005scc35.html'
        },
        {
          case: 'Blencoe v. British Columbia (Human Rights Commission)',
          citation: '2000 SCC 44',
          principle: 'State-caused psychological harm can engage Section 7',
          url: 'https://www.canlii.org/en/ca/scc/doc/2000/2000scc44/2000scc44.html'
        },
        {
          case: 'G(J)',
          citation: '[1999] 3 SCR 46',
          principle: 'Security of person includes psychological integrity',
          url: 'https://www.canlii.org/en/ca/scc/doc/1999/1999canlii675/1999canlii675.html'
        }
      ],
      
      remedySought: 'Declaration that the impugned policy/decision violates Section 7; Order to provide benefits/services in accordance with fundamental justice; Damages under Section 24(1)'
    });
  }

  // Section 15 Argument
  if (issue.category === 'disabilities' || issue.category === 'workers' ||
      /disability|disabled|mental health|discrimination/i.test(issue.evidence || issue.title)) {
    pkg.charterArguments.push({
      section: 'Section 15',
      right: 'Equality Rights',
      argument: `The ${issue.target_entity?.name || 'respondent'}'s actions constitute discrimination based on disability by:

1. SUBSTANTIVE INEQUALITY: The policy/decision creates or perpetuates disadvantage for persons with disabilities.

2. ADVERSE EFFECTS: Even if facially neutral, the policy has disproportionate adverse effects on disabled persons (Fraser v. Canada, 2020 SCC 28).

3. FAILURE TO ACCOMMODATE: The duty to accommodate requires modification of policies/practices to address the actual needs of disabled persons (Eldridge v. BC, 1997 SCC).

4. INTERSECTIONAL DISCRIMINATION: Where the claimant experiences compounded discrimination based on multiple grounds (e.g., disability + gender + Indigenous status), this must be recognized.`,

      keyPrecedents: [
        {
          case: 'Eldridge v. British Columbia (Attorney General)',
          citation: '[1997] 3 SCR 624',
          principle: 'Section 15 requires substantive equality; failure to accommodate violates equality rights',
          url: 'https://www.canlii.org/en/ca/scc/doc/1997/1997canlii327/1997canlii327.html'
        },
        {
          case: 'Fraser v. Canada (Attorney General)',
          citation: '2020 SCC 28',
          principle: 'Adverse effects discrimination is actionable under Section 15',
          url: 'https://www.canlii.org/en/ca/scc/doc/2020/2020scc28/2020scc28.html'
        },
        {
          case: 'Moore v. British Columbia (Education)',
          citation: '2012 SCC 61',
          principle: 'Substantive equality requires addressing actual needs of disabled persons',
          url: 'https://www.canlii.org/en/ca/scc/doc/2012/2012scc61/2012scc61.html'
        },
        {
          case: 'Withler v. Canada (Attorney General)',
          citation: '2011 SCC 12',
          principle: 'Focus of Section 15 is on perpetuation of disadvantage',
          url: 'https://www.canlii.org/en/ca/scc/doc/2011/2011scc12/2011scc12.html'
        }
      ],
      
      remedySought: 'Declaration of discrimination; Systemic remedy to address discriminatory policy; Individual compensation; Order to develop inclusive policy with disabled community input'
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // HUMAN RIGHTS CLAIMS
  // ═══════════════════════════════════════════════════════════════════════
  
  const hrClaim = {
    jurisdiction: jurisdiction,
    applicableLaw: jurisdiction === 'Federal' ? 'Canadian Human Rights Act' : 
                   jurisdiction === 'Ontario' ? 'Ontario Human Rights Code' :
                   jurisdiction === 'BC' ? 'BC Human Rights Code' :
                   `${jurisdiction} Human Rights legislation`,
    groundsOfDiscrimination: ['disability'],
    socialAreas: [],
    complaint: {}
  };

  if (issue.category === 'workers') {
    hrClaim.socialAreas.push('employment');
    hrClaim.socialAreas.push('services');
    hrClaim.groundsOfDiscrimination.push('receipt of public assistance');
  }
  if (issue.category === 'housing') {
    hrClaim.socialAreas.push('housing');
  }

  hrClaim.complaint = {
    respondent: issue.target_entity?.name || 'To be determined',
    groundsOfDiscrimination: hrClaim.groundsOfDiscrimination.join(', '),
    allegedDiscrimination: `The respondent discriminated against the complainant on the basis of ${hrClaim.groundsOfDiscrimination.join(' and ')} by:

1. Failing to provide accommodation to the point of undue hardship
2. Applying policies that have adverse effects on persons with disabilities
3. Denying services/benefits in a manner that perpetuates disadvantage
4. [Specific facts to be added]`,
    remedySought: [
      'Monetary compensation for injury to dignity ($25,000-$75,000)',
      'Lost wages/benefits',
      'Systemic remedies to prevent future discrimination',
      'Order to develop and implement accommodation policy',
      'Training on human rights obligations'
    ],
    timeline: {
      limitation: jurisdiction === 'Federal' ? '1 year from incident' : '1 year from incident',
      tribunalUrl: jurisdiction === 'Ontario' ? 'https://tribunalsontario.ca/hrto/' :
                   jurisdiction === 'BC' ? 'https://www.bchrt.bc.ca/' :
                   jurisdiction === 'Federal' ? 'https://www.chrc-ccdp.gc.ca/' :
                   'Consult provincial human rights body'
    }
  };

  pkg.humanRightsClaims.push(hrClaim);

  // ═══════════════════════════════════════════════════════════════════════
  // EVIDENCE EXHIBITS
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.evidenceExhibits = [
    {
      exhibitNumber: 'A',
      description: 'Official government document/decision under challenge',
      source: issue.url || 'To be obtained',
      verified: issue.verified || false
    },
    {
      exhibitNumber: 'B',
      description: 'Statistical data showing adverse effects on disabled population',
      source: 'Statistics Canada / Government reports',
      suggestedData: [
        'Denial rates by disability type',
        'Average processing times',
        'Appeal success rates',
        'Income adequacy comparisons'
      ]
    },
    {
      exhibitNumber: 'C',
      description: 'Auditor General / Ombudsman reports',
      source: issue.source || 'See official reports',
      suggestedSources: [
        'https://www.auditor.on.ca/',
        'https://www.ombudsman.on.ca/',
        'https://www.oag-bvg.gc.ca/internet/English/admin_e_41.html'
      ]
    },
    {
      exhibitNumber: 'D',
      description: 'Medical / expert evidence of harm',
      requirements: [
        'Treating physician letter',
        'Specialist reports',
        'Psychological assessment if applicable',
        'Functional capacity evaluation'
      ]
    },
    {
      exhibitNumber: 'E',
      description: 'Financial impact documentation',
      requirements: [
        'Benefit statements showing amounts',
        'Living expense documentation',
        'Poverty line comparisons (StatCan MBM)',
        'Evidence of hardship caused'
      ]
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // JURISDICTIONAL CITATIONS
  // ═══════════════════════════════════════════════════════════════════════
  
  if (jurisdiction === 'Ontario' && issue.category === 'workers') {
    pkg.citations = [
      {
        legislation: 'Workplace Safety and Insurance Act, 1997',
        citation: 'S.O. 1997, c. 16, Sched. A',
        url: 'https://www.ontario.ca/laws/statute/97w16',
        relevantSections: [
          { section: 's. 119', description: 'Decisions to be made promptly' },
          { section: 's. 43', description: 'Loss of earnings benefits' },
          { section: 's. 118', description: 'Review and appeal rights' }
        ]
      },
      {
        legislation: 'Ontario Human Rights Code',
        citation: 'R.S.O. 1990, c. H.19',
        url: 'https://www.ontario.ca/laws/statute/90h19',
        relevantSections: [
          { section: 's. 1', description: 'Right to equal treatment in services' },
          { section: 's. 5', description: 'Right to equal treatment in employment' },
          { section: 's. 17', description: 'Duty to accommodate' }
        ]
      },
      {
        tribunal: 'Workplace Safety and Insurance Appeals Tribunal (WSIAT)',
        url: 'https://www.wsiat.on.ca/',
        appealProcess: [
          '1. Internal WSIB review/reconsideration',
          '2. Appeal to WSIAT within 6 months of final WSIB decision',
          '3. Judicial review to Divisional Court on questions of law'
        ]
      }
    ];
  }

  // ═══════════════════════════════════════════════════════════════════════
  // PROCEDURAL GUIDANCE
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.proceduralGuidance = {
    immediateSteps: [
      '1. Document all communications with the agency/employer',
      '2. Gather medical evidence supporting disability/limitations',
      '3. Request all files and records through FOI or access request',
      '4. Note all limitation periods for appeals/complaints',
      '5. Seek legal advice (Legal Aid Ontario, community legal clinics, pro bono)'
    ],
    legalResources: [
      { name: 'Legal Aid Ontario', url: 'https://www.legalaid.on.ca/', phone: '1-800-668-8258' },
      { name: 'Community Legal Clinics', url: 'https://www.legalaid.on.ca/legal-clinics/', description: 'Free legal services' },
      { name: 'ARCH Disability Law Centre', url: 'https://archdisabilitylaw.ca/', description: 'Disability rights specialists' },
      { name: 'Income Security Advocacy Centre', url: 'https://incomesecurity.org/', description: 'ODSP/OW expertise' },
      { name: 'Injured Workers Consultants', url: 'https://iwc.website/', description: 'WSIB expertise' }
    ],
    timelines: {
      wsibInternalReview: '30 days from decision',
      wsiatAppeal: '6 months from final WSIB decision',
      hrtoComplaint: '1 year from incident',
      judicialReview: '30 days from tribunal decision (varies)',
      chartChallenge: 'Consult counsel - complex timelines'
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // TEMPLATE DOCUMENTS
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.templates = [
    {
      name: 'HRTO Application Form',
      url: 'https://tribunalsontario.ca/hrto/forms/',
      description: 'Human Rights Tribunal of Ontario application'
    },
    {
      name: 'WSIAT Appeal Form',
      url: 'https://www.wsiat.on.ca/en/forms/index.htm',
      description: 'WSIB appeals tribunal forms'
    },
    {
      name: 'FOI Request Template',
      url: 'https://www.ontario.ca/page/how-make-freedom-information-request',
      description: 'Request your files from government agencies'
    }
  ];

  return pkg;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MEDIA & INVESTIGATIVE PACKAGE GENERATOR
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function generateMediaPackage(issue) {
  const pkg = {
    id: `media_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    type: 'MEDIA_INVESTIGATIVE_PACKAGE',
    
    // 1. HEADLINES
    headlines: [],
    
    // 2. KEY FINDINGS
    keyFindings: [],
    
    // 3. VERIFIED DATA
    verifiedData: [],
    
    // 4. OFFICIAL QUOTES
    officialQuotes: [],
    
    // 5. STORY ANGLES
    storyAngles: [],
    
    // 6. MEDIA CONTACTS
    mediaContacts: [],
    
    // 7. PRESS RELEASE TEMPLATE
    pressRelease: {}
  };

  // ═══════════════════════════════════════════════════════════════════════
  // HEADLINES
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.headlines = [
    {
      type: 'main',
      headline: issue.title,
      subheadline: `${issue.affected_count || 'Thousands'} affected by ${issue.target_entity?.name || 'government agency'}`
    },
    {
      type: 'impact',
      headline: `"${issue.affected_count}" Canadians Left Behind: The Real Cost of ${issue.target_entity?.name || 'Bureaucracy'}`
    },
    {
      type: 'accountability',
      headline: `Who's Responsible? Inside the System That ${/deny|denied/i.test(issue.evidence || '') ? 'Denies' : 'Fails'} Injured Workers`
    },
    {
      type: 'human_interest',
      headline: `Fighting for Justice: How Workers Are Challenging ${issue.target_entity?.name || 'The System'}`
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // KEY FINDINGS
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.keyFindings = [
    {
      finding: issue.evidence || issue.title,
      source: issue.source || 'Government records',
      verificationUrl: issue.url,
      significance: 'Demonstrates systemic failure affecting vulnerable Canadians'
    }
  ];

  if (issue.charter_violations) {
    pkg.keyFindings.push({
      finding: `Potential Charter violations identified: ${issue.charter_violations.join(', ')}`,
      source: 'Legal analysis',
      significance: 'Constitutional rights implications'
    });
  }

  if (issue.financial_impact) {
    pkg.keyFindings.push({
      finding: `Financial impact: ${issue.financial_impact}`,
      source: issue.source || 'Government data',
      significance: 'Quantifiable harm to affected population'
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // VERIFIED DATA
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.verifiedData = [
    {
      dataPoint: issue.affected_count || 'Data pending',
      description: 'Number of people affected',
      source: issue.source,
      url: issue.url,
      verified: issue.verified || false,
      verificationBadge: issue.verificationBadge || '📊 SOURCED'
    },
    {
      dataPoint: issue.financial_impact || 'Under investigation',
      description: 'Financial impact',
      source: issue.source,
      verified: issue.verified || false
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // STORY ANGLES
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.storyAngles = [
    {
      angle: 'Human Interest',
      description: 'Profile individual workers/families affected by this issue',
      suggestedApproach: 'Interview affected individuals, document their journey through the system'
    },
    {
      angle: 'Data Investigation',
      description: 'Statistical analysis of denial rates, processing times, outcomes',
      suggestedApproach: 'FOI requests for detailed data, compare across jurisdictions'
    },
    {
      angle: 'Accountability',
      description: 'Who makes these decisions and what are their incentives?',
      suggestedApproach: 'Board composition, executive compensation, lobbying connections'
    },
    {
      angle: 'Legal/Constitutional',
      description: 'Are these policies legal? Charter challenges and human rights complaints',
      suggestedApproach: 'Interview constitutional lawyers, review relevant case law'
    },
    {
      angle: 'Comparative',
      description: 'How do other provinces/countries handle this?',
      suggestedApproach: 'Compare policies, outcomes, and approaches across jurisdictions'
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // MEDIA CONTACTS
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.mediaContacts = [
    { outlet: 'CBC News', beat: 'Investigative', tipLine: 'https://www.cbc.ca/news/tips' },
    { outlet: 'Toronto Star', beat: 'Investigations', tipLine: 'https://www.thestar.com/about/tips.html' },
    { outlet: 'Globe and Mail', beat: 'Politics/Social Policy', tipLine: 'https://www.theglobeandmail.com/about/contact-us/' },
    { outlet: 'Global News', beat: 'National', tipLine: 'https://globalnews.ca/tip-line/' },
    { outlet: 'Press Progress', beat: 'Labour/Social Justice', url: 'https://pressprogress.ca/' },
    { outlet: 'The Tyee (BC)', beat: 'Investigative', url: 'https://thetyee.ca/' },
    { outlet: 'Canadaland', beat: 'Media/Accountability', url: 'https://www.canadaland.com/' }
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // PRESS RELEASE TEMPLATE
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.pressRelease = {
    headline: `FOR IMMEDIATE RELEASE: ${issue.title}`,
    subheadline: `New evidence reveals systemic issues affecting ${issue.affected_count || 'thousands of'} Canadians`,
    body: `[CITY, DATE] – ${issue.evidence || '[Summary of findings]'}

According to [SOURCE], ${issue.affected_count || 'a significant number of'} Canadians are affected by this issue.

"[QUOTE FROM AFFECTED PERSON OR ADVOCATE]"

KEY FACTS:
• [Fact 1]
• [Fact 2]
• [Fact 3]

This raises serious concerns about compliance with:
- Canadian Charter of Rights and Freedoms (${issue.charter_violations?.join(', ') || 'Sections 7 and 15'})
- UN Convention on the Rights of Persons with Disabilities
- Provincial Human Rights Codes

CALL TO ACTION:
[What you are calling for - investigation, policy change, etc.]

FOR MORE INFORMATION:
Contact: [Name]
Email: [Email]
Phone: [Phone]

SOURCE: ${issue.source || '[Organization name]'}
URL: ${issue.url || '[Website]'}`,
    
    instructions: 'Customize bracketed sections with specific information before distribution'
  };

  return pkg;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * UNCRPD SHADOW REPORT PACKAGE GENERATOR
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function generateUNCRPDShadowReportPackage(issues) {
  const pkg = {
    id: `uncrpd_shadow_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    type: 'UNCRPD_SHADOW_REPORT_PACKAGE',
    reportTitle: 'Shadow Report to the UN Committee on the Rights of Persons with Disabilities',
    reportingState: 'Canada',
    submittedBy: '[Organization/Coalition Name]',
    reportingPeriod: `${new Date().getFullYear() - 5} - ${new Date().getFullYear()}`,
    
    // Article-by-article analysis
    articleAnalysis: [],
    
    // Government failures
    governmentFailures: [],
    
    // Recommendations
    recommendations: [],
    
    // Evidence documentation
    evidenceDocumentation: [],
    
    // Submission guidance
    submissionGuidance: {}
  };

  // ═══════════════════════════════════════════════════════════════════════
  // ARTICLE-BY-ARTICLE ANALYSIS
  // ═══════════════════════════════════════════════════════════════════════
  
  const articles = [
    { num: 4, name: 'General Obligations', keywords: ['legislation', 'policy', 'law', 'government'] },
    { num: 5, name: 'Equality and Non-Discrimination', keywords: ['discrimination', 'equality', 'deny', 'barrier'] },
    { num: 9, name: 'Accessibility', keywords: ['accessibility', 'accessible', 'barrier', 'inaccessible'] },
    { num: 12, name: 'Equal Recognition Before the Law', keywords: ['capacity', 'guardian', 'decision'] },
    { num: 13, name: 'Access to Justice', keywords: ['justice', 'tribunal', 'court', 'legal', 'appeal'] },
    { num: 19, name: 'Living Independently', keywords: ['independent', 'community', 'institution'] },
    { num: 25, name: 'Health', keywords: ['health', 'medical', 'treatment', 'healthcare'] },
    { num: 26, name: 'Habilitation and Rehabilitation', keywords: ['rehabilitation', 'therapy', 'habilitation'] },
    { num: 27, name: 'Work and Employment', keywords: ['work', 'employment', 'job', 'worker', 'WSIB', 'WCB'] },
    { num: 28, name: 'Adequate Standard of Living', keywords: ['benefit', 'income', 'poverty', 'ODSP', 'support'] },
    { num: 33, name: 'National Implementation and Monitoring', keywords: ['monitoring', 'implementation', 'report'] }
  ];

  // Ensure issues is an array
  const issueArray = Array.isArray(issues) ? issues : [issues];

  articles.forEach(article => {
    const relatedIssues = issueArray.filter(issue => {
      const text = `${issue.title || ''} ${issue.evidence || ''} ${issue.category || ''}`.toLowerCase();
      return article.keywords.some(kw => text.includes(kw.toLowerCase()));
    });

    if (relatedIssues.length > 0) {
      pkg.articleAnalysis.push({
        article: `Article ${article.num}`,
        name: article.name,
        complianceStatus: 'NON-COMPLIANT',
        issues: relatedIssues.map(issue => ({
          title: issue.title,
          description: issue.evidence || issue.title,
          source: issue.source,
          url: issue.url,
          affectedPopulation: issue.affected_count
        })),
        governmentPosition: 'Canada has not adequately addressed these concerns',
        evidence: relatedIssues.map(i => i.url).filter(Boolean),
        recommendation: `The Committee should urge Canada to address ${article.name.toLowerCase()} by implementing concrete measures to remedy identified violations.`
      });
    }
  });

  // ═══════════════════════════════════════════════════════════════════════
  // GOVERNMENT FAILURES
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.governmentFailures = [
    {
      area: 'Income Adequacy',
      failure: 'Provincial disability benefits (ODSP, AISH, etc.) remain far below poverty line',
      evidence: 'ODSP maximum $1,308/month vs $2,500+ poverty line = 48% of minimum needed',
      uncrpdViolation: 'Article 28 - Adequate Standard of Living',
      recommendation: 'Immediately increase disability benefits to poverty line minimum'
    },
    {
      area: 'Workers\' Compensation',
      failure: 'Systematic denial of mental health claims; deeming based on fictional jobs',
      evidence: '67% mental health claim denial rate (Ontario Ombudsman 2023)',
      uncrpdViolation: 'Articles 25, 27, 28',
      recommendation: 'Reform workers\' compensation to remove discriminatory barriers'
    },
    {
      area: 'Access to Justice',
      failure: 'Appeals backlogs exceeding 18 months; unequal resources in hearings',
      evidence: '35,000+ cases in WSIAT backlog (2024)',
      uncrpdViolation: 'Article 13 - Access to Justice',
      recommendation: 'Fund tribunals adequately; provide legal representation'
    },
    {
      area: 'Accessibility',
      failure: 'Accessible Canada Act implementation delayed; provincial standards weak',
      evidence: 'Only 27% of federally regulated entities fully compliant',
      uncrpdViolation: 'Article 9 - Accessibility',
      recommendation: 'Accelerate implementation; strengthen enforcement'
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // RECOMMENDATIONS TO THE COMMITTEE
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.recommendations = [
    {
      priority: 'URGENT',
      recommendation: 'Call on Canada to immediately raise disability income support to poverty line minimum',
      relevantArticles: ['Article 28']
    },
    {
      priority: 'URGENT',
      recommendation: 'Urge Canada to reform workers\' compensation systems to eliminate discriminatory denial patterns',
      relevantArticles: ['Articles 25, 27, 28']
    },
    {
      priority: 'HIGH',
      recommendation: 'Request Canada report on measures to ensure access to justice for persons with disabilities',
      relevantArticles: ['Article 13']
    },
    {
      priority: 'HIGH',
      recommendation: 'Urge Canada to consult with disabled persons\' organizations in all policy development',
      relevantArticles: ['Articles 4, 33']
    },
    {
      priority: 'ONGOING',
      recommendation: 'Recommend establishment of independent monitoring with adequate resources',
      relevantArticles: ['Article 33']
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // SUBMISSION GUIDANCE
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.submissionGuidance = {
    submissionTo: 'UN Committee on the Rights of Persons with Disabilities',
    url: 'https://www.ohchr.org/en/treaty-bodies/crpd',
    canadaReviewCycle: 'Check OHCHR for Canada\'s next periodic review date',
    formatRequirements: [
      'Maximum 10,000 words for main report',
      'Annexes with supporting evidence permitted',
      'Submit in accessible formats',
      'Include executive summary'
    ],
    supportOrganizations: [
      { name: 'DAWN Canada (DisAbled Women\'s Network)', url: 'https://www.dawncanada.net/' },
      { name: 'Council of Canadians with Disabilities', url: 'http://www.ccdonline.ca/' },
      { name: 'ARCH Disability Law Centre', url: 'https://archdisabilitylaw.ca/' },
      { name: 'Canadian Association for Community Living', url: 'https://cacl.ca/' }
    ]
  };

  return pkg;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PUBLIC ACCOUNTABILITY PACKAGE GENERATOR
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function generatePublicAccountabilityPackage(issue, targets = null) {
  const pkg = {
    id: `accountability_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    type: 'PUBLIC_ACCOUNTABILITY_PACKAGE',
    
    // 1. TARGET PROFILE
    targetProfile: {},
    
    // 2. PLAIN LANGUAGE SUMMARY
    plainLanguageSummary: '',
    
    // 3. KEY FACTS (Shareable)
    keyFacts: [],
    
    // 4. SOCIAL MEDIA CONTENT
    socialMediaContent: [],
    
    // 5. ACTION ITEMS FOR PUBLIC
    publicActions: [],
    
    // 6. CONTACT INFORMATION
    contacts: [],
    
    // 7. INFOGRAPHIC DATA
    infographicData: {}
  };

  // ═══════════════════════════════════════════════════════════════════════
  // TARGET PROFILE
  // ═══════════════════════════════════════════════════════════════════════
  
  const target = issue.target_entity || {};
  pkg.targetProfile = {
    name: target.name || 'Government Agency',
    type: target.type || 'government',
    jurisdiction: target.jurisdiction || 'Provincial',
    head: target.head || 'See government website',
    budget: target.budget || 'Public funds',
    website: target.url || '',
    responsibilities: target.responsibilities || ['Administering public programs'],
    documentedIssues: [
      {
        issue: issue.title,
        evidence: issue.evidence,
        source: issue.source,
        url: issue.url,
        affectedCount: issue.affected_count
      }
    ]
  };

  // ═══════════════════════════════════════════════════════════════════════
  // PLAIN LANGUAGE SUMMARY
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.plainLanguageSummary = `
## What's Happening?

${issue.title}

## Who's Affected?

${issue.affected_count || 'Many Canadians'} are affected by this issue.

## What's the Evidence?

${issue.evidence || 'See source documents'}

Source: ${issue.source || 'Government records'}
${issue.url ? `Link: ${issue.url}` : ''}

## Why Does This Matter?

This issue raises concerns about:
${issue.charter_violations ? `- Constitutional rights: ${issue.charter_violations.join(', ')}` : '- Potential rights violations'}
- Canada's obligations under the UN Convention on the Rights of Persons with Disabilities
- Basic fairness and dignity for vulnerable Canadians

## What Can You Do?

1. Share this information with others
2. Contact your elected representatives
3. Support advocacy organizations
4. File complaints if you're affected
`.trim();

  // ═══════════════════════════════════════════════════════════════════════
  // KEY FACTS (Shareable)
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.keyFacts = [
    { fact: issue.title, source: issue.source },
    { fact: `${issue.affected_count || 'Many'} Canadians affected`, source: issue.source },
    { fact: `Financial impact: ${issue.financial_impact || 'Under investigation'}`, source: 'Government data' }
  ];

  if (issue.charter_violations) {
    pkg.keyFacts.push({
      fact: `Potential Charter violations: ${issue.charter_violations.join(', ')}`,
      source: 'Legal analysis'
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SOCIAL MEDIA CONTENT
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.socialMediaContent = [
    {
      platform: 'Twitter/X',
      character_limit: 280,
      posts: [
        `🚨 ${issue.title}\n\n${issue.affected_count || 'Thousands'} affected.\n\nThis is a human rights issue.\n\n#DisabilityRights #WorkersRights #cdnpoli`,
        `DID YOU KNOW? ${issue.evidence?.substring(0, 150) || issue.title}\n\nSource: ${issue.source || 'Government data'}\n\n#InjuredWorkers #WSIB #cdnpoli`,
        `${target.name || 'The government'} must answer for this:\n\n📊 ${issue.affected_count || 'Many'} people affected\n💰 ${issue.financial_impact || 'Millions'} in impact\n\nWe demand accountability. 👁️\n\n#TheEyeSees #Justice`
      ]
    },
    {
      platform: 'Facebook/LinkedIn',
      posts: [
        `⚠️ IMPORTANT: ${issue.title}\n\n${issue.evidence || 'See our full report.'}\n\nThis affects ${issue.affected_count || 'many'} Canadians.\n\nSource: ${issue.source}\nLearn more: ${issue.url || '[link]'}\n\nShare to raise awareness. Together we can create change.`
      ]
    },
    {
      platform: 'Instagram',
      posts: [
        `👁️ THE EYE SEES 👁️\n\n${issue.title}\n\n${issue.affected_count || 'Many'} Canadians affected\n\nSwipe for the full story →\n\n#DisabilityJustice #WorkersRights #SystemChange #Accountability`
      ],
      suggestedVisuals: [
        'Infographic with key statistics',
        'Quote cards from affected individuals',
        'Comparison charts (benefits vs poverty line)',
        'Map showing affected regions'
      ]
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // PUBLIC ACTIONS
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.publicActions = [
    {
      action: 'Contact Your MP/MPP',
      description: 'Call or write to your elected representative',
      howTo: 'Find your MP at ourcommons.ca, your MPP at ola.org',
      template: `Dear [Representative],

I am writing to express concern about ${issue.title}.

${issue.evidence || '[Describe the issue]'}

This affects ${issue.affected_count || 'many'} Canadians and raises serious questions about constitutional rights and Canada's international obligations.

I urge you to:
1. Raise this issue in Parliament/Legislature
2. Demand accountability from responsible agencies
3. Support reforms to address these systemic problems

Sincerely,
[Your Name]
[Your Address]`
    },
    {
      action: 'File a Complaint',
      description: 'If you\'re affected, file formal complaints',
      options: [
        { body: 'Ontario Ombudsman', url: 'https://www.ombudsman.on.ca/' },
        { body: 'Human Rights Tribunal', url: 'https://tribunalsontario.ca/hrto/' },
        { body: 'Auditor General', url: 'https://www.auditor.on.ca/' }
      ]
    },
    {
      action: 'Share on Social Media',
      description: 'Help spread awareness',
      howTo: 'Use the prepared content above, or share in your own words'
    },
    {
      action: 'Support Advocacy Organizations',
      description: 'Join or donate to groups fighting for change',
      organizations: [
        { name: 'Ontario Network of Injured Workers Groups', url: 'https://injuredworkersonline.org/' },
        { name: 'ARCH Disability Law Centre', url: 'https://archdisabilitylaw.ca/' },
        { name: 'Income Security Advocacy Centre', url: 'https://incomesecurity.org/' }
      ]
    },
    {
      action: 'Attend Public Hearings',
      description: 'Participate in legislative committees and consultations',
      howTo: 'Monitor Parliament (parl.ca) and provincial legislatures for relevant hearings'
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // CONTACT INFORMATION
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.contacts = [
    {
      type: 'Elected Representatives',
      contacts: [
        { title: 'Find Your MP', url: 'https://www.ourcommons.ca/members/en' },
        { title: 'Find Your MPP (Ontario)', url: 'https://www.ola.org/en/members' },
        { title: 'Find Your MLA (BC)', url: 'https://www.leg.bc.ca/learn-about-us/members' }
      ]
    },
    {
      type: 'Oversight Bodies',
      contacts: [
        { title: 'Ontario Ombudsman', phone: '1-800-263-1830', url: 'https://www.ombudsman.on.ca/' },
        { title: 'Auditor General of Ontario', url: 'https://www.auditor.on.ca/' },
        { title: 'Canadian Human Rights Commission', phone: '1-888-214-1090', url: 'https://www.chrc-ccdp.gc.ca/' }
      ]
    },
    {
      type: 'Media',
      contacts: [
        { title: 'CBC News Tip Line', url: 'https://www.cbc.ca/news/tips' },
        { title: 'Toronto Star Tips', url: 'https://www.thestar.com/about/tips.html' }
      ]
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // INFOGRAPHIC DATA
  // ═══════════════════════════════════════════════════════════════════════
  
  pkg.infographicData = {
    title: issue.title,
    mainStat: issue.affected_count || 'Thousands',
    secondaryStat: issue.financial_impact || 'Millions $',
    keyPoints: [
      issue.evidence?.substring(0, 100) || 'Key finding here',
      `Source: ${issue.source || 'Government data'}`,
      issue.charter_violations ? `Rights at risk: ${issue.charter_violations[0]}` : 'Constitutional concerns'
    ],
    callToAction: 'Share this. Demand change.',
    source: issue.source,
    url: issue.url,
    branding: '👁️ THE EYE ORACLE'
  };

  return pkg;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MASTER PACKAGE GENERATOR - Generates all packages at once
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function generateAllJusticePackages(issue, jurisdiction = 'Ontario') {
  return {
    generatedAt: new Date().toISOString(),
    issue: issue.title,
    jurisdiction,
    packages: {
      legal: generateLegalChallengePackage(issue, jurisdiction),
      media: generateMediaPackage(issue),
      uncrpd: generateUNCRPDShadowReportPackage([issue]),
      public: generatePublicAccountabilityPackage(issue)
    }
  };
}

export default {
  generateLegalChallengePackage,
  generateMediaPackage,
  generateUNCRPDShadowReportPackage,
  generatePublicAccountabilityPackage,
  generateAllJusticePackages
};
