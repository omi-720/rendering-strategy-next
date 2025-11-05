import React from 'react';

export const dynamic = 'force-dynamic';

export default async function TodosSSR() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const todos = await res.json();

  return (
    <main>
      <h1>Todos (SSR)</h1>
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
