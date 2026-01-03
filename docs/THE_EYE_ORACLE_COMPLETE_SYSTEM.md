# 👁️ THE EYE ORACLE - Complete System Documentation

## SYSTEM STATUS: ✅ COMPLETE - ALL LEVELS COVERED

**REAL DATA ONLY** - NO DEMO DATA, NO PLACEHOLDER DATA

---

## 📊 Jurisdiction Coverage

### 🍁 FEDERAL (Canada-Wide)
- **API**: Open Canada CKAN (`https://open.canada.ca/data/api/3/action/package_search`)
- **Data Types**: Disability programs, workers' rights, employment insurance, pensions
- **Verification Badge**: `✓ VERIFIED - open.canada.ca`

### 🏛️ PROVINCIAL (Ontario, BC, Alberta)

#### Ontario
- **API**: Ontario Open Data (`https://data.ontario.ca/api/3/action/package_search`)
- **Data Types**: WSIB, ODSP, disability services, workplace safety
- **Verification Badge**: `✓ VERIFIED - data.ontario.ca`

#### British Columbia
- **API**: BC Open Data (`https://catalogue.data.gov.bc.ca/api/3/action/package_search`)
- **Data Types**: WorkSafeBC, disability, workers, employment
- **Verification Badge**: `✓ VERIFIED - catalogue.data.gov.bc.ca`

#### Alberta
- **API**: Alberta Open Data (`https://open.alberta.ca/api/3/action/package_search`)
- **Data Types**: WCB, disability, workers, employment
- **Verification Badge**: `✓ VERIFIED - open.alberta.ca`

### 🏙️ MUNICIPAL (Toronto, Ottawa, Vancouver)

#### Toronto
- **API**: Toronto Open Data (`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_search`)
- **Data Types**: Accessibility, shelter, housing, transit, health
- **Verification Badge**: `✓ VERIFIED - toronto open data`

#### Ottawa
- **API**: Ottawa Open Data (`https://open.ottawa.ca/api/3/action/package_search`)
- **Data Types**: Accessibility, housing, transit, social services
- **Verification Badge**: `✓ VERIFIED - ottawa open data`

#### Vancouver
- **API**: Vancouver Open Data (`https://opendata.vancouver.ca/api/3/action/package_search`)
- **Data Types**: Housing, homelessness, health, accessibility
- **Verification Badge**: `✓ VERIFIED - vancouver open data`

### 📜 LEGISLATION
- **API**: Parliament LEGISinfo (`https://www.parl.ca/legisinfo/en/bills/json`)
- **Data Types**: Bills related to workers, disability, health, pensions, benefits
- **Verification Badge**: `✓ VERIFIED - parl.ca`

---

## ⚖️ Legal Framework Analysis Engine

The system analyzes documents against these legal frameworks:

### Canadian Charter of Rights and Freedoms
- **Section 2**: Fundamental Freedoms
- **Section 7**: Life, Liberty and Security of Person
- **Section 12**: Treatment or Punishment
- **Section 15**: Equality Rights

### Constitution Acts
- **Section 35**: Indigenous Rights

### Human Rights Legislation
- **CHRA**: Canadian Human Rights Act
- **Bill C-81**: Accessible Canada Act
- **Provincial Human Rights Codes**

### UNCRPD (UN Convention on Rights of Persons with Disabilities)
- **Article 5**: Equality and non-discrimination
- **Article 12**: Equal recognition before the law
- **Article 13**: Access to justice
- **Article 19**: Living independently
- **Article 25**: Health
- **Article 26**: Habilitation and rehabilitation
- **Article 27**: Work and employment
- **Article 28**: Adequate standard of living

---

## 📰 Official RSS Feeds

### Federal
- Government of Canada News
- Federal Auditor General Reports

### Provincial
- Ontario Auditor General Reports
- WSIB News

### Municipal
- City of Toronto News

---

## 🔧 File Structure

```
utils/
├── real-data-connectors.js     # Real government API connections
│   ├── fetchFederalData()      # Open Canada API
│   ├── fetchOntarioData()      # Ontario Open Data API
│   ├── fetchBCData()           # BC Open Data API
│   ├── fetchAlbertaData()      # Alberta Open Data API
│   ├── fetchMunicipalData()    # City APIs (TO/OTT/VAN)
│   ├── fetchLegislation()      # Parliament LEGISinfo
│   ├── fetchAllRSSFeeds()      # Official news sources
│   ├── fetchAllRealData()      # Combined fetch
│   ├── convertToInsights()     # Transform to display format
│   ├── getCachedRealData()     # Cache management
│   └── getRealInsights()       # Get processed insights
│
└── the-eye-v2-processor.js     # Analysis engine
    ├── analyzeDocument()       # Main analysis function
    ├── analyzeConstitutionalCompliance()
    ├── analyzeHumanRights()
    ├── analyzeUNCRPD()
    ├── detectCorruption()
    └── escapeRegExp()          # Bug fix utility

pages/
├── the-eye-oracle.js           # Main dashboard (REAL DATA ONLY)
└── api/
    ├── cases/                  # Case management
    ├── alerts/                 # Alert delivery
    ├── targets/                # Target tracking
    ├── stats.js                # Statistics
    └── evidence/               # Evidence bundling
```

---

## 🚀 Features

1. **Real-Time Government Data**: Live API connections to official sources
2. **Multi-Jurisdiction Coverage**: Federal, Provincial (3 provinces), Municipal (3 cities)
3. **Legislation Tracking**: Parliament bills with status updates
4. **Rights Analysis**: Charter, Constitution, Human Rights, UNCRPD
5. **Verification Badges**: Every data point shows its verified source
6. **Scope Filtering**: Filter by federal/provincial/municipal/all
7. **Category Filtering**: Workers, disabilities, healthcare, housing, etc.
8. **Auto-Refresh**: Data updates every 10 minutes
9. **Cache Management**: Efficient 15-minute caching

---

## ✅ Verification

**EVERY piece of data shows**:
- Source organization
- Direct URL to original data
- Verification badge with source domain
- Timestamp of when data was fetched

---

## 🔒 No Demo Data Policy

This system contains **ZERO** demo, placeholder, or mock data.

All data comes from:
- Official government open data portals
- Official parliamentary APIs
- Official RSS feeds from government/oversight bodies

If APIs are unavailable, the system shows an empty state - **NOT fake data**.

---

## 🆓 All FREE Services

- All APIs used are publicly available at no cost
- No paid subscriptions required
- Uses official government open data initiatives
- GitHub Actions for automation (2000 min/month free)

---

*Last Updated: System Complete*
*THE EYE ORACLE - Real Data, Real Evidence, Real Justice*
