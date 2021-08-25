import slugify from 'slugify';
import { PrismaClient } from '@prisma/client';

interface CheckSlugifyProps {
  slug: string;
  tableReference: 'products' | 'categories';
}

export async function createSlugified({ tableReference, slug }: CheckSlugifyProps) {
  const slugified = slugify(slug, {
    lower: true,
  });

  const prisma = new PrismaClient();

  const getOccurrencesToSlug = await prisma.$queryRaw(
    // `SELECT * FROM ${tableReference} WHERE slug LIKE '${slugified}%'`,
    `INSERT INTO ${tableReference} (slug) VALUES ('${slugified}%')`,
  );

  const finalSlugified =
    getOccurrencesToSlug.length > 0 ? `${slugified}-${getOccurrencesToSlug.length}` : slugified;

  return finalSlugified;
}
//
// ON CONFLICT (slug)
// DO UPDATE SET counter = counters.counter + 1 RETURNING counter;

export async function updateSlugified({ tableReference, slug }: CheckSlugifyProps) {
  const slugified = slugify(slug, {
    lower: true,
  });

  const prisma = new PrismaClient();

  const getOccurrencesToSlug = await prisma.$queryRaw(
    `SELECT * FROM ${tableReference} WHERE slug LIKE '${slugified}%'`,
  );

  const finalSlugified =
    getOccurrencesToSlug.length > 0 ? `${slugified}-${getOccurrencesToSlug.length}` : slugified;

  return finalSlugified;
}
// INSERT INTO counters (slug, counter) VALUES ('new-shoe', 0)
// ON CONFLICT (slug)
// DO UPDATE SET counter = counters.counter + 1 RETURNING counter;
