import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                View Project
            </a>
        </div>
    );
};

export default ProjectCard;