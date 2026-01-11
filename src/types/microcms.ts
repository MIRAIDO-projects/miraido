export interface MicroCmsDate {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
}

export interface MicroCmsImage {
    url: string;
    height: number;
    width: number;
}

export interface Category extends MicroCmsDate {
    id: string;
    name: string;
}

export interface Blog extends MicroCmsDate {
    id: string;
    title: string;
    content: string;
    category: Category[];
    thumbnail?: MicroCmsImage;
}



export interface News extends MicroCmsDate {
    id: string;
    Title: string;
    category: Category;
    content: string;
}

export type Project = ProjectResponse & MicroCmsDate & { id: string };

export interface Sponsor extends MicroCmsDate {
    id: string;
    name: string;
    logo?: MicroCmsImage;
    url?: string;
    type?: string[]; // e.g. ["Platinum", "Gold"] or single select
}

export interface ProjectResponse {
    id: string;
    title: string;
    description: string;
    mainImage?: MicroCmsImage;
    url?: string;
    category: Category[];
}

export type Endpoints = {
    list: {
        blogs: Blog;
        sponsors: Sponsor;
        projects: Project;
        news: News;
    };
};
