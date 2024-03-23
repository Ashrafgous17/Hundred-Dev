import Layout from "@/components/layout/Layout";
import Link from "next/link";
import React from "react";
import { client } from "../../../sanity/lib/client";
import BlockContent from "@sanity/block-content-to-react";

export async function getStaticPaths() {
  const query = `*[_type == "post"].slug.current`;
  const slugs = await client.fetch(query);
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  // Fetch the current post
  const currentPostQuery = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    body[]{
      ...,
      _type == "image" => {
        "url": asset->url,
        "alt": @.alt
      }
    },
    "category": category->title,
    publishedAt,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    "authorName": author->name,
    "authorImage": author->image.asset->url
  }`;
  const currentPost = await client.fetch(currentPostQuery, {
    slug: params.slug,
  });

  const allPostsQuery = `*[_type == "post"]|order(publishedAt asc){
    _id,
    title,
    "slug": slug.current,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt
  }`;
  const allPosts = await client.fetch(allPostsQuery);
  const currentIndex = allPosts.findIndex(
    (post) => post._id === currentPost._id
  );

  const prevPost = allPosts[currentIndex - 1] || null;
  const nextPost = allPosts[currentIndex + 1] || null;

  return {
    props: {
      currentPost,
      prevPost,
      nextPost,
    },
  };
}

function BlogDetailsPage({ currentPost, prevPost, nextPost }) {
  return (
    <Layout>
      <div className="bolog-details-area sec-mar">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="post-thumb magnetic-item">
                <img
                  className="img-fluid"
                  src={currentPost.mainImage.asset.url}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="row g-lg-4 gy-5">
            <div className="col-lg-8 offset-lg-2">
              <div className="blog-details-content">
                {/* GPT Fetch and add the Category in the span below */}

                <h2>{currentPost.title}</h2>
                <div className="author-and-meta">
                  <div className="author-area">
                    <div className="author-img">
                      {/*GPT Add Author Image here */}
                      <img src={currentPost.authorImage} alt="" />
                    </div>
                    <div className="author-content">
                      <h6>
                        By, <span>{currentPost.authorName}</span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  {currentPost && (
                    <BlockContent
                      blocks={currentPost.body}
                      projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                      dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="details-navigation">
                <div className="single-navigation">
                  {prevPost && (
                    <>
                      {/* GPT Add links to the next and previous posts and remove these ones */}
                      <div className="content">
                        <Link legacyBehavior href={`/blog/${prevPost.slug}`}>
                          <a>Previous</a>
                        </Link>
                        <h4>
                          <Link legacyBehavior href={`/blog/${prevPost.slug}`}>
                            <a>{prevPost.title}</a>
                          </Link>
                        </h4>
                      </div>
                      <Link legacyBehavior href={`/blog/${prevPost.slug}`}>
                        <a className="img">
                          <img
                            src={prevPost.mainImage.asset.url}
                            alt={
                              prevPost.mainImage.alt || "Previous Post Image"
                            }
                            className="navigation-image"
                          />

                          <div className="arrow">
                            <svg
                              width={12}
                              height={12}
                              viewBox="0 0 13 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 1H12M12 1V13M12 1L0.5 12" />
                            </svg>
                          </div>
                        </a>
                      </Link>
                    </>
                  )}
                </div>
                <div className="single-navigation two">
                  {nextPost && (
                    <>
                      <Link legacyBehavior href={`/blog/${nextPost.slug}`}>
                        <a className="img">
                          <img
                            src={nextPost.mainImage.asset.url}
                            alt={nextPost.mainImage.alt || "Next Post Image"}
                            className="navigation-image"
                          />

                          <div className="arrow">
                            <svg
                              width={12}
                              height={12}
                              viewBox="0 0 13 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 1H12M12 1V13M12 1L0.5 12" />
                            </svg>
                          </div>
                        </a>
                      </Link>
                      <div className="content">
                        <Link legacyBehavior href={`/blog/${nextPost.slug}`}>
                          <a>NEXT</a>
                        </Link>
                        <h4>
                          <Link legacyBehavior href={`/blog/${nextPost.slug}`}>
                            <a>{nextPost.title}</a>
                          </Link>
                        </h4>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlogDetailsPage;
