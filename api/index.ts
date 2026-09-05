import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { db } from '../src/db/index.js';
import { invitations, systemSettings } from '../src/db/schema.js';
import { eq, asc } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api');

// Utility func to sanitize string
function sanitizeString(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

app.get('/hello', (c) => {
  return c.json({ message: 'Hello from Serverless Hono API' });
});

// GET Settings
app.get('/settings', async (c) => {
  try {
    const data = await db.select().from(systemSettings).orderBy(asc(systemSettings.id)).limit(1);
    if (!data || data.length === 0) {
      const [inserted] = await db.insert(systemSettings).values({}).returning();
      return c.json({ data: inserted });
    }
    return c.json({ data: data[0] });
  } catch (err) {
    return c.json({ error: 'Failed' }, 500);
  }
});

// POST Settings
app.post('/settings', async (c) => {
  try {
    const body = await c.req.json();
    const data = await db.select().from(systemSettings).orderBy(asc(systemSettings.id)).limit(1);
    
    if (data && data.length > 0) {
      const payload: any = { ...body };
      if(body.eventDate && typeof body.eventDate === 'string' && !body.eventDate.includes('+') && !body.eventDate.includes('Z')) {
        payload.eventDate = new Date(body.eventDate + "+07:00");
      } else if (body.eventDate) {
        payload.eventDate = new Date(body.eventDate);
      }
      payload.updatedAt = new Date();
      
      const [updated] = await db.update(systemSettings)
        .set(payload)
        .where(eq(systemSettings.id, data[0].id))
        .returning();
      return c.json({ data: updated });
    } else {
      const payload: any = { ...body };
      if(body.eventDate && typeof body.eventDate === 'string' && !body.eventDate.includes('+') && !body.eventDate.includes('Z')) {
        payload.eventDate = new Date(body.eventDate + "+07:00");
      } else if (body.eventDate) {
        payload.eventDate = new Date(body.eventDate);
      }
      const [inserted] = await db.insert(systemSettings).values(payload).returning();
      return c.json({ data: inserted });
    }
  } catch (err: any) {
    console.error(err);
    return c.json({ error: 'Settings failed to update', details: err.message, stack: err.stack }, 500);
  }
});

app.post('/invitations', async (c) => {
  try {
    const body = await c.req.json();
    const { title, guestName, eventDate, whatsapp, data } = body;

    if (!title || !guestName) {
      return c.json({ error: 'Title and Guest Name are required' }, 400);
    }

    let baseSlug = sanitizeString(guestName);
    let finalSlug = baseSlug;
    let isUnique = false;
    let counter = 0;

    // Loop to ensure uniqueness
    while (!isUnique) {
      const existing = await db.select().from(invitations).where(eq(invitations.slug, finalSlug)).limit(1);
      if (existing && existing.length > 0) {
        counter++;
        finalSlug = `${baseSlug}-${counter}`;
      } else {
        isUnique = true;
      }
    }

    const parsedDate = (eventDate && typeof eventDate === 'string' && !eventDate.includes('+') && !eventDate.includes('Z')) 
      ? new Date(eventDate + "+07:00") 
      : (eventDate ? new Date(eventDate) : null);

    const [newInv] = await db.insert(invitations).values({
      title,
      guestName,
      eventDate: parsedDate,
      whatsapp,
      slug: finalSlug,
      data: data || {}
    }).returning();

    return c.json({ message: 'Invitation created', data: newInv }, 201);
  } catch (error: any) {
    console.error('Error creating invitation:', error);
    return c.json({ error: 'Failed to create invitation' }, 500);
  }
});

app.get('/invitations', async (c) => {
  try {
    const result = await db.select().from(invitations);
    return c.json({ data: result });
  } catch (error: any) {
    return c.json({ error: 'Failed to retrieve invitations' }, 500);
  }
});

app.get('/invitations/:slug', async (c) => {
  const slug = c.req.param('slug');
  try {
    const result = await db.select().from(invitations).where(eq(invitations.slug, slug)).limit(1);
    if (!result || result.length === 0) {
      return c.json({ error: 'Invitation not found' }, 404);
    }
    return c.json({ data: result[0] });
  } catch (error: any) {
    return c.json({ error: 'Failed to retrieve invitation' }, 500);
  }
});

// DELETE Guest
app.delete('/invitations/:id', async (c) => {
  const idStr = c.req.param('id');
  const id = parseInt(idStr, 10);
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);

  try {
    const [deleted] = await db.delete(invitations).where(eq(invitations.id, id)).returning();
    if (!deleted) {
      return c.json({ error: 'Invitation not found' }, 404);
    }
    return c.json({ message: 'Deleted successfully' });
  } catch (error: any) {
    return c.json({ error: 'Failed to delete invitation' }, 500);
  }
});

// The Vercel request handler
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);

// Also default export for local server to use
export default app;
