import LRUCache from "lru-cache";
import { Request, Response } from "express";

interface CacheRequest extends Request {
  user?: { id: number };
}

function routesWithCache({ server, app }: any) {
  const ssrCache = new LRUCache({
    max: 100, // 100 items
    maxAge: 1000 * 60 * 60 // 1hour
  });

  const getCacheKey = (req: CacheRequest) => {
    if (req.user) {
      return `${req.url}${req.user.id}`;
    }
    return `${req.url}`;
  };

  const renderAndCache = async (
    req: Request,
    res: Response,
    pagePath: string,
    queryParams?: object
  ) => {
    const key = getCacheKey(req);

    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key)) {
      res.setHeader("x-cache", "HIT");
      res.send(ssrCache.get(key));
      return;
    }

    try {
      // If not let's render the page into HTML
      const html = await app.renderToHTML(req, res, pagePath, queryParams);

      // Something is wrong with the request, let's skip the cache
      if (res.statusCode !== 200) {
        res.send(html);
        return;
      }

      // Let's cache this page
      ssrCache.set(key, html);

      res.setHeader("x-cache", "MISS");
      res.send(html);
    } catch (err) {
      app.renderError(err, req, res, pagePath, queryParams);
    }
  };

  server.get("/", (req: Request, res: Response) => {
    renderAndCache(req, res, "/home");
  });

  server.get("/book", (req: Request, res: Response) => {
    renderAndCache(req, res, "/admin/tag");
  });
}

export default routesWithCache;
