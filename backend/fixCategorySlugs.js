import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function fixSlugs() {
  const categories = await prisma.category.findMany();

  for (const cat of categories) {
    if (!cat.slug) {
      const slugBase = cat.title.toLowerCase().replace(/\s+/g, "-");
      let slug = slugBase;

      let count = 1;
      // Ensure slug is unique
      while (await prisma.category.findFirst({ where: { slug } })) {
        slug = `${slugBase}-${count}`;
        count++;
      }

      await prisma.category.update({
        where: { id: cat.id },
        data: { slug },
      });

      console.log(`Updated "${cat.title}" → "${slug}"`);
    }
  }

  console.log("All missing slugs fixed!");
}

fixSlugs()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
