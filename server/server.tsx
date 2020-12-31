import { Application, Router } from './serverDeps.ts';
import { React, ReactDOMServer } from './deps.ts';
import App from './client/app.tsx';

// Declare Constants
const PORT = 3000;

// Create a new server
const app = new Application();

// Create Route
const router = new Router();

// On the intial request we server side render and send (we hydrate later)
router.get('/', (ctx: any) => {
    const body = (ReactDOMServer as any).renderToString(<App />);
    ctx.response.body = body;
});

// Bundle hydrated app
const [_, clientJS] = await Deno.bundle('./src/client.tsx');

// Router for serving bundle
const bundleRouter = new Router();
bundleRouter.get('/client.js', (context) => {
  context.response.headers.set('Content-Type', 'text/html');
  context.response.body = clientJS;
});

// Attach routes
app.use(router.routes());
app.use(bundleRouter.routes());

app.addEventListener('listen', () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

await app.listen({ port: PORT });

export { app };
