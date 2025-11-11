export const onRequest = async ({ request, env }: { request: Request; env: any }) => {
  const url = new URL(request.url);

  if (url.pathname === "/" || url.pathname === "/index.html") {
    const target = new URL("/marketing/", url.origin);
    return env.ASSETS.fetch(new Request(target.toString(), request));
  }

  return env.ASSETS.fetch(request);
};

