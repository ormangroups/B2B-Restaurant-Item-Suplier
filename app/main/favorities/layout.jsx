// main/favorites/layout.jsx
export default function Layout({ children }) {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Favorites</h1>
        {children}
      </div>
    );
  }
  