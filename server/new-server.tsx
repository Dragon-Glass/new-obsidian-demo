import { Application, Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import { React, ReactDOMServer } from '../deps.ts';
import { ObsidianRouter } from '../serverDeps.ts';
import { createDb } from './db/db.ts';
import resolvers from './resolvers.ts';
import types from './schema.ts';
import App from '../client/app.tsx';
import { staticFileMiddleware } from '../../obsidian-website/staticFileMiddleware.ts';

const PORT = 3000;
const app = new Application();

// create and seed DB
await createDb();

// Create Route
const router = new Router();

router.get('/', (ctx: any) => {
  const body = (ReactDOMServer as any).renderToString(<App />);
  ctx.response.body = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Obsidian</title>
    </head>
    <body >
      <div id="root">${body}</div>
      <script  src="/static/client.js" defer></script>
    </body>
    </html>`;
  } catch (err) {
    console.log('error', err);
  }
});

// Bundle hydrated app
const [_, clientJS] = await Deno.bundle('./client/client.tsx');

// Router for serving bundle
const bundleRouter = new Router();
bundleRouter.get('/static/client.js', (context) => {
  context.response.headers.set('Content-Type', 'text/html');
  context.response.body = clientJS;
});

// Attach routes
app.use(router.routes());
app.use(bundleRouter.routes());
app.use(staticFileMiddleware);
app.use(router.allowedMethods());

interface ObsRouter extends Router {
  obsidianSchema?: any;
}

// Create GraphQL Router
const GraphQLRouter = await ObsidianRouter<ObsRouter>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  redisPort: 6379,
});

app.use(GraphQLRouter.routes(), GraphQLRouter.allowedMethods());

app.addEventListener('listen', () => {
  console.log(`listening on localhost:${PORT}`);
});

await app.listen({ port: PORT });
