export interface GithubRepository {
    id: number;
    name: string;
    description: string;
    html_url: string; 
    homepage: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
}

export interface SelectRepository {
    name: string;
    descriptionOverride: string;
    /**
     * Explicit demo link. Falls back to the GitHub repo's `homepage` field when omitted;
     * set to 'none' to suppress the "View Demo" button even if `homepage` is set.
     */
    demoUrl?: string;
    /** Rendered as badge chips on the card. */
    tags?: string[];
    /**
     * Thumbnail control: omit to auto-generate a screenshot from `demoUrl` (or `homepage`);
     * set to 'none' to show no thumbnail; any other string is used as a static image path/URL.
     */
    screenshot?: string;
}