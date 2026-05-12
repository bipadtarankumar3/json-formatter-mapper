export function jsonToTypeScript(json, interfaceName = 'RootObject') {
  const typeMap = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    object: 'any',
  };

  const interfaces = [];
  const seen = new Set();

  function generate(obj, name) {
    if (obj === null) return 'any';
    
    if (Array.isArray(obj)) {
      if (obj.length > 0) {
        return `${generate(obj[0], name.endsWith('s') ? name.slice(0, -1) : name)}[]`;
      }
      return 'any[]';
    }

    if (typeof obj === 'object') {
      if (seen.has(name)) return name;
      seen.add(name);

      let result = `interface ${name} {\n`;
      for (const key in obj) {
        const value = obj[key];
        const type = typeof value;
        
        if (value === null) {
          result += `  ${key}: any;\n`;
        } else if (Array.isArray(value)) {
          const subName = key.charAt(0).toUpperCase() + key.slice(1).replace(/s$/, '');
          result += `  ${key}: ${generate(value, subName)};\n`;
        } else if (type === 'object') {
          const subName = key.charAt(0).toUpperCase() + key.slice(1);
          result += `  ${key}: ${subName};\n`;
          generate(value, subName);
        } else {
          result += `  ${key}: ${typeMap[type] || 'any'};\n`;
        }
      }
      result += '}';
      interfaces.push(result);
      return name;
    }
    return typeMap[typeof obj] || 'any';
  }

  generate(json, interfaceName);
  return interfaces.reverse().join('\n\n');
}

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

  const headers = Object.keys(data[0]);
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

export function repairJson(str) {
  try {
    // 1. Fix single quotes to double quotes for keys and values
    let repaired = str
      .replace(/'/g, '"')
      // 2. Add quotes to unquoted keys
      .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
      // 3. Remove trailing commas
      .replace(/,\s*([}\]])/g, '$1');
    
    // Validate if it's actually JSON now
    JSON.parse(repaired);
    return repaired;
  } catch (e) {
    // If simple regex fails, return original or a more aggressive fix could be added
    return str;
  }
}

export function evaluateJsonPath(obj, path) {
  if (!path || path === '$') return obj;
  try {
    // Basic implementation of JSONPath (e.g. $.store.book[0].title)
    const parts = path.replace(/^\$/, '').split(/[\.\[\]]/).filter(Boolean);
    let current = obj;
    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      // Handle array index vs object key
      if (/^\d+$/.test(part)) {
        current = current[parseInt(part)];
      } else {
        current = current[part];
      }
    }
    return current;
  } catch (e) {
    return undefined;
  }
}
