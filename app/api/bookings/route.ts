export const dynamic = 'force-static';

export async function GET() {
  return new Response('API disabled. Please use WhatsApp.', { status: 404 });
}

export async function POST() {
  return new Response('API disabled. Please use WhatsApp.', { status: 404 });
}
