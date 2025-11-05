import React from 'react';

export default async function TodosSSG() {
  // force-cache should produce a static (SSG) response during build or first request
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', { cache: 'force-cache' });
  const todos = await res.json();

  return (
    <main>
      <h1>Todos (SSG)</h1>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.title} {t.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </main>
  );
}
