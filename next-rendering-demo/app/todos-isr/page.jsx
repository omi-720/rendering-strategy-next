import React from 'react';

export const revalidate = 10; // ISR: revalidate every 10 seconds

export default async function TodosISR() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', { next: { revalidate: 10 } });
  const todos = await res.json();

  return (
    <main>
      <h1>Todos (ISR — revalidate=10s)</h1>
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
