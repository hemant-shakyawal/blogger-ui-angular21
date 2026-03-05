import { CategoryModel } from "./category.model";

export interface BlogpostModel {
    id?: number;
    title: string;
    shortDescription: string;
    content: string;
    featuredImageUrl: string;
    urlHandle: string;
    publishDate: Date;
    author: string;
    isVisible: boolean;
    categories: CategoryModel[];


}
