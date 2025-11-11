export const onRequest = async () => {
  const body = `# Feelings Unplugged crawl directives
User-agent: *
Allow: /

# Explicitly disallow extraction by major AI scrapers
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: AppleBot-Extended
Disallow: /
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600"
    }
  });
};

