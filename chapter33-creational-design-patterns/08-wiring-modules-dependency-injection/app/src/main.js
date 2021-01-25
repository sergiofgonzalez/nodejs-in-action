import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Blog } from './lib/blog.js';
import { createDb } from './lib/db.js';


/*
  ESM trick to reconstruct CommonJS `__dirname` value

  In ESM, you can get a reference to the current file URL
  using the special object `import.meta`.
  Specifically, `import.meta.url` will return a reference
  to the current module path in the format
  `file:///path/to/current_module.js`
  which can be used to reconstruct `__filename` and
  `__dirname`.
*/
const __dirname = dirname(fileURLToPath(import.meta.url));


async function main() {
  const db = createDb(join(__dirname, 'data.sqlite'));
  const blog = new Blog(db);

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