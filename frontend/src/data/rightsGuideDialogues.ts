// Rights Guide Dialogue Data Structure
export interface DialogueExchange {
  id: string
  title: string
  maya: string
  alex: string
}

export interface RightsCategory {
  id: string
  title: string
  icon: string
  color: string
  dialogues: DialogueExchange[]
}

export const rightsGuideData: RightsCategory[] = [
  {
    id: "complete-rights",
    title: "Complete Rights",
    icon: "⚖️",
    color: "from-blue-500 to-blue-600",
    dialogues: [
      {
        id: "minimum-wage",
        title: "Minimum Monthly Wage-1",
        maya: "Alex, I'm confused about my salary. The contract says RM1,500 per month. Is this correct for 2025?",
        alex: "Actually Maya, that's below the legal minimum! From August 1st, 2025, the minimum monthly wage in Malaysia is RM1,700."
      },
      {
        id: "minimum-wage-2",
        title: "Minimum Monthly Wage-2",
        maya: "Really? So my employer can't pay me less than that?",
        alex: "Exactly! RM1,700 is the floor - they can pay more, but never less. You should discuss this with your employer immediately."
      },
      {
        id: "minimum-wage-3",
        title: "Minimum Monthly Wage-3",
        maya: "Thank you! I didn't know I had this protection.",
        alex: "That's why it's important to know your rights. The law is there to protect you!"
      },
      {
        id: "max-weekly-hours",
        title: "Maximum Weekly Working Hours-1",
        maya: "Alex, I'm working 50 hours every week. My supervisor says it's normal, but I'm so tired...",
        alex: "Maya, that's not legal! The maximum weekly working hours is 45 hours, not 50."
      },
      {
        id: "max-weekly-hours-2",
        title: "Maximum Weekly Working Hours-2", 
        maya: "But my supervisor said everyone works that much...",
        alex: "Working more than 45 hours per week violates the Employment Act. You have the right to refuse, except for authorized overtime."
      },
      {
        id: "max-weekly-hours-3",
        title: "Maximum Weekly Working Hours-3",
        maya: "So I can actually say no to those extra 5 hours?",
        alex: "Absolutely! Your wellbeing matters, and the law protects you from excessive hours."
      },
      {
        id: "passport-retention",
        title: "Passport Retention-1",
        maya: "Alex, my employer took my passport for 'safekeeping.' They say it's normal practice. Is that okay?",
        alex: "No Maya, that's completely illegal! Employers cannot keep your passport under any circumstances."
      },
      {
        id: "passport-retention-2",
        title: "Passport Retention-2",
        maya: "But they said it's for safety...",
        alex: "That's a common excuse, but it's still against the law. Only you or proper immigration authorities can hold your passport."
      },
      {
        id: "passport-retention-3",
        title: "Passport Retention-3",
        maya: "What if I agreed to let them keep it?",
        alex: "It doesn't matter - even with your agreement, it's still illegal. You need your passport back immediately."
      },
      {
        id: "paid-holidays",
        title: "Paid Public Holidays-1",
        maya: "Alex, how many paid public holidays should I get each year? My contract only mentions 8 days.",
        alex: "You're entitled to at least 11 paid public holidays per year, including 5 mandatory national holidays."
      },
      {
        id: "paid-holidays-2",
        title: "Paid Public Holidays-2",
        maya: "So 8 days is too few?",
        alex: "Yes! The law guarantees you 11 minimum. Some employers give even more, but never less than 11."
      },
      {
        id: "paid-holidays-3",
        title: "Paid Public Holidays-3",
        maya: "That's 3 extra days I should be getting!",
        alex: "Exactly. Those are your rights, and you should claim them."
      },
      {
        id: "max-overtime",
        title: "Maximum Monthly Overtime-1",
        maya: "My manager scheduled me for 120 overtime hours this month. That seems like a lot...",
        alex: "Maya, that's way over the legal limit! Maximum overtime is 104 hours per month."
      },
      {
        id: "max-overtime-2",
        title: "Maximum Monthly Overtime-2",
        maya: "There's actually a limit on overtime?",
        alex: "Yes! Even overtime has boundaries. 120 hours exceeds the legal cap by 16 hours."
      },
      {
        id: "max-overtime-3",
        title: "Maximum Monthly Overtime-3",
        maya: "What should I do about those extra 16 hours?",
        alex: "You can refuse them legally, or report the violation to authorities if forced to work them."
      },
      {
        id: "work-breaks",
        title: "Work Break Requirements-1",
        maya: "I've been working for 6 hours straight. My supervisor says I can eat while working...",
        alex: "Maya, stop! After 5 continuous hours of work, you're legally entitled to a 30-minute break."
      },
      {
        id: "work-breaks-2",
        title: "Work Break Requirements-2",
        maya: "But there's so much work to finish...",
        alex: "The law protects your health. Working 6 hours without a break violates your rights."
      },
      {
        id: "work-breaks-3",
        title: "Work Break Requirements-3",
        maya: "So I can actually insist on taking this break?",
        alex: "Not only can you insist - you should! It's not optional, it's your legal right."
      },
      {
        id: "wage-deduction",
        title: "Maximum Wage Deduction-1",
        maya: "Alex, my employer deducted RM900 from my RM1,700 salary. Is this allowed?",
        alex: "Let me calculate... That's about 53% of your wages. The legal maximum deduction is 50%."
      },
      {
        id: "wage-deduction-2",
        title: "Maximum Wage Deduction-2",
        maya: "So they took too much?",
        alex: "Yes, about RM51. Total deductions cannot exceed 50% of your monthly wages."
      },
      {
        id: "wage-deduction-3",
        title: "Maximum Wage Deduction-3",
        maya: "I thought they could deduct whatever they wanted...",
        alex: "No way! The law protects you from excessive deductions that would leave you unable to live."
      },
      {
        id: "unpaid-wages",
        title: "Unpaid Wages-1",
        maya: "Alex, my employer hasn't paid wages for 2 months. They keep saying 'next week, next week...'",
        alex: "Maya, this is a serious offense! Non-payment of wages is a crime under Malaysian law."
      },
      {
        id: "unpaid-wages-2",
        title: "Unpaid Wages-2",
        maya: "Really? I thought I just had to wait longer...",
        alex: "No! Courts can order immediate payment plus penalties. Your employer is breaking the law."
      },
      {
        id: "unpaid-wages-3",
        title: "Unpaid Wages-3",
        maya: "What should I do?",
        alex: "Report to the Labor Department immediately. They have the power to force payment and impose fines."
      }
    ]
  },
  {
    id: "wages-salary",
    title: "Wages & Salary",
    icon: "💰",
    color: "from-green-500 to-green-600",
    dialogues: [
      {
        id: "payment-frequency",
        title: "Payment Frequency-1",
        maya: "My employer pays wages every two months. Is this normal practice?",
        alex: "No Maya, wages must be paid at least once per month. Every two months is too infrequent."
      },
      {
        id: "payment-frequency-2",
        title: "Payment Frequency-2",
        maya: "But they say it's easier for their accounting...",
        alex: "Their convenience doesn't override your rights. Monthly payment is the legal minimum frequency."
      },
      {
        id: "payment-frequency-3",
        title: "Payment Frequency-3",
        maya: "So I can demand monthly payments?",
        alex: "Absolutely! You shouldn't have to wait two months for money you've already earned."
      },
      {
        id: "payment-timeline",
        title: "Payment Timeline-1",
        maya: "Alex, my salary always comes 2 weeks after the month ends. My employer says it's normal processing time.",
        alex: "That's too late, Maya. Wages must be paid within 7 days after the wage period ends."
      },
      {
        id: "payment-timeline-2",
        title: "Payment Timeline-2",
        maya: "Only 7 days? But they need time to process...",
        alex: "The law gives them 7 days maximum. Two weeks is double the legal limit."
      },
      {
        id: "payment-timeline-3",
        title: "Payment Timeline-3",
        maya: "I've been waiting an extra week every month for my own money!",
        alex: "Exactly. You can demand faster payment - it's your legal right."
      }
      // Continue with other wages & salary dialogues...
    ]
  },
  {
    id: "working-hours",
    title: "Working Hours",
    icon: "⏰",
    color: "from-orange-500 to-orange-600",
    dialogues: [
      {
        id: "max-daily-hours",
        title: "Maximum Daily Hours-1",
        maya: "Alex, I worked 10 hours today. My supervisor says it's just 'getting the job done.'",
        alex: "Maya, under normal conditions, the maximum is 8 hours per day. 10 hours exceeds the legal limit."
      },
      {
        id: "max-daily-hours-2",
        title: "Maximum Daily Hours-2",
        maya: "But there was so much work to finish...",
        alex: "Heavy workload doesn't override the law. 8 hours per day protects your health and life balance."
      },
      {
        id: "max-daily-hours-3",
        title: "Maximum Daily Hours-3",
        maya: "So I can actually leave after 8 hours?",
        alex: "Yes! Unless it's authorized overtime, you have the right to stop after 8 hours."
      }
      // Continue with other working hours dialogues...
    ]
  },
  {
    id: "workplace-rights",
    title: "Workplace Rights",
    icon: "🏢",
    color: "from-purple-500 to-purple-600",
    dialogues: [
      {
        id: "safety-equipment",
        title: "Safety Equipment Responsibility",
        maya: "There are no safety helmets available at my construction site. My supervisor says I should buy my own.",
        alex: "That's wrong, Maya! Employers must provide all protective equipment - it's their legal responsibility."
      }
      // Continue with workplace rights dialogues...
    ]
  },
  {
    id: "overtime-rules",
    title: "Overtime Rules",
    icon: "⏱️",
    color: "from-red-500 to-red-600",
    dialogues: [
      {
        id: "overtime-payment",
        title: "Overtime Payment Responsibility",
        maya: "My employer refuses to pay for my rest day and holiday work. They say overtime payment is 'discretionary.'",
        alex: "That's completely false, Maya! Employers must pay for overtime, rest-day, and holiday work - it's the law."
      }
      // Continue with overtime rules dialogues...
    ]
  },
  {
    id: "overtime-rates",
    title: "Overtime Rates",
    icon: "📊",
    color: "from-yellow-500 to-yellow-600",
    dialogues: [
      {
        id: "overtime-rate",
        title: "Minimum Overtime Rate",
        maya: "My employer pays me a normal rate for overtime hours. They say overtime is just 'extra work.'",
        alex: "That's illegal, Maya! Overtime must be paid at least 1.5 times your normal hourly rate."
      }
      // Continue with overtime rates dialogues...
    ]
  },
  {
    id: "housing-hostel",
    title: "Housing & Hostel",
    icon: "🏠",
    color: "from-indigo-500 to-indigo-600",
    dialogues: [
      {
        id: "food-land",
        title: "Food Land Requirement",
        maya: "We've been living at the workplace for 8 months, but there's barely any space for food preparation.",
        alex: "Maya, for stays of 6 months or more, employers must provide at least 250 square meters of land for food purposes."
      }
      // Continue with housing dialogues...
    ]
  },
  {
    id: "safety-health",
    title: "Safety & Health",
    icon: "🛡️",
    color: "from-emerald-500 to-emerald-600",
    dialogues: [
      {
        id: "employer-duties",
        title: "Employer Safety Duties",
        maya: "My workplace has no safety training, old equipment, and no emergency procedures. Is this my problem to solve?",
        alex: "No Maya! Employers must provide safe equipment, systems, training, and emergency procedures. It's their legal duty."
      }
      // Continue with safety & health dialogues...
    ]
  },
  {
    id: "rest-holidays",
    title: "Rest & Holidays",
    icon: "🏖️",
    color: "from-cyan-500 to-cyan-600",
    dialogues: [
      {
        id: "maternity-leave",
        title: "Maternity Leave Duration",
        maya: "Alex, how much maternity leave am I entitled to? I've heard different numbers.",
        alex: "Maya, you're entitled to 98 consecutive days of maternity leave, subject to qualifying conditions."
      }
      // Continue with rest & holidays dialogues...
    ]
  },
  {
    id: "passport-retention",
    title: "Passport Retention",
    icon: "📘",
    color: "from-rose-500 to-rose-600",
    dialogues: [
      {
        id: "passport-custody",
        title: "Employer Passport Custody",
        maya: "Alex, my new employer wants to keep my passport for 'company records.' Should I agree?",
        alex: "Absolutely not, Maya! Employers cannot legally keep your passport under any circumstances."
      }
      // Continue with passport retention dialogues...
    ]
  }
]