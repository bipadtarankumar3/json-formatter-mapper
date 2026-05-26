import ContactPage from '@/components/ContactPage';

export const metadata = {
  title: 'Contact Us | Developer Help & Feedback Desk',
  description: 'Reach out to the Revoxera engineering team. Report tool bugs, request new converters, or submit API workspace suggestions.',
  keywords: 'contact revoxera, developer tools support, bug reports, feature requests',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/contact',
  }
};

export default function Page() {
  return <ContactPage />;
}
