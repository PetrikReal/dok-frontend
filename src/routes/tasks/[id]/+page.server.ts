import type { PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase';

export const load = (async ({ params }) => {
  const tasks = await pb.collection('tasks').getOne(params.id);
  const author = await pb.collection('users').getOne(tasks.author);
  const author_name = author.name;
  const author_avatar = pb.files.getUrl(author, author.avatar);

  // Format the created date to be yyyy.mm.dd
  const createdDate = new Date(tasks.created);
  const formattedCreatedDate = createdDate.toISOString().split('T')[0].replace(/-/g, '.');

  return {
    title: tasks.title,
    body: tasks.body,
    author: author_name,
    authorAvatar: author_avatar,
    created: formattedCreatedDate // Use the formatted date
  };
}) satisfies PageServerLoad;
