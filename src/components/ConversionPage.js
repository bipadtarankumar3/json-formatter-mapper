'use client';

import { useState } from 'react';
import WorkspaceLayout from '@/components/WorkspaceLayout';
import { 
  jsonToCsv, csvToJson, 
  jsonToXml, xmlToJson, 
  jsonToYaml, yamlToJson 
} from '@/lib/converters';
import { RefreshCw, Play } from 'lucide-react';

export default function ConversionPage({
  title = 'Converter',
  h1 = 'Converter Tool',
  intro = 'Convert data structures instantly.',
  fromFormat = 'json',
  toFormat = 'csv',
  faq = [],
  features = [],
  relatedTools = [],
  schema = null,
}) {
  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');
  const [error, setError] = useState(null);

  const handleConvert = (val = inputVal) => {
    if (!val.trim()) {
      setOutputVal('');
      setError(null);
      return;
    }
    
    try {
      setError(null);
      let parsedInput;
      
      // Step 1: Parse the input according to the source format
      if (fromFormat === 'json') {
        parsedInput = JSON.parse(val);
      } else if (fromFormat === 'csv') {
        parsedInput = csvToJson(val);
      } else if (fromFormat === 'xml') {
        parsedInput = xmlToJson(val);
      } else if (fromFormat === 'yaml') {
        parsedInput = yamlToJson(val);
      }

      // Step 2: Serialize to target format
      let result = '';
      if (toFormat === 'json') {
        result = JSON.stringify(parsedInput, null, 2);
      } else if (toFormat === 'csv') {
        result = jsonToCsv(parsedInput);
      } else if (toFormat === 'xml') {
        result = jsonToXml(parsedInput);
      } else if (toFormat === 'yaml') {
        result = jsonToYaml(parsedInput);
      }

      setOutputVal(result);
    } catch (err) {
      setError(err.message);
      setOutputVal('');
    }
  };

  const controls = (
    <div className="flex xl:flex-col gap-4 justify-center items-center">
      <button
        onClick={() => handleConvert()}
        className="p-5 rounded-3xl bg-primary text-black shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 transition-all"
        title={`Convert from ${fromFormat.toUpperCase()} to ${toFormat.toUpperCase()}`}
        suppressHydrationWarning={true}
      >
        <Play size={22} />
      </button>
    </div>
  );

  return (
    <WorkspaceLayout
      title={title}
      h1={h1}
      intro={intro}
      
      inputValue={inputVal}
      onInputChange={(val) => {
        setInputVal(val);
        handleConvert(val);
      }}
      outputValue={outputVal}
      
      inputLabel={`Source_Input.${fromFormat}`}
      outputLabel={`Target_Output.${toFormat}`}
      
      error={error}
      onClear={() => {
        setInputVal('');
        setOutputVal('');
        setError(null);
      }}
      controls={controls}
      faq={faq}
      features={features}
      relatedTools={relatedTools}
      schema={schema}
    />
  );
}
