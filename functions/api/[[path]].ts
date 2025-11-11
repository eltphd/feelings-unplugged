// API endpoint for password verification and download tracking
export const onRequestPost = async ({ request, env }: { request: Request; env: any }) => {
  const url = new URL(request.url);
  
  // Download tracking endpoint
  if (url.pathname === '/api/track-download') {
    try {
      const data = await request.json();
      
      // Store download event in KV (if available) or log
      // For now, we'll use a simple approach - store in KV if available
      if (env.DOWNLOADS_KV) {
        const key = `download:${data.purchaseId}:${data.product}:${Date.now()}`;
        await env.DOWNLOADS_KV.put(key, JSON.stringify({
          ...data,
          ip: request.headers.get('cf-connecting-ip'),
          userAgent: request.headers.get('user-agent')
        }));
      }
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: 'Failed to track download' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  return new Response('Not Found', { status: 404 });
};

export const onRequestGet = async ({ request, env }: { request: Request; env: any }) => {
  const url = new URL(request.url);
  
  // Password verification endpoint
  if (url.pathname === '/api/verify-download') {
    const password = url.searchParams.get('password');
    const product = url.searchParams.get('product');
    const purchaseId = url.searchParams.get('id');
    
    if (!password || !product) {
      return new Response(JSON.stringify({ valid: false }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Verify password against stored passwords in KV
    if (env.PASSWORDS_KV) {
      const storedData = await env.PASSWORDS_KV.get(`purchase:${purchaseId}`);
      if (storedData) {
        const purchase = JSON.parse(storedData);
        const productPasswords = {
          'teen-journal': purchase.passwords?.teenJournal,
          'parent-guide': purchase.passwords?.parentGuide,
          'educator-toolkit': purchase.passwords?.educatorToolkit
        };
        
        if (productPasswords[product] === password) {
          // Calculate contributions (1 purchase = 1 free copy per product)
          const contributions = purchase.products?.length || 1;
          
          return new Response(JSON.stringify({ 
            valid: true, 
            contributions,
            products: purchase.products
          }), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
    
    // Fallback: simple validation (for MVP without KV)
    // In production, always use KV or database
    return new Response(JSON.stringify({ 
      valid: password.length >= 8,
      contributions: 1
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response('Not Found', { status: 404 });
};

