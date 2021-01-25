'use strict';

import { create as newBlogPost } from './blogpost.mjs';

const blogPost = newBlogPost('For and against let', 'Kyle Simpson', 'October 27, 2014', 'https://davidwalsh.name/for-and-against-let');

blogPost.print();