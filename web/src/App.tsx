import React, { useState, useEffect } from 'react';

import './App.css';
import { Repo } from './models/Repo';

export function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  console.log('repos: ', repos);

  useEffect(() => {
    fetch('/repos')
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        setRepos(data);
      })
      .catch(() => {
        console.log('Error while fetching repositories');
      });
  }, []);

  return <div>hi</div>;
}
