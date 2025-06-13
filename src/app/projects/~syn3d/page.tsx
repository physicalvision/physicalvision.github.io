"use client"

import publicationsData from "@/pvg_db/publications.json";
import projectsData from "@/pvg_db/projects.json";
import { HiChevronUp } from "react-icons/hi";
import { typeColors, typeLabels, linkIcons } from "@/components/ui/icons";

const projectName = "MSCA Fellowship SYN3D"
const projectKey = "SYN3D";

export default function SYN3DPage() {

    // Find the project data based on the project name
    const project = projectsData.currentProjects.find(p => p.name === projectName) || 
                    projectsData.pastProjects.find(p => p.name === projectName);

    // Find the publications related to the project
    const publications = publicationsData.filter(pub => pub.projects && pub.projects.includes(projectKey));
    
    return (
        <>
            <section className="max-w-6xl pt-6 pb-2 rounded-lg text-justify">
                <div className="flex flex-col px-4 md:px-6 py-2">
                    <div className="mb-6 rounded-lg ">
                        <a 
                            href="/projects"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 text-base text-blue-800 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg">
                            All research projects <HiChevronUp className="inline-block align-text-bottom text-blue-800 hover:text-blue-900"/> 
                        </a>
                    </div>
                    {/* Project Overview */}
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">{project.name}</h2>
                    <div className="flex flex-col">
                        <h3 className="text-xl font-semibold text-gray-900">{project.shortName}: {project.title}</h3>
                        <p className="text-lg text-gray-900">
                            <a
                                href={project.founder.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-800 hover:text-blue-900 underline"
                            >
                                {project.founder.name}
                            </a>
                        </p>
                        <p className="text-lg text-gray-900 mb-6">
                        The grant was awarded in {project.awardDate} ({project.budget}), and started in {project.startDate} and will end in {project.endDate}.
                        </p>
                        {/* Objectives */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Objectives</h3>
                        <p className="text-base text-gray-700 mb-2">{project.description}</p>
                        <p className="text-base text-gray-700 mb-6">
                            To achieve the objectives of <strong>{project.shortName}</strong>, the project focuses on the following key objectives:
                            {project.objectives && project.objectives.length > 0 && project.objectives.map((objective, index) => (
                                <li key={index} className="pt-2">
                                   {objective}
                                </li>
                            ))}
                        </p>
                        {/* Image */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Selected Results</h3>
                        {project.image.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                                {project.image.map((img, imgIndex) => (
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
                                ))}
                            </div>
                        )}
                        {/* Publications */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Publications</h3>
                        {publications.length > 0 ? (
                            Array.from(new Set(publications.map(pub => pub.date?.split("/")?.[2] ||
                            "Unknown"))).sort((a, b) => b.localeCompare(a)).map(year => (
                                <div key={year} className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-1">{year}</h2>
                                    <div className="space-y-6">
                                        {publications.filter(pub => pub.date?.split("/")?.[2] === year)
                                        .map((pub, index) => (
                                            <article 
                                            key={`${pub.title}-${index}`}
                                            className="flex flex-col md:flex-row gap-8 bg-white border border-gray-200 rounded-lg shadow-sm pl-2 py-2"
                                            >
                                            {/* Image */}
                                            <div className="w-1/7 flex justify-between items-center">
                                                {pub.image && pub.image.endsWith(".mp4") ? (
                                                <video
                                                    key={pub.image}
                                                    className="w-full h-auto object-cover rounded-lg"
                                                    loop 
                                                    autoPlay
                                                    muted
                                                >
                                                    <source src={pub.image} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>     
                                                ):(
                                                    <img
                                                        key={pub.image}
                                                        src={pub.image}
                                                        alt={pub.title}
                                                        className="w-full h-auto object-cover rounded-lg"
                                                    />
                                                )
                                                }
                                            </div>
                                            {/* Content */}
                                            <div className="w-6/7 flex flex-col md:flex-row justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-base font-semibold text-gray-900">{pub.title}</h3>
                                                    <div className="flex flex-wrap gap-2 py-1 text-sm text-gray-900">
                                                        {(Array.isArray(pub.type) ? pub.type : [pub.type]).map((type, typeIndex) => (
                                                            <span
                                                                key={typeIndex}
                                                                className="text-sm rounded-lg"
                                                            >
                                                                {type == "conference" && <span>{pub.conference}</span>}
                                                                {type == "journal" && <span>{pub.journal}</span>}
                                                                {type == "preprint" && <span>{pub.preprint}</span>}
                                                                {type == "workshop" && <span>{pub.workshop}</span>}
                                                                {type == "book" && <span>{pub.book}</span>}
                                                            </span>
                                                        ))}
                                                        {pub.category && (
                                                            <span className="text-sm text-red-700">
                                                                ({pub.category})
                                                            </span>
                                                        )}
                                                    </div>
                                                    {pub.authors && pub.authors.length > 0 && (
                                                        <div className="flex flex-wrap gap-1">
                                                            {pub.authors.map((author, authorIndex) => (
                                                                <a
                                                                key={authorIndex}
                                                                href={author.url || "#"}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="py-1 text-sm text-blue-800 hover:text-blue-900"         
                                                                >
                                                                    <span className="underline">{author.name}</span>
                                                                    {authorIndex < pub.authors.length - 1 && <span>,&nbsp;</span>}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <p className="text-sm text-gray-700 pt-2 pr-2">{pub.description}</p>
                                                    {pub.links && pub.links.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 pt-4 items-bottom">
                                                            {pub.links.map((link, linkIndex) => (
                                                                <a
                                                                    key={linkIndex}
                                                                    href={link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="px-3 py-1 text-xs text-blue-800 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg"
                                                                >
                                                                    {linkIcons[link.label as keyof typeof linkIcons] || "🔗"} {link.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                        ))): (
                            <div className="text-center text-gray-500">
                                <p>No publications found matching the projects.</p>
                            </div>
                        )}
                    </div>    
                </div>
            </section>
        </>
    );
}