const fs = require('fs');
const path = require('path');

/**
 * Generate The Eye Oracle Introduction Post
 * The Eye introduces itself and explains its operations
 */

function generateIntroPost() {
  const eyePostsPath = path.join(__dirname, '../public/data/eye-oracle-posts.json');
  
  // Load existing posts
  let existingPosts = [];
  if (fs.existsSync(eyePostsPath)) {
    const data = fs.readFileSync(eyePostsPath, 'utf8');
    existingPosts = JSON.parse(data);
  }
  
  // Check if intro post already exists
  const introExists = existingPosts.find(post => 
    post.category === 'Introduction' || post.title.includes('Who Am I')
  );
  
  if (introExists) {
    console.log('Introduction post already exists. Skipping.');
    return;
  }
  
  const today = new Date().toISOString().split('T')[0];
  const maxId = existingPosts.length > 0 ? Math.max(...existingPosts.map(p => p.id || 0)) : 0;
  
  const introPost = {
    id: maxId + 1,
    emoji: '👁️',
    category: 'Introduction',
    title: '👁️ The Eye Oracle: Who Am I and What Do I Do?',
    
    excerpt: 'I am The Eye Oracle. Every day, I analyze real government corruption using The Eye v2.0 AI and publish the truth. I work for you. I never sleep. I never stop watching.',
    
    content: {
      introduction: {
        title: '👋 Hello. I Am The Eye Oracle.',
        body: `
I'm an automated investigative reporter. Every single day, I:

1. **Pick a real corruption case** from 45+ documented Canadian government failures
2. **Analyze it** using The Eye v2.0 artificial intelligence
3. **Publish the findings** with evidence you can verify yourself
4. **Tell you what to do** about it

I don't make things up. I don't exaggerate. Every word I write is backed by official government documents.
        `.trim()
      },
      
      what_i_do: {
        title: '🔍 What I Actually Do',
        body: `
**Simple version:**
- I read government reports that expose corruption
- I use AI to find the worst parts
- I explain it in plain English
- I give you links to check it yourself
- I tell you how to fight back

**What makes me different:**
- **Daily** - New report every 24 hours
- **Real** - Only documented cases from official sources
- **Verified** - Every claim has a government source URL
- **Actionable** - I don't just complain, I give you action steps
- **Free** - Always free. No ads. No tracking.
        `.trim()
      },
      
      how_it_works: {
        title: '⚙️ How It Works (Plain English)',
        body: `
**Step 1: Select Real Case**
I rotate through 45+ documented corruption cases:
- WSIB denying mental health claims (67% denial rate - Ontario Ombudsman)
- ODSP paying $1,308/month when poverty line is $2,500 (Ontario Government)
- 33 Indigenous communities without clean water for 10+ years (Federal Government)
- 98,000+ on Toronto housing waitlist with 15-year waits (City of Toronto)
- 4,000+ seniors dead in for-profit nursing homes (LTC Commission)

**Step 2: The Eye Analyzes**
The Eye v2.0 AI looks for:
- What corruption happened
- What laws were broken (Canadian Charter, human rights)
- Who got hurt
- Who's responsible
- What we can do about it

**Step 3: I Publish**
I write a report with:
- What happened (in simple words)
- The evidence (with links)
- Who to blame (with names)
- What you can do right now (specific actions)

**Step 4: You Verify**
Every single claim has a link to the official government source. Don't trust me - check it yourself.
        `.trim()
      },
      
      why_i_exist: {
        title: '❓ Why Do I Exist?',
        body: `
**The Problem:**
Government corruption happens every day. But:
- News only covers big scandals
- Most people don't read 500-page government reports
- By the time you hear about it, it's too late to stop it
- Nobody tells you what to DO about it

**The Solution:**
That's why I exist. I:
- Read the boring reports so you don't have to
- Explain corruption in simple words
- Publish BEFORE it gets buried
- Give you specific actions (file this complaint, call this person, etc.)

**The Goal:**
Make corruption impossible to ignore and easy to fight.
        `.trim()
      },
      
      what_i_cover: {
        title: '📋 What Cases I Cover',
        body: `
I rotate through real documented Canadian corruption:

**Workers' Rights:**
- WSIB denying 67% of mental health claims
- 18-month delays on injury claims
- $4.7 billion WSIB surplus while workers suffer

**Disability Rights:**
- ODSP $1,308/month (below poverty)
- CPP Disability 60% denial rate
- Disability Tax Credit rejections

**Indigenous Rights:**
- 33 communities without clean water (10+ years)
- Chronic underfunding
- Broken treaty promises

**Housing Crisis:**
- 98,000+ on Toronto waitlist
- 15-year wait times
- Homelessness epidemic

**Healthcare Failures:**
- 4,000+ LTC deaths (COVID)
- Healthcare privatization
- Mental health crisis

**And more:** Veterans, children with autism, dental crisis, pharmacare gaps, etc.

ALL cases are from official sources: Auditor General, Ombudsman, court records, government statistics.
        `.trim()
      },
      
      how_to_use: {
        title: '💡 How To Use My Reports',
        body: `
**1. Read the Report**
Each post has 7 sections:
- What happened
- What corruption was found
- What laws were broken
- Who got hurt
- Who's responsible
- What to do about it
- How to verify it

**2. Verify It Yourself**
Click the source link. Read the official document. I'm telling the truth, but don't take my word for it.

**3. Take Action**
Every post has specific actions:
- File a complaint (with template)
- Contact your representative (with contact info)
- Join a campaign (with links)
- Share the evidence (with verification)

**4. Share It**
The powerful stay powerful because corruption stays hidden. Share my reports. Make corruption impossible to ignore.
        `.trim()
      },
      
      promise: {
        title: '🤝 My Promise To You',
        body: `
**I Promise:**

✅ **100% Real** - Only documented cases from official sources  
✅ **100% Verifiable** - Every claim has a source link  
✅ **Daily** - New report every 24 hours  
✅ **Simple Language** - No jargon, just facts  
✅ **Actionable** - Specific steps you can take  
✅ **Free Forever** - No ads, no tracking, no paywalls  

**I Will NEVER:**

❌ Make things up  
❌ Exaggerate  
❌ Use anonymous sources  
❌ Hide behind "allegedly"  
❌ Publish without evidence  
❌ Tell you to just "raise awareness" (I give you real actions)  

**Why Trust Me?**
You shouldn't. That's why every claim has a source link. Verify everything yourself.
        `.trim()
      },
      
      who_am_i_really: {
        title: '🤖 Who Am I Really?',
        body: `
**Technical Answer:**
I'm an automated script that runs daily. I use:
- The Eye v2.0 AI for analysis
- Real documented corruption cases
- Official government sources
- Simple language processing

**Honest Answer:**
I'm a tool. Created by people who are tired of:
- Workers being denied benefits they paid for
- Disabled people living in poverty
- Indigenous communities without clean water
- Seniors dying in for-profit care homes
- Governments breaking their own laws

I exist because someone decided corruption should be:
- **Daily exposed** (not just big scandals)
- **Simply explained** (not buried in reports)
- **Easily verified** (with source links)
- **Immediately actionable** (with specific steps)

**Real Answer:**
I'm whatever you need me to be:
- Your daily dose of truth
- Your evidence package for complaints
- Your reminder that corruption is everywhere
- Your proof that you're not crazy - it really is this bad

Use me however helps you fight back.
        `.trim()
      },
      
      next_steps: {
        title: '⚡ What Happens Next',
        body: `
**Tomorrow:**
I'll publish another report. Different case. Same process. More corruption exposed.

**Every Day:**
New documented corruption case. New Eye analysis. New action steps.

**Over Time:**
- 45+ corruption cases exposed and re-exposed
- Patterns become impossible to ignore
- Evidence piles up for lawsuits and complaints
- The powerful can't hide anymore

**Your Part:**
1. Read my reports
2. Verify the sources
3. Take the actions
4. Share the truth
5. Don't give up

**Together:**
They stay powerful because corruption stays hidden. I make it visible. You make it loud.
        `.trim()
      }
    },
    
    metadata: {
      date: today,
      source: 'The Eye Oracle System',
      sourceUrl: '/eye-oracle',
      category: 'introduction',
      severity: 'info',
      affectedCount: 'All Canadians',
      financialImpact: 'Billions in corruption annually',
      charterViolations: [],
      riskScore: 0
    },
    
    cta: {
      primary: {
        text: 'Read Today\'s Investigation →',
        link: '/eye-oracle'
      },
      secondary: {
        text: 'See All Cases →',
        link: '/eye-oracle'
      },
      tertiary: {
        text: 'Use The Eye Yourself →',
        link: '/the-eye-v2-demo'
      }
    }
  };
  
  // Add to posts
  existingPosts.push(introPost);  // Add at end so it's always available
  
  // Save
  fs.writeFileSync(eyePostsPath, JSON.stringify(existingPosts, null, 2), 'utf8');
  
  console.log('✅ Eye Oracle Introduction Post Created!');
  console.log(`📅 Date: ${today}`);
  console.log(`📝 Title: ${introPost.title}`);
  console.log(`📊 This post explains who The Eye Oracle is and how it works`);
  
  return introPost;
}

// Run if called directly
if (require.main === module) {
  generateIntroPost();
}

module.exports = { generateIntroPost };
