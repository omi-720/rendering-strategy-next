import React from 'react';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav style={{ padding: 12, borderBottom: '1px solid #eee' }}>
          <a href="/">Home</a> {' | '}
          <a href="/todos-csr">Todos CSR</a> {' | '}
          <a href="/todos-ssr">Todos SSR</a> {' | '}
          <a href="/todos-ssg">Todos SSG</a> {' | '}
          <a href="/todos-isr">Todos ISR</a>
        </nav>
        <div style={{ padding: 12 }}>{children}</div>
      </body>
    </html>
  );
}
