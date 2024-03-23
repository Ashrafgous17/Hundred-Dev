import { client } from "../../../sanity/lib/client";

export async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      body,
        publishedAt,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      "authorName": author->name,
      "authorImage": author->image
    }`;
  const posts = await client.fetch(query);
  return posts;
}
