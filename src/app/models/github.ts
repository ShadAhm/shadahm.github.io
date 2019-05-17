export interface GithubRepository {
    id: number;
    name: string;
    description: string;
    html_url: string; 
    homepage: string;
    stargazers_count: number;
    watchers_count: number;
}

export interface SelectRepository {
    name: string;
    descriptionOverride: string; 
    hasDemo: boolean; 
}