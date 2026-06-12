/**
 * src/data/blog.ts
 * Sample blog / journal posts. Replace with a CMS (Contentful, Sanity) in production.
 */

import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id:          "b1",
    slug:        "the-art-of-slow-making",
    title:       "The Art of Slow Making",
    excerpt:     "In an era of instant everything, we explore why the most enduring objects in the world are born from radical patience.",
    category:    "Craft",
    publishedAt: "2024-11-12",
    readTime:    6,
    tags:        ["craft", "philosophy", "heritage"],
    author: {
      name:   "Elise Fontaine",
      role:   "Editor in Chief",
    },
  },
  {
    id:          "b2",
    slug:        "materials-that-remember",
    title:       "Materials That Remember",
    excerpt:     "From hand-tanned leather to ancient olive wood — a meditation on materials that carry time within them.",
    category:    "Materials",
    publishedAt: "2024-10-29",
    readTime:    8,
    tags:        ["materials", "craft", "sustainability"],
    author: {
      name:   "Marco Delacroix",
      role:   "Creative Correspondent",
    },
  },
  {
    id:          "b3",
    slug:        "private-islands-the-new-frontier",
    title:       "Private Islands: The New Frontier",
    excerpt:     "Our concierge team curates the world's most extraordinary private islands — and reveals what truly makes a retreat worthy of that word.",
    category:    "Travel",
    publishedAt: "2024-10-08",
    readTime:    5,
    tags:        ["travel", "concierge", "exclusivity"],
    author: {
      name:   "Natasha Romanova",
      role:   "Lifestyle Editor",
    },
  },
  {
    id:          "b4",
    slug:        "collecting-as-philosophy",
    title:       "Collecting as Philosophy",
    excerpt:     "The greatest collectors share a single trait: they acquire with conviction, not trend. A conversation with three of the world's most respected connoisseurs.",
    category:    "Collecting",
    publishedAt: "2024-09-17",
    readTime:    10,
    tags:        ["collecting", "philosophy", "art"],
    author: {
      name:   "Elise Fontaine",
      role:   "Editor in Chief",
    },
  },
];
