import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHelmet = ({ 
  title = "Snatched Beauties - Premium Beauty Salon in Los Angeles | Professional Facials, Microblading & More",
  description = "Transform your beauty at Snatched Beauties LA. Expert facials, microblading, lash extensions, chemical peels & botox. Book your appointment today for radiant skin & enhanced beauty.",
  keywords = "beauty salon Los Angeles, facials LA, microblading Los Angeles, lash extensions, chemical peels, botox treatments, dermal fillers, beauty consultation, skincare treatments",
  canonical = "https://snatchedbeauties.la",
  image = "https://snatchedbeauties.la/snatched-beauties-social.jpg",
  type = "website",
  schema = null
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Snatched Beauties" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Snatched Beauties - Professional Beauty Treatments" />
      
      {/* Additional Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHelmet;