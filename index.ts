import { serve } from "bun";

serve({
  routes: {
    "/api/status": new Response("OK"),

    "/users/:id": (req) => {
      return new Response(`Hello User ${req.params.id}!`);
    },

    "/api/posts": {
      GET: () => new Response("List posts"),
      POST: async (req) => {
        const body = await req.json();
        return Response.json({ created: true });
      },
    },
  },

  fetch() {
    return new Response("Not Found", { status: 404 });
  },
  port: 3040,
  development: true,
});

console.log("Server started at http://localhost:3040");
