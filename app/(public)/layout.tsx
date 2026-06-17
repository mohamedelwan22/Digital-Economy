import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/home/NewFooter'
import { getContentMulti } from '@/lib/content'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const footerContent = await getContentMulti([
    'footer_email', 'footer_phone', 'footer_location', 'footer_copyright',
    'footer_contact_title', 'footer_social_title', 'footer_newsletter_title',
    'footer_newsletter_placeholder', 'footer_newsletter_btn',
    'footer_twitter', 'footer_instagram', 'footer_linkedin', 'footer_youtube', 'footer_snapchat',
    'logo_title', 'logo_subtitle', 'logo_image',
    'contact_email', 'contact_phone',
  ]).catch(() => ({}))

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer content={footerContent} />
    </>
  )
}
