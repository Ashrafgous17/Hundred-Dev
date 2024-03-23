import { blockContent } from "./schemaTypes/blockContent";
import { category } from "./schemaTypes/category";
import { post } from "./schemaTypes/post";
import { author } from "./schemaTypes/author";
import { caseStudy } from "./schemaTypes/caseStudy";

export const schema = {
  types: [post, author, category, blockContent, caseStudy],
};
