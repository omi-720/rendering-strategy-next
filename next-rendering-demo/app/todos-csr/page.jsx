"use client";

import React, { useEffect, useState } from 'react';

export default function TodosCSR() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setTodos(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main>
      <h1>Todos (CSR)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((t) => (
            <li key={t.id}>
              {t.title} {t.completed ? '✅' : '❌'}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
