import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const content = [
    // Hero
    { key: 'hero_title', value: 'الاقتصـاد الرقـمي', type: 'text', section: 'hero' },
    { key: 'hero_subtitle', value: 'لقطاع الخدمات النسائية', type: 'text', section: 'hero' },
    { key: 'hero_badge', value: 'مبادرة', type: 'text', section: 'hero' },
    { key: 'hero_description', value: 'منظومة رقمية متكاملة لتمكين المنشآت النسائية وربطها بالعملاء وتعزيز جودة الخدمات وخلق فرص اقتصادية جديدة', type: 'text', section: 'hero' },
    { key: 'hero_btn1_text', value: 'انضمي إلى المبادرة', type: 'text', section: 'hero' },
    { key: 'hero_btn2_text', value: 'تضحي تطبيق أنيقة', type: 'text', section: 'hero' },
    { key: 'hero_image', value: '/images/Hero.png', type: 'text', section: 'hero' },

    // Stats
    { key: 'stats_title', value: 'مؤشرات المبادرة', type: 'text', section: 'stats' },
    { key: 'stats_subtitle', value: 'إحصائيات تعكس أثر المبادرة', type: 'text', section: 'stats' },

    // Sectors
    { key: 'sectors_title', value: 'قطاعاتنا المستفيدة', type: 'text', section: 'sectors' },
    { key: 'sectors_subtitle', value: 'اكتشفي القطاعات المستفيدة من مبادرة الاقتصاد الرقمي', type: 'text', section: 'sectors' },

    // About
    { key: 'about_title', value: 'عن المبادرة', type: 'text', section: 'about' },
    { key: 'about_subtitle', value: 'تعرفي على مبادرة الاقتصاد الرقمي لقطاع الخدمات النسائية', type: 'text', section: 'about' },
    { key: 'about_description', value: 'مبادرة الاقتصاد الرقمي لقطاع الخدمات النسائية هي منظومة رقمية متكاملة تهدف إلى تمكين المنشآت النسائية وربطها بالعملاء وتعزيز جودة الخدمات وخلق فرص اقتصادية جديدة', type: 'text', section: 'about' },
    { key: 'about_mission_title', value: 'الرسالة', type: 'text', section: 'about' },
    { key: 'about_mission_desc', value: 'تمكين المنشآت النسائية رقمياً وتعزيز جودة الخدمات المقدمة من خلال منظومة رقمية متكاملة', type: 'text', section: 'about' },
    { key: 'about_vision_title', value: 'الرؤية', type: 'text', section: 'about' },
    { key: 'about_vision_desc', value: 'الريادة في تمكين القطاع النسائي رقمياً على مستوى المملكة العربية السعودية', type: 'text', section: 'about' },
    { key: 'about_values_title', value: 'القيم', type: 'text', section: 'about' },
    { key: 'about_values_desc', value: 'الشفافية، التمكين، الابتكار، الجودة، الشراكة المجتمعية', type: 'text', section: 'about' },

    // Register
    { key: 'register_title', value: 'التسجيل في المبادرة', type: 'text', section: 'register' },
    { key: 'register_subtitle', value: 'انضمي إلى منظومة الاقتصاد الرقمي للخدمات النسائية', type: 'text', section: 'register' },
    { key: 'register_step1_title', value: 'معلومات المنشأة', type: 'text', section: 'register' },
    { key: 'register_step2_title', value: 'معلومات المالكة', type: 'text', section: 'register' },
    { key: 'register_step3_title', value: 'الوثائق', type: 'text', section: 'register' },
    { key: 'register_success_title', value: 'تم التسجيل بنجاح!', type: 'text', section: 'register' },
    { key: 'register_success_desc', value: 'شكراً لتسجيلك في مبادرة الاقتصاد الرقمي. سيتم مراجعة طلبك والتواصل معك قريباً.', type: 'text', section: 'register' },
    { key: 'register_btn_next', value: 'التالي', type: 'text', section: 'register' },
    { key: 'register_btn_prev', value: 'السابق', type: 'text', section: 'register' },
    { key: 'register_btn_submit', value: 'إرسال الطلب', type: 'text', section: 'register' },
    { key: 'register_btn_back', value: 'العودة للرئيسية', type: 'text', section: 'register' },

    // Contact
    { key: 'contact_title', value: 'تواصل معنا', type: 'text', section: 'contact' },
    { key: 'contact_subtitle', value: 'يسعدنا تواصلك مع فريق المبادرة', type: 'text', section: 'contact' },
    { key: 'contact_email', value: 'info@women-services-initiative.sa', type: 'text', section: 'contact' },
    { key: 'contact_phone', value: '966 5 5555 5555+', type: 'text', section: 'contact' },
    { key: 'contact_address', value: 'المملكة العربية السعودية', type: 'text', section: 'contact' },
    { key: 'contact_form_title', value: 'أرسلي رسالة', type: 'text', section: 'contact' },
    { key: 'contact_success_title', value: 'شكراً لتواصلك', type: 'text', section: 'contact' },
    { key: 'contact_success_desc', value: 'سيتم الرد عليك في أقرب وقت ممكن.', type: 'text', section: 'contact' },
    { key: 'contact_name_label', value: 'الاسم', type: 'text', section: 'contact' },
    { key: 'contact_email_label', value: 'البريد الإلكتروني', type: 'text', section: 'contact' },
    { key: 'contact_phone_label', value: 'رقم الجوال', type: 'text', section: 'contact' },
    { key: 'contact_subject_label', value: 'الموضوع', type: 'text', section: 'contact' },
    { key: 'contact_message_label', value: 'الرسالة', type: 'text', section: 'contact' },
    { key: 'contact_submit_btn', value: 'إرسال', type: 'text', section: 'contact' },

    // Partners
    { key: 'partners_title', value: 'الشركاء والداعمون', type: 'text', section: 'partners' },
    { key: 'partners_subtitle', value: 'شركاء النجاح والداعمون للمبادرة', type: 'text', section: 'partners' },

    // Reports
    { key: 'reports_title', value: 'المؤشرات والتقارير', type: 'text', section: 'reports' },
    { key: 'reports_subtitle', value: 'مؤشرات الأداء الرئيسية للمبادرة', type: 'text', section: 'reports' },
    { key: 'reports_download_btn', value: 'تحميل التقرير الكامل (PDF)', type: 'text', section: 'reports' },

    // Footer
    { key: 'footer_email', value: 'info@women-services-initiative.sa', type: 'text', section: 'footer' },
    { key: 'footer_phone', value: '966 5 5555 5555+', type: 'text', section: 'footer' },
    { key: 'footer_location', value: 'المملكة العربية السعودية', type: 'text', section: 'footer' },
    { key: 'footer_copyright', value: 'جميع الحقوق محفوظة © 2024', type: 'text', section: 'footer' },
    { key: 'footer_contact_title', value: 'معلومات التواصل', type: 'text', section: 'footer' },
    { key: 'footer_social_title', value: 'تابعينا', type: 'text', section: 'footer' },
    { key: 'footer_newsletter_title', value: 'اشتركي للحصول على آخر الأخبار والتقارير', type: 'text', section: 'footer' },
    { key: 'footer_newsletter_placeholder', value: 'أدخلي بريدك الإلكتروني', type: 'text', section: 'footer' },
    { key: 'footer_newsletter_btn', value: 'اشتركي الآن', type: 'text', section: 'footer' },

    // Logo
    { key: 'logo_title', value: 'مبادرة الاقتصاد الرقمي', type: 'text', section: 'general' },
    { key: 'logo_subtitle', value: 'لقطاع الخدمات النسائية', type: 'text', section: 'general' },
    { key: 'logo_image', value: '/images/Logo.png', type: 'text', section: 'general' },

    // Navbar
    { key: 'nav_link_home', value: 'الرئيسية', type: 'text', section: 'navbar' },
    { key: 'nav_link_about', value: 'عن المبادرة', type: 'text', section: 'navbar' },
    { key: 'nav_link_sectors', value: 'القطاعات المستهدفة', type: 'text', section: 'navbar' },
    { key: 'nav_link_reports', value: 'المؤتمرات والتقارير', type: 'text', section: 'navbar' },
    { key: 'nav_link_register', value: 'التسجيل في المبادرة', type: 'text', section: 'navbar' },
    { key: 'nav_link_partners', value: 'الشركاء والداعمون', type: 'text', section: 'navbar' },
    { key: 'nav_link_contact', value: 'تواصل معنا', type: 'text', section: 'navbar' },
    { key: 'navbar_cta_text', value: 'انضم إلى المبادرة', type: 'text', section: 'navbar' },
    { key: 'navbar_app_text', value: 'تصفح تطبيق آمنة', type: 'text', section: 'navbar' },

    // General site settings
    { key: 'site_name', value: 'الاقتصاد الرقمي', type: 'text', section: 'general' },
    { key: 'site_email', value: 'info@women-services-initiative.sa', type: 'text', section: 'general' },
    { key: 'site_status', value: 'active', type: 'text', section: 'general' },
    { key: 'site_description', value: 'منظومة رقمية متكاملة لتمكين المنشآت النسائية وربطها بالعملاء وتعزيز جودة الخدمات وخلق فرص اقتصادية جديدة', type: 'text', section: 'general' },
    { key: 'site_keywords', value: 'الاقتصاد الرقمي, الخدمات النسائية, تمكين المرأة, المنشآت النسائية, السعودية', type: 'text', section: 'general' },
  ]

  const stats = [
    { icon: 'TrendingUp', value: '+300', label: 'فرصة استثمارية', order: 1 },
    { icon: 'GraduationCap', value: '+10,000', label: 'فرصة تدريبية', order: 2 },
    { icon: 'MapPin', value: '+50', label: 'مدينة مستهدفة', order: 3 },
    { icon: 'Building2', value: '+15', label: 'قطاع خدمي', order: 4 },
    { icon: 'Store', value: '+25,000', label: 'منشأة مستهدفة', order: 5 },
  ]

  const sectors = [
    { name: 'الصالونات النسائية', description: 'خدمات التجميل والعناية بالشعر والبشرة والأظافر', icon: 'Scissors', image: '/images/sector-salon.jpg', order: 1 },
    { name: 'مراكز اللياقة النسائية', description: 'برامج رياضية متخصصة لصحة ولياقة المرأة', icon: 'Dumbbell', image: '/images/sector-fitness.jpg', order: 2 },
    { name: 'عيادات ومراكز التجميل', description: 'خدمات تجميلية مرخصة وعناية متخصصة', icon: 'Sparkles', image: '/images/sector-beauty.jpg', order: 3 },
    { name: 'الدورات التدريبية', description: 'تأهيل وتنمية المهارات للكوادر النسائية', icon: 'BookOpen', image: '/images/sector-training.jpg', order: 4 },
    { name: 'المؤتمرات والمعارض', description: 'فعاليات ومعارض متخصصة للقطاع النسائي', icon: 'CalendarDays', image: '/images/sector-events.jpg', order: 5 },
  ]

  for (const item of content) {
    await prisma.siteContent.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: item,
    })
  }

  for (const stat of stats) {
    const existing = await prisma.stat.findFirst({ where: { order: stat.order } })
    if (existing) {
      await prisma.stat.update({ where: { id: existing.id }, data: stat })
    } else {
      await prisma.stat.create({ data: stat })
    }
  }

  for (const sector of sectors) {
    const existing = await prisma.sector.findFirst({ where: { order: sector.order } })
    if (existing) {
      await prisma.sector.update({ where: { id: existing.id }, data: sector })
    } else {
      await prisma.sector.create({ data: sector })
    }
  }

  const hashedPassword = await bcrypt.hash('Admin123456', 12)
  await prisma.adminUser.upsert({
    where: { email: 'admin@initiative.sa' },
    update: { password: hashedPassword, name: 'مدير النظام', role: 'admin' },
    create: { email: 'admin@initiative.sa', password: hashedPassword, name: 'مدير النظام', role: 'admin' },
  })

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
