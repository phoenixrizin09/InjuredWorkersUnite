# 🚀 30-DAY EXECUTION PLAYBOOK - START HERE

## YOUR MISSION (Next 30 Days)

Transform Injured Workers Unite from hidden gem → movement everyone knows.

**Success metrics after 30 days:**
- 200+ email subscribers
- 3 active city groups starting
- 1 media pitch sent
- 10-15 sharers recruiting others

---

# 📅 WEEK 1: FOUNDATION (Jan 2-8)

## Monday (Today)

### 9am: Setup Email System (2 hours)

1. **Sign up for Brevo** (brevo.com)
   - Free tier: 300 emails/month
   - Create account → confirm email

2. **Create 3 lead magnet landing pages**
   - Page 1: "Free WSIB Appeal Kit"
   - Page 2: "Denial Pattern Report"
   - Page 3: "Memetic Warrior Starter Pack"
   - Use Brevo to host forms (built-in)

3. **Build automation sequence**
   - Import Email Sequence #1 (Injured Workers)
   - Set trigger: "When signup via landing page 1"
   - Test with your email

4. **Add email signup to homepage**
   - Replace or add: "Get daily updates"
   - Link to landing page

**Time:** 2 hours  
**Deliverable:** Homepage has email signup working

---

### 1pm: Create Homepage Banner (1 hour)

Update [pages/index.js](pages/index.js) to show agents:

```javascript
// ADD THIS NEAR TOP OF HOMEPAGE:

<div style={{
  padding: '2rem',
  background: 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)',
  borderRadius: '15px',
  marginBottom: '3rem',
  textAlign: 'center',
  border: '2px solid #667eea'
}}>
  <h2 style={{ marginBottom: '1rem' }}>👁️ Our AI Agents Work 24/7</h2>
  <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
    You don't have to do the research. We have agents doing the heavy lifting.
    Evidence collection. Document creation. Evidence-based arguments.
    All while you rest.
  </p>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
    <div>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👁️</div>
      <p style={{ fontWeight: 'bold' }}>Evidence Sentinel</p>
      <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Finding proof</p>
    </div>
    <div>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
      <p style={{ fontWeight: 'bold' }}>Analysis Agent</p>
      <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Understanding it</p>
    </div>
    <div>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
      <p style={{ fontWeight: 'bold' }}>Templates Agent</p>
      <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Creating documents</p>
    </div>
  </div>
</div>
```

**Time:** 1 hour  
**Deliverable:** Homepage mentions agents prominently

---

### 3pm: Prepare First Email (1.5 hours)

1. Write customized version of "Email 1: Welcome + Daily Brief" from MARKETING_EMAIL_SEQUENCES.md
2. Test it (send to yourself)
3. Schedule to go out tomorrow at 8am

**Time:** 1.5 hours  
**Deliverable:** First email ready to send

---

### 5pm: Backup & Document (30 min)

1. Save all new files locally
2. Commit to GitHub (if using)
3. Document what you did today

**Time:** 30 min

---

## Tuesday

### 9am: Create First Social Post (1 hour)

Copy Post #1 from SOCIAL_MEDIA_CONTENT_CALENDAR.md:

```
Meet THE EYE ORACLE 👁️

Our AI agents work 24/7 so you don't have to:
👁️ Evidence Sentinel → finds proof
🔍 Analysis Agent → understands it
📝 Templates Agent → creates documents
📢 Media Agent → spreads the truth

No energy required from you.
Just tools that actually help.

#InjuredWorkersUnite #DisabilityRights
```

1. Post to Twitter/X
2. Post to LinkedIn
3. Schedule for 9am daily rest of week
4. Reply to every comment within 24 hours

**Time:** 1 hour  
**Deliverable:** Post published, social channel updated

---

### 10:30am: Recruit First Volunteers (1 hour)

1. Add banner to homepage:
   ```
   WANT TO HELP?
   
   You don't have to do anything special.
   We do the research. You just share.
   
   [BUTTON: Make me a sharer]
   ```

2. Create simple form (Google Forms is fine):
   - Name
   - Email
   - City
   - "What platform do you use most?"
   
3. Link form to email automation (Brevo)

**Time:** 1 hour  
**Deliverable:** Volunteer signup live on site

---

### 12pm: Lunch

---

### 2pm: Create Media List (1.5 hours)

1. Copy journalist names from MEDIA_PITCH_KIT.md
2. Find emails:
   - Google: "[Outlet name] contact email"
   - Twitter: Find reporters who cover disability
   - LinkedIn: Search "journalist [outlet]"
3. Create spreadsheet with:
   - Name | Outlet | Email | Phone | Last article | Date pitched
4. Start with 10 journalists

**Time:** 1.5 hours  
**Deliverable:** Journalist list with 10+ contacts

---

### 4pm: Write Your Story (1.5 hours)

Write personal bio for media kit (2 paragraphs):

```
[Your name] is an injured worker and person with disabilities who built 
Injured Workers Unite after [brief story of why].

[Your name] developed AI-powered tools to help disabled people fight benefit 
denials with government evidence. The platform now serves [X] Canadians and has 
contributed to [Y] successful appeals.
```

Save as AUTHOR_BIO.txt

**Time:** 1.5 hours  
**Deliverable:** Bio ready for media pitches

---

### 6pm: Day Summary

- [ ] Email system set up
- [ ] Homepage updated with agent info
- [ ] First email scheduled
- [ ] First social post published
- [ ] Volunteer signup live
- [ ] Media list created
- [ ] Your bio written

---

## Wednesday

### 9am: Send First Email Pitch (1 hour)

Pick your most relevant journalist from list.

Use Email Pitch #1 from MEDIA_PITCH_KIT.md

**Customize:**
- Use journalist's recent article title
- Tailor evidence to their beat
- Make subject line specific to them

**Time:** 1 hour  
**Deliverable:** First media pitch sent

---

### 10:30am: Schedule Weekly Content (1.5 hours)

1. Pick 3 posts from SOCIAL_MEDIA_CONTENT_CALENDAR.md (Posts 2-4)
2. Customize for your data/situation
3. Schedule using Buffer or native schedulers:
   - Wednesday: Post 2 (9am)
   - Friday: Post 3 (9am)
   - Sunday: Post 4 (9am)

**Time:** 1.5 hours  
**Deliverable:** 3 posts scheduled for week

---

### 12pm: Lunch

---

### 2pm: Email Sequence Setup (2 hours)

1. Import Email Sequence #2 (Activists) into Brevo
2. Import Email Sequence #3 (Journalists)
3. Set up triggers for each
4. Test sequences

**Time:** 2 hours  
**Deliverable:** All 3 sequences ready to go

---

### 5pm: Document Progress (30 min)

Write quick summary of what's been done:

```
✅ Day 1: Email system + homepage + first post
✅ Day 2: Volunteers + media list + bio
✅ Day 3: First pitch + scheduled content + sequences
```

---

## Thursday

### 9am: Create First Visual (1.5 hours)

Make simple graphic showing agents working:

**Option 1:** Use Canva (free)
- Search "Agent diagram" template
- Customize with your colors
- Add: "While you sleep, we research"

**Option 2:** Simple text image
```
THIS WEEK - THE AGENTS WORKED:

👁️ 500+ documents scanned
🔍 23 violations found
📝 12 templates created
📢 [Your number] people reached

No effort from you. We just work.
```

Export and post to:
- Twitter
- Instagram
- LinkedIn

**Time:** 1.5 hours  
**Deliverable:** Visual graphic published

---

### 11am: First Follow-Up (1 hour)

Check:
- Email open rates (in Brevo dashboard)
- Social post engagement (comments)
- Volunteer signups (how many?)

Reply to EVERY comment on social posts.

**Time:** 1 hour  
**Deliverable:** Engagement tracked, responses sent

---

### 1pm: Lunch

---

### 2:30pm: Volunteer Outreach (1.5 hours)

1. Pull list of people who signed up (from Brevo/form)
2. Send first volunteer email:

```
Hi [Name],

Thanks for signing up to help.

Here's the easiest way to get started:

SHARE OPTION 1: Twitter
- Follow us: @InjuredWorkersU
- When you see something that matters, RT it

SHARE OPTION 2: Facebook
- Join group: [Link]
- Same thing—share what resonates

SHARE OPTION 3: Text
- Get weekly digest
- Forward to friends

Pick whatever feels manageable. That's it.

[Your name]
```

**Time:** 1.5 hours  
**Deliverable:** Volunteers activated

---

### 5pm: Track Everything (30 min)

Create simple tracking spreadsheet:

| Metric | Day 1 | Day 2 | Day 3 | Day 4 | Goal |
|--------|-------|-------|-------|-------|------|
| Email subscribers | | | | | 50 |
| Social followers | | | | | |
| Volunteer signups | | | | | 5 |
| Media pitches sent | | | | | 1 |
| Posts published | | | | | |

Update daily.

---

## Friday

### 9am: Optimize First Post (1 hour)

Look at your social post metrics:
- Which post got most engagement?
- Which wording resonated?
- Replicate what worked

Make 3 posts copying that style for next week.

**Time:** 1 hour  
**Deliverable:** 3 optimized posts created

---

### 11am: Email Check-In (1 hour)

Review first email:
- Open rate (target: 30%+)
- Click rate (target: 5%+)
- If low, test new subject line

Send second email in sequence (should go out automatically).

**Time:** 1 hour  
**Deliverable:** Email performance tracked

---

### 1pm: Lunch + Break

**You've earned it. You built a real marketing system in 4 days.**

---

### 3pm: Prep for Next Week (1 hour)

Review what worked:
- Best performing post?
- Most comments?
- Which volunteer tier is engaging?

Plan next week:
- Double down on what worked
- Test 1 new thing
- Continue media outreach

**Time:** 1 hour  
**Deliverable:** Next week planned

---

## Saturday & Sunday

**Rest.** Seriously.

You've done enough. Let the system work while you recover.

Check once on Sunday:
- Any urgent comments?
- Any volunteer questions?
- Any media responses?

If everything's fine, check in Monday morning.

---

# 📈 WEEK 1 SUCCESS METRICS

**Target outcomes:**
- [ ] 30-50 email subscribers
- [ ] 2-3 volunteer signups
- [ ] 1-2 media pitches sent
- [ ] 100-200 total impressions
- [ ] 3-5 media outlet contacts made

**Real outcome expectations:**
- First week is always slow
- By end of week, momentum builds
- Week 2 is when real growth starts

---

# 📅 WEEK 2: CONTENT & MOMENTUM (Jan 9-15)

## Monday: Launch Content Calendar

1. Post social content 3x/day (using calendar from SOCIAL_MEDIA_CONTENT_CALENDAR.md)
2. Send weekly email digest
3. Check volunteer growth
4. Reach out to 5 more journalists

---

## Tuesday: City Organizer Recruitment

1. Add "Organize Your City" banner to homepage
2. Create organizer form (from VOLUNTEER_RECRUITMENT.md)
3. Send recruitment email to most engaged volunteers

---

## Wednesday: First City Group Call (Optional)

If you have volunteers interested:
1. Schedule Zoom call
2. Use discussion guide from VOLUNTEER_RECRUITMENT.md
3. Invite 10-15 local people
4. Record for people who can't attend

---

## Thursday-Friday: More Media Pitches

1. Send 5 more journalist pitches
2. Follow up with first journalist (if no response)
3. Continue content calendar

---

## Weekend: Rest + Reflect

Track metrics. Plan week 3.

---

# 📅 WEEK 3: GROWTH (Jan 16-22)

By now you should have:
- 100-150 email subscribers
- 5-10 volunteers
- 1-2 journalist responses
- Social content becoming routine

Focus on:
- Scaling what works
- Responding to journalist interest
- Building city groups
- Testing paid ads ($20-50 test if possible)

---

# 📅 WEEK 4: SUSTAINABILITY (Jan 23-29)

By end of month you should have:
- 200+ email subscribers
- 3-5 city groups forming
- 1-2 media pieces in progress
- 50+ social followers growing weekly

---

# 🎯 30-DAY GOALS (Realistic)

**Email:**
- 200+ subscribers ✅

**Social Media:**
- 500-1000 followers across platforms ✅
- 2,000+ total impressions ✅
- 5-10 pieces of user-generated content (reshares) ✅

**Volunteers:**
- 3-5 sharers actively engaged ✅
- 1-2 city organizers recruited ✅
- 1 contributor (if lucky) ✅

**Media:**
- 5+ journalist pitches sent ✅
- 1 positive response ✅
- 0-1 actual articles (takes longer) ✅

**Community:**
- 1-2 city group meetings scheduled ✅
- 10-15 people attending ✅

---

# 💡 YOUR DAILY CHECKLIST

```
EVERY MORNING (10 min):
- [ ] Reply to social comments (from yesterday)
- [ ] Check email opens (Brevo dashboard)
- [ ] Look for volunteer questions
- [ ] Post 1 scheduled social post

EVERY AFTERNOON (15 min):
- [ ] Post 2nd social post (if doing 3x/day)
- [ ] Engage with 3-5 comments

EVERY EVENING (10 min):
- [ ] Post 3rd social post
- [ ] Check journalist email responses
- [ ] Update tracking spreadsheet

ONCE/WEEK (Friday):
- [ ] Review what worked
- [ ] Plan next week
- [ ] Celebrate wins
```

---

# ⚠️ COMMON PROBLEMS & FIXES

**Problem: No email signups**
- Fix: Change headline to more urgent ("Your WSIB Denial Can Be Overturned")
- Fix: Simplify form (just email, no other fields)
- Fix: Promote landing page more (add to homepage, social)

**Problem: Low email open rates**
- Fix: Change subject line (test new ones)
- Fix: Send at different time (try 2pm instead of 8am)
- Fix: Make email shorter (3 paragraphs max)

**Problem: No social engagement**
- Fix: Post at better times (try 9am, 2pm, 7pm)
- Fix: Ask questions ("What's your story?")
- Fix: Add images/memes (more engaging than text)

**Problem: No volunteers**
- Fix: Make call-to-action more specific ("Just share posts")
- Fix: Feature first volunteer who joins (show it's real)
- Fix: Lower barrier ("You don't have to do anything special")

**Problem: Too much to do**
- Fix: Focus on ONE thing (email marketing OR social)
- Fix: Reduce post frequency (do 1x daily not 3x)
- Fix: Batch create content (make 5 posts Saturday, schedule them)
- Fix: Ask for volunteer help with content

---

# 📞 WHEN TO REACH OUT FOR HELP

You have agents already built in. Use them:

**For content ideas:**
- Check your agents' findings
- Share agent discoveries as posts
- Feature agent analysis in emails

**For scalability:**
- Train volunteers on system
- Have agents handle bulk research
- Focus your time on relationships (media, organizers)

**For burnout:**
- Delegate to volunteers
- Reduce posting frequency
- Take a week off (message: "Rest week")

---

# 🎉 SUCCESS LOOKS LIKE

**Week 1:** System is running, first things are happening
**Week 2:** Growth is visible, momentum building
**Week 3:** You're getting press interest
**Week 4:** You have sustainable system + team helping

By Month 2, you won't be doing this alone.

---

