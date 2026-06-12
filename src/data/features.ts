/**
 * src/data/features.ts
 * Luxurianc mindset pillars + community stats
 */

import type { Feature, Stat } from "@/types";

export const features: Feature[] = [
  {
    id:          "mindset",
    title:       "Wealth is a mindset",
    description: "Before the portfolio, the property, or the position — there is the way you think. We build that first. Everything else follows from clarity of mind.",
    icon:        "Star",
    stat:        "1st",
    statLabel:   "Principle",
  },
  {
    id:          "purpose",
    title:       "Purpose over profit",
    description: "The most enduring empires were not built for money. They were built for something they believed in. Profit followed. We live by that order.",
    icon:        "Crown",
    stat:        "Always",
    statLabel:   "The standard",
  },
  {
    id:          "legacy",
    title:       "Build for legacy",
    description: "We are not optimising for this quarter. We are building something that outlasts us — a brand, a community, a name that means something to the next generation.",
    icon:        "History",
    stat:        "100yr",
    statLabel:   "Thinking horizon",
  },
  {
    id:          "standard",
    title:       "Refuse the ordinary",
    description: "Average is comfortable. Ordinary is safe. We are not interested in either. The Luxurianc standard is set by those who refuse to stop until the work is right.",
    icon:        "Shield",
    stat:        "0",
    statLabel:   "Compromises",
  },
];

export const stats: Stat[] = [
  { value: "2024", suffix: "",   label: "Founded"             },
  { value: "1",    suffix: "",   label: "Founder"             },
  { value: "∞",    suffix: "",   label: "Vision"              },
  { value: "0",    suffix: "",   label: "Limits we accept"    },
];
