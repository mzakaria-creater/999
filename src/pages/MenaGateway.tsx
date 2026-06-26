import { useLanguage } from '@/context/LanguageContext'
import {
  Shield, Globe, Zap, CreditCard, BarChart3, CheckCircle2, ArrowRight,
  Sparkles, ShieldAlert
} from 'lucide-react'

export default function MenaGateway() {
  const { language, dir } = useLanguage()

  // Translations
  const t = {
    ar: {
      title: 'بوابة الموحدة',
      subtitle: 'تكامل سلس. أمان عالي. نمو مستدام.',
      headerServices: 'الخدمات',
      headerFeatures: 'الميزات',
      headerPartners: 'الشركاء',
      headerContact: 'تواصل معنا',
      startNow: 'ابدأ الآن',
      access: 'طلب الوصول',
      learnMore: 'اعرف أكثر',
      servicesTitle: 'خدماتنا الرئيسية',
      servicesSubtitle: 'حلول متكاملة مصممة خصيصاً لسوق الشرق الأوسط وشمال أفريقيا',
      featuresTitle: 'لماذا تختار بوابة الموحدة؟',
      partnersTitle: 'الشراكات الموثوقة',
      partnersSubtitle: 'نعمل مع أفضل الخدمات والمؤسسات المالية لتوفير تغطية كاملة',
      ctaTitle: 'جاهز للبدء في توسيع أعمالك؟',
      ctaSubtitle: 'انضم إلى آلاف الشركات التي تثق ببوابة الموحدة لتحقيق أهدافها المالية وتسهيل مدفوعاتها.',
      ctaButton: 'طلب عرض توضيحي مجاني',
      footerAbout: 'عن البوابة الموحدة',
      footerAboutDesc: 'منصة دفع رائدة في الشرق الأوسط توفر حلولاً متكاملة ومخصصة للمؤسسات والشركات الناشئة.',
      footerRights: 'جميع الحقوق محفوظة.',
      services: [
        {
          title: 'المدفوعات',
          desc: 'معالجة آمنة وسريعة لجميع وسائل الدفع المحلية والعالمية.',
          icon: CreditCard,
          color: 'text-accent-blue',
          bg: 'bg-accent-blue/10'
        },
        {
          title: 'التكامل المرن',
          desc: 'واجهات برمجية سهلة الاستخدام ومستندات تطوير متكاملة للتطبيقات والأنظمة.',
          icon: Zap,
          color: 'text-accent-orange',
          bg: 'bg-accent-orange/10'
        },
        {
          title: 'التحليلات الذكية',
          desc: 'رؤى عميقة وتقارير مفصلة وتتبع المعاملات في الوقت الفعلي.',
          icon: BarChart3,
          color: 'text-accent-green',
          bg: 'bg-accent-green/10'
        },
        {
          title: 'الأمان المتقدم',
          desc: 'تشفير عالي المستوى والامتثال التام لمعايير أمن البيانات الدولية PCI-DSS.',
          icon: Shield,
          color: 'text-accent-indigo',
          bg: 'bg-accent-indigo/10'
        },
        {
          title: 'النطاق الإقليمي',
          desc: 'دعم متعدد الدول والعملات في منطقة الشرق الأوسط وشمال أفريقيا بربط واحد.',
          icon: Globe,
          color: 'text-accent-blue',
          bg: 'bg-accent-blue/10'
        },
        {
          title: 'الأداء الفائق',
          desc: 'سرعة فائقة وموثوقية عالية بنسبة تشغيل تبلغ 99.99% لمعاملاتك.',
          icon: Sparkles,
          color: 'text-accent-green',
          bg: 'bg-accent-green/10'
        }
      ],
      features: [
        'واجهة سهلة الاستخدام ومصممة خصيصاً للمستخدم العربي',
        'دعم كامل للغة العربية والاتجاه من اليمين إلى اليسار (RTL)',
        'تكامل مباشر وسلس مع المحافظ الإلكترونية والخدمات المصرفية المحلية',
        'الالتزام الكامل بمعايير الامتثال الشرعي والقانوني في المنطقة',
        'فريق دعم فني متكامل متاح على مدار الساعة 24/7 باللغة العربية',
        'تحديثات منتظمة ومستمرة لتوفير أحدث تقنيات الدفع الآمنة'
      ],
      partners: [
        { name: 'البنك الأهلي المصري', initial: 'أهلي' },
        { name: 'أمازون للمدفوعات', initial: 'أمازون' },
        { name: 'شبكة نور المالية', initial: 'نور' },
        { name: 'زين كاش', initial: 'زين' },
        { name: 'شركة التقنية الوطنية', initial: 'تقنية' },
        { name: 'البنك العربي الموحد', initial: 'عربي' }
      ]
    },
    en: {
      title: 'Unified Gateway',
      subtitle: 'Seamless integration. High security. Sustainable growth.',
      headerServices: 'Services',
      headerFeatures: 'Features',
      headerPartners: 'Partners',
      headerContact: 'Contact Us',
      startNow: 'Start Now',
      access: 'Request Access',
      learnMore: 'Learn More',
      servicesTitle: 'Our Core Services',
      servicesSubtitle: 'Integrated solutions tailored for the MENA market',
      featuresTitle: 'Why Choose Unified Gateway?',
      partnersTitle: 'Trusted Partnerships',
      partnersSubtitle: 'We work with top services and financial institutions to ensure full coverage',
      ctaTitle: 'Ready to Scale Your Business?',
      ctaSubtitle: 'Join thousands of businesses that trust Unified Gateway to achieve their financial goals.',
      ctaButton: 'Request Access',
      footerAbout: 'About Gateway',
      footerAboutDesc: 'A leading payment platform in the MENA region providing customized, integrated solutions for enterprises and startups.',
      footerRights: 'All rights reserved.',
      services: [
        {
          title: 'Payments Processing',
          desc: 'Secure and fast processing of all local and international payment methods.',
          icon: CreditCard,
          color: 'text-accent-blue',
          bg: 'bg-accent-blue/10'
        },
        {
          title: 'Flexible Integration',
          desc: 'Developer-friendly APIs and comprehensive SDKs for all apps and platforms.',
          icon: Zap,
          color: 'text-accent-orange',
          bg: 'bg-accent-orange/10'
        },
        {
          title: 'Smart Analytics',
          desc: 'Deep insights, detailed reports, and real-time transaction tracking.',
          icon: BarChart3,
          color: 'text-accent-green',
          bg: 'bg-accent-green/10'
        },
        {
          title: 'Advanced Security',
          desc: 'Top-tier encryption and full compliance with PCI-DSS international data standards.',
          icon: Shield,
          color: 'text-accent-indigo',
          bg: 'bg-accent-indigo/10'
        },
        {
          title: 'Regional Footprint',
          desc: 'Support for multiple countries and currencies across the MENA region via one API.',
          icon: Globe,
          color: 'text-accent-blue',
          bg: 'bg-accent-blue/10'
        },
        {
          title: 'Extreme Uptime',
          desc: 'Super speed and 99.99% high availability to keep your transactions flowing.',
          icon: Sparkles,
          color: 'text-accent-green',
          bg: 'bg-accent-green/10'
        }
      ],
      features: [
        'User-friendly interface customized for Arab and regional users',
        'Full bidirectional (RTL/LTR) support and native translation',
        'Direct integration with local mobile wallets and bank networks',
        'Complete compliance with Islamic finance and local regulatory standards',
        'Dedicated 24/7 technical support team speaking your language',
        'Continuous rolling updates to provide the latest secure payment technology'
      ],
      partners: [
        { name: 'National Bank', initial: 'NBE' },
        { name: 'Amazon Pay', initial: 'AMZN' },
        { name: 'Noor Network', initial: 'NOOR' },
        { name: 'Zain Cash', initial: 'ZAIN' },
        { name: 'National Tech', initial: 'TECH' },
        { name: 'Arab Bank', initial: 'ARAB' }
      ]
    }
  }

  const content = language === 'ar' ? t.ar : t.en

  return (
    <div className="pb-12 max-w-7xl mx-auto px-4 md:px-8 w-full font-apple text-text-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-apple-gray5 to-apple-black border border-white/[0.08] p-8 md:p-16 mb-12 shadow-apple-elevated">
        {/* Geometric Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-indigo/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-semibold text-accent-blue">
            <Sparkles size={14} className="animate-pulse" />
            <span>MENA Gateway V3</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-white to-text-secondary bg-clip-text text-transparent">
            {content.title}
          </h1>

          <p className="text-lg md:text-xl text-text-secondary font-medium">
            {content.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <button className="btn px-8 py-3.5 text-base font-bold shadow-lg transform active:scale-95 transition-transform">
              {content.access}
            </button>
            <button className="btn-secondary px-8 py-3.5 text-base font-bold bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/[0.1] rounded-xl transform active:scale-95 transition-all">
              {content.learnMore}
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-16" id="services">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{content.servicesTitle}</h2>
          <p className="text-text-secondary">{content.servicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div
                key={i}
                className="apple-surface p-8 bg-apple-gray6 hover:bg-apple-gray5 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 rounded-2xl group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${svc.bg} flex items-center justify-center mb-6`}>
                    <Icon className={svc.color} size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-accent-blue group-hover:underline cursor-pointer">
                  <span>{language === 'ar' ? 'معرفة المزيد' : 'Learn more'}</span>
                  <ArrowRight size={12} className={dir === 'rtl' ? 'rotate-180' : ''} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Features Grid & Visuals */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16" id="features">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight">{content.featuresTitle}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent-blue to-accent-indigo rounded-full" />
          <ul className="space-y-4">
            {content.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-3.5 bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
                <CheckCircle2 size={20} className="text-accent-green flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-text-secondary leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual Mockup representation */}
        <div className="relative aspect-video lg:aspect-square bg-gradient-to-br from-accent-blue/20 to-accent-indigo/20 border border-white/[0.1] rounded-3xl overflow-hidden flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
          <div className="apple-surface bg-apple-black/80 p-8 rounded-2xl w-full max-w-sm border border-white/[0.12] shadow-2xl relative z-10 animate-apple-pulse">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent-red" />
                <div className="w-3 h-3 rounded-full bg-accent-orange" />
                <div className="w-3 h-3 rounded-full bg-accent-green" />
              </div>
              <span className="text-xs text-text-secondary font-mono">gateway_status: OK</span>
            </div>
            <div className="space-y-4 text-xs font-mono">
              <div className="text-accent-green">✓ Instapay SDK loaded</div>
              <div className="text-accent-blue">→ Initializing Vodafone Cash channel...</div>
              <div className="text-text-secondary">Balance Check: EGP 14,250,120.45</div>
              <div className="p-3 bg-white/[0.04] rounded-lg border border-white/[0.06] text-white">
                {"{"} <br />
                &nbsp;&nbsp;&nbsp;&nbsp;provider: "Orange Cash", <br />
                &nbsp;&nbsp;&nbsp;&nbsp;currency: "EGP", <br />
                &nbsp;&nbsp;&nbsp;&nbsp;success_rate: 99.45% <br />
                {"}"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="mb-16" id="partners">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{content.partnersTitle}</h2>
          <p className="text-text-secondary">{content.partnersSubtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {content.partners.map((partner, i) => (
            <div
              key={i}
              className="apple-surface p-6 bg-apple-gray6 hover:bg-apple-gray5 border border-white/[0.06] hover:border-accent-blue/50 transition-all rounded-xl text-center flex flex-col items-center justify-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-indigo/20 text-accent-blue font-bold flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                {partner.initial}
              </div>
              <h4 className="text-xs font-bold text-text-secondary group-hover:text-white transition-colors truncate w-full">
                {partner.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-blue to-accent-indigo border border-white/[0.08] p-8 md:p-12 text-center text-white shadow-apple-elevated mb-12">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">{content.ctaTitle}</h2>
          <p className="text-white/80 leading-relaxed text-sm md:text-base">
            {content.ctaSubtitle}
          </p>
          <button className="bg-white hover:bg-white/95 text-accent-blue font-extrabold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transform active:scale-95 transition-all inline-flex items-center gap-2">
            <span>{content.ctaButton}</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] pt-8 text-text-secondary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-3">{content.footerAbout}</h4>
            <p className="text-xs leading-relaxed max-w-sm">
              {content.footerAboutDesc}
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">{language === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">{content.headerServices}</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">{content.headerFeatures}</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">{content.headerPartners}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">{language === 'ar' ? 'الامتثال والأمان' : 'Security Compliance'}</h4>
            <div className="flex gap-2 items-center text-xs">
              <Shield size={16} className="text-accent-green" />
              <span>PCI-DSS Level 1 Compliant</span>
            </div>
            <div className="flex gap-2 items-center text-xs mt-2">
              <ShieldAlert size={16} className="text-accent-orange" />
              <span>{language === 'ar' ? 'الامتثال للأنظمة المحلية' : 'Local Compliance Assured'}</span>
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] text-text-tertiary pt-4 border-t border-white/[0.04]">
          <p>&copy; 2026 {content.title}. {content.footerRights}</p>
        </div>
      </footer>
    </div>
  )
}
