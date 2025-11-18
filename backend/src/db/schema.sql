-- Right4All Chatbot Database Schema
-- Tables for RAG (Retrieval-Augmented Generation) knowledge base

-- Rights Guide Table
CREATE TABLE IF NOT EXISTS rights_guide (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    law_ref VARCHAR(255),
    category VARCHAR(100),
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employment Laws Table
CREATE TABLE IF NOT EXISTS employment_laws (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    section VARCHAR(100),
    content TEXT NOT NULL,
    law_type VARCHAR(100),
    applies_to VARCHAR(100),
    effective_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQ Table
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    tags TEXT[],
    priority INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wage Rules Table
CREATE TABLE IF NOT EXISTS wage_rules (
    id SERIAL PRIMARY KEY,
    rule_name VARCHAR(255) NOT NULL,
    rule_type VARCHAR(100) NOT NULL, -- 'minimum_wage', 'overtime', 'deduction', etc.
    description TEXT NOT NULL,
    formula TEXT,
    law_reference VARCHAR(255),
    effective_date DATE,
    region VARCHAR(100),
    applies_to VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chatbot Conversations (for analytics and improvements)
CREATE TABLE IF NOT EXISTS chatbot_conversations (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    user_question TEXT NOT NULL,
    bot_response TEXT NOT NULL,
    source_type VARCHAR(50), -- 'database', 'general', 'off-topic'
    language VARCHAR(10),
    response_time_ms INTEGER,
    citations TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster searches
CREATE INDEX IF NOT EXISTS idx_rights_guide_question ON rights_guide USING gin(to_tsvector('english', question));
CREATE INDEX IF NOT EXISTS idx_rights_guide_answer ON rights_guide USING gin(to_tsvector('english', answer));
CREATE INDEX IF NOT EXISTS idx_employment_laws_content ON employment_laws USING gin(to_tsvector('english', content));
CREATE INDEX IF NOT EXISTS idx_faq_question ON faq USING gin(to_tsvector('english', question));
CREATE INDEX IF NOT EXISTS idx_faq_answer ON faq USING gin(to_tsvector('english', answer));

-- Sample Data for Rights Guide
INSERT INTO rights_guide (question, answer, law_ref, category) VALUES
('What are the legal working hours in Malaysia?', 'Under the Employment Act 1955, the standard working hours are 8 hours per day or 48 hours per week. Any work beyond these hours is considered overtime and must be compensated accordingly.', 'EA-Section-60A', 'working_hours'),
('How is overtime calculated?', 'Overtime is calculated at 1.5 times your hourly rate. Your hourly rate = (Monthly salary ÷ 26 days) ÷ 8 hours. Overtime pay = Hourly rate × 1.5 × Number of overtime hours.', 'EA-Section-60A', 'overtime'),
('What is the minimum wage in Malaysia?', 'As of May 2024, the minimum wage in Malaysia is RM 1,500 per month. This applies to all workers including migrant workers.', 'Minimum-Wages-Order-2024', 'wages'),
('How many days of annual leave am I entitled to?', 'Under the Employment Act, you are entitled to paid annual leave based on years of service: Less than 2 years: 8 days, 2-5 years: 12 days, More than 5 years: 16 days.', 'EA-Section-60E', 'leave'),
('Can my employer withhold my passport?', 'No. It is illegal for employers to hold workers'' passports. Your passport is your personal property and must be in your possession at all times.', 'Anti-Trafficking-Act-2007', 'documents');

-- Sample Data for Employment Laws
INSERT INTO employment_laws (title, section, content, law_type, applies_to) VALUES
('Employment Act 1955', 'Section 60A', 'Hours of work shall not exceed eight hours in one day or forty-eight hours in one week. Any work in excess of the normal hours shall be deemed to be overtime.', 'working_hours', 'all_workers'),
('Employment Act 1955', 'Section 60I', 'An employee shall be paid for overtime at a rate not less than one and a half times his hourly rate of pay.', 'overtime', 'all_workers'),
('Employment Act 1955', 'Section 60E', 'An employee shall be entitled to paid annual leave for every twelve months of continuous service.', 'leave', 'all_workers');

-- Sample Data for FAQ
INSERT INTO faq (question, answer, category, tags) VALUES
('What should I do if my employer doesn''t pay my salary?', 'You can file a complaint with the Labour Department at the nearest Labour Office. Bring your employment contract, payslips, and any other relevant documents. The Labour Department will investigate and help resolve the issue.', 'wages', ARRAY['salary', 'payment', 'complaint']),
('Can I change employers in Malaysia?', 'Yes, but you need permission from both your current and new employer, and you must obtain approval from the Immigration Department. Your work permit must also be transferred to the new employer.', 'employment', ARRAY['change_job', 'work_permit']),
('What safety equipment should my employer provide?', 'Employers must provide appropriate safety equipment based on your job, including helmets, safety boots, gloves, masks, and other protective gear at no cost to you.', 'safety', ARRAY['safety', 'equipment', 'workplace']);

-- Sample Data for Wage Rules
INSERT INTO wage_rules (rule_name, rule_type, description, formula, law_reference, applies_to) VALUES
('Minimum Wage 2024', 'minimum_wage', 'National minimum wage for all workers', 'RM 1,500 per month', 'Minimum-Wages-Order-2024', 'all_workers'),
('Overtime Calculation', 'overtime', 'Standard overtime rate calculation', 'Hourly rate × 1.5 × Overtime hours', 'EA-Section-60I', 'all_workers'),
('Rest Day Overtime', 'overtime', 'Work on rest day', 'Hourly rate × 2.0 × Hours worked', 'EA-Section-60C', 'all_workers'),
('Public Holiday Overtime', 'overtime', 'Work on public holiday', 'Hourly rate × 3.0 × Hours worked', 'EA-Section-60D', 'all_workers'),
('Daily Rate Calculation', 'wage_calculation', 'Calculate daily wage from monthly salary', 'Monthly salary ÷ 26', 'EA-Section-2', 'all_workers'),
('Hourly Rate Calculation', 'wage_calculation', 'Calculate hourly wage from daily wage', 'Daily wage ÷ 8', 'EA-Section-2', 'all_workers');
