import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title = "Abba Whispers - Healing Through Faith",
  description = "Find healing and empowerment through Christian writings inspired by the Book of Psalms. Join our community of faith and discover peace through God's word.",
  keywords = "Christian faith, Psalms, healing, inspiration, spiritual growth, Bible study",
  image = "/logo.png",
  url = window.location.href,
  type = "website"
}) => {
  const siteTitle = "Abba Whispers";
  const fullTitle = title.includes(siteTitle) ? title : `${title} - ${siteTitle}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Abba Whispers" />
      <link rel="canonical" href={url} />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Abba Whispers",
          "description": description,
          "url": "https://abbawhispers.com",
          "logo": image,
          "sameAs": [
            "https://facebook.com/abbawhispers",
            "https://twitter.com/abbawhispers",
            "https://instagram.com/abbawhispers"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;