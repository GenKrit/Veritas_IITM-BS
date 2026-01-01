// lib/revalidate.ts
export async function revalidatePublic(paths: string[]) {
  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.REVALIDATE_SECRET,
      paths,
    }),
  });
}
