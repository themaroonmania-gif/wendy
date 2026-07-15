// src/components/FilterBar.jsx
import React from 'react';

export default function FilterBar({ onChange }) {
  const handleConcernChange = (e) => {
    onChange('concern', e.target.value);
  };
  const handleLocationChange = (e) => {
    onChange('location', e.target.value);
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search concerns (e.g., anxiety)"
        className="filter-input"
        onChange={handleConcernChange}
        aria-label="Search Concerns"
      />
      <input
        type="text"
        placeholder="Location (e.g., Dallas)"
        className="filter-input"
        onChange={handleLocationChange}
        aria-label="Location Filter"
      />
    </div>
  );
}
