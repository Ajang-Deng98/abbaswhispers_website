import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({
  title = "Abba's Whispers - Christian Poetry & Spiritual Reflection",
  description = "Discover healing through poetry inspired by the Psalms. Join Uzo's journey from grief to grace with the SELAH series - Christian poetry for spiritual growth and comfort.",
  keywords = "Christian poetry, Psalms inspiration, spiritual healing, grief recovery, faith poetry, SELAH series, Christian meditation, prayer poetry, spiritual growth, biblical reflection",
  image = "/hero-image-homepage.JPG",
  url = "https://abbawhispers.com",
  type = "website",
  author = "Uzo - Abba's Whispers",
  publishedTime,
  modifiedTime,
  article = false
}) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || "https://abbawhispers.com";
  const fullUrl = `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": article ? "Article" : "WebSite",
    "name": title,
    "description": description,
    "url": fullUrl,
    "image": fullImageUrl,
    "author": {
      "@type": "Person",
      "name": "Uzo",
      "description": "Founder of Abba's Whispers, Christian poet, and spiritual guide"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Abba's Whispers",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    ...(article && publishedTime && {
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime
    })
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Abba's Whispers" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@abbawhispers" />

      {/* Article specific tags */}
      {article && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Christian Poetry" />
          <meta property="article:tag" content="Christian poetry, spiritual healing, faith" />
        </>
      )}

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#8b7355" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;