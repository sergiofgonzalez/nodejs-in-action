type BlogPost = {
  post: string,
  timestamp: number,
  user: string
}

interface AddToPost {
  (post: BlogPost): BlogPost[]
}

interface IBlogPost {
  allPosts: BlogPost[];
  addToPost: AddToPost;
}

class BlogPostClass implements IBlogPost {
  allPosts: BlogPost[] = []; // static initialization to empty array

  addToPost(post: BlogPost): BlogPost[] {
    this.allPosts.push(post);
    return this.allPosts;
  }
}

const blog = new BlogPostClass();

const post1: BlogPost = {
  post: 'Hello, blog',
  timestamp: 12345,
  user: 'user1'
};

const post2: BlogPost = {
  post: 'Hello to Jason!',
  timestamp: 67890,
  user: 'user2'
};

const post3: BlogPost = {
  post: 'Hello to chuckles!',
  timestamp: 135711,
  user: 'user3'
};

console.log(blog.addToPost(post1));
console.log(blog.addToPost(post2));

blog.addToPost(post3);
console.log(blog.allPosts);