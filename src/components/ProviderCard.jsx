// src/components/ProviderCard.jsx
import React from 'react';

export default function ProviderCard({ provider }) {
  const {
    imageUrl,
    name,
    title,
    locations = [],
    accepting,
    telehealth,
    ageGroups = [],
    issues = [],
    specialties = [],
    supervisedBy,
  } = provider;

  return (
    <article className="provider-card glass">
      <img src={imageUrl} alt={`Portrait of ${name}`} className="provider-image" />
      <div className="provider-info">
        <h2 className="provider-name">{name}</h2>
        <p className="provider-title">{title}</p>
        {supervisedBy && <p className="provider-supervisor">Supervised by {supervisedBy}</p>}
        <div className="tags">
          {locations.map((loc) => (
            <span key={loc} className="tag location">{loc}</span>
          ))}
          {accepting && <span className="tag accepting">Accepting</span>}
          {telehealth && <span className="tag telehealth">Telehealth</span>}
          {ageGroups.map((age) => (
            <span key={age} className="tag age">{age}</span>
          ))}
          {specialties.map((spec) => (
            <span key={spec} className="tag specialty">{spec}</span>
          ))}
          {issues.map((issue) => (
            <span key={issue} className="tag issue">{issue}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
