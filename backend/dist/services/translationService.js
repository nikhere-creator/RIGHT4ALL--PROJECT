"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translationService = exports.TranslationService = void 0;
// Google Translate API implementation
class GoogleTranslateProvider {
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async translate(text, from, to) {
        try {
            const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    source: from,
                    target: to,
                    format: 'text'
                })
            });
            if (!response.ok) {
                throw new Error(`Google Translate API error: ${response.statusText}`);
            }
            const data = await response.json();
            return data.data.translations[0].translatedText;
        }
        catch (error) {
            console.error('Google Translate error:', error);
            throw error;
        }
    }
}
// LibreTranslate API implementation (free alternative)
class LibreTranslateProvider {
    baseUrl;
    apiKey;
    constructor(baseUrl = 'https://libretranslate.com/translate', apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }
    async translate(text, from, to) {
        try {
            const body = {
                q: text,
                source: from,
                target: to,
                format: 'text'
            };
            if (this.apiKey) {
                body.api_key = this.apiKey;
            }
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error(`LibreTranslate API error: ${response.statusText}`);
            }
            const data = await response.json();
            return data.translatedText;
        }
        catch (error) {
            console.error('LibreTranslate error:', error);
            throw error;
        }
    }
}
// Fallback static translations for common content
class StaticTranslationProvider {
    translations = {
        // Common phrases
        'Know your rights, stay protected': {
            'ne': 'आफ्ना अधिकार जान्नुहोस्, सुरक्षित रहनुहोस्',
            'hi': 'अपने अधिकार जानें, सुरक्षित रहें',
            'bn': 'আপনার অধিকার জানুন, সুরক্ষিত থাকুন',
            'ms': 'Kenali hak anda, kekal dilindungi'
        },
        'Right4All': {
            'ne': 'Right4All',
            'hi': 'Right4All',
            'bn': 'Right4All',
            'ms': 'Right4All'
        },
        'Home': {
            'ne': 'घर',
            'hi': 'होम',
            'bn': 'হোম',
            'ms': 'Laman Utama'
        },
        'Labour Market': {
            'ne': 'श्रम बजार',
            'hi': 'श्रम बाज़ार',
            'bn': 'শ্রমবাজার',
            'ms': 'Pasaran Buruh'
        },
        'Rights Guide': {
            'ne': 'अधिकार गाइड',
            'hi': 'अधिकार गाइड',
            'bn': 'অধিকার গাইড',
            'ms': 'Panduan Hak'
        },
        'Know Your Rights': {
            'ne': 'तपाईंको अधिकार जान्नुहोस्',
            'hi': 'अपने अधिकार जानें',
            'bn': 'আপনার অধিকার জানুন',
            'ms': 'Kuiz Hak'
        },
        'Tools': {
            'ne': 'उपकरण',
            'hi': 'उपकरण',
            'bn': 'টুলস',
            'ms': 'Alat'
        },
        'Community': {
            'ne': 'समुदाय',
            'hi': 'समुदाय',
            'bn': 'কমিউনিটি',
            'ms': 'Komuniti'
        },
        // Community page translations
        'Community Hub': {
            'ne': 'समुदायिक केन्द्र',
            'hi': 'कम्युनिटी हब',
            'bn': 'কমিউনিটি হাব',
            'ms': 'Hab Komuniti'
        },
        '✨ Real voices. Real help. Real life in Malaysia. ✨': {
            'ne': '✨ वास्तविक आवाज। वास्तविक सहायता। मलेसियामा वास्तविक जीवन। ✨',
            'hi': '✨ असली आवाज़ें। असली मदद। मलेशिया में असली जिंदगी। ✨',
            'bn': '✨ সত্যিকারের কণ্ঠস্বর। সত্যিকারের সাহায্য। মালয়েশিয়ায় সত্যিকারের জীবন। ✨',
            'ms': '✨ Suara sebenar. Bantuan sebenar. Kehidupan sebenar di Malaysia. ✨'
        },
        'Search for help': {
            'ne': 'सहायताका लागि खोज्नुहोस्',
            'hi': 'मदद के लिए खोजें',
            'bn': 'সাহায্যের জন্য অনুসন্ধান করুন',
            'ms': 'Cari bantuan'
        },
        "Type what you need... like 'legal help' or 'housing'": {
            'ne': "तपाईंलाई के चाहिन्छ टाइप गर्नुहोस्... जस्तै 'कानुनी सहायता' वा 'आवास'",
            'hi': "जो चाहिए वो टाइप करें... जैसे 'कानूनी सहायता' या 'आवास'",
            'bn': "আপনার যা দরকার তা টাইপ করুন... যেমন 'আইনি সাহায্য' বা 'আবাসন'",
            'ms': "Taip apa yang anda perlukan... seperti 'bantuan undang-undang' atau 'perumahan'"
        },
        'Organizations': {
            'ne': 'संगठनहरू',
            'hi': 'संगठन',
            'bn': 'সংস্থাসমূহ',
            'ms': 'Organisasi'
        },
        'Survivor Stories': {
            'ne': 'बाँचेकाहरूका कथाहरू',
            'hi': 'बचे हुए लोगों की कहानियाँ',
            'bn': 'বেঁচে থাকা ব্যক্তিদের গল্প',
            'ms': 'Kisah Mangsa'
        },
        'Life Hacks': {
            'ne': 'जीवन युक्तिहरू',
            'hi': 'जीवन की तरकीबें',
            'bn': 'জীবনের কৌশল',
            'ms': 'Tip Kehidupan'
        },
        'Find Help': {
            'ne': 'सहायता खोज्नुहोस्',
            'hi': 'मदद खोजें',
            'bn': 'সাহায্য খুঁজুন',
            'ms': 'Cari Bantuan'
        },
        'Connect with trusted organizations': {
            'ne': 'विश्वसनीय संगठनहरूसँग जडान गर्नुहोस्',
            'hi': 'विश्वसनीय संगठनों से जुड़ें',
            'bn': 'বিশ্বস্ত সংস্থাগুলির সাথে সংযোग করুন',
            'ms': 'Hubungi organisasi yang dipercayai'
        },
        'Learn from others experiences': {
            'ne': 'अरूको अनुभवबाट सिक्नुहोस्',
            'hi': 'दूसरों के अनुभव से सीखें',
            'bn': 'অন্যদের অভিজ্ঞতা থেকে শিখুন',
            'ms': 'Belajar dari pengalaman orang lain'
        },
        'Practical guides for daily life': {
            'ne': 'दैनिक जीवनका लागि व्यावहारिक गाइडहरू',
            'hi': 'दैनिक जीवन के लिए व्यावहारिक गाइड',
            'bn': 'দৈনন্দিন জীবনের জন্য ব্যবহারিক গাইড',
            'ms': 'Panduan praktikal untuk kehidupan seharian'
        },
        'Loading organizations...': {
            'ne': 'संगठनहरू लोड गर्दै...',
            'hi': 'संगठन लोड हो रहे हैं...',
            'bn': 'সংস্থাগুলি লোড হচ্ছে...',
            'ms': 'Memuatkan organisasi...'
        },
        'No organizations found.': {
            'ne': 'कुनै संगठन फेला परेन।',
            'hi': 'कोई संगठन नहीं मिला।',
            'bn': 'কোনো সংস্থা পাওয়া যায়নি।',
            'ms': 'Tiada organisasi dijumpai.'
        },
        'Visit Website': {
            'ne': 'वेबसाइट हेर्नुहोस्',
            'hi': 'वेबसाइट देखें',
            'bn': 'ওয়েবসাইট দেখুন',
            'ms': 'Lawati Laman Web'
        },
        'Contact Available': {
            'ne': 'सम्पर्क उपलब्ध',
            'hi': 'संपर्क उपलब्ध',
            'bn': 'যোগাযোগ উপলব্ধ',
            'ms': 'Hubungan Tersedia'
        },
        'Click for details': {
            'ne': 'विवरणका लागि क्लिक गर्नुहोस्',
            'hi': 'विवरण के लिए क्लिक करें',
            'bn': 'বিস্তারিত জানতে ক্লিক করুন',
            'ms': 'Klik untuk butiran'
        },
        'Loading stories...': {
            'ne': 'कथाहरू लोड गर्दै...',
            'hi': 'कहानियाँ लोड हो रही हैं...',
            'bn': 'গল্পগুলি লোড হচ্ছে...',
            'ms': 'Memuatkan cerita...'
        },
        'No stories found.': {
            'ne': 'कुनै कथा फेला परेन।',
            'hi': 'कोई कहानी नहीं मिली।',
            'bn': 'কোনো গল্প পাওয়া যায়নি।',
            'ms': 'Tiada cerita dijumpai.'
        },
        'Personal Experience': {
            'ne': 'व्यक्तिगत अनुभव',
            'hi': 'व्यक्तिगत अनुभव',
            'bn': 'ব্যক্তিগত অভিজ্ঞতা',
            'ms': 'Pengalaman Peribadi'
        },
        'Key Lessons & Tips': {
            'ne': 'मुख्य पाठ र सुझावहरू',
            'hi': 'मुख्य सबक और सुझाव',
            'bn': 'মূল শিক্ষা ও পরামর্শ',
            'ms': 'Pengajaran & Tip Utama'
        },
        'Read Full Story': {
            'ne': 'पूरा कथा पढ्नुहोस्',
            'hi': 'पूरी कहानी पढ़ें',
            'bn': 'সম্পূর্ণ গল্প পড়ুন',
            'ms': 'Baca Cerita Penuh'
        },
        'Tips Available': {
            'ne': 'सुझावहरू उपलब्ध',
            'hi': 'सुझाव उपलब्ध',
            'bn': 'পরামর্শ উপলব্ধ',
            'ms': 'Tip Tersedia'
        },
        'Click to read more': {
            'ne': 'थप पढ्न क्लिक गर्नुहोस्',
            'hi': 'और पढ़ने के लिए क्लिक करें',
            'bn': 'আরও পড়তে ক্লিক করুন',
            'ms': 'Klik untuk baca lagi'
        },
        'Loading resources...': {
            'ne': 'स्रोतहरू लोड गर्दै...',
            'hi': 'संसाधन लोड हो रहे हैं...',
            'bn': 'সম্পদগুলি লোড হচ্ছে...',
            'ms': 'Memuatkan sumber...'
        },
        'No resources found.': {
            'ne': 'कुनै स्रोत फेला परेन।',
            'hi': 'कोई संसाधन नहीं मिला।',
            'bn': 'কোনো সম্পদ পাওয়া যায়নি।',
            'ms': 'Tiada sumber dijumpai.'
        },
        'Complete Step-by-step Guide': {
            'ne': 'पूर्ण चरणबद्ध गाइड',
            'hi': 'पूर्ण चरणबद्ध गाइड',
            'bn': 'সম্পূর্ণ ধাপে ধাপে গাইড',
            'ms': 'Panduan Langkah-demi-Langkah Lengkap'
        },
        'Who is this for?': {
            'ne': 'यो कसका लागि हो?',
            'hi': 'यह किसके लिए है?',
            'bn': 'এটি কার জন্য?',
            'ms': 'Ini untuk siapa?'
        },
        'What you need': {
            'ne': 'तपाईंलाई के चाहिन्छ',
            'hi': 'आपको क्या चाहिए',
            'bn': 'আপনার যা দরকার',
            'ms': 'Apa yang anda perlukan'
        },
        'Cost & Time': {
            'ne': 'लागत र समय',
            'hi': 'लागत और समय',
            'bn': 'খরচ ও সময়',
            'ms': 'Kos & Masa'
        },
        'Legal information': {
            'ne': 'कानुनी जानकारी',
            'hi': 'कानूनी जानकारी',
            'bn': 'আইনি তথ্য',
            'ms': 'Maklumat undang-undang'
        },
        'Problems & Scams to avoid': {
            'ne': 'समस्या र घोटालाहरू बच्न',
            'hi': 'समस्याएं और घोटाले से बचें',
            'bn': 'সমস্যা ও জালিয়াতি এড়াতে',
            'ms': 'Masalah & Penipuan untuk dielakkan'
        },
        'Where to get help': {
            'ne': 'कहाँ सहायता पाउन सकिन्छ',
            'hi': 'कहाँ से मदद मिल सकती है',
            'bn': 'কোথায় সাহায্য পাওয়া যাবে',
            'ms': 'Di mana untuk mendapatkan bantuan'
        },
        'Step-by-step guide': {
            'ne': 'चरणबद्ध गाइड',
            'hi': 'चरणबद्ध गाइड',
            'bn': 'ধাপে ধাপে গাইড',
            'ms': 'Panduan langkah-demi-langkah'
        },
        'Click to expand': {
            'ne': 'विस्तार गर्न क्लिक गर्नुहोस्',
            'hi': 'विस्तार के लिए क्लिक करें',
            'bn': 'সম্প্রসারিত করতে ক্লিক করুন',
            'ms': 'Klik untuk kembangkan'
        },
        "Can't find what you need? Use the search box above to find help, or try different filters to discover more resources.": {
            'ne': 'तपाईंलाई चाहिएको कुरा फेला पार्न सक्नुभएन? सहायता खोज्न माथिको खोज बाकस प्रयोग गर्नुहोस्, वा थप स्रोतहरू पत्ता लगाउन विभिन्न फिल्टरहरू प्रयास गर्नुहोस्।',
            'hi': 'आपको जो चाहिए वो नहीं मिल रहा? मदद के लिए ऊपर सर्च बॉक्स का उपयोग करें, या अधिक संसाधन खोजने के लिए अलग फिल्टर आज़माएं।',
            'bn': 'আপনার যা দরকার তা খুঁজে পাচ্ছেন না? সাহায্যের জন্য উপরের সার্চ বক্স ব্যবহার করুন, বা আরও সম্পদ আবিষ্কার করতে বিভিন্ন ফিল্টার চেষ্টা করুন।',
            'ms': 'Tidak jumpa apa yang anda perlukan? Gunakan kotak carian di atas untuk mencari bantuan, atau cuba penapis berbeza untuk menemui lebih banyak sumber.'
        }
    };
    async translate(text, from, to) {
        const translation = this.translations[text]?.[to];
        if (translation) {
            return translation;
        }
        // If no static translation found, return original text
        return text;
    }
}
class TranslationService {
    providers;
    cache = new Map();
    constructor() {
        this.providers = [
            new StaticTranslationProvider(),
        ];
        // Add external providers if API keys are available
        if (process.env.GOOGLE_TRANSLATE_API_KEY) {
            this.providers.push(new GoogleTranslateProvider(process.env.GOOGLE_TRANSLATE_API_KEY));
        }
        if (process.env.LIBRETRANSLATE_URL) {
            this.providers.push(new LibreTranslateProvider(process.env.LIBRETRANSLATE_URL, process.env.LIBRETRANSLATE_API_KEY));
        }
    }
    getCacheKey(text, from, to) {
        return `${from}-${to}-${text}`;
    }
    async translate(text, from = 'en', to) {
        // Return original if same language
        if (from === to) {
            return text;
        }
        // Check cache first
        const cacheKey = this.getCacheKey(text, from, to);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        // Try each provider in order
        for (const provider of this.providers) {
            try {
                const translation = await provider.translate(text, from, to);
                // Cache the result
                this.cache.set(cacheKey, translation);
                return translation;
            }
            catch (error) {
                console.error(`Translation provider failed:`, error);
                continue;
            }
        }
        // If all providers fail, return original text
        console.warn(`No translation available for "${text}" from ${from} to ${to}`);
        return text;
    }
    async translateBatch(texts, from = 'en', to) {
        const results = {};
        // Process translations in parallel
        const promises = texts.map(async (text) => {
            const translation = await this.translate(text, from, to);
            results[text] = translation;
        });
        await Promise.all(promises);
        return results;
    }
    // Clear cache method
    clearCache() {
        this.cache.clear();
    }
    // Get supported languages
    getSupportedLanguages() {
        return ['en', 'ms', 'ne', 'hi', 'bn'];
    }
}
exports.TranslationService = TranslationService;
exports.translationService = new TranslationService();
//# sourceMappingURL=translationService.js.map