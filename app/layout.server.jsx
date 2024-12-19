export const metadata = {
  title: 'Orman India - B2B Marketplace',
  description: 'Shop the best B2B products from Orman India.',
  keywords: 'orman india, B2B marketplace, wholesale products',
  // Add canonical URL if necessary
  openGraph: {
    url: 'https://www.ormanindia.com',
    title: 'Orman India - B2B Marketplace',
    description: 'Shop the best B2B products from Orman India.',
    site_name: 'Orman India',
    images: [
      {
        url: 'https://www.ormanindia.com/images/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Orman India B2B Marketplace',
      },
    ],
  },
};
  
  export default function RootLayoutServer({ children }) {
    return <>{children}</>;
  }
  