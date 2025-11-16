import React, { useMemo, useRef, useState } from 'react'

function Pill({ children }) {
  return (
    <span className="text-xs tracking-wide px-3 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">
      {children}
    </span>
  )
}

function SectionKicker({ children }) {
  return (
    <div className="uppercase tracking-wider text-[11px] text-slate-400 mb-2">
      {children}
    </div>
  )
}

function Panel({ children, className = '' }) {
  return (
    <div className={`bg-[#14161b] border border-slate-800 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}

const symptomOptions = [
  { key: 'No cooling', label: 'No cooling / warm air', icon: '∿' },
  { key: 'Leaking water', label: 'Leaking water', icon: '●' },
  { key: "Won’t turn on / tripping breaker", label: "Won’t turn on / trips breaker", icon: '⏻' },
  { key: 'Maintenance', label: 'Routine maintenance', icon: '✓' },
  { key: 'New install', label: 'New installation', icon: '＋' },
  { key: 'Other / Not sure', label: 'Not sure—help me figure it out', icon: '?' },
]

export default function App() {
  const [triageSymptom, setTriageSymptom] = useState('')
  const [mode, setMode] = useState('renter')
  const [faqOpen, setFaqOpen] = useState({})
  const [form, setForm] = useState({
    need: '',
    symptom: '',
    address: '',
    access: '',
    window: '',
    name: '',
    mobile: '',
    email: '',
    consent: false,
    files: [],
  })
  const [submitted, setSubmitted] = useState(false)
  const fileNames = useMemo(() => form.files.map((f) => f.name).join(', '), [form.files])

  const requestRef = useRef(null)
  const triageRef = useRef(null)

  const carryToForm = () => {
    // Map triage selection into form fields
    const val = triageSymptom
    const next = { ...form }
    if (/maintenance/i.test(val)) next.need = 'Maintenance'
    else if (/install/i.test(val)) next.need = 'New install'
    else if (val) next.need = 'Repair'

    if (val) next.symptom = val
    setForm(next)
    // Scroll to form
    requestRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(false)

    // Basic required checks
    const required = ['need', 'symptom', 'address', 'window', 'name', 'mobile']
    for (const k of required) {
      if (!form[k]) {
        alert('Please fill in the required fields.')
        return
      }
    }
    if (!form.consent) {
      alert('Please agree to receive texts about this request.')
      return
    }

    // Simulate submit
    setTimeout(() => {
      setSubmitted(true)
      // Scroll to success message
      document.getElementById('success-note')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 600)
  }

  const faqs = [
    {
      q: 'Do you offer same-day service?',
      a: 'Often, yes—especially if booked by 2pm. We’ll confirm by text if a technician is available in your area.',
    },
    { q: 'What are your hours?', a: 'Weekdays 8am–6pm. After-hours by availability with a surcharge. No 24/7 guarantees.' },
    { q: 'How much is the diagnostic?', a: ' $129 in most NYC zip codes (weekdays 8–6). Applied to the repair if you approve it during the same visit.' },
    { q: 'Do you work on window units?', a: 'Basic cleaning and minor repairs are possible, but older or unsafe window units may be replacement-only. We’ll advise honestly.' },
    { q: 'Can you provide a COI?', a: 'Yes. Tell us your building’s requirements when you book.' },
    { q: 'What payment methods do you accept?', a: 'Major credit/debit cards and ACH. Deposits for installations; payment due at completion for repairs.' },
    { q: 'What if parts aren’t available same day?', a: 'We’ll order immediately and schedule the earliest return visit. You’ll get realistic ETAs.' },
    { q: 'What’s your warranty?', a: '1‑year labor on our repairs. Parts per manufacturer. We stand behind the work and document what we did.' },
    { q: 'What’s your cancellation policy?', a: 'No fee if you cancel or reschedule by 5pm the business day before. Same-day cancellations may incur a fee if a tech is already en route.' },
  ]

  const openFaq = (i) => setFaqOpen((s) => ({ ...s, [i]: !s[i] }))

  return (
    <div className="min-h-screen bg-[#0e0f12] text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0e0f12]/70 backdrop-blur border-b border-slate-800">
        <div className="max-w-[1120px] mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-200 grid place-items-center text-black font-black text-sm">
              AC
            </div>
            <div>
              <div className="font-bold">NYC AC Service</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Licensed • Insured</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="#request" className="px-4 py-2 rounded-lg border border-slate-700 text-slate-100">Book online</a>
            <a href="#request" className="px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold">Hand off my AC issue</a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="hero" className="pt-16 pb-6">
          <div className="max-w-[1120px] mx-auto px-5 grid gap-6 md:grid-cols-[1.2fr_.8fr]">
            <div className="relative bg-gradient-to-b from-[#121419] to-[#0f1115] border border-slate-800 rounded-3xl p-6 shadow-xl overflow-hidden">
              <span className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Response you can plan around
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mt-3">
                Hand off your AC problem in about a minute.
              </h1>
              <p className="text-slate-300 max-w-prose mt-2">
                NYC repair, maintenance, and installation. Real humans, realistic time windows, straight pricing.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Pill>Weekdays 8am–6pm</Pill>
                <Pill>Same‑day often available if booked by 2pm</Pill>
                <Pill>Text updates</Pill>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <a href="#triage" className="px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold">Hand off my AC issue</a>
                <a href="#request" className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">Prefer to text? Message us now</a>
              </div>
              <div className="text-slate-400 text-sm mt-3 font-mono">No hype. Just the steps.</div>
              <div className="mt-4 border border-dashed border-slate-700 rounded-xl p-4 bg-[#0f1216]">
                <h4 className="text-[13px] uppercase tracking-wider text-slate-400 mb-2">First 10 minutes after you submit</h4>
                <div className="grid gap-4 md:grid-cols-2 text-slate-300">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400">Business hours</div>
                    <div>We text you within <strong>10–20 minutes</strong> to confirm details and an arrival window.</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400">After-hours</div>
                    <div>We confirm first thing the next morning (<strong>by 8:30am</strong>).</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini triage */}
            <Panel>
              <SectionKicker>Mini triage</SectionKicker>
              <h2 className="text-2xl font-bold">What’s going on?</h2>
              <p className="text-slate-300">No need to diagnose. Pick what matches—techs do the rest.</p>

              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 mt-3">
                {symptomOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setTriageSymptom(opt.key)}
                    className={`flex items-center gap-2 text-left px-3 py-3 rounded-xl border transition-colors ${
                      triageSymptom === opt.key
                        ? 'bg-slate-800/60 border-slate-700'
                        : 'bg-[#101216] border-slate-800 hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-md grid place-items-center bg-slate-800 text-amber-400 font-black text-sm">
                      {opt.icon}
                    </span>
                    <span className="text-slate-200 text-sm">{opt.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <a
                  href="#request"
                  onClick={(e) => {
                    e.preventDefault()
                    carryToForm()
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold"
                >
                  Get me on the schedule
                </a>
                <div className="text-slate-400 text-sm">We’ll carry over your selection into the form.</div>
              </div>
            </Panel>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-16">
          <div className="max-w-[1120px] mx-auto px-5">
            <SectionKicker>No mystery</SectionKicker>
            <h2 className="text-3xl font-bold">How this actually works—simple steps that respect your time.</h2>

            <div className="grid gap-3 md:grid-cols-4 mt-4">
              {[
                { n: '1', t: 'Quick confirm', d: 'We text you with questions (10–20 minutes in business hours).' },
                { n: '2', t: 'Diagnostic visit', d: 'Weekdays 8am–6pm. $129 in most NYC zip codes; applied to the repair if approved during the same visit.' },
                { n: '3', t: 'Straight quote', d: 'If parts or extra time are needed, you’ll see why and what it costs. No pressure tactics.' },
                { n: '4', t: 'Repair or schedule', d: 'Many fixes are same-day. If parts are specialty or approvals are needed, we schedule the soonest slot.' },
              ].map((s) => (
                <div key={s.n} className="bg-[#101318] border border-slate-800 rounded-2xl p-4">
                  <div className="w-7 h-7 rounded-full grid place-items-center bg-slate-900 border border-slate-700 text-amber-400 font-bold text-xs">
                    {s.n}
                  </div>
                  <h4 className="mt-2 font-semibold">{s.t}</h4>
                  <div className="text-slate-400 text-sm">{s.d}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-2 mt-4">
              <Panel>
                <SectionKicker>What you do</SectionKicker>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">1</span> Tell us the issue</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">2</span> Provide access</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">3</span> Approve the quote</li>
                </ul>
              </Panel>
              <Panel>
                <SectionKicker>What we do</SectionKicker>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">A</span> Triage & dispatch</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">B</span> Diagnose and explain</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">C</span> Get parts, fix it, document the work</li>
                </ul>
              </Panel>
            </div>

            <a href="#request" className="inline-block mt-4 px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold">See today’s available windows</a>
          </div>
        </section>

        {/* Honest pricing */}
        <section id="price-honesty" className="py-16">
          <div className="max-w-[1120px] mx-auto px-5">
            <SectionKicker>Price clarity</SectionKicker>
            <h2 className="text-3xl font-bold">Honest price norms—so you’re not guessing.</h2>
            <p className="text-slate-300 max-w-prose">Actual numbers vary by parts, access, and unit type. Here’s what’s typical in NYC apartments and small commercial spaces.</p>

            <div className="grid gap-3 md:grid-cols-3 mt-4">
              <Panel>
                <SectionKicker>Visits & maintenance</SectionKicker>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">$</span> Diagnostic visit: <strong>$129</strong> (weekday 8–6)</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">$</span> Maintenance tune‑up: <strong>from $189</strong> per system</li>
                </ul>
              </Panel>
              <Panel>
                <SectionKicker>Common repairs</SectionKicker>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">$</span> Drain clean, contactor, capacitor: <strong>$180–$450</strong> when parts are on hand</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">$</span> Refrigerant issues: variable—pressure test first</li>
                </ul>
              </Panel>
              <Panel>
                <SectionKicker>Install / replace</SectionKicker>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">ⓘ</span> Quoted after site visit & building requirements</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">⏱</span> Permits/approvals can add time—realistic ETAs</li>
                </ul>
              </Panel>
            </div>

            <div className="grid gap-3 md:grid-cols-2 mt-4">
              <Panel>
                <SectionKicker>Policies</SectionKicker>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">%</span> Diagnostic fee is applied to repair if approved same visit</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">✓</span> Labor warranty: <strong>1‑year</strong> on repairs we perform</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">🏷</span> Parts carry the manufacturer’s warranty</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">🧭</span> No replacement push if a safe, reliable repair is reasonable</li>
                </ul>
              </Panel>
              <div className="border border-dashed border-slate-700 rounded-2xl p-6 bg-[#101318] text-slate-300">
                <SectionKicker>Where we’re not a fit</SectionKicker>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">≠</span> Very large commercial/chiller plants</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">⛔</span> 24/7 emergency guarantees (after-hours by availability only)</li>
                  <li className="flex gap-2 items-start"><span className="inline-grid place-items-center w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold">⚠</span> Unpermitted work or bypassing building rules</li>
                </ul>
                <div className="text-slate-400 text-sm mt-2">Need one of those? We’ll refer you to specialists.</div>
              </div>
            </div>

            <a href="#request" className="inline-block mt-4 px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold">Start with a diagnostic</a>
          </div>
        </section>

        {/* NYC specific */}
        <section id="nyc-specific" className="py-16">
          <div className="max-w-[1120px] mx-auto px-5">
            <SectionKicker>NYC realities</SectionKicker>
            <h2 className="text-3xl font-bold">Built for NYC buildings and all their rules.</h2>
            <p className="text-slate-300">Renters, owners, co‑ops, condos—no problem.</p>

            <Panel className="mt-4">
              <div className="flex gap-2 bg-slate-900/80 border border-slate-800 rounded-xl p-1 w-full max-w-md">
                <button
                  className={`flex-1 px-4 py-2 rounded-lg ${mode === 'renter' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-300'}`}
                  onClick={() => setMode('renter')}
                >
                  I’m a renter
                </button>
                <button
                  className={`flex-1 px-4 py-2 rounded-lg ${mode === 'owner' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-300'}`}
                  onClick={() => setMode('owner')}
                >
                  I own or manage
                </button>
              </div>

              {mode === 'renter' ? (
                <div className="mt-4">
                  <SectionKicker>Checklist for renters</SectionKicker>
                  <ul className="space-y-2 text-slate-200 text-sm">
                    <li className="flex gap-2 items-start"><span className="w-5 h-5 grid place-items-center bg-emerald-900/40 border border-emerald-800 text-emerald-300 rounded-md text-xs font-bold mt-0.5">✓</span> Have your super/landlord contact handy.</li>
                    <li className="flex gap-2 items-start"><span className="w-5 h-5 grid place-items-center bg-emerald-900/40 border border-emerald-800 text-emerald-300 rounded-md text-xs font-bold mt-0.5">✓</span> Ask if a COI is required; we can provide one.</li>
                    <li className="flex gap-2 items-start"><span className="w-5 h-5 grid place-items-center bg-emerald-900/40 border border-emerald-800 text-emerald-300 rounded-md text-xs font-bold mt-0.5">✓</span> Note elevator hours and any access windows.</li>
                    <li className="flex gap-2 items-start"><span className="w-5 h-5 grid place-items-center bg-emerald-900/40 border border-emerald-800 text-emerald-300 rounded-md text-xs font-bold mt-0.5">✓</span> If new install, you’ll need landlord approval before we start.</li>
                  </ul>
                </div>
              ) : (
                <div className="mt-4">
                  <SectionKicker>Checklist for owners/managers</SectionKicker>
                  <ul className="space-y-2 text-slate-200 text-sm">
                    <li className="flex gap-2 items-start"><span className="w-5 h-5 grid place-items-center bg-emerald-900/40 border border-emerald-800 text-emerald-300 rounded-md text-xs font-bold mt-0.5">✓</span> COI requirements and any building forms.</li>
                    <li className="flex gap-2 items-start"><span className="w-5 h-5 grid place-items-center bg-emerald-900/40 border border-emerald-800 text-emerald-300 rounded-md text-xs font-bold mt-0.5">✓</span> Rooftop / mechanical room access details.</li>
                    <li className="flex gap-2 items-start"><span className="w-5 h-5 grid place-items-center bg-emerald-900/40 border border-emerald-800 text-emerald-300 rounded-md text-xs font-bold mt-0.5">✓</span> If replacing equipment, co‑op/condo approval timelines.</li>
                  </ul>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div>
                  <SectionKicker>Coverage & timing</SectionKicker>
                  <div>We cover all five boroughs. Same-day service is often available in many neighborhoods if booked by 2pm; otherwise next-day.</div>
                </div>
                <div>
                  <SectionKicker>Communication</SectionKicker>
                  <div>We keep you updated by text. You’ll always know your window.</div>
                </div>
              </div>

              <a href="#request" className="inline-block mt-4 px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold">I’m ready—book me</a>
            </Panel>
          </div>
        </section>

        {/* Self-check */}
        <section id="self-check" className="py-16">
          <div className="max-w-[1120px] mx-auto px-5">
            <SectionKicker>Optional</SectionKicker>
            <h2 className="text-3xl font-bold">Quick 2‑minute checks. If these fix it, great.</h2>
            <p className="text-slate-300">If not, we’ll come out. Safety first.</p>

            <div className="grid gap-3 md:grid-cols-2 mt-4">
              {[
                { t: 'Filter', d: 'If clogged, replace/clean and try again.' },
                { t: 'Thermostat', d: 'New batteries? Mode on COOL? Set lower than room temp?' },
                { t: 'Breaker', d: 'If it’s tripped, reset once. If it trips again, stop and book service.' },
                { t: 'Ice on lines', d: 'If frozen, turn system off for 2–3 hours and book—don’t force it.' },
                { t: 'Water leak', d: 'Turn the unit off. Put a towel down. Book service.' },
              ].map((item) => (
                <div key={item.t} className="bg-[#0f1216] border border-slate-800 rounded-2xl p-4">
                  <strong className="text-slate-100">{item.t}:</strong> <span className="text-slate-300">{item.d}</span>
                </div>
              ))}
            </div>

            <a href="#request" className="inline-block mt-4 px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold">Still broken—send a tech</a>
          </div>
        </section>

        {/* Request form */}
        <section id="request" ref={requestRef} className="py-16">
          <div className="max-w-[1120px] mx-auto px-5">
            <div className="rounded-3xl p-6 border border-slate-800 bg-gradient-to-b from-[#101319] to-[#0e1015]">
              <SectionKicker>Booking</SectionKicker>
              <h2 className="text-3xl font-bold">Hand it off. We’ll take it from here.</h2>
              <p className="text-slate-300">Give us the basics. We’ll confirm your time window by text.</p>

              <form onSubmit={onSubmit} className="mt-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="need" className="text-sm text-slate-300">What do you need?</label>
                    <select id="need" className="bg-[#0f1216] border border-slate-800 rounded-lg px-3 py-2" value={form.need} onChange={(e)=>setForm({ ...form, need: e.target.value })} required>
                      <option value="">Select one</option>
                      <option>Repair</option>
                      <option>Maintenance</option>
                      <option>New install</option>
                      <option>Not sure</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="symptom" className="text-sm text-slate-300">What’s the symptom?</label>
                    <select id="symptom" className="bg-[#0f1216] border border-slate-800 rounded-lg px-3 py-2" value={form.symptom} onChange={(e)=>setForm({ ...form, symptom: e.target.value })} required>
                      <option value="">Select one</option>
                      <option>No cooling</option>
                      <option>Leaking water</option>
                      <option>Won’t turn on / tripping breaker</option>
                      <option>Noisy</option>
                      <option>Other / Not sure</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="address" className="text-sm text-slate-300">Address & borough</label>
                    <input id="address" className="bg-[#0f1216] border border-slate-800 rounded-lg px-3 py-2" placeholder="Street, apartment, borough" value={form.address} onChange={(e)=>setForm({ ...form, address: e.target.value })} required />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="access" className="text-sm text-slate-300">Access notes</label>
                    <input id="access" className="bg-[#0f1216] border border-slate-800 rounded-lg px-3 py-2" placeholder="Super contact, elevator hours, COI" value={form.access} onChange={(e)=>setForm({ ...form, access: e.target.value })} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="window" className="text-sm text-slate-300">Preferred time window</label>
                    <select id="window" className="bg-[#0f1216] border border-slate-800 rounded-lg px-3 py-2" value={form.window} onChange={(e)=>setForm({ ...form, window: e.target.value })} required>
                      <option value="">Select a window</option>
                      <option>Today if available</option>
                      <option>Tomorrow morning</option>
                      <option>Tomorrow afternoon</option>
                    </select>
                    <div className="text-slate-400 text-xs">Same-day may be available if booked by 2pm.</div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm text-slate-300">Contact name</label>
                    <input id="name" className="bg-[#0f1216] border border-slate-800 rounded-lg px-3 py-2" placeholder="Your name" value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} required />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="mobile" className="text-sm text-slate-300">Mobile number (for updates)</label>
                    <input id="mobile" type="tel" className="bg-[#0f1216] border border-slate-800 rounded-lg px-3 py-2" placeholder="(XXX) XXX-XXXX" value={form.mobile} onChange={(e)=>setForm({ ...form, mobile: e.target.value })} required />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm text-slate-300">Email (optional)</label>
                    <input id="email" type="email" className="bg-[#0f1216] border border-slate-800 rounded-lg px-3 py-2" placeholder="For receipts and COI" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} />
                  </div>

                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label htmlFor="upload" className="text-sm text-slate-300">Upload photos or a short video (optional)</label>
                    <input
                      id="upload"
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700"
                      onChange={(e) => setForm({ ...form, files: e.target.files ? Array.from(e.target.files) : [] })}
                    />
                    <div className="text-slate-400 text-xs">Thermostat, unit label, where it’s leaking—anything helps.</div>
                    {fileNames && <div className="text-slate-400 text-xs mt-1">{fileNames}</div>}
                  </div>

                  <div className="md:col-span-2 flex items-center gap-2 mt-1">
                    <input id="consent" type="checkbox" className="w-4 h-4" checked={form.consent} onChange={(e)=>setForm({ ...form, consent: e.target.checked })} />
                    <label htmlFor="consent" className="text-sm text-slate-300">I agree to receive texts about this request.</label>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap mt-4">
                  <button type="submit" className="px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold">Submit request</button>
                  <a href="#hero" className="px-4 py-2 rounded-lg border border-slate-700 text-slate-100">Text us instead</a>
                  <div className="text-slate-400 text-sm">You’ll get a text within 10–20 minutes during business hours. After-hours, by 8:30am next business day. No charges until we confirm your diagnostic visit.</div>
                </div>

                <div id="success-note" className={`mt-4 text-emerald-200 bg-emerald-900/20 border border-emerald-800 rounded-xl p-4 ${submitted ? 'block' : 'hidden'}`}>
                  ✅ Thanks. We’ve received your request. During business hours, expect a text in 10–20 minutes confirming details and an arrival window. After-hours, we’ll text by 8:30am next business day.
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16">
          <div className="max-w-[1120px] mx-auto px-5">
            <SectionKicker>FAQ</SectionKicker>
            <h2 className="text-3xl font-bold">Straight answers.</h2>

            <div className="mt-4 space-y-2">
              {faqs.map((item, idx) => (
                <div key={idx} className={`border border-slate-800 rounded-xl overflow-hidden ${faqOpen[idx] ? 'bg-slate-900/60' : 'bg-[#0f1216]'}`}>
                  <button
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                    onClick={() => openFaq(idx)}
                  >
                    <span className="font-medium">{item.q}</span>
                    <span className={`w-6 h-6 grid place-items-center rounded-md border ${faqOpen[idx] ? 'border-amber-500 bg-slate-800 text-amber-400' : 'border-slate-700 bg-slate-900 text-slate-300'}`}>
                      {faqOpen[idx] ? '–' : '＋'}
                    </span>
                  </button>
                  <div className={`px-4 transition-all duration-200 ${faqOpen[idx] ? 'pb-4' : 'max-h-0 overflow-hidden pb-0'}`}>
                    {faqOpen[idx] && <p className="text-slate-300 text-sm">{item.a}</p>}
                  </div>
                </div>
              ))}
            </div>

            <a href="#request" className="inline-block mt-4 underline decoration-dotted text-slate-300">Didn’t see your question? Text us.</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-6">
        <div className="max-w-[1120px] mx-auto px-5 grid gap-2 md:grid-cols-[1fr_auto]">
          <div>
            <div>Licensed & insured. Serving all five boroughs.</div>
            <div className="text-slate-400">Weekdays 8am–6pm. After-hours by availability.</div>
          </div>
          <div className="md:text-right">
            <div>Text or call: (XXX) XXX‑XXXX • Email: hello@nycacservice.com</div>
            <div className="text-slate-400">Privacy • Terms • Service area</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
