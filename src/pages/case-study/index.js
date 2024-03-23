import Breadcrumb from "@/components/common/Breadcrumb";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import React from "react";
import { getCase } from "../api/getCase";

function CaseStudyPage({ caseStudies }) {
  return (
    <Layout>
      <Breadcrumb
        pageList="CASE STUDY"
        title="From Challenge To Triumph"
        pageName="Case Study"
      />
      <div className="home6-case-study-section sec-mar">
        <div className="container">
          {caseStudies.map((study, index) => (
            <div
              key={study.slug}
              className={`row g-lg-4 gy-5 py-3 ${
                index % 2 === 0 ? "border-rights" : ""
              }`}
            >
              <div
                className={`col-lg-6 ${index % 2 === 0 ? "" : "offset-lg-6"}`}
              >
                <div className={index % 2 === 0 ? "case-left" : "case-right"}>
                  <div className="row g-lg-4 gy-5">
                    <div className="col-lg-12">
                      <div className="home6-case-study">
                        <div className="case-img magnetic-item">
                          <img
                            className="img-fluid"
                            src={study.mainImage.asset.url}
                            alt={study.mainImage.alt || "Case Study Image"}
                          />
                        </div>
                        <div className="case-content">
                          <span>{study.niche.toUpperCase()}</span>
                          <h3>
                            <Link
                              href={`/case-study/${study.slug}`}
                              legacyBehavior
                            >
                              <a>{study.title}</a>
                            </Link>
                          </h3>
                          <p>{study.shortOverview}</p>
                          <div className="learn-btn">
                            <Link
                              href={`/case-study/${study.slug}`}
                              legacyBehavior
                            >
                              <a className="primary-btn9">
                                <span>Learn More</span>
                                <svg
                                  width="16"
                                  height="14"
                                  viewBox="0 0 16 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 0.5L15 7.5M15 7.5L8 13.5M15 7.5H0"
                                    stroke="#4F46E5"
                                  />
                                </svg>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const caseStudies = await getCase();
  return {
    props: {
      caseStudies,
    },
  };
}

export default CaseStudyPage;
