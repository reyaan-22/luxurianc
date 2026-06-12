/**
 * src/data/portfolio.ts
 * Luxurianc portfolio companies — sample data
 */

export type PortfolioCompany = {
  id:       string;
  name:     string;
  sector:   string;
  stage:    "Growth" | "Buyout" | "Venture" | "Real Assets";
  year:     number;
  status:   "Active" | "Exited";
  moic?:    string;
  tagline:  string;
  region:   string;
};

export const portfolio: PortfolioCompany[] = [
  {
    id:      "meridian",
    name:    "Meridian Technologies",
    sector:  "Enterprise Software",
    stage:   "Growth",
    year:    2019,
    status:  "Active",
    tagline: "Infrastructure-grade security for the modern enterprise.",
    region:  "North America",
  },
  {
    id:      "cortex",
    name:    "Cortex Systems",
    sector:  "AI / Automation",
    stage:   "Venture",
    year:    2021,
    status:  "Active",
    tagline: "Autonomous operations for industrial environments.",
    region:  "Europe",
  },
  {
    id:      "lumiere",
    name:    "Lumière Infrastructure",
    sector:  "Clean Energy",
    stage:   "Real Assets",
    year:    2017,
    status:  "Active",
    tagline: "Renewable infrastructure across emerging markets.",
    region:  "APAC",
  },
  {
    id:      "nexar",
    name:    "Nexar Labs",
    sector:  "Biotech",
    stage:   "Venture",
    year:    2020,
    status:  "Active",
    tagline: "Precision diagnostics at point of care.",
    region:  "North America",
  },
  {
    id:      "beaumont",
    name:    "Beaumont Hospitality",
    sector:  "Hospitality",
    stage:   "Buyout",
    year:    2015,
    status:  "Exited",
    moic:    "4.2x",
    tagline: "Trophy hotel assets in gateway European cities.",
    region:  "Europe",
  },
  {
    id:      "volta",
    name:    "Volta Capital",
    sector:  "Financial Services",
    stage:   "Growth",
    year:    2018,
    status:  "Exited",
    moic:    "2.8x",
    tagline: "Private credit for underserved middle-market borrowers.",
    region:  "North America",
  },
];
