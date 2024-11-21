import React from 'react';
import './Content.css';
import { Calendar, Gamepad, Tags } from 'lucide-react';
const Content = ({ title, image, platform, release_date, genre, index }) => {
    const genres = genre.split(',').map(g => g.trim());
    return (
        <div className="card-content" style={{ '--animation-order': index }}>
            <div className="img-container">
                <img src={image} alt={title} />
                <div className="platform-badge">{platform.split(',')[0]}</div>
            </div>
            <div className="card-body">
                <div className="release-date">
                    <Calendar size={12} className="inline-block mr-1" />
                    {release_date}
                </div>
                <div className="card-title">
                    <h3>{title}</h3>
                </div>
                <p className="card-text">
                    <Gamepad size={16} />
                    {platform}
                </p>
                <div className="genre-tags">
                    <Tags size={16} className="text-cyan-400" />
                    {genres.map((g, i) => (
                        <span key={i} className="genre-tag">
                            {g}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Content;