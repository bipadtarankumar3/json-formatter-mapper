import ValidatorPage from '@/components/ValidatorPage';

export const metadata = {
  title: 'JSON Validator | Online JSON Lint & Syntax Checker',
  description: 'Validate your JSON data online. Locate the exact line and column of parsing errors with our real-time JSON schema validator and formatter.',
  keywords: 'json validator, json lint, check json syntax, validate json online',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-validator',
  }
};

export default function Page() {
  return <ValidatorPage />;
}
