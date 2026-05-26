import yaml from 'js-yaml';

/**
 * Converts a JSON object or array to a CSV string.
 */
export function jsonToCsv(json) {
  let data = json;
  if (!Array.isArray(json)) {
    if (typeof json === 'object' && json !== null) {
      data = [json];
    } else {
      throw new Error('Input must be a JSON array or object');
    }
  }

  if (data.length === 0) return '';

  // Extract all keys dynamically across all elements to handle sparse arrays
  const headersSet = new Set();
  data.forEach(obj => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(k => headersSet.add(k));
    }
  });
  const headers = Array.from(headersSet);
  if (headers.length === 0) return '';

  const rows = data.map(obj => 
    headers.map(header => {
      const val = obj[header];
      if (val === null || val === undefined) return '';
      if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
    }).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Parses a CSV string into a JSON array of objects.
 */
export function csvToJson(csvStr) {
  const lines = [];
  let row = [""];
  lines.push(row);
  let inQuotes = false;

  for (let i = 0; i < csvStr.length; i++) {
    const c = csvStr[i];
    const next = csvStr[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',') {
      if (inQuotes) {
        row[row.length - 1] += c;
      } else {
        row.push("");
      }
    } else if (c === '\r' || c === '\n') {
      if (inQuotes) {
        row[row.length - 1] += c;
      } else {
        if (c === '\r' && next === '\n') {
          i++;
        }
        row = [""];
        lines.push(row);
      }
    } else {
      row[row.length - 1] += c;
    }
  }

  // Filter empty lines
  const cleanLines = lines.filter(r => r.length > 1 || r[0] !== "");
  if (cleanLines.length === 0) return [];

  const headers = cleanLines[0].map(h => h.trim());
  const jsonArr = [];

  for (let i = 1; i < cleanLines.length; i++) {
    const currentLine = cleanLines[i];
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      const val = currentLine[j] !== undefined ? currentLine[j].trim() : "";
      
      // Auto-cast types
      if (val.toLowerCase() === 'true') {
        obj[header] = true;
      } else if (val.toLowerCase() === 'false') {
        obj[header] = false;
      } else if (val.toLowerCase() === 'null') {
        obj[header] = null;
      } else if (!isNaN(val) && val !== '') {
        obj[header] = Number(val);
      } else {
        // Try to parse array/object format in cell
        if ((val.startsWith('{') && val.endsWith('}')) || (val.startsWith('[') && val.endsWith(']'))) {
          try {
            obj[header] = JSON.parse(val);
          } catch {
            obj[header] = val;
          }
        } else {
          obj[header] = val;
        }
      }
    }
    jsonArr.push(obj);
  }

  return jsonArr;
}

/**
 * Converts a JSON object or array to an XML string.
 */
export function jsonToXml(json, rootName = 'root') {
  function toXml(val, name) {
    const escapeXml = (str) => {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    if (val === null || val === undefined) {
      return `<${name}/>`;
    }

    if (Array.isArray(val)) {
      return val.map(item => toXml(item, name)).join('');
    }

    if (typeof val === 'object') {
      let attrs = '';
      let children = '';

      if (val['@attributes']) {
        attrs = Object.entries(val['@attributes'])
          .map(([k, v]) => ` ${k}="${escapeXml(v)}"`)
          .join('');
      }

      for (const key in val) {
        if (key === '@attributes') continue;
        if (key === '#text') {
          children += escapeXml(val[key]);
        } else {
          children += toXml(val[key], key);
        }
      }

      if (children === '') {
        return `<${name}${attrs}/>`;
      }

      return `<${name}${attrs}>${children}</${name}>`;
    }

    return `<${name}>${escapeXml(val)}</${name}>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n` + toXml(json, rootName);
}

/**
 * Parses an XML string into a JSON representation using native DOMParser.
 */
export function xmlToJson(xmlStr) {
  if (typeof window === 'undefined') return null; // Safe for SSR

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlStr, 'text/xml');

  const parserError = xmlDoc.getElementsByTagName('parsererror');
  if (parserError.length > 0) {
    throw new Error(parserError[0].textContent || 'XML parsing failed');
  }

  function nodeToJson(node) {
    if (node.nodeType === 3) { // Text Node
      return node.nodeValue.trim();
    }
    if (node.nodeType !== 1) { // Non-element Node
      return null;
    }

    if (!node.hasChildNodes() && !node.hasAttributes()) {
      return null;
    }

    const obj = {};

    // Map attributes
    if (node.hasAttributes()) {
      obj['@attributes'] = {};
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        obj['@attributes'][attr.name] = attr.value;
      }
    }

    // Map child nodes
    let textContent = '';
    let hasChildren = false;

    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (child.nodeType === 3) {
        textContent += child.nodeValue.trim();
      } else if (child.nodeType === 1) {
        hasChildren = true;
        const childJson = nodeToJson(child);
        const childName = child.nodeName;

        if (obj[childName] !== undefined) {
          if (!Array.isArray(obj[childName])) {
            obj[childName] = [obj[childName]];
          }
          obj[childName].push(childJson);
        } else {
          obj[childName] = childJson;
        }
      }
    }

    if (!hasChildren && Object.keys(obj).length === 0) {
      return textContent;
    }

    if (textContent !== '') {
      if (hasChildren || obj['@attributes']) {
        obj['#text'] = textContent;
      } else {
        return textContent;
      }
    }

    return obj;
  }

  return nodeToJson(xmlDoc.documentElement);
}

/**
 * Converts a JSON object/array to YAML format.
 */
export function jsonToYaml(json) {
  try {
    return yaml.dump(json, { indent: 2, noRefs: true });
  } catch (err) {
    throw new Error('YAML conversion error: ' + err.message);
  }
}

/**
 * Parses a YAML string into a JSON object/array.
 */
export function yamlToJson(yamlStr) {
  try {
    return yaml.load(yamlStr);
  } catch (err) {
    throw new Error('YAML parsing error: ' + err.message);
  }
}
