// src/App.jsx
import { useEffect, useState } from 'react';
import ProviderCard from './components/ProviderCard.jsx';
import FilterBar from './components/FilterBar.jsx';
import './index.css';

function App() {
  const [providers, setProviders] = useState([]);
  const [filters, setFilters] = useState({ concern: '', location: '' });
  const [filtered, setFiltered] = useState([]);

  // Load provider data (generated JSON)
  useEffect(() => {
    fetch('/data/providers.json')
      .then((r) => r.json())
      .then(setProviders)
      .catch(console.error);
  }, []);

  // Apply filters
  useEffect(() => {
    let list = providers;
    if (filters.concern) {
      const term = filters.concern.toLowerCase();
      list = list.filter((p) => p.specialties.some((s) => s.toLowerCase().includes(term)));
    }
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      list = list.filter((p) => p.locations.some((l) => l.toLowerCase().includes(loc)));
    }
    setFiltered(list);
  }, [providers, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="app-container">
      <header className="hero">
        <h1 className="hero-title">Find Your Perfect Therapist</h1>
        <p className="hero-subtitle">Match your concerns to the right clinician in seconds.</p>
        <FilterBar onChange={handleFilterChange} />
      </header>
      <main className="providers-grid">
        {filtered.length ? (
          filtered.map((p) => <ProviderCard key={p.id} provider={p} />)
        ) : (
          <p className="empty-state">No therapists match your selection.</p>
        )}
      </main>
    </div>
  );
}

export default App;
