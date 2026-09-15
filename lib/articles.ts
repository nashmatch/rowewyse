export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string;
}

/**
 * Empty for now — a CMS-ready shape for future market reports and guides on
 * /resources so content can be added later without restructuring the page.
 */
export const articles: Article[] = [];
