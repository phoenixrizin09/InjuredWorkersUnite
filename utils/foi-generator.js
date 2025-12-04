/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FOI REQUEST GENERATOR
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Generates REAL Freedom of Information (FOI) requests for:
 * - Federal: Access to Information Act (ATIA)
 * - Ontario: Freedom of Information and Protection of Privacy Act (FIPPA)
 * - Municipal: Municipal Freedom of Information and Protection of Privacy Act
 * 
 * Features:
 * - Pre-written templates for common requests
 * - Automatic form generation
 * - Tracking of submissions
 * - Response deadline calculation (30 days federal, 30 days Ontario)
 * 
 * Official Portals:
 * - Federal: https://atip-aiprp.tbs-sct.gc.ca/
 * - Ontario: https://www.ontario.ca/page/how-make-freedom-information-request
 * ═══════════════════════════════════════════════════════════════════════════
 */

// FOI Request Categories
export const FOI_CATEGORIES = {
  WSIB: {
    name: 'Workplace Safety and Insurance Board',
    jurisdiction: 'Ontario',
    act: 'FIPPA',
    coordinator: 'WSIB Access & Privacy Office',
    address: '200 Front Street West, Toronto, ON M5V 3J1',
    email: 'accessandprivacy@wsib.on.ca',
    fee: '$5.00',
    timeline: '30 days (can be extended)',
    portalUrl: 'https://www.wsib.ca/en/access-and-privacy',
    templates: [
      'claim_denial_statistics',
      'adjudicator_training_materials',
      'private_contractor_contracts',
      'appeals_success_rates',
      'executive_compensation'
    ]
  },
  ODSP: {
    name: 'Ontario Disability Support Program / Ministry of Children, Community and Social Services',
    jurisdiction: 'Ontario',
    act: 'FIPPA',
    coordinator: 'MCCSS Freedom of Information Office',
    address: '56 Wellesley Street West, Toronto, ON M5S 2S3',
    email: 'foi@ontario.ca',
    fee: '$5.00',
    timeline: '30 days',
    portalUrl: 'https://www.ontario.ca/page/freedom-information-and-protection-privacy-act',
    templates: [
      'denial_rates_by_condition',
      'adjudication_process_documents',
      'policy_change_briefings',
      'caseload_statistics',
      'appeals_outcomes'
    ]
  },
  FEDERAL: {
    name: 'Federal Government (Various Departments)',
    jurisdiction: 'Federal',
    act: 'Access to Information Act',
    portalUrl: 'https://atip-aiprp.tbs-sct.gc.ca/',
    fee: '$5.00',
    timeline: '30 days (frequently extended)',
    departments: [
      { name: 'Employment and Social Development Canada', code: 'ESDC', focus: 'CPP-D, EI' },
      { name: 'Veterans Affairs Canada', code: 'VAC', focus: 'Veterans benefits' },
      { name: 'Indigenous Services Canada', code: 'ISC', focus: 'First Nations services' },
      { name: 'Canada Revenue Agency', code: 'CRA', focus: 'Tax policy, corporate audits' },
      { name: 'Health Canada', code: 'HC', focus: 'Drug approvals, health policy' }
    ],
    templates: [
      'cpp_disability_denials',
      'ei_sickness_benefits_stats',
      'lobbying_meeting_records',
      'policy_briefing_notes',
      'ministerial_correspondence'
    ]
  }
};

// Pre-written FOI request templates
export const FOI_TEMPLATES = {
  // WSIB Templates
  claim_denial_statistics: {
    title: 'WSIB Claim Denial Statistics by Condition Type',
    category: 'WSIB',
    urgency: 'high',
    description: 'Request for statistics on claim denials broken down by injury/condition type',
    template: `
FREEDOM OF INFORMATION REQUEST

Pursuant to the Freedom of Information and Protection of Privacy Act (FIPPA), I am requesting access to the following records:

1. Total number of claims received, by year, from 2019 to present
2. Total number of claims denied on initial application, by year, from 2019 to present
3. Breakdown of denied claims by:
   a) Primary condition type (physical injury, occupational disease, mental health/psychological)
   b) Industry sector
   c) Denial reason category
4. Number of denied claims that were subsequently approved on appeal
5. Average time from claim submission to initial decision
6. Average time from appeal submission to appeal decision

I request this information in electronic format (Excel/CSV preferred).

I am requesting a fee waiver as this information is in the public interest and will be used for advocacy purposes to improve outcomes for injured workers.

If the fee waiver is denied, please notify me before processing if fees will exceed $25.00.

Thank you for your attention to this request.
`,
    expectedDocuments: [
      'Statistical reports',
      'Annual claim summaries',
      'Denial reason coding sheets'
    ],
    estimatedPages: '20-50',
    strategicValue: 'CRITICAL - Proves systemic denial patterns'
  },
  
  adjudicator_training_materials: {
    title: 'WSIB Adjudicator Training and Policy Materials',
    category: 'WSIB',
    urgency: 'high',
    description: 'Request for training materials provided to claims adjudicators',
    template: `
FREEDOM OF INFORMATION REQUEST

Pursuant to FIPPA, I am requesting access to the following records:

1. All training materials provided to new WSIB claims adjudicators, including:
   a) Training manuals
   b) Decision-making guidelines
   c) Policy interpretation guides
   d) Case studies used in training

2. Any materials provided by third-party contractors related to claims adjudication

3. Internal memos or bulletins issued to adjudicators regarding:
   a) Changes to approval/denial criteria
   b) "Best practices" for claim assessment
   c) Performance metrics or quotas

4. Names and contract values for any private companies providing adjudication training or consulting services

I request electronic copies where available.

Fee waiver requested for public interest advocacy purposes.
`,
    expectedDocuments: [
      'Training manuals',
      'Policy guidebooks',
      'Contractor agreements'
    ],
    estimatedPages: '100-300',
    strategicValue: 'CRITICAL - May reveal denial quotas or biased training'
  },
  
  private_contractor_contracts: {
    title: 'WSIB Private Contractor Agreements',
    category: 'WSIB',
    urgency: 'critical',
    description: 'Request for all contracts with private companies for claims services',
    template: `
FREEDOM OF INFORMATION REQUEST

Pursuant to FIPPA, I am requesting access to the following records:

1. All contracts, agreements, and statements of work between WSIB and private companies providing:
   a) Claims adjudication services
   b) Medical assessment services (IME providers)
   c) Return-to-work program services
   d) Investigation/surveillance services
   e) Technology/AI systems for claims processing

2. For each contract:
   a) Company name and contact information
   b) Contract value (total and annual)
   c) Scope of services
   d) Performance metrics and targets
   e) Any bonus or incentive structures

3. RFP documents for any contracts awarded in the past 5 years

4. Any internal evaluations of contractor performance

I am seeking a fee waiver for public interest purposes.
`,
    expectedDocuments: [
      'Service contracts',
      'Statements of work',
      'RFP documents',
      'Performance evaluations'
    ],
    estimatedPages: '200-500',
    strategicValue: 'EXPLOSIVE - May reveal conflicts of interest'
  },
  
  // ODSP Templates
  denial_rates_by_condition: {
    title: 'ODSP Application Denial Rates by Disability Type',
    category: 'ODSP',
    urgency: 'high',
    description: 'Request for ODSP denial statistics by disability category',
    template: `
FREEDOM OF INFORMATION REQUEST

Pursuant to FIPPA, I am requesting access to the following records from the Ministry of Children, Community and Social Services:

1. Total ODSP applications received, by fiscal year, from 2019-20 to present

2. Total applications denied at initial determination, by fiscal year

3. Breakdown of denied applications by:
   a) Primary disability category (physical, mental health, developmental, sensory, etc.)
   b) Reason for denial (not severe enough, not prolonged, documentation issues, etc.)
   c) Applicant age group and gender

4. Number of denials subsequently overturned at:
   a) Internal review
   b) Social Benefits Tribunal appeal

5. Average wait time from application to initial determination

6. Any internal reports analyzing denial trends or identifying systemic issues

I request this information in electronic format (Excel/CSV).

Fee waiver requested - information is for public interest disability rights advocacy.
`,
    expectedDocuments: [
      'Application statistics',
      'Denial reason reports',
      'Appeals outcome data'
    ],
    estimatedPages: '30-80',
    strategicValue: 'HIGH - Exposes discriminatory patterns'
  },
  
  // Federal Templates
  cpp_disability_denials: {
    title: 'CPP Disability Benefit Denial Statistics',
    category: 'FEDERAL',
    department: 'ESDC',
    urgency: 'high',
    description: 'Request for CPP-D application and denial statistics',
    template: `
ACCESS TO INFORMATION REQUEST

Pursuant to the Access to Information Act, I am requesting access to the following records from Employment and Social Development Canada:

1. Total CPP Disability applications received, by calendar year, from 2019 to present

2. Total applications denied at initial application stage, by year

3. Breakdown of denied applications by:
   a) Primary medical condition category
   b) Reason for denial
   c) Applicant province of residence
   d) Applicant age and gender

4. Number of denied applications subsequently approved at:
   a) Request for reconsideration
   b) Social Security Tribunal - General Division
   c) Social Security Tribunal - Appeal Division

5. Average processing time from application to initial decision

6. Any internal audits or reports regarding denial rates or processing delays

I request this information in electronic format (Excel preferred).

I am requesting a fee waiver under section 11(6) of the Access to Information Act as this request is in the public interest.
`,
    expectedDocuments: [
      'Statistical reports',
      'Audit findings',
      'Processing time analyses'
    ],
    estimatedPages: '40-100',
    strategicValue: 'CRITICAL - Federal disability denial evidence'
  },
  
  lobbying_meeting_records: {
    title: 'Lobbying Activity and Ministerial Meeting Records',
    category: 'FEDERAL',
    department: 'Various',
    urgency: 'critical',
    description: 'Request for records of meetings between officials and insurance/corporate lobbyists',
    template: `
ACCESS TO INFORMATION REQUEST

Pursuant to the Access to Information Act, I am requesting access to the following records:

1. All meeting records, briefing notes, and correspondence between [DEPARTMENT] officials and representatives or lobbyists from:
   a) Manulife Financial
   b) Sun Life Financial
   c) Great-West Lifeco / Canada Life
   d) Insurance Bureau of Canada
   e) Canadian Life and Health Insurance Association

2. For each meeting, I request:
   a) Date, time, and location
   b) Names and titles of all attendees
   c) Agenda and discussion topics
   d) Any briefing notes prepared for officials
   e) Any follow-up correspondence or action items

3. Time period: January 2020 to present

4. This request includes:
   a) Ministerial meetings
   b) Deputy Minister meetings
   c) Assistant Deputy Minister meetings
   d) Director and Director General level meetings

I request electronic copies of all responsive records.

Fee waiver requested under public interest provisions.
`,
    expectedDocuments: [
      'Meeting calendars',
      'Briefing notes',
      'Correspondence',
      'Lobbyist registration cross-reference'
    ],
    estimatedPages: '100-500',
    strategicValue: 'EXPLOSIVE - Corporate influence on policy'
  }
};

/**
 * Generate a complete FOI request ready for submission
 */
export function generateFOIRequest(templateId, options = {}) {
  const template = FOI_TEMPLATES[templateId];
  
  if (!template) {
    return { success: false, error: 'Template not found' };
  }
  
  const category = FOI_CATEGORIES[template.category];
  const {
    requesterName = '[YOUR NAME]',
    requesterAddress = '[YOUR ADDRESS]',
    requesterEmail = '[YOUR EMAIL]',
    requesterPhone = '[YOUR PHONE]',
    customizations = {}
  } = options;
  
  const today = new Date();
  const deadlineDate = new Date(today);
  deadlineDate.setDate(deadlineDate.getDate() + 30);
  
  const completeRequest = {
    id: `FOI_${templateId}_${Date.now()}`,
    templateId,
    title: template.title,
    category: template.category,
    jurisdiction: category.jurisdiction,
    act: category.act,
    urgency: template.urgency,
    strategicValue: template.strategicValue,
    
    // Submission Details
    submissionTarget: {
      organization: category.name,
      address: category.address || 'See online portal',
      email: category.email,
      portal: category.portalUrl,
      fee: category.fee
    },
    
    // Requester Info (to be filled)
    requester: {
      name: requesterName,
      address: requesterAddress,
      email: requesterEmail,
      phone: requesterPhone
    },
    
    // Request Content
    requestBody: template.template.trim(),
    
    // Timeline
    timeline: {
      dateGenerated: today.toISOString(),
      submissionDeadline: 'Submit as soon as possible',
      expectedResponseDate: deadlineDate.toISOString(),
      statutoryTimeline: category.timeline
    },
    
    // Expected Outcomes
    expectedDocuments: template.expectedDocuments,
    estimatedPages: template.estimatedPages,
    
    // Instructions
    instructions: generateSubmissionInstructions(category, template),
    
    // Tracking
    status: 'generated',
    verified: true
  };
  
  return {
    success: true,
    request: completeRequest
  };
}

/**
 * Generate submission instructions
 */
function generateSubmissionInstructions(category, template) {
  return `
═══════════════════════════════════════════════════════════════
HOW TO SUBMIT THIS FOI REQUEST
═══════════════════════════════════════════════════════════════

1. PREPARE YOUR REQUEST
   - Fill in your personal details where indicated [YOUR NAME], etc.
   - Review the request text and customize if needed
   - Print or save an electronic copy for your records

2. SUBMISSION OPTIONS

   ${category.jurisdiction === 'Ontario' ? `
   ONLINE (Recommended):
   Visit: ${category.portalUrl}
   - Create an account or log in
   - Submit request electronically
   - Pay $5 fee by credit card
   
   BY MAIL:
   Address to: ${category.coordinator}
   ${category.address}
   - Include cheque or money order for $5 payable to "Minister of Finance"
   ` : `
   ONLINE (Recommended):
   Visit: ${category.portalUrl}
   - Use the ATIP Online Request Service
   - Pay $5 fee electronically
   
   BY MAIL:
   Address to the Access to Information Coordinator
   at the specific department
   - Include cheque for $5 payable to "Receiver General for Canada"
   `}

3. AFTER SUBMISSION
   - Note your file/reference number
   - Mark your calendar for 30 days (response deadline)
   - If extended, you will receive notice
   - If denied or heavily redacted, you can appeal

4. TRACK YOUR REQUEST
   - Keep all correspondence
   - Note any fees quoted
   - Request fee waiver if fees exceed $25

5. IF DENIED OR DELAYED
   ${category.jurisdiction === 'Ontario' ? `
   - Appeal to Information and Privacy Commissioner of Ontario
   - Website: https://www.ipc.on.ca/
   - Phone: 1-800-387-0073
   ` : `
   - Complaint to Office of the Information Commissioner of Canada
   - Website: https://www.oic-ci.gc.ca/
   - Phone: 1-800-267-0441
   `}

═══════════════════════════════════════════════════════════════
ESTIMATED TIMELINE: ${template.estimatedPages} pages
STRATEGIC VALUE: ${template.strategicValue}
═══════════════════════════════════════════════════════════════
`;
}

/**
 * Get all available templates for a category
 */
export function getTemplatesForCategory(category) {
  return Object.entries(FOI_TEMPLATES)
    .filter(([_, template]) => template.category === category)
    .map(([id, template]) => ({
      id,
      title: template.title,
      description: template.description,
      urgency: template.urgency,
      strategicValue: template.strategicValue
    }));
}

/**
 * Generate a batch of related FOI requests (coordinated campaign)
 */
export function generateFOIBlitz(targetEntity, options = {}) {
  const blitzTemplates = [];
  
  // Determine relevant templates based on target
  if (targetEntity.toLowerCase().includes('wsib')) {
    blitzTemplates.push('claim_denial_statistics', 'adjudicator_training_materials', 'private_contractor_contracts');
  } else if (targetEntity.toLowerCase().includes('odsp')) {
    blitzTemplates.push('denial_rates_by_condition');
  } else if (targetEntity.toLowerCase().includes('manulife') || targetEntity.toLowerCase().includes('insurance')) {
    blitzTemplates.push('lobbying_meeting_records');
  } else {
    // Default federal targets
    blitzTemplates.push('cpp_disability_denials', 'lobbying_meeting_records');
  }
  
  const requests = blitzTemplates.map(templateId => generateFOIRequest(templateId, options));
  
  return {
    success: true,
    target: targetEntity,
    campaignName: `FOI Blitz: ${targetEntity}`,
    totalRequests: requests.length,
    requests: requests.filter(r => r.success).map(r => r.request),
    totalEstimatedPages: requests.reduce((sum, r) => {
      if (!r.success) return sum;
      const match = r.request.estimatedPages.match(/\d+/);
      return sum + (match ? parseInt(match[0]) : 0);
    }, 0),
    instructions: `
═══════════════════════════════════════════════════════════════
FOI BLITZ CAMPAIGN: ${targetEntity}
═══════════════════════════════════════════════════════════════

This coordinated FOI campaign includes ${requests.length} strategic requests
designed to expose systemic issues and gather evidence.

RECOMMENDED APPROACH:
1. Submit all requests within the same week
2. Track all reference numbers in one document  
3. Set reminders for 30-day deadlines
4. If any request is denied, immediately file others
5. Share redacted responses publicly when received

This creates an "Evidence Avalanche" - system overwhelm through
strategic information warfare.
═══════════════════════════════════════════════════════════════
`,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Track FOI request status
 */
export const FOI_STATUS = {
  GENERATED: 'generated',
  SUBMITTED: 'submitted',
  ACKNOWLEDGED: 'acknowledged',
  PROCESSING: 'processing',
  EXTENDED: 'extended',
  PARTIAL_RESPONSE: 'partial_response',
  COMPLETE: 'complete',
  DENIED: 'denied',
  APPEALING: 'appealing'
};

export default {
  FOI_CATEGORIES,
  FOI_TEMPLATES,
  FOI_STATUS,
  generateFOIRequest,
  getTemplatesForCategory,
  generateFOIBlitz
};
