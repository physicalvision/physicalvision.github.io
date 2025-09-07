"use client"

import projectData from "@/pvg_db/projects.json";

export default function PublicationsPage() {
    // Sort projects by date in descending order
    const sortedCurrentProjects = projectData.currentProjects;
    const sortedPastProjects = projectData.pastProjects;

    return (
        <>
            <section className="max-w-6xl pt-6 pb-2 rounded-lg text-justify">
                <div className="flex flex-col px-4 md:px-6 py-2">
                    {/* Current Projects */}
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Current Projects</h2>
                    {sortedCurrentProjects.length > 0 && (
                        <div className="space-y-6">
                            {sortedCurrentProjects.map((project, index) => (
                                <article key={index} className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <div className="flex items-center px-4 py-3 border-b bg-gray-200">
                                        <h3 className="text-xl font-semibold text-gray-800 pr-6">
                                        {project.name}
                                        </h3>
                                        {project.website && (
                                            <a
                                                key={index}
                                                href={project.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-8 text-lg text-blue-800 hover:text-blue-900 underline flex items-center"
                                            >
                                                More ...
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex flex-col px-4 py-3">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.shortName}: {project.title}</h3>
                                        <p className="text-base text-gray-900">
                                            <a
                                                key={index}
                                                href={project.founder.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-800 hover:text-blue-900 underline"
                                            >
                                                {project.founder.name}
                                            </a>,
                                            &nbsp;{project.role}
                                            {project.teamMembers.length > 0 && (
                                                <span>
                                                {project.teamMembers.map((member, memberIndex) => (
                                                    member.name && (
                                                    <span key={memberIndex}>, with &nbsp;
                                                        <a
                                                        href={member.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-800 hover:text-blue-900 underline"
                                                        >
                                                        {member.name}
                                                        </a>
                                                    </span>
                                                    )                           
                                                ))}
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-base text-gray-900 mb-4">
                                            The grant was awarded on {project.awardDate} ({project.budget}), and started on {project.startDate} and will end on {project.endDate}.
                                        </p>
                                        {/* Description */}
                                        <p className="text-sm text-gray-700 mb-4">{project.description}</p>
                                        {/* Image */}
                                        {project.image && project.image.length > 0 && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                                {project.image.map((img, imgIndex) => (img.src && (
                                                    <p key={imgIndex} className="relative rounded-lg">
                                                        <video
                                                            key={imgIndex}
                                                            className="w-full h-auto rounded-lg"
                                                            loop 
                                                            autoPlay
                                                            muted
                                                            playsInline
                                                        >
                                                            <source src={img.src} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    <span className="absolute top-0 right-0 bg-black bg-opacity-100 text-white px-2 py-1 text-xs rounded">{img.title}</span>
                                                    <span className="text-sm text-gray-500">{img.alt}</span>
                                                    </p>
                                                )))}
                                            </div>
                                        )}
                                        {/* Links */}
                                        {project.links && project.links.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-4 items-bottom">
                                                {project.links.map((link, linkIndex) => (
                                                    <a
                                                        key={linkIndex}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1 text-xs text-blue-800 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg"
                                                    >
                                                        {link.label}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )
                    }

                    {/* Finished Projects */}
                    <h2 className="pt-10 text-2xl font-bold mb-6 text-gray-900">Finished Projects</h2>
                    {sortedPastProjects.length > 0 && (
                        <div className="space-y-6">
                            {sortedPastProjects.map((project, index) => (
                                <article key={index} className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <div className="flex items-center px-4 py-3 border-b bg-gray-200">
                                        <h3 className="text-xl font-semibold text-gray-800 pr-6">
                                        {project.name}
                                        </h3>
                                        {project.website && (
                                            <a
                                                key={index}
                                                href={project.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-8 text-lg text-blue-800 hover:text-blue-900 underline flex items-center"
                                            >
                                                More ...
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex flex-col px-4 py-3">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.shortName}: {project.title}</h3>
                                        <p className="text-base text-gray-900">
                                            <a
                                                key={index}
                                                href={project.founder.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-800 hover:text-blue-900 underline"
                                            >
                                                {project.founder.name}
                                            </a>,
                                            &nbsp;{project.role}
                                            {project.teamMembers.length > 0 && (
                                                <span>
                                                    , with
                                                    {project.teamMembers.map((member, memberIndex) => (
                                                        <span key={memberIndex}>
                                                            &nbsp;<a
                                                                href={member.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-800 hover:text-blue-900 underline"
                                                            >
                                                                {member.name}
                                                            </a>
                                                        </span>
                                                    ))}
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-base text-gray-900 mb-4">
                                            The grant was awarded on {project.awardDate} ({project.budget}), and started on {project.startDate} and was end on {project.endDate}.
                                        </p>
                                        {/* Description */}
                                        <p className="text-sm text-gray-700 mb-4">{project.description}</p>
                                        {/* Image */}
                                        {project.image && project.image.length > 0 && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                                {project.image.map((img, imgIndex) => (img.src && (
                                                    <p key={imgIndex} className="relative rounded-lg">
                                                        <video
                                                            key={imgIndex}
                                                            className="w-full h-auto rounded-lg"
                                                            loop 
                                                            autoPlay
                                                            muted
                                                            playsInline
                                                        >
                                                            <source src={img.src} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    <span className="absolute top-0 right-0 bg-black bg-opacity-100 text-white px-2 py-1 text-xs rounded">{img.title}</span>
                                                    <span className="text-sm text-gray-500">{img.alt}</span>
                                                    </p>
                                                )))}
                                            </div>
                                        )}
                                        {/* Links */}
                                        {project.links && project.links.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-4 items-bottom">
                                                {project.links.map((link, linkIndex) => ( link.label && (
                                                    <a
                                                        key={linkIndex}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1 text-xs text-blue-800 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg"
                                                    >
                                                        {link.label}
                                                    </a>
                                                )))}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )
                    }
                </div>
            </section>

            
        </>
    );
}