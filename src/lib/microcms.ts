import { createClient } from "microcms-js-sdk";
import type { Project, Blog, News, Sponsor } from "../types/microcms";

const client = createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN || "YOUR_DOMAIN",
    apiKey: import.meta.env.MICROCMS_API_KEY || "YOUR_API_KEY",
});

export const getProjects = async () => {
    try {
        const response = await client.getList<Project>({ endpoint: "projects" });
        console.log(`\x1b[32m[MicroCMS] SUCCESS: Fetched ${response.contents.length} projects.\x1b[0m`);
        return response;
    } catch (error) {
        console.error(`\x1b[31m[MicroCMS] FAILED to fetch projects: ${error}\x1b[0m`);
        return { contents: [] }; // Fallback to empty list so build doesn't crash
    }
};

export const getBlogs = async () => {
    try {
        const response = await client.getList<Blog>({ endpoint: "blogs" });
        console.log(`\x1b[32m[MicroCMS] SUCCESS: Fetched ${response.contents.length} blogs.\x1b[0m`);
        return response;
    } catch (error) {
        console.error(`\x1b[31m[MicroCMS] FAILED to fetch blogs: ${error}\x1b[0m`);
        return { contents: [] };
    }
};

export const getNews = async () => {
    try {
        const response = await client.getList<News>({ endpoint: "news" });
        console.log(`\x1b[32m[MicroCMS] SUCCESS: Fetched ${response.contents.length} news items.\x1b[0m`);
        return response;
    } catch (error) {
        console.error(`\x1b[31m[MicroCMS] FAILED to fetch news: ${error}\x1b[0m`);
        return { contents: [] };
    }
};

export const getSponsors = async () => {
    try {
        const response = await client.getList<Sponsor>({ endpoint: "sponsors" });
        console.log(`\x1b[32m[MicroCMS] SUCCESS: Fetched ${response.contents.length} sponsors.\x1b[0m`);
        return response;
    } catch (error) {
        console.error(`\x1b[31m[MicroCMS] FAILED to fetch sponsors: ${error}\x1b[0m`);
        return { contents: [] };
    }
};

export const getNewsDetail = async (contentId: string) => {
    try {
        const response = await client.getListDetail<News>({ endpoint: "news", contentId });
        return response;
    } catch (error) {
        console.error("Failed to fetch news detail:", error);
        return null;
    }
};

export const getProjectDetail = async (contentId: string) => {
    try {
        const response = await client.getListDetail<Project>({ endpoint: "projects", contentId });
        return response;
    } catch (error) {
        console.error("Failed to fetch project detail:", error);
        return null;
    }
};

export const getBlogDetail = async (contentId: string) => {
    try {
        const response = await client.getListDetail<Blog>({ endpoint: "blogs", contentId });
        return response;
    } catch (error) {
        console.error("Failed to fetch blog detail:", error);
        return null;
    }
};
