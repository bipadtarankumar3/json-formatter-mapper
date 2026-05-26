import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url, method = 'GET', headers = {}, body = null } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'Endpoint URL is required' }, { status: 400 });
    }

    const start = Date.now();
    
    // Clean up headers
    const requestHeaders = new Headers();
    Object.entries(headers).forEach(([key, val]) => {
      if (val && val.trim() !== '') {
        requestHeaders.append(key, val);
      }
    });

    const fetchOptions = {
      method,
      headers: requestHeaders,
      cache: 'no-store',
    };

    if (method !== 'GET' && method !== 'HEAD' && body) {
      fetchOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
    }

    let response;
    try {
      response = await fetch(url, fetchOptions);
    } catch (fetchErr) {
      return NextResponse.json({
        error: `Failed to fetch target URL: ${fetchErr.message}`,
        status: 0,
        statusText: 'Network Error',
        headers: {},
        data: null,
        latency: Date.now() - start
      });
    }

    const latency = Date.now() - start;
    const responseText = await response.text();

    // Serialize headers
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      data: responseText,
      latency,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error processing request: ' + error.message }, { status: 500 });
  }
}
