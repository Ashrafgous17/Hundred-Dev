import { useRouter } from "next/router";
import Breadcrumb from "@/components/common/Breadcrumb";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import React from "react";
import { getCaseSlugs, getCaseStudyBySlug } from "../api/getCase";

export default function ProjectDetailsPage({ caseStudy }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Breadcrumb
        pageList="Projects Details"
        title={caseStudy.title}
        pageName={caseStudy.title.toUpperCase()}
      />
      <div className="portfolio-details sec-mar">
        <div className="container">
          <div className="row g-4 mb-80">
            <div className="col-lg-7">
              <div className="portfolio-img magnetic-item">
                <img
                  className="img-fluid"
                  src={caseStudy.mainImageUrl}
                  alt={caseStudy.title}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="portfolio-img magnetic-item">
                    <img
                      className="img-fluid"
                      src={caseStudy.mainImageUrl2}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="portfolio-img magnetic-item">
                    <img
                      className="img-fluid"
                      src={caseStudy.mainImageUrl3}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row gy-5">
            <div className="col-lg-8">
              <div className="portfolio-content">
                <h3>Project Overview</h3>
                <p>{caseStudy.overview}</p>
                <div className="working-process">
                  <h3>Our Process</h3>
                  <div className="row g-4 justify-content-center">
                    {caseStudy.threeStepProcess &&
                      caseStudy.threeStepProcess.map((step, index) => (
                        <div key={index} className="col-xl-4 col-sm-6">
                          <div className="single-process magnetic-item">
                            <div className="icon">
                              <img
                                src={`assets/img/inner-pages/${
                                  index === 0
                                    ? "research"
                                    : index === 1
                                    ? "development"
                                    : "deploy"
                                }.svg`}
                                alt=""
                              />
                            </div>
                            <span>Step {index + 1}</span>

                            <h3>
                              {index === 0
                                ? "Research"
                                : index === 1
                                ? "Development"
                                : "Deploy"}
                            </h3>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <h3>Result</h3>
                <p>{caseStudy.result}</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="portfolio-info">
                <ul>
                  <li>
                    <span>Client:</span>
                    <h5>{caseStudy.client}</h5>
                  </li>
                  <li>
                    <span>Project Type:</span>
                    <h5>{caseStudy.projectType}</h5>
                  </li>
                  <li>
                    <span>Duration:</span>
                    <h5>{caseStudy.duration}</h5>
                  </li>
                </ul>
              </div>
              <div className="portfolio-details-sm-banner">
                <div className="section-title-5">
                  <h2>
                    Ready to <br />
                    <span>work with us?</span>
                  </h2>
                  <div className="get-btn">
                    <Link legacyBehavior href="/contact">
                      <a className="primary-btn3">Get a quote</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = await getCaseSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug: slug.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    return { notFound: true };
  }

  return {
    props: {
      caseStudy,
    },
    revalidate: 1, // In seconds
  };
}
