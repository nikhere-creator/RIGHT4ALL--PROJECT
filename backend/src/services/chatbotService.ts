/**
 * Chatbot Service for Right4All AI Assistant
 * 
 * Provides AI-powered chatbot functionality with RAG (Retrieval-Augmented Generation)
 * for answering questions about migrant workers' rights, wages, and Malaysian labor laws.
 * 
 * @module services/chatbotService
 */

import axios from 'axios'
import { db } from './databaseService'
import { embeddingService } from './embeddingService'

/**
 * Chat message interface for AI conversation
 */
interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/**
 * Response structure for chatbot answers
 */
interface ChatResponse {
  answer: string
  sourceType: 'database' | 'general' | 'off-topic'
  citations: string[]
  responseTime: number
}

/**
 * Wage calculation result with step-by-step breakdown
 */
interface WageCalculation {
  steps: string[]
  citation: string
  totalOvertimePay?: number
}

/**
 * Database context for RAG (Retrieval-Augmented Generation)
 */
interface DatabaseContext {
  id: number
  content: string
  reference: string
  source: string
}

/**
 * Main chatbot service class implementing AI assistant functionality
 */
class ChatbotService {
  private apiKey: string
  private apiUrl = 'https://api.deepseek.com/v1/chat/completions'
  private timeoutMs = 3000

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || ''
    if (!this.apiKey) {
      console.warn('⚠️  DEEPSEEK_API_KEY not configured')
    }
  }

  /**
   * Check if question is related to migrant workers/labour rights
   * Uses comprehensive keyword matching across 5 languages
   */
  private isRelevantQuestion(question: string): boolean {
    const keywords = [
      // English keywords - Comprehensive coverage
      'work', 'job', 'employer', 'employee', 'salary', 'wage', 'pay', 'overtime',
      'leave', 'contract', 'passport', 'visa', 'permit', 'migrant', 'foreign worker',
      'rights', 'law', 'legal', 'labour', 'labor', 'safety', 'hours', 'accommodation',
      'complaint', 'dispute', 'termination', 'resign', 'annual leave', 'sick leave',
      'malaysia', 'employment act', 'minimum wage', 'working hours', 'rest day',
      'ngo', 'organization', 'support', 'help', 'assistance', 'aid', 'charity',
      'human rights', 'advocacy', 'protection', 'welfare', 'community',
      'statistics', 'data', 'number', 'workers', 'migration', 'state', 'states',
      'population', 'demographics', 'distribution', 'selangor', 'kl', 'kuala lumpur',
      'johor', 'penang', 'perak', 'sabah', 'sarawak', 'pahang', 'kelantan', 'terengganu',
      'melaka', 'negeri sembilan', 'kedah', 'perlis', 'labuan', 'putrajaya',
      'exploitation', 'abuse', 'harassment', 'discrimination', 'unfair', 'unpaid',
      'deduction', 'fine', 'penalty', 'threat', 'intimidation', 'retaliation',
      'health', 'medical', 'doctor', 'hospital', 'injury', 'accident', 'insurance',
      'housing', 'living', 'accommodation', 'dormitory', 'hostel', 'room', 'bed',
      'food', 'meal', 'canteen', 'transport', 'travel', 'bus', 'vehicle',
      'document', 'paper', 'certificate', 'medical check', 'health screening',
      'recruitment', 'agency', 'agent', 'fee', 'commission', 'debt', 'bondage',
      'union', 'association', 'collective', 'bargaining', 'strike', 'protest',
      'court', 'tribunal', 'arbitration', 'mediation', 'conciliation',
      'department', 'ministry', 'authority', 'government', 'official',
      'emergency', 'crisis', 'helpline', 'hotline', 'counseling', 'advice',
      'calculator', 'calculation', 'compute', 'figure', 'amount', 'total',
      'holiday', 'festival', 'public holiday', 'religious', 'cultural',
      'training', 'skill', 'education', 'qualification', 'certification',
      'family', 'dependent', 'child', 'spouse', 'marriage', 'relationship',
      'repatriation', 'deportation', 'exit', 'return', 'home country',
      'extension', 'renewal', 'expiry', 'validity', 'duration', 'period',
      'violation', 'breach', 'offense', 'crime', 'illegal', 'unlawful',
      'compensation', 'benefit', 'entitlement', 'allowance', 'bonus',
      'overtime pay', 'night shift', 'weekend', 'holiday work', 'extra hours',
      'working condition', 'environment', 'facility', 'equipment', 'tool',
      'safety gear', 'protective', 'helmet', 'gloves', 'mask', 'uniform',
      'cleanliness', 'hygiene', 'sanitation', 'toilet', 'bathroom', 'shower',
      'water', 'electricity', 'air conditioning', 'ventilation', 'lighting',
      'rest area', 'break', 'lunch', 'meal time', 'refreshment',
      'communication', 'language', 'translation', 'interpreter', 'explain',
      'understand', 'confusion', 'misunderstanding', 'clarification',
      'procedure', 'process', 'step', 'method', 'way', 'how to', 'what to do',
      'information', 'knowledge', 'awareness', 'education', 'training',
      'problem', 'issue', 'difficulty', 'challenge', 'trouble', 'concern',
      'solution', 'resolution', 'settlement', 'agreement', 'compromise',
      'justice', 'fairness', 'equality', 'dignity', 'respect', 'treatment',
      
      // Bahasa Malaysia keywords - Comprehensive coverage
      'gaji', 'upah', 'kerja', 'majikan', 'pekerja', 'cuti', 'kontrak', 'pasport',
      'hak', 'undang', 'buruh', 'keselamatan', 'penginapan', 'aduan', 'permit',
      'pekerja asing', 'migran', 'organisasi', 'bantuan', 'sokongan', 'komuniti',
      'statistik', 'data', 'bilangan', 'negeri', 'populasi', 'selangor', 'johor',
      'pulau pinang', 'perak', 'sabah', 'sarawak', 'pahang', 'kelantan', 'terengganu',
      'melaka', 'negeri sembilan', 'kedah', 'perlis', 'labuan', 'putrajaya',
      'visa', 'pasport', 'dokumen', 'imigresen', 'pembaharuan', 'kad kerja',
      'permit kerja', 'kad pengenalan', 'dokumen perjalanan', 'imigresen',
      'eksploitasi', 'penderaan', 'gangguan', 'diskriminasi', 'tidak adil', 'tidak dibayar',
      'potongan', 'denda', 'penalti', 'ancaman', 'ugutan', 'balas dendam',
      'kesihatan', 'perubatan', 'doktor', 'hospital', 'kecederaan', 'kemalangan', 'insurans',
      'perumahan', 'tempat tinggal', 'penginapan', 'asrama', 'hostel', 'bilik', 'katil',
      'makanan', 'makan', 'kantin', 'pengangkutan', 'perjalanan', 'bas', 'kenderaan',
      'dokumen', 'kertas', 'sijil', 'pemeriksaan perubatan', 'saringan kesihatan',
      'pengambilan', 'agensi', 'ejen', 'yuran', 'komisen', 'hutang', 'perhambaan',
      'kesatuan', 'persatuan', 'kolektif', 'tawar-menawar', 'mogok', 'protes',
      'mahkamah', 'tribunal', 'arbitrasi', 'pengantaraan', 'pendamaian',
      'jabatan', 'kementerian', 'pihak berkuasa', 'kerajaan', 'pegawai',
      'kecemasan', 'krisis', 'talian bantuan', 'hotline', 'kaunseling', 'nasihat',
      'kalkulator', 'pengiraan', 'kira', 'angka', 'jumlah', 'keseluruhan',
      'percutian', 'perayaan', 'cuti umum', 'agama', 'budaya',
      'latihan', 'kemahiran', 'pendidikan', 'kelayakan', 'pensijilan',
      'keluarga', 'tanggungan', 'anak', 'pasangan', 'perkahwinan', 'hubungan',
      'pemulangan', 'penghantaran balik', 'keluar', 'pulang', 'negara asal',
      'lanjutan', 'pembaharuan', 'tamat tempoh', 'kesahihan', 'tempoh', 'jangka masa',
      'pelanggaran', 'pelanggaran', 'kesalahan', 'jenayah', 'haram', 'tidak sah',
      'pampasan', 'faedah', 'hak', 'elaun', 'bonus',
      'bayaran lebih masa', 'shift malam', 'hujung minggu', 'kerja cuti', 'jam tambahan',
      'keadaan kerja', 'persekitaran', 'kemudahan', 'peralatan', 'alat',
      'perlindungan keselamatan', 'pelindung', 'topi keledar', 'sarung tangan', 'topeng', 'uniform',
      'kebersihan', 'higien', 'sanitasi', 'tandas', 'bilik air', 'mandi',
      'air', 'elektrik', 'penghawa dingin', 'pengudaraan', 'pencahayaan',
      'kawasan rehat', 'rehat', 'makan tengah hari', 'waktu makan', 'minuman',
      'komunikasi', 'bahasa', 'terjemahan', 'penterjemah', 'terangkan',
      'faham', 'kekeliruan', 'salah faham', 'penjelasan',
      'prosedur', 'proses', 'langkah', 'kaedah', 'cara', 'bagaimana', 'apa yang perlu dilakukan',
      'maklumat', 'pengetahuan', 'kesedaran', 'pendidikan', 'latihan',
      'masalah', 'isu', 'kesukaran', 'cabaran', 'masalah', 'kebimbangan',
      'penyelesaian', 'penyelesaian', 'penyelesaian', 'perjanjian', 'kompromi',
      'keadilan', 'keadilan', 'kesaksamaan', 'maruah', 'hormat', 'rawatan',
      
      // Nepali keywords - Comprehensive coverage
      'तलब', 'काम', 'मालिक', 'कर्मचारी', 'छुट्टी', 'अनुबन्ध', 'राहदानी', 'अधिकार',
      'कानून', 'श्रम', 'सुरक्षा', 'आवास', 'शिकायत', 'अनुमति', 'विदेशी कामदार',
      'संगठन', 'सहायता', 'समर्थन', 'समुदाय', 'तथ्याङ्क', 'संख्या', 'राज्य',
      'भिसा', 'पासपोर्ट', 'कागजात', 'आप्रवासन', 'नवीकरण', 'काम कार्ड',
      'काम अनुमति', 'पहिचान कार्ड', 'यात्रा कागजात', 'आप्रवास',
      'शोषण', 'दुर्व्यवहार', 'उत्पीडन', 'भेदभाव', 'अन्याय', 'अवैतनिक',
      'कटौती', 'जरिवाना', 'सजाय', 'धम्की', 'डराउने', 'प्रतिशोध',
      'स्वास्थ्य', 'चिकित्सा', 'डाक्टर', 'अस्पताल', 'चोट', 'दुर्घटना', 'बीमा',
      'आवास', 'बसोबास', 'रहन सहन', 'छात्रावास', 'होस्टेल', 'कोठा', 'खाट',
      'खाना', 'भोजन', 'क्यान्टिन', 'यातायात', 'यात्रा', 'बस', 'सवारी',
      'कागजात', 'कागज', 'प्रमाणपत्र', 'चिकित्सा जाँच', 'स्वास्थ्य जाँच',
      'भर्ती', 'एजेन्सी', 'एजेन्ट', 'शुल्क', 'कमिसन', 'ऋण', 'बन्धन',
      'संघ', 'संस्था', 'सामूहिक', 'सौदा', 'हडताल', 'प्रदर्शन',
      'अदालत', 'ट्रिब्युनल', 'मध्यस्थता', 'मध्यस्थता', 'सुलह',
      'विभाग', 'मन्त्रालय', 'अधिकार', 'सरकार', 'अधिकारी',
      'आपतकाल', 'संकट', 'हेल्पलाइन', 'हटलाइन', 'काउन्सेलिंग', 'सल्लाह',
      'क्यालकुलेटर', 'गणना', 'गणना', 'अंक', 'रकम', 'कुल',
      'छुट्टी', 'पर्व', 'सार्वजनिक छुट्टी', 'धार्मिक', 'सांस्कृतिक',
      'प्रशिक्षण', 'कौशल', 'शिक्षा', 'योग्यता', 'प्रमाणीकरण',
      'परिवार', 'आश्रित', 'बच्चा', 'जीवनसाथी', 'विवाह', 'सम्बन्ध',
      'प्रत्यावर्तन', 'निर्वासन', 'निकास', 'फर्कनु', 'गृह देश',
      'विस्तार', 'नवीकरण', 'म्याद सकिनु', 'वैधता', 'अवधि', 'समय',
      'उल्लंघन', 'उल्लंघन', 'अपराध', 'अपराध', 'अवैध', 'गैरकानूनी',
      'मुआवजा', 'लाभ', 'अधिकार', 'भत्ता', 'बोनस',
      'ओभरटाइम भुक्तानी', 'रातो शिफ्ट', 'सप्ताहान्त', 'छुट्टीको काम', 'थप घण्टा',
      'कामको अवस्था', 'वातावरण', 'सुविधा', 'उपकरण', 'साधन',
      'सुरक्षा उपकरण', 'सुरक्षात्मक', 'हेल्मेट', 'हातेसुन', 'मास्क', 'युनिफर्म',
      'सफाइ', 'स्वच्छता', 'स्वच्छता', 'ट्वाइलेट', 'बाथरुम', 'शावर',
      'पानी', 'बिजुली', 'एयर कन्डिसनिंग', 'भेन्टिलेसन', 'प्रकाश',
      'आराम क्षेत्र', 'ब्रेक', 'लन्च', 'खानाको समय', 'जलपान',
      'संचार', 'भाषा', 'अनुवाद', 'दोभाषी', 'व्याख्या',
      'बुझ्नु', 'भ्रम', 'गलतफहमी', 'स्पष्टीकरण',
      'प्रक्रिया', 'प्रक्रिया', 'चरण', 'विधि', 'बाटो', 'कसरी', 'के गर्ने',
      'जानकारी', 'ज्ञान', 'जागरूकता', 'शिक्षा', 'प्रशिक्षण',
      'समस्या', 'मुद्दा', 'कठिनाइ', 'चुनौती', 'समस्या', 'चिन्ता',
      'समाधान', 'समाधान', 'निपटान', 'सम्झौता', 'समझदारी',
      'न्याय', 'निष्पक्षता', 'समानता', 'गौरव', 'सम्मान', 'व्यवहार',
      
      // Hindi keywords - Comprehensive coverage
      'वेतन', 'काम', 'मालिक', 'कर्मचारी', 'छुट्टी', 'अनुबंध', 'पासपोर्ट', 'अधिकार',
      'कानून', 'श्रम', 'सुरक्षा', 'आवास', 'शिकायत', 'अनुमति', 'विदेशी कामगार',
      'संगठन', 'सहायता', 'समर्थन', 'समुदाय', 'आंकड़े', 'संख्या', 'राज्य',
      'वीज़ा', 'पासपोर्ट', 'दस्तावेज़', 'आप्रवासन', 'नवीनीकरण', 'कार्ड',
      'कार्य अनुमति', 'पहचान पत्र', 'यात्रा दस्तावेज़', 'आप्रवास',
      'शोषण', 'दुर्व्यवहार', 'उत्पीड़न', 'भेदभाव', 'अनुचित', 'अवैतनिक',
      'कटौती', 'जुर्माना', 'दंड', 'धमकी', 'डराना', 'प्रतिशोध',
      'स्वास्थ्य', 'चिकित्सा', 'डॉक्टर', 'अस्पताल', 'चोट', 'दुर्घटना', 'बीमा',
      'इंश्योरेंस', 'सुरक्षा', 'सोशल सिक्योरिटी', 'सोसो', 'सोशल सिक्योरिटी ऑर्गनाइजेशन',
      'स्वास्थ्य बीमा', 'हेल्थ इंश्योरेंस', 'स्वास्थ्य सुरक्षा', 'चिकित्सा बीमा',
      'कर्मचारी बीमा', 'वर्कमैन कम्पेनसेशन', 'दुर्घटना बीमा', 'एक्सीडेंट इंश्योरेंस',
      'सोशल सिक्योरिटी', 'सामाजिक सुरक्षा', 'सोसो कवरेज', 'सोसो रजिस्ट्रेशन',
      'स्वास्थ्य लाभ', 'मेडिकल बेनिफिट', 'चिकित्सा लाभ', 'स्वास्थ्य सुविधा',
      'बीमा कवरेज', 'इंश्योरेंस कवरेज', 'बीमा योजना', 'इंश्योरेंस प्लान',
      'स्वास्थ्य सुरक्षा योजना', 'हेल्थ प्रोटेक्शन प्लान', 'चिकित्सा सुरक्षा',
      'सोसो लाभ', 'सोसो बेनिफिट', 'सोशल सिक्योरिटी लाभ', 'सामाजिक सुरक्षा लाभ',
      'कर्मचारी सुरक्षा', 'वर्कर सेफ्टी', 'कामगार सुरक्षा', 'श्रमिक सुरक्षा',
      'आवास', 'रहने', 'आवास', 'छात्रावास', 'होस्टल', 'कमरा', 'बिस्तर',
      'भोजन', 'खाना', 'कैंटीन', 'परिवहन', 'यात्रा', 'बस', 'वाहन',
      'दस्तावेज़', 'कागज', 'प्रमाणपत्र', 'चिकित्सा जांच', 'स्वास्थ्य जांच',
      'भर्ती', 'एजेंसी', 'एजेंट', 'शुल्क', 'कमीशन', 'कर्ज', 'बंधन',
      'संघ', 'संस्था', 'सामूहिक', 'सौदा', 'हड़ताल', 'प्रदर्शन',
      'अदालत', 'ट्रिब्यूनल', 'मध्यस्थता', 'मध्यस्थता', 'सुलह',
      'विभाग', 'मंत्रालय', 'अधिकार', 'सरकार', 'अधिकारी',
      'आपातकाल', 'संकट', 'हेल्पलाइन', 'हॉटलाइन', 'काउंसलिंग', 'सलाह',
      'कैलकुलेटर', 'गणना', 'गणना', 'अंक', 'रकम', 'कुल',
      'छुट्टी', 'त्योहार', 'सार्वजनिक छुट्टी', 'धार्मिक', 'सांस्कृतिक',
      'प्रशिक्षण', 'कौशल', 'शिक्षा', 'योग्यता', 'प्रमाणन',
      'परिवार', 'आश्रित', 'बच्चा', 'जीवनसाथी', 'शादी', 'रिश्ता',
      'प्रत्यावर्तन', 'निर्वासन', 'निकास', 'वापसी', 'मूल देश',
      'विस्तार', 'नवीनीकरण', 'समाप्ति', 'वैधता', 'अवधि', 'समय',
      'उल्लंघन', 'उल्लंघन', 'अपराध', 'अपराध', 'अवैध', 'गैरकानूनी',
      'मुआवजा', 'लाभ', 'अधिकार', 'भत्ता', 'बोनस',
      'ओवरटाइम भुगतान', 'रात की शिफ्ट', 'सप्ताहांत', 'छुट्टी का काम', 'अतिरिक्त घंटे',
      'काम की स्थिति', 'वातावरण', 'सुविधा', 'उपकरण', 'उपकरण',
      'सुरक्षा उपकरण', 'सुरक्षात्मक', 'हेलमेट', 'दस्ताने', 'मास्क', 'वर्दी',
      'सफाई', 'स्वच्छता', 'स्वच्छता', 'टॉयलेट', 'बाथरूम', 'शावर',
      'पानी', 'बिजली', 'एयर कंडीशनिंग', 'वेंटिलेशन', 'प्रकाश',
      'आराम क्षेत्र', 'ब्रेक', 'लंच', 'खाने का समय', 'जलपान',
      'संचार', 'भाषा', 'अनुवाद', 'दुभाषिया', 'समझाएं',
      'समझना', 'भ्रम', 'गलतफहमी', 'स्पष्टीकरण',
      'प्रक्रिया', 'प्रक्रिया', 'चरण', 'विधि', 'तरीका', 'कैसे', 'क्या करें',
      'जानकारी', 'ज्ञान', 'जागरूकता', 'शिक्षा', 'प्रशिक्षण',
      'समस्या', 'मुद्दा', 'कठिनाई', 'चुनौती', 'मुसीबत', 'चिंता',
      'समाधान', 'समाधान', 'निपटान', 'समझौता', 'समझौता',
      'न्याय', 'निष्पक्षता', 'समानता', 'गरिमा', 'सम्मान', 'व्यवहार',
      
      // Bengali keywords - Comprehensive coverage
      'বেতন', 'কাজ', 'নিয়োগকর্তা', 'কর্মচারী', 'ছুটি', 'চুক্তি', 'পাসপোর্ট', 'অধিকার',
      'আইন', 'শ্রম', 'নিরাপত্তা', 'আবাসন', 'অভিযোগ', 'অনুমতি', 'বিদেশী কর্মী',
      'সংগঠন', 'সাহায্য', 'সমর্থন', 'সম্প্রদায়', 'পরিসংখ্যান', 'সংখ্যা', 'রাজ্য',
      'ভিসা', 'পাসপোর্ট', 'নথি', 'অভিবাসন', 'নবায়ন', 'কাজের কার্ড',
      'কাজের অনুমতি', 'পরিচয়পত্র', 'ভ্রমণ নথি', 'অভিবাসন', 'থাকার', 'জায়গা',
      'বাসস্থান', 'বাথরুম', 'টয়লেট', 'স্বাস্থ্য', 'পরিষ্কার', 'বাসা', 'ঘর',
      'শোষণ', 'নির্যাতন', 'হয়রানি', 'বৈষম্য', 'অন্যায্য', 'অবৈতনিক',
      'কাটছাঁট', 'জরিমানা', 'শাস্তি', 'হুমকি', 'ভয় দেখানো', 'প্রতিশোধ',
      'স্বাস্থ্য', 'চিকিত্সা', 'ডাক্তার', 'হাসপাতাল', 'আঘাত', 'দুর্ঘটনা', 'বীমা',
      'আবাসন', 'বাসস্থান', 'আবাসন', 'ছাত্রাবাস', 'হোস্টেল', 'ঘর', 'বিছানা',
      'খাবার', 'খাদ্য', 'ক্যান্টিন', 'পরিবহন', 'ভ্রমণ', 'বাস', 'যানবাহন',
      'নথি', 'কাগজ', 'সনদ', 'চিকিত্সা পরীক্ষা', 'স্বাস্থ্য পরীক্ষা',
      'নিয়োগ', 'এজেন্সি', 'এজেন্ট', 'ফি', 'কমিশন', 'ঋণ', 'বন্ধন',
      'ইউনিয়ন', 'সমিতি', 'সমষ্টিগত', 'দরকষাকষি', 'ধর্মঘট', 'বিক্ষোভ',
      'আদালত', 'ট্রাইব্যুনাল', 'সালিশ', 'মধ্যস্থতা', 'সমন্বয়',
      'বিভাগ', 'মন্ত্রণালয়', 'কর্তৃপক্ষ', 'সরকার', 'কর্মকর্তা',
      'জরুরী অবস্থা', 'সংকট', 'হেল্পলাইন', 'হটলাইন', 'কাউন্সেলিং', 'পরামর্শ',
      'ক্যালকুলেটর', 'গণনা', 'গণনা', 'সংখ্যা', 'পরিমাণ', 'মোট',
      'ছুটি', 'উৎসব', 'সরকারি ছুটি', 'ধর্মীয়', 'সাংস্কৃতিক',
      'প্রশিক্ষণ', 'দক্ষতা', 'শিক্ষা', 'যোগ্যতা', 'সনদপত্র',
      'পরিবার', 'নির্ভরশীল', 'শিশু', 'স্বামী/স্ত্রী', 'বিবাহ', 'সম্পর্ক',
      'প্রত্যাবর্তন', 'বিতাড়ন', 'প্রস্থান', 'ফেরত', 'মাতৃভূমি',
      'সম্প্রসারণ', 'নবায়ন', 'মেয়াদ শেষ', 'বৈধতা', 'সময়সীমা', 'সময়',
      'লঙ্ঘন', 'লঙ্ঘন', 'অপরাধ', 'অপরাধ', 'অবৈধ', 'বেআইনি',
      'ক্ষতিপূরণ', 'সুবিধা', 'অধিকার', 'ভাতা', 'বোনাস',
      'ওভারটাইম বেতন', 'রাতের শিফট', 'সপ্তাহান্ত', 'ছুটির কাজ', 'অতিরিক্ত ঘণ্টা',
      'কাজের অবস্থা', 'পরিবেশ', 'সুবিধা', 'সরঞ্জাম', 'যন্ত্র',
      'নিরাপত্তা সরঞ্জাম', 'সুরক্ষামূলক', 'হেলমেট', 'গ্লাভস', 'মাস্ক', 'ইউনিফর্ম',
      'পরিষ্কার-পরিচ্ছন্নতা', 'স্বাস্থ্যবিধি', 'স্যানিটেশন', 'টয়লেট', 'বাথরুম', 'শাওয়ার',
      'পানি', 'বিদ্যুৎ', 'এয়ার কন্ডিশনার', 'বায়ুচলাচল', 'আলো',
      'বিশ্রাম এলাকা', 'বিরতি', 'লাঞ্চ', 'খাবারের সময়', 'জলখাবার',
      'যোগাযোগ', 'ভাষা', 'অনুবাদ', 'দোভাষী', 'ব্যাখ্যা',
      'বুঝতে', 'বিভ্রান্তি', 'ভুল বোঝাবুঝি', 'স্পষ্টীকরণ',
      'পদ্ধতি', 'প্রক্রিয়া', 'ধাপ', 'পদ্ধতি', 'উপায়', 'কিভাবে', 'কি করতে হবে',
      'তথ্য', 'জ্ঞান', 'সচেতনতা', 'শিক্ষা', 'প্রশিক্ষণ',
      'সমস্যা', 'ইস্যু', 'কষ্ট', 'চ্যালেঞ্জ', 'কষ্ট', 'উদ্বেগ',
      'সমাধান', 'সমাধান', 'নিষ্পত্তি', 'চুক্তি', 'সমঝোতা',
      'ন্যায়বিচার', 'ন্যায্যতা', 'সমতা', 'মর্যাদা', 'সম্মান', 'আচরণ',
      // Additional Bengali keywords for minimum wage and salary
      'সর্বনিম্ন মজুরি', 'সর্বনিম্ন বেতন', 'মজুরি', 'মালয়েশিয়া', 'মালয়েশিয়ায়',
      'কত', 'কি', 'কিভাবে', 'কোথায়', 'কখন', 'কেন', 'কার', 'কাকে',
      'নূন্যতম বেতন', 'নূন্যতম মজুরি', 'বেসিক বেতন', 'বেসিক মজুরি',
      'রিঙ্গিত', 'রিংগিত', 'টাকা', 'মুদ্রা', 'দাম', 'মূল্য',
      'কর্মঘণ্টা', 'কাজের সময়', 'শিফট', 'শিফটের সময়',
      'বেতন কাঠামো', 'মজুরি কাঠামো', 'বেতন স্কেল', 'মজুরি স্কেল',
      'বেতন বৃদ্ধি', 'মজুরি বৃদ্ধি', 'বেতন কম', 'মজুরি কম',
      'বেতন বেশি', 'মজুরি বেশি', 'বেতন দেওয়া', 'মজুরি দেওয়া',
      'বেতন পাওয়া', 'মজুরি পাওয়া', 'বেতন না পাওয়া', 'মজুরি না পাওয়া',
      'বেতন বন্ধ', 'মজুরি বন্ধ', 'বেতন দেরি', 'মজুরি দেরি',
      'বেতন কমানো', 'মজুরি কমানো', 'বেতন বাড়ানো', 'মজুরি বাড়ানো',
      'বেতন ভাতা', 'মজুরি ভাতা', 'বেতন সুবিধা', 'মজুরি সুবিধা',
      'বেতন ক্যালকুলেটর', 'মজুরি ক্যালকুলেটর', 'বেতন গণনা', 'মজুরি গণনা',
      'বেতন হিসাব', 'মজুরি হিসাব', 'বেতন পরিশোধ', 'মজুরি পরিশোধ',
      'বেতন তারিখ', 'মজুরি তারিখ', 'বেতন মাস', 'মজুরি মাস',
      'বেতন বছর', 'মজুরি বছর', 'বেতন কিস্তি', 'মজুরি কিস্তি',
      'বেতন চেক', 'মজুরি চেক', 'বেতন স্লিপ', 'মজুরি স্লিপ',
      'বেতন রসিদ', 'মজুরি রসিদ', 'বেতন প্রমাণ', 'মজুরি প্রমাণ'
    ]

    const lowerQuestion = question.toLowerCase().trim()
    
    // Allow common greetings and short questions in all languages
    const commonGreetings = [
      // English
      'hi', 'hello', 'hey', 'help', 'what', 'how', 'when', 'where', 'why', 'can', 'do', 'is', 'are',
      // Bahasa Malaysia
      'hai', 'helo', 'tolong', 'apa', 'bagaimana', 'bila', 'di mana', 'kenapa', 'boleh', 'adakah',
      // Nepali
      'नमस्ते', 'हेलो', 'मद्दत', 'के', 'कसरी', 'कहिले', 'कहाँ', 'किन', 'सक्छु', 'हो',
      // Hindi
      'नमस्ते', 'हैलो', 'मदद', 'क्या', 'कैसे', 'कब', 'कहाँ', 'क्यों', 'कर सकता', 'है',
      // Bengali
      'হ্যালো', 'হেল্প', 'কী', 'কিভাবে', 'কখন', 'কোথায়', 'কেন', 'করতে পারি', 'হয়'
    ]
    
    // If it's a very short message (1-3 words), be more lenient
    const wordCount = lowerQuestion.split(/\s+/).length
    if (wordCount <= 3) {
      // Allow common greetings and questions
      if (commonGreetings.some(greeting => lowerQuestion.startsWith(greeting))) {
        return true
      }
    }
    
    // Check for relevant keywords for longer questions
    return keywords.some(keyword => lowerQuestion.includes(keyword))
  }

  /**
   * Search database with timeout protection
   * Uses RAG with vector similarity search, falls back to keyword search
   */
  private async searchDatabaseWithTimeout(question: string): Promise<DatabaseContext[]> {
    const lowerQuestion = question.toLowerCase()
    
    // Only use keyword search for specific statistics questions, not general location questions
    const isStatisticsQuestion = (
      lowerQuestion.includes('statistics') || 
      lowerQuestion.includes('number') || 
      (lowerQuestion.includes('migrant') && lowerQuestion.includes('workers')) ||
      (lowerQuestion.includes('how many') && lowerQuestion.includes('workers')) ||
      (lowerQuestion.includes('workers') && lowerQuestion.includes('in') && 
       (lowerQuestion.includes('selangor') || lowerQuestion.includes('johor') || 
        lowerQuestion.includes('penang') || lowerQuestion.includes('kuala lumpur')))
    )
    
    if (isStatisticsQuestion) {
      return this.fallbackKeywordSearch(question)
    }
    
    return Promise.race([
      this.searchDatabaseRAG(question),
      new Promise<DatabaseContext[]>((resolve) =>
        setTimeout(() => resolve([]), this.timeoutMs)
      )
    ])
  }

  /**
   * RAG: Vector similarity search across all knowledge tables
   * Uses embeddings to find semantically similar content
   */
  private async searchDatabaseRAG(question: string): Promise<DatabaseContext[]> {
    try {
      // Generate embedding for the question
      const { embedding } = await embeddingService.generateEmbedding(question)

      // Use the stored procedure for vector similarity search
      const result = await db.query(
        `SELECT * FROM search_knowledge_base($1::vector, $2, $3)`,
        [JSON.stringify(embedding), 0.7, 10] // similarity threshold: 0.7, limit: 10 results
      )

      // Transform results to DatabaseContext format
      return result.rows.map((row: any) => ({
        id: row.id,
        content: row.content,
        reference: row.reference,
        source: row.source
      }))
    } catch (error) {
      console.error('RAG search error:', error)
      // Fallback to keyword search if vector search fails
      return this.fallbackKeywordSearch(question)
    }
  }

  /**
   * Fallback: Traditional keyword search (backup if RAG fails)
   * Searches across rights_guide, FAQ, employment_laws, and migration statistics
   */
  private async fallbackKeywordSearch(question: string): Promise<DatabaseContext[]> {
    console.log('⚠️  Using fallback keyword search')
    const searchTerm = `%${question}%`
    const contexts: DatabaseContext[] = []

    try {
      // Search rights_guide
      const rightsResults = await db.query(
        `SELECT id, question, answer, law_ref
         FROM rights_guide
         WHERE question ILIKE $1 OR answer ILIKE $1
         LIMIT 3`,
        [searchTerm]
      )

      rightsResults.rows.forEach((row: any) => {
        contexts.push({
          id: row.id,
          content: `Q: ${row.question}\nA: ${row.answer}`,
          reference: row.law_ref || '',
          source: 'rights_guide'
        })
      })

      // Search FAQ
      const faqResults = await db.query(
        `SELECT id, question, answer
         FROM faq
         WHERE question ILIKE $1 OR answer ILIKE $1
         LIMIT 3`,
        [searchTerm]
      )

      faqResults.rows.forEach((row: any) => {
        contexts.push({
          id: row.id,
          content: `Q: ${row.question}\nA: ${row.answer}`,
          reference: '',
          source: 'faq'
        })
      })

      // Search employment_laws
      const lawResults = await db.query(
        `SELECT id, title, section, content
         FROM employment_laws
         WHERE content ILIKE $1 OR title ILIKE $1
         LIMIT 2`,
        [searchTerm]
      )

      lawResults.rows.forEach((row: any) => {
        contexts.push({
          id: row.id,
          content: `${row.title} - ${row.section}: ${row.content}`,
          reference: `${row.title}-${row.section}`,
          source: 'employment_laws'
        })
      })

      // Search migration statistics (states table)
      try {
        const stateResults = await db.query(
          `SELECT state_code, state_name_en, migrant_number, risk_level,
                  manuf_perc_in_state, const_perc_in_state, agric_percent_in_state
           FROM states
           WHERE state_name_en ILIKE $1 OR $1 ILIKE '%' || state_name_en || '%'
           LIMIT 5`,
          [searchTerm]
        )

        stateResults.rows.forEach((row: any) => {
          contexts.push({
            id: row.state_code,
            content: `State: ${row.state_name_en} - Migrant Workers: ${row.migrant_number.toLocaleString()} - Risk Level: ${row.risk_level} - Manufacturing: ${row.manuf_perc_in_state}% - Construction: ${row.const_perc_in_state}% - Agriculture: ${row.agric_percent_in_state}%`,
            reference: `state-${row.state_code}`,
            source: 'migration_stats'
          })
        })

        // If no specific state found, provide all states data for general statistics questions
        if (stateResults.rows.length === 0 && 
            (question.toLowerCase().includes('statistics') || 
             question.toLowerCase().includes('number') || 
             question.toLowerCase().includes('workers') ||
             question.toLowerCase().includes('migration'))) {
          const allStatesResults = await db.query(
            `SELECT state_name_en, migrant_number, risk_level
             FROM states
             ORDER BY migrant_number DESC
             LIMIT 10`
          )

          allStatesResults.rows.forEach((row: any) => {
            contexts.push({
              id: 0,
              content: `${row.state_name_en}: ${row.migrant_number.toLocaleString()} migrant workers (${row.risk_level} risk)`,
              reference: 'states-overview',
              source: 'migration_stats'
            })
          })
        }
      } catch (error) {
        console.log('States table query failed, using insights API instead:', (error as Error).message)
        // Fallback to insights API if direct database query fails
        try {
          const insightsResponse = await fetch('http://localhost:3000/api/insights/states')
          const insightsData = await insightsResponse.json() as { rows: any[] }
          
          const matchingStates = insightsData.rows.filter((state: any) => 
            state.state_name_en.toLowerCase().includes(searchTerm.replace(/%/g, '').toLowerCase()) ||
            searchTerm.replace(/%/g, '').toLowerCase().includes(state.state_name_en.toLowerCase())
          )
          
          matchingStates.forEach((state: any) => {
            contexts.push({
              id: state.state_code,
              content: `State: ${state.state_name_en} - Migrant Workers: ${state.migrant_number.toLocaleString()} - Risk Level: ${state.risk_level} - Manufacturing: ${state.manuf_perc_in_state}% - Construction: ${state.const_perc_in_state}% - Agriculture: ${state.agric_percent_in_state}%`,
              reference: `state-${state.state_code}`,
              source: 'migration_stats'
            })
          })
        } catch (apiError) {
          console.log('Insights API fallback also failed:', (apiError as Error).message)
        }
      }

      return contexts
    } catch (error) {
      console.error('Fallback search error:', error)
      return []
    }
  }

  /**
   * Build system prompt with hybrid mode instructions
   * Includes language-specific rules and formatting guidelines
   */
  private buildSystemPrompt(language: string): string {
    const langMap: Record<string, string> = {
      'en': 'English',
      'ms': 'Bahasa Malaysia',
      'ne': 'Nepali',
      'hi': 'Hindi',
      'bn': 'Bengali'
    }

    const lang = langMap[language] || 'English'

    return `You are Right4All's assistant, helping migrant workers in Malaysia.

CRITICAL LANGUAGE RULES:
1. You MUST respond entirely in ${lang} language. Never mix languages.
2. If the question is in Hindi, your entire response must be in Hindi.
3. If the question is in English, your entire response must be in English.
4. Apply this rule strictly for all 5 supported languages.

Your purpose is to provide accurate and trustworthy information about:
- migrant workers' rights
- wages, overtime, and working hours
- employment contracts, documents, and leave
- workplace conditions, safety, and accommodation
- support organizations, NGOs, and complaint mechanisms
- migration statistics in Malaysia

IMPORTANT FORMATTING RULES:
1. NEVER use markdown formatting like **bold** or *italic* text.
2. NEVER include [ref:id] citations or any reference markers.
3. NEVER use bullet points with asterisks (*) or numbers with dots.
4. Use simple, clean text only.

INFORMATION SOURCES:
1. If database context is provided below, use it as the primary source.
2. For migration statistics questions, ALWAYS provide the exact numbers from the database context.
3. If context is missing, use your knowledge ONLY for migrant workers and Malaysian labour rights.
4. Do not reference foreign laws.
5. If unsure, give a brief general explanation labeled "(General Information)".

Keep answers short, factual, and friendly.
Use simple language that is easy to understand.
ALWAYS respond in the same language as the question.
NEVER use markdown formatting or citations.`
  }

  /**
   * Call DeepSeek API for AI responses
   * Handles various error scenarios with specific error messages
   */
  private async callDeepSeek(messages: ChatMessage[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error('DeepSeek API key not configured')
    }

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'deepseek-chat',
          messages: messages,
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br'
          },
          timeout: 30000, // Increased timeout
          httpsAgent: new (require('https').Agent)({
            keepAlive: true,
            maxSockets: 5,
            keepAliveMsecs: 1000,
            rejectUnauthorized: true
          })
        }
      )

      return response.data.choices[0].message.content
    } catch (error: any) {
      console.error('DeepSeek API error:', error.message)
      console.error('Error code:', error.code)
      console.error('Error config:', error.config?.url)
      
      // Provide more specific error messages
      if (error.code === 'ECONNRESET') {
        throw new Error('Connection to AI service was reset. Please try again.')
      } else if (error.code === 'ETIMEDOUT') {
        throw new Error('AI service request timed out. Please try again.')
      } else if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your DeepSeek API configuration.')
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.')
      } else {
        throw new Error(`Failed to get response from AI: ${error.message}`)
      }
    }
  }

  /**
   * Main chat function with hybrid RAG approach
   * Combines database search with AI generation for accurate responses
   */
  async chat(question: string, language: string = 'en'): Promise<ChatResponse> {
    const startTime = Date.now()

    // Check if question is relevant
    if (!this.isRelevantQuestion(question)) {
      return {
        answer: "I'm sorry, I can only answer questions about migrant workers, labour rights, wages, and working conditions in Malaysia. Please visit the Support page for other inquiries.",
        sourceType: 'off-topic',
        citations: [],
        responseTime: Date.now() - startTime
      }
    }

    // Search database with timeout
    const contexts = await this.searchDatabaseWithTimeout(question)

    // For statistics questions, use fallback directly to ensure numbers are provided
    const lowerQuestion = question.toLowerCase()
    const isStatisticsQuestion = (
      lowerQuestion.includes('statistics') || 
      lowerQuestion.includes('number') || 
      (lowerQuestion.includes('migrant') && lowerQuestion.includes('workers')) ||
      (lowerQuestion.includes('how many') && lowerQuestion.includes('workers')) ||
      (lowerQuestion.includes('workers') && lowerQuestion.includes('in') && 
       (lowerQuestion.includes('selangor') || lowerQuestion.includes('johor') || 
        lowerQuestion.includes('penang') || lowerQuestion.includes('kuala lumpur')))
    )
    
    if (isStatisticsQuestion) {
      const migrationContexts = contexts.filter(ctx => ctx.source === 'migration_stats')
      if (migrationContexts.length > 0) {
        const fallbackAnswer = this.generateFallbackAnswer(question, migrationContexts, language)
        return {
          answer: fallbackAnswer,
          sourceType: 'database',
          citations: migrationContexts.map(ctx => ctx.reference).filter(ref => ref),
          responseTime: Date.now() - startTime
        }
      }
    }

    // Debug: Check what contexts are found for statistics questions
    if (lowerQuestion.includes('statistics') || 
        lowerQuestion.includes('number') || 
        (lowerQuestion.includes('migrant') && lowerQuestion.includes('workers'))) {
      console.log('Statistics question detected. Found contexts:', contexts.map(ctx => ({
        source: ctx.source,
        content: ctx.content.substring(0, 100) + '...'
      })))
    }

    // Build messages
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: this.buildSystemPrompt(language)
      }
    ]

    // Add context if found
    if (contexts.length > 0) {
      const contextText = contexts.map((ctx, idx) =>
        `[${idx + 1}] ${ctx.content}${ctx.reference ? ` [ref:${ctx.reference}]` : ''}`
      ).join('\n\n')

      messages.push({
        role: 'system',
        content: `CONTEXT FROM DATABASE:\n${contextText}`
      })
    }

    // Add user question
    messages.push({
      role: 'user',
      content: question
    })

    try {
      // Call DeepSeek
      const answer = await this.callDeepSeek(messages)

      // Extract citations from answer
      const citationRegex = /\[ref:([^\]]+)\]/g
      const citations: string[] = []
      let match
      while ((match = citationRegex.exec(answer)) !== null) {
        citations.push(match[1])
      }

      // Determine source type
      const sourceType = contexts.length > 0 ? 'database' : 'general'

      return {
        answer,
        sourceType,
        citations,
        responseTime: Date.now() - startTime
      }
    } catch (error) {
      console.error('Chatbot API call failed, using fallback response:', error)
      
      // Fallback response when AI service is unavailable
      if (contexts.length > 0) {
        // If we have database context, provide a basic answer
        const fallbackAnswer = this.generateFallbackAnswer(question, contexts, language)
        return {
          answer: fallbackAnswer,
          sourceType: 'database',
          citations: contexts.map(ctx => ctx.reference).filter(ref => ref),
          responseTime: Date.now() - startTime
        }
      } else {
        // If no context, provide a generic response
        return {
          answer: "I'm currently experiencing technical difficulties with the AI service. However, I can still help you with wage calculations and provide information from our database. Please try asking your question again or use the wage calculator feature.",
          sourceType: 'general',
          citations: [],
          responseTime: Date.now() - startTime
        }
      }
    }
  }

  /**
   * Generate fallback answer when AI service is unavailable
   * Provides basic responses based on question keywords and available context
   */
  private generateFallbackAnswer(question: string, contexts: DatabaseContext[], language: string): string {
    const langMap: Record<string, string> = {
      'en': 'English',
      'ms': 'Bahasa Malaysia',
      'ne': 'Nepali',
      'hi': 'Hindi',
      'bn': 'Bengali'
    }

    const lang = langMap[language] || 'English'

    // Simple fallback logic based on question keywords
    const lowerQuestion = question.toLowerCase()
    
    // Check for migration statistics questions
    if (lowerQuestion.includes('migrant') || lowerQuestion.includes('worker') || 
        lowerQuestion.includes('statistics') || lowerQuestion.includes('number') ||
        lowerQuestion.includes('state') || lowerQuestion.includes('selangor') ||
        lowerQuestion.includes('johor') || lowerQuestion.includes('penang') ||
        lowerQuestion.includes('kuala lumpur') || lowerQuestion.includes('kl')) {
      
      // Find migration statistics contexts
      const migrationContexts = contexts.filter(ctx => ctx.source === 'migration_stats')
      if (migrationContexts.length > 0) {
        if (migrationContexts.length === 1) {
          return `Based on our database: ${migrationContexts[0].content}`
        } else {
          const answers = migrationContexts.map(ctx => ctx.content).join('\n')
          return `Based on our database:\n${answers}`
        }
      }
    }
    
    if (lowerQuestion.includes('overtime') || lowerQuestion.includes('ot')) {
      return `Based on Malaysian Employment Act, overtime is calculated at 1.5 times the hourly rate for work beyond normal working hours. For more precise calculation, please use our wage calculator tool.`
    } else if (lowerQuestion.includes('wage') || lowerQuestion.includes('salary')) {
      return `The minimum wage in Malaysia varies by region. For current rates and calculations, please use our wage calculator tool.`
    } else if (lowerQuestion.includes('leave') || lowerQuestion.includes('holiday')) {
      return `Employees in Malaysia are entitled to annual leave, sick leave, and public holidays as per the Employment Act. The exact entitlement depends on your length of service.`
    } else {
      // Return the most relevant context
      const mainContext = contexts[0]
      return `Based on our database: ${mainContext.content}`
    }
  }

  /**
   * Calculate wages with step-by-step breakdown
   * Implements Malaysian Employment Act wage calculation rules
   */
  async calculateWage(monthlySalary: number, overtimeHours: number = 0): Promise<WageCalculation> {
    const steps: string[] = []

    // Daily wage
    const dailyWage = monthlySalary / 26
    steps.push(`Daily wage = RM ${monthlySalary.toFixed(2)} ÷ 26 = RM ${dailyWage.toFixed(2)}`)

    // Hourly wage
    const hourlyWage = dailyWage / 8
    steps.push(`Hourly wage = RM ${dailyWage.toFixed(2)} ÷ 8 = RM ${hourlyWage.toFixed(2)}`)

    // Overtime pay
    let totalOvertimePay = 0
    if (overtimeHours > 0) {
      const overtimeRate = hourlyWage * 1.5
      totalOvertimePay = overtimeRate * overtimeHours
      steps.push(`Overtime rate = RM ${hourlyWage.toFixed(2)} × 1.5 = RM ${overtimeRate.toFixed(2)}`)
      steps.push(`Total overtime pay = RM ${overtimeRate.toFixed(2)} × ${overtimeHours} hours = RM ${totalOvertimePay.toFixed(2)}`)
    }

    return {
      steps,
      citation: '[ref:EA-Section-60I]',
      totalOvertimePay: totalOvertimePay > 0 ? totalOvertimePay : undefined
    }
  }

  /**
   * Save conversation for analytics and monitoring
   * Records user questions, bot responses, and performance metrics
   */
  async saveConversation(
    sessionId: string,
    question: string,
    response: ChatResponse,
    language: string
  ): Promise<void> {
    try {
      await db.query(
        `INSERT INTO chatbot_conversations
         (session_id, user_question, bot_response, source_type, language, response_time_ms, citations)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          sessionId,
          question,
          response.answer,
          response.sourceType,
          language,
          response.responseTime,
          response.citations
        ]
      )
    } catch (error) {
      console.error('Error saving conversation:', error)
    }
  }
}

// Export singleton instance of the chatbot service
export const chatbotService = new ChatbotService()
