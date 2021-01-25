import { Blog } from './lib/blog.js';

async function main() {
  const blog = new Blog();
  await blog.initialize();
  const posts = await blog.getAllPosts();
  if (posts.length === 0) {
    console.log(`No posts available. Run 'npm run import-posts' to load some sample posts`);
  }

  for (const post of posts) {
    console.log(post.title);
    console.log('-'.repeat(post.title.length));
    console.log(`Published on ${ new Date(post.created_at).toISOString() }`);
    console.log(post.content);
  }
}

main()
  .catch(error => {
    console.log(`ERROR: main: ${ error.message }`);
  });