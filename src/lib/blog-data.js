export const BLOG_POSTS = [
  {
    slug: 'what-is-json',
    title: 'What is JSON? A Comprehensive Developer Guide',
    excerpt: 'Learn the fundamentals of JavaScript Object Notation (JSON), why it dominates web development, and how to use it effectively in modern applications.',
    date: 'May 20, 2026',
    readTime: '6 min read',
    category: 'Guides',
    tags: ['JSON', 'Web Dev', 'API'],
    author: 'Revoxera Engineering',
    content: `
<h2>Introduction to JSON</h2>
<p>JavaScript Object Notation (JSON) has become the de facto standard for data exchange on the modern web. From API responses and microservice configurations to database storage (like MongoDB or PostgreSQL JSONB fields), JSON is everywhere. But what makes it so popular, and how did it replace XML?</p>

<h2>What is JSON?</h2>
<p>JSON is a lightweight, text-based, language-independent data interchange format. Despite its name beginning with "JavaScript," JSON is supported by almost every programming language in existence, either natively or through popular libraries.</p>
<p>It is designed to be easy for humans to read and write, and easy for machines to parse and generate.</p>

<h2>JSON Syntax Rules</h2>
<p>JSON structures are built on two primary components:</p>
<ul>
  <li><strong>A collection of name/value pairs:</strong> Realized as an <em>object</em>, record, struct, dictionary, or hash table.</li>
  <li><strong>An ordered list of values:</strong> Realized as an <em>array</em>, vector, list, or sequence.</li>
</ul>

<p>Here is a basic example of valid JSON syntax:</p>
<pre><code class="language-json">{
  "name": "Jane Doe",
  "age": 30,
  "isDeveloper": true,
  "languages": ["JavaScript", "Python", "SQL"],
  "address": {
    "city": "San Francisco",
    "zipCode": "94105"
  },
  "metadata": null
}</code></pre>

<h3>Key Syntax Rules to Remember:</h3>
<ol>
  <li><strong>Double Quotes:</strong> Keys and string values must be enclosed in double quotes. Single quotes are invalid.</li>
  <li><strong>Data Types:</strong> Supported data types include String, Number, Object, Array, Boolean (true/false), and Null. Functions, dates, and undefined are not allowed.</li>
  <li><strong>No Trailing Commas:</strong> Commas separate items in objects and arrays. Having a comma after the final item will cause syntax errors.</li>
</ol>

<h2>Why JSON Dominates Modern Web APIs</h2>
<p>Before JSON, XML (eXtensible Markup Language) was the standard for web services (SOAP). JSON displaced XML because:</p>
<ul>
  <li><strong>Conciseness:</strong> JSON has a lower overhead, leading to smaller payload sizes and faster network transfers.</li>
  <li><strong>Ease of Parsing:</strong> Browsers parse JSON natively using <code>JSON.parse()</code> into standard JavaScript objects directly, whereas XML requires DOM parsing.</li>
  <li><strong>Readable Structure:</strong> JSON maps naturally to programming language data structures (hashes/maps and lists).</li>
</ul>

<h2>Best Practices for Working with JSON</h2>
<p>When designing APIs or configuration files, follow these guidelines:</p>
<ul>
  <li>Keep keys small, descriptive, and consistent (camelCase or snake_case).</li>
  <li>Validate your payloads client-side before sending them over the network.</li>
  <li>Sanitize and escape user input stored inside JSON structures to prevent cross-site scripting (XSS).</li>
</ul>
    `
  },
  {
    slug: 'json-vs-xml',
    title: 'JSON vs XML: Differences, Pros, Cons, and Use Cases',
    excerpt: 'An in-depth comparison of JSON and XML formats. Understand their structural differences, parsing complexity, and which one is right for your API architecture.',
    date: 'May 22, 2026',
    readTime: '8 min read',
    category: 'Comparisons',
    tags: ['JSON', 'XML', 'API Design'],
    author: 'Revoxera Engineering',
    content: `
<h2>The Great Format Debate: JSON vs XML</h2>
<p>Both JSON and XML are open, human-readable, and language-independent formats. However, their design philosophies, structural rules, and target use cases are vastly different. Let\'s compare them side-by-side to understand why JSON won the browser API wars, and why XML is still critical in legacy and enterprise structures.</p>

<h2>Structural Comparison</h2>
<p>To understand the difference, look at how the same user record is represented in both formats:</p>

<h3>JSON Representation:</h3>
<pre><code class="language-json">{
  "user": {
    "id": 101,
    "name": "Alex",
    "roles": ["admin", "editor"]
  }
}</code></pre>

<h3>XML Representation:</h3>
<pre><code class="language-xml">&lt;user id="101"&gt;
  &lt;name&gt;Alex&lt;/name&gt;
  &lt;roles&gt;
    &lt;role&gt;admin&lt;/role&gt;
    &lt;role&gt;editor&lt;/role&gt;
  &lt;/roles&gt;
&lt;/user&gt;</code></pre>

<h2>Key Differences</h2>
<table class="w-full text-left text-xs border border-white/10 mb-6">
  <thead>
    <tr class="bg-white/5">
      <th class="p-3 border-b border-white/10 text-white">Feature</th>
      <th class="p-3 border-b border-white/10 text-white">JSON</th>
      <th class="p-3 border-b border-white/10 text-white">XML</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border-b border-white/5">Readability</td>
      <td class="p-3 border-b border-white/5">Highly readable, minimal tags</td>
      <td class="p-3 border-b border-white/5">Verboses, closes all tags</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-white/5">Data Types</td>
      <td class="p-3 border-b border-white/5">Supports strings, numbers, booleans, arrays, objects</td>
      <td class="p-3 border-b border-white/5">Everything is a string (requires schemas)</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-white/5">Parsing Speed</td>
      <td class="p-3 border-b border-white/5">Blazing fast natively in browsers</td>
      <td class="p-3 border-b border-white/5">Slower, requires document navigation tree</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-white/5">Validation</td>
      <td class="p-3 border-b border-white/5">JSON Schema (modern)</td>
      <td class="p-3 border-b border-white/5">DTD, XML Schema (very rigorous)</td>
    </tr>
  </tbody>
</table>

<h2>Pros and Cons</h2>
<h3>JSON Pros:</h3>
<ul>
  <li>Compact payload size saves bandwidth.</li>
  <li>Natively maps to programming arrays and maps.</li>
  <li>Fast execution with built-in browser APIs.</li>
</ul>

<h3>XML Pros:</h3>
<ul>
  <li>Supports attributes inside elements.</li>
  <li>Strict namespaces prevent collision in multi-vendor structures.</li>
  <li>Schema verification is highly mature and handles validation on loading.</li>
</ul>

<h2>When to Use Which?</h2>
<p>Use <strong>JSON</strong> for modern web applications, client-server APIs, single-page application databases, and microservices configs.</p>
<p>Use <strong>XML</strong> for document storage layouts, MS Office configurations (.docx, .xlsx), SOAP legacy enterprise systems, and contexts needing rich schema validation.</p>
    `
  },
  {
    slug: 'common-json-errors',
    title: 'Common JSON Syntax Errors and How to Fix Them',
    excerpt: 'Struggling with syntax errors? Discover the top reasons JSON fails to parse, how to read error traces, and strategies to repair malformed documents.',
    date: 'May 23, 2026',
    readTime: '5 min read',
    category: 'Troubleshooting',
    tags: ['JSON', 'Debugging', 'Syntax'],
    author: 'Revoxera Engineering',
    content: `
<h2>Why Does JSON Parsing Fail?</h2>
<p>JSON is a strict protocol. A single missing quote, a trailing comma, or a misplaced brace will throw a syntax exception and halt parsing entirely. Let\'s explore the most frequent errors that developers encounter and how to resolve them.</p>

<h2>1. Single Quotes Instead of Double Quotes</h2>
<p>JavaScript allows single quotes for strings, but JSON forbids it. All keys and string values must use double quotes.</p>
<p class="text-red-400 font-mono text-xs">✕ Error: { 'name': 'John' }</p>
<p class="text-emerald-400 font-mono text-xs">✓ Fix: { "name": "John" }</p>

<h2>2. Trailing Commas</h2>
<p>JavaScript array syntax is forgiving of trailing commas, but JSON parsing will throw a validation error if the last element inside an array or object has a comma.</p>
<pre><code class="language-json">// Invalid JSON
{
  "numbers": [1, 2, 3,],
  "address": "NYC",
}

// Valid JSON
{
  "numbers": [1, 2, 3],
  "address": "NYC"
}</code></pre>

<h2>3. Unquoted Keys</h2>
<p>In standard Javascript objects, keys do not require quotes unless they contain special characters. In JSON, all keys MUST be double-quoted.</p>
<p class="text-red-400 font-mono text-xs">✕ Error: { age: 25 }</p>
<p class="text-emerald-400 font-mono text-xs">✓ Fix: { "age": 25 }</p>

<h2>4. Missing Commas Between Elements</h2>
<p>Forgetting to place a comma between properties in an object or items in an array is a common error when copying and pasting blocks of code.</p>
<pre><code class="language-json">// Invalid
{
  "firstName": "Tom"
  "lastName": "Hanks"
}

// Valid
{
  "firstName": "Tom",
  "lastName": "Hanks"
}</code></pre>

<h2>How to Quickly Fix JSON Errors</h2>
<p>If you encounter these errors, you can use our <strong>JSON Validator</strong> tool to locate the exact line and column where the error lies. Alternatively, our <strong>Auto-Repair</strong> tool will sweep through common anomalies like single quotes and trailing commas and resolve them instantly.</p>
    `
  },
  {
    slug: 'json-validation-guide',
    title: 'The Ultimate Guide to JSON Validation and Schema',
    excerpt: 'Learn how to enforce data integrity. Understand client-side validation methods, JSON Schema specs, and how to write structures that automatically validate API inputs.',
    date: 'May 24, 2026',
    readTime: '7 min read',
    category: 'Advanced',
    tags: ['JSON Schema', 'Validation', 'Architecture'],
    author: 'Revoxera Engineering',
    content: `
<h2>The Need for Validation</h2>
<p>Parsing JSON into objects only ensures that the syntax is correct. It does not guarantee that the data contains the required properties, correct types, or satisfies business logic rules. To enforce data integrity, developers use JSON Schema.</p>

<h2>What is JSON Schema?</h2>
<p>JSON Schema is a declarative vocabulary that allows you to annotate and validate JSON documents. It acts as a contract between API producers and consumers.</p>

<h2>Anatomy of a JSON Schema</h2>
<p>Here is an example schema validating a user profile:</p>
<pre><code class="language-json">{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "User",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "description": "Unique identifier for the user"
    },
    "username": {
      "type": "string",
      "minLength": 3
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  },
  "required": ["id", "username", "email"]
}</code></pre>

<h2>Validating JSON in Code</h2>
<p>Most modern programming languages have robust libraries to validate JSON files against a schema:</p>
<ul>
  <li><strong>JavaScript/Node.js:</strong> <code>Ajv</code> is the standard high-performance JSON Schema validator.</li>
  <li><strong>Python:</strong> The <code>jsonschema</code> package is widely used.</li>
  <li><strong>Go:</strong> Packages like <code>xeipuuv/gojsonschema</code> are common.</li>
</ul>

<h2>API validation best practices:</h2>
<ol>
  <li>Validate all incoming HTTP request bodies against your JSON schemas as early as possible.</li>
  <li>Return friendly, clear validation error payloads outlining which fields failed and why.</li>
  <li>Keep your schemas versioned alongside your API code to ensure schema consistency.</li>
</ol>
    `
  },
  {
    slug: 'json-formatting-best-practices',
    title: 'JSON Formatting and Styling Best Practices',
    excerpt: 'Explore best practices for designing, naming, and formatting JSON structures for clarity, bandwidth optimization, and clean version control diffs.',
    date: 'May 25, 2026',
    readTime: '6 min read',
    category: 'Design',
    tags: ['JSON', 'Clean Code', 'API Design'],
    author: 'Revoxera Engineering',
    content: `
<h2>Clean Data Design</h2>
<p>While machines parse JSON easily regardless of indentation or key choice, human developers read and edit JSON profiles daily. Properly designed JSON files improve readability, reduce debugging times, and keep git diff history clean.</p>

<h2>1. Naming Conventions</h2>
<p>Pick one casing convention for keys and stick to it throughout your application. The three most common styles are:</p>
<ul>
  <li><strong>camelCase (Recommended for Web):</strong> <code>{ "userId": 101, "firstName": "Alice" }</code></li>
  <li><strong>snake_case (Common in Python/APIs):</strong> <code>{ "user_id": 101, "first_name": "Alice" }</code></li>
  <li><strong>kebab-case (Less common, useful for attributes):</strong> <code>{ "user-id": 101, "first-name": "Alice" }</code></li>
</ul>

<h2>2. Indentation and Spacing</h2>
<p>For configuration files, check-in clean spacing. The standard is <strong>2 spaces</strong> for nesting. While 4 spaces are common in Python or Java code, 2 spaces prevent wide, wrapped lines in nested objects.</p>
<pre><code class="language-json">// Good spacing
{
  "api": {
    "version": "v1",
    "timeout": 30
  }
}</code></pre>

<h2>3. Sorting Keys</h2>
<p>When committing JSON configs to git, sorting keys alphabetically makes it easy to review changes when someone adds or removes variables. Without sorting, git diffs might show unrelated moves.</p>

<h2>4. Bandwidth Optimization: Minification</h2>
<p>While formatting with spacing is great for local files, production data streams should always be <strong>minified</strong> (whitespace, tabs, and newlines stripped) to optimize network speed and save bytes.</p>
<p>Use our online <strong>JSON Minifier</strong> before embedding JSON payloads in static sites or deploying to public distribution systems.</p>
    `
  }
];
