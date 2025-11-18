export type Finding = {
  type: 'missing' | 'illegal' | 'warning'
  message: string
  start?: number
  end?: number
}

const patterns = [
  { 
    re: /passport\s*(?:kept|hold|retain)/i, 
    type: 'illegal', 
    message: 'Employer keeping the passport is illegal in Malaysia.' 
  },
  { 
    re: /(no\s*rest\s*day|seven\s*days\s*a\s*week)/i, 
    type: 'illegal', 
    message: 'Missing weekly rest day (at least 1 per week).' 
  },
  { 
    re: /(salary|wage).*(RM\s*([0-9]{3,}))?/i,
    type: 'warning',
    message: 'Salary clause present; ensure it is >= RM1500 per month.'
  }
]

export function checkContract(text: string): Finding[] {
  const findings: Finding[] = []
  if (!/salary|wage/i.test(text)) {
    findings.push({ type: 'missing', message: 'Missing salary amount clause.' })
  }
  if (!/rest\s*day/i.test(text)) {
    findings.push({ type: 'missing', message: 'Missing rest day / leave entitlement clause.' })
  }
  for (const p of patterns) {
    const m = p.re.exec(text)
    if (m) findings.push({ type: p.type as any, message: p.message, start: m.index, end: m.index + (m[0]?.length ?? 0) })
  }
  return findings
}
