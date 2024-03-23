import { client } from "../../../sanity/lib/client";

export async function getCase() {
  const query = `*[_type == "caseStudy"] | order(_createdAt desc){
    title,
    "slug": slug.current,
    niche,
    shortOverview,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    client,
    duration,
    result,
    threeStepProcess,
    overview,
    projectType
  }`;

  const caseStudies = await client.fetch(query);
  return caseStudies;
}

// In your Sanity API file (e.g., ./api/getCase.js)
export async function getCaseStudyBySlug(slug) {
  const query = `*[_type == "caseStudy" && slug.current == $slug][0]{
      title,
      niche,
      shortOverview,
      "mainImageUrl": mainImage.asset->url,
      "mainImageUrl2": mainImage2.asset->url,
      "mainImageUrl3": mainImage3.asset->url,
      client,
      duration,
      result,
      "threeStepProcess": compulsoryProcess, 
      overview,
      projectType,
      "id": slug.current,
      
    }`;
  const caseStudy = await client.fetch(query, { slug });
  return caseStudy;
}

export async function getCaseSlugs() {
  const query = `*[_type == "caseStudy"]{ "slug": slug.current }`;
  const slugs = await client.fetch(query);
  return slugs;
}
