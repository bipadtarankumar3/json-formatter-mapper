import ToolsHub from '@/components/ToolsHub';

export const metadata = {
  title: 'Developer Utilities Hub | Revoxera Tool Suite',
  description: 'Access our full suite of professional JSON tools, CSV parsers, XML builders, and API testing wrappers in a secure client-side sandbox.',
  keywords: 'json tools, json validator, json compare, xml to json, yaml parser, api tester',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/tools',
  }
};

export default function Page() {
  return <ToolsHub />;
}
