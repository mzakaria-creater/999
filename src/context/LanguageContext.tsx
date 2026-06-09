import { createContext, useContext, useState, ReactNode } from 'react'

export type Language = 'en' | 'ar'

interface Translations {
  [key: string]: {
    en: string
    ar: string
  }
}

const translations: Translations = {
  'dashboard': { en: 'Dashboard', ar: 'لوحة التحكم' },
  'payment': { en: 'Payment', ar: 'الدفع' },
  'deposits': { en: 'Deposits', ar: 'الإيداعات' },
  'payouts': { en: 'Payouts', ar: 'المدفوعات' },
  'approvals': { en: 'Approvals', ar: 'الموافقات' },
  'wallets': { en: 'Wallets', ar: 'المحافظ' },
  'costs': { en: 'Costs', ar: 'التكاليف' },
  'merchants': { en: 'Merchants', ar: 'التجار' },
  'users': { en: 'Users', ar: 'المستخدمون' },
  'settings': { en: 'Settings', ar: 'الإعدادات' },
  'amount': { en: 'Amount', ar: 'المبلغ' },
  'phone': { en: 'Phone', ar: 'الهاتف' },
  'email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'merchant_name': { en: 'Merchant Name', ar: 'اسم التاجر' },
  'currency': { en: 'Currency', ar: 'العملة' },
  'status': { en: 'Status', ar: 'الحالة' },
  'date': { en: 'Date', ar: 'التاريخ' },
  'action': { en: 'Action', ar: 'إجراء' },
  'success': { en: 'Success', ar: 'نجح' },
  'pending': { en: 'Pending', ar: 'قيد الانتظار' },
  'failed': { en: 'Failed', ar: 'فشل' },
  'completed': { en: 'Completed', ar: 'مكتمل' },
  'processing': { en: 'Processing', ar: 'قيد المعالجة' },
  'confirm': { en: 'Confirm', ar: 'تأكيد' },
  'cancel': { en: 'Cancel', ar: 'إلغاء' },
  'save': { en: 'Save', ar: 'حفظ' },
  'delete': { en: 'Delete', ar: 'حذف' },
  'edit': { en: 'Edit', ar: 'تعديل' },
  'view': { en: 'View', ar: 'عرض' },
  'search': { en: 'Search', ar: 'بحث' },
  'filter': { en: 'Filter', ar: 'تصفية' },
  'export': { en: 'Export', ar: 'تصدير' },
  'download': { en: 'Download', ar: 'تنزيل' },
  'upload': { en: 'Upload', ar: 'تحميل' },
  'create': { en: 'Create', ar: 'إنشاء' },
  'update': { en: 'Update', ar: 'تحديث' },
  'remove': { en: 'Remove', ar: 'إزالة' },
  'loading': { en: 'Loading...', ar: 'جاري التحميل...' },
  'no_data': { en: 'No data available', ar: 'لا توجد بيانات' },
  'error': { en: 'Error', ar: 'خطأ' },
  'warning': { en: 'Warning', ar: 'تحذير' },
  'info': { en: 'Info', ar: 'معلومة' },
  'total_volume': { en: 'Total Volume', ar: 'إجمالي الحجم' },
  'success_rate': { en: 'Success Rate', ar: 'معدل النجاح' },
  'transaction': { en: 'Transaction', ar: 'المعاملة' },
  'transactions': { en: 'Transactions', ar: 'المعاملات' },
  'wallet_health': { en: 'Wallet Health', ar: 'صحة المحفظة' },
  'failover': { en: 'Failover', ar: 'الفشل' },
  'system_status': { en: 'System Status', ar: 'حالة النظام' },
  'operational': { en: 'Operational', ar: 'تشغيلي' },
  'healthy': { en: 'Healthy', ar: 'سليم' },
  'degraded': { en: 'Degraded', ar: 'متدهور' },
  'compliance': { en: 'Compliance', ar: 'الامتثال' },
  'compliant': { en: 'Compliant', ar: 'متوافق' },
  'enterprise_dashboard': { en: 'Enterprise Dashboard', ar: 'لوحة المراقبة' },
  'realtime_metrics': { en: 'Real-time payment platform metrics & operations', ar: 'مقاييس منصة الدفع الفورية والعمليات' },
  'volume_24h': { en: 'Volume (24h)', ar: 'الحجم (24 ساعة)' },
  'checkout': { en: 'Checkout', ar: 'الدفع والشحن' },
  'select_wallet': { en: 'Select Wallet', ar: 'اختر المحفظة' },
  'transaction_location': { en: 'Transaction Location', ar: 'موقع المعاملة' },
  'deposit': { en: 'Deposit', ar: 'إيداع' },
  'payout': { en: 'Payout', ar: 'دفع' },
  'merchant_name': { en: 'Merchant Name', ar: 'اسم التاجر' },
  'merchant_email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'phone_number': { en: 'Phone Number', ar: 'رقم الهاتف' },
  'amount_egp': { en: 'Amount (EGP)', ar: 'المبلغ (جنيه)' },
  'ussd_code': { en: 'USSD Code', ar: 'كود USSD' },
  'transaction_id': { en: 'Transaction ID', ar: 'معرف المعاملة' },
  'qr_code': { en: 'QR Code', ar: 'رمز الاستجابة السريعة' },
  'scan_instructions': { en: 'Scan with your phone camera to initiate payment', ar: 'امسح ضوئياً باستخدام كاميرا هاتفك لبدء الدفع' },
  'payment_method': { en: 'Payment Method', ar: 'طريقة الدفع' },
  'provider': { en: 'Provider', ar: 'المزود' },
  'success': { en: 'Success', ar: 'نجح' },
  'real_time': { en: 'Real-time', ar: 'فوري' },
  'optimal': { en: 'Optimal', ar: 'الأمثل' },
  'excellent': { en: 'Excellent', ar: 'ممتاز' },
  'active': { en: 'Active', ar: 'نشط' },
  'inactive': { en: 'Inactive', ar: 'غير نشط' },
  'recent_activity': { en: 'Recent Activity', ar: 'النشاط الأخير' },
  'api_servers': { en: 'API Servers', ar: 'خوادم API' },
  'database': { en: 'Database', ar: 'قاعدة البيانات' },
  'gateway': { en: 'Gateway', ar: 'البوابة' },
  'operational': { en: 'Operational', ar: 'تشغيلي' },
  'system_status': { en: 'System Status', ar: 'حالة النظام' },
  'quick_actions': { en: 'Quick Actions', ar: 'الإجراءات السريعة' },
  'process_payment': { en: 'Process Payment', ar: 'معالجة الدفع' },
  'view_reports': { en: 'View Reports', ar: 'عرض التقارير' },
  'manage_wallets': { en: 'Manage Wallets', ar: 'إدارة المحافظ' },
  'enterprise_dashboard': { en: 'Enterprise Dashboard', ar: 'لوحة المراقبة' },
  'realtime_metrics': { en: 'Real-time payment platform metrics & operations', ar: 'مقاييس منصة الدفع الفورية والعمليات' },
}

export { translations as defaultTranslations }

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    const translation = translations[key.toLowerCase()]
    if (translation) {
      return translation[language]
    }
    return key
  }

  const dir = language === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} style={{ direction: dir }}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
