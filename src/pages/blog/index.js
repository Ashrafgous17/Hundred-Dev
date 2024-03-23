// Import necessary libraries and components
import BlogBanner from "@/components/blog/BlogBanner";
import Breadcrumb from "@/components/common/Breadcrumb";
import Layout from "@/components/layout/Layout";
import React from "react";
import Link from "next/link";
import { getAllPosts } from "../api/getPosts";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../sanity/lib/client";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

function BlogPgage({ posts }) {
  return (
    <Layout>
      <Breadcrumb
        pageList="Blog Grid"
        title="Exploring The Softconic Blog"
        pageName="BLOG GRID"
      />
      <BlogBanner />
      <div className="home3-blog-area sec-mar">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            {posts.map((post) => {
              const { _id, title, mainImage, publishedAt, slug } = post;
              return (
                <div
                  key={_id}
                  className="col-lg-4 col-md-6 wow animate fadeInLeft"
                  data-wow-delay="300ms"
                  data-wow-duration="1500ms"
                >
                  <div className="single-blog magnetic-item">
                    <div className="blog-img">
                      <img
                        className="img-fluid"
                        src={urlFor(mainImage).url()}
                        alt={title}
                      />
                    </div>
                    <div className="blog-content">
                      <ul className="blog-meta">
                        <li>
                          <Link href={`/blog/${slug.current}`}>
                            {new Date(publishedAt).toDateString()}
                          </Link>
                        </li>
                      </ul>
                      <h4>
                        <Link href={`/blog/${slug.current}`}>{title}</Link>
                      </h4>
                      <div className="blog-footer">
                        <div className="read-btn">
                          <Link href={`/blog/${slug.current}`}>
                            Read More
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 13 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 1H12M12 1V13M12 1L0.5 12"
                                stroke="#333333"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Fetch posts at build time
export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default BlogPgage;
