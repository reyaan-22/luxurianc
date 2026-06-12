/**
 * src/data/services.ts
 * Luxurianc — the long-term vision: where we are going
 */

import type { Service } from "@/types";

export const services: Service[] = [
  {
    id:          "hotels",
    title:       "Luxury Hotels",
    subtitle:    "Properties that define their cities",
    description: "World-class hotels that set the standard for what a stay can feel like. Not just a room — an environment designed to make you feel exactly who you want to become.",
    icon:        "Crown",
    features:    ["Trophy locations", "Bespoke guest experience", "Inspired by Four Seasons", "Coming soon"],
    cta:         "The vision",
    href:        "/vision#hotels",
    gradient:    "from-gold-500/10 to-gold-900/5",
  },
  {
    id:          "dining",
    title:       "Fine Dining",
    subtitle:    "Restaurants worth traveling for",
    description: "Food, atmosphere, and presence — three things that tell you immediately whether a place understands excellence. Our restaurants will leave no doubt.",
    icon:        "Gem",
    features:    ["Chef-driven concepts", "Private dining rooms", "Inspired by Nobu", "Coming soon"],
    cta:         "The vision",
    href:        "/vision#dining",
    gradient:    "from-gold-400/10 to-gold-800/5",
  },
  {
    id:          "members",
    title:       "Members' Spaces",
    subtitle:    "For those who belong here",
    description: "Private clubs where the most ambitious people gather. No strangers. Just a community of people who hold themselves to the same standard.",
    icon:        "Shield",
    features:    ["Invitation-only access", "Global locations", "Curated membership", "Coming soon"],
    cta:         "The vision",
    href:        "/vision#members",
    gradient:    "from-gold-600/10 to-gold-950/5",
  },
  {
    id:          "community",
    title:       "The Community",
    subtitle:    "Where it begins — right now",
    description: "Before the hotels, before the restaurants, before the clubs — there is this. A founding community of people who believed before anyone else did. That matters.",
    icon:        "Palette",
    features:    ["Free early access", "Founding member status", "First to everything", "Open now"],
    cta:         "Join today",
    href:        "/#join",
    gradient:    "from-gold-700/10 to-gold-900/5",
  },
];
