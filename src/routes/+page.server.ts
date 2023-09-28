import type { PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase';

export const load = (async () => {
  const news = await pb.collection('news').getFullList({ sort: '-created' });

  for (const n of news) {
    const author = await pb.collection('users').getOne(n.author);
    n.author = author.name;
    n.image = pb.files.getUrl(n, n.image);
    const createdDate = new Date(n.created);
    n.created = createdDate.toISOString().split('T')[0].replace(/-/g, '.');
    const authorAvatar = await pb.files.getUrl(author, author.avatar);
    n.authorAvatar = authorAvatar;
  }

  return {
    news: news
  };
}) satisfies PageServerLoad;
