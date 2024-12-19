// layout.server.js (for server-side metadata)
export const metadata = {
    title: 'Orman India',
    description: 'This Is the Home Page of Orman India',
  };
  
  export default function RootLayoutServer({ children }) {
    return <>{children}</>;
  }
  