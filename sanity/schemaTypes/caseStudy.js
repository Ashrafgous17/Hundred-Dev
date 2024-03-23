export const caseStudy = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200, // You can adjust the max length
      },
    },
    {
      name: "niche",
      title: "Niche",
      type: "string",
    },
    {
      name: "shortOverview",
      title: "Short Overview",
      type: "text",
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true, // Enables image cropping, hotspot, and positioning
      },
    },
    {
      name: "mainImage2",
      title: "Main Image 2",
      type: "image",
      options: {
        hotspot: true, // Enables image cropping, hotspot, and positioning
      },
    },

    {
      name: "mainImage3",
      title: "Main Image 3",
      type: "image",
      options: {
        hotspot: true, // Enables image cropping, hotspot, and positioning
      },
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
    },
    {
      name: "result",
      title: "Result",
      type: "text",
    },
    {
      name: "compulsoryProcess",
      title: "3 Step Compulsory Process",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(3).max(3), // Ensures exactly 3 text fields
    },
    {
      name: "overview",
      title: "Overview",
      type: "text",
    },
    {
      name: "projectType",
      title: "Project Type",
      type: "string",
    },
    // Add more fields as needed
  ],
};
