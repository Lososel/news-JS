/** Represents a news source (e.g., "BBC News", "TechCrunch") */
export interface NewsSource {
    id: string | null;
    name: string;
}

/** Represents a single news article */
export interface NewsArticle {
    source: NewsSource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

/** Represents a successful API response containing news articles */
export interface NewsAPIResponse {
    status: 'ok';
    totalResults: number;
    articles: NewsArticle[];
}

/** Represents a successful API response containing news sources */
export interface NewsSourceResponse {
    status: 'ok';
    sources: NewsSource[];
}

/** Represents an error response from the News API */
export interface NewsAPIErrorResponse {
    status: 'error';
    code: string;
    message: string;
}
