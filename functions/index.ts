export const onRequest = async ({ request, env }: { request: Request; env: any }) => {
  const url = new URL(request.url);
  const target = new URL("/marketing/index.html", url.origin);
  const assetRequest = new Request(target.toString(), request);
  return env.ASSETS.fetch(assetRequest);
};

