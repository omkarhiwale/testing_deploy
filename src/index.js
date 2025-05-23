export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const key = url.pathname === "/" ? "index.html" : url.pathname.slice(1)

    const object = await env.MY_BUCKET.get(key)

    if (!object) {
      return new Response("404 Not Found", { status: 404 })
    }

    return new Response(object.body, {
      headers: {
        "Content-Type": object.httpMetadata?.contentType || "application/octet-stream"
      }
    })
  }
}
