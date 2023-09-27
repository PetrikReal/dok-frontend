import type { PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase';

export const load = (async ({ params }) => {
  const news = await pb.collection('news').getOne(params.id);
  const author = await pb.collection('users').getOne(news.author);
  const author_name = author.name;

  // Format the created date to be yyyy.mm.dd
  const createdDate = new Date(news.created);
  const formattedCreatedDate = createdDate.toISOString().split('T')[0].replace(/-/g, '.');

  return {
    title: news.title,
    body: news.body,
    author: author_name,
    image: pb.files.getUrl(news, news.image),
    created: formattedCreatedDate, // Use the formatted date
  };
}) satisfies PageServerLoad;
