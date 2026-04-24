"use client";

import Image from 'next/image';
import peopleData from "@/pvg_db/people.json";
import { SocialIcons } from "@/components/ui/icons";

type AcademicPeriod = string | number | null | undefined;

function parseAcademicPeriod(period: AcademicPeriod) {
    if (period === null || period === undefined) {
        return -Infinity;
    }

    if (typeof period === "number") {
        return period * 10;
    }

    const normalized = period.trim();
    if (!normalized) {
        return -Infinity;
    }

    const yearMatch = normalized.match(/(19|20)\d{2}/);
    if (!yearMatch) {
        return -Infinity;
    }

    const year = Number(yearMatch[0]);
    const lower = normalized.toLowerCase();

    let termRank = 0;
    if (lower.includes("spring")) {
        termRank = 1;
    } else if (lower.includes("summer")) {
        termRank = 2;
    } else if (lower.includes("fall") || lower.includes("autumn")) {
        termRank = 3;
    } else if (lower.includes("winter")) {
        termRank = 0;
    }

    return year * 10 + termRank;
}

function formatAcademicPeriod(period: AcademicPeriod) {
    if (period === null || period === undefined || period === "") {
        return "";
    }

    return String(period);
}

function compareByAcademicPeriod(a: AcademicPeriod, b: AcademicPeriod) {
    return parseAcademicPeriod(b) - parseAcademicPeriod(a);
}

function formatOpenRange(start: AcademicPeriod) {
    const formattedStart = formatAcademicPeriod(start);
    return formattedStart ? `(${formattedStart}-)` : "";
}

function formatClosedRange(start: AcademicPeriod, end: AcademicPeriod) {
    const formattedStart = formatAcademicPeriod(start);
    const formattedEnd = formatAcademicPeriod(end);

    if (formattedStart && formattedEnd) {
        return `(${formattedStart}-${formattedEnd})`;
    }
    if (formattedStart) {
        return `(${formattedStart}-)`;
    }
    if (formattedEnd) {
        return `(-${formattedEnd})`;
    }
    return "";
}


export default function PeoplePage() {
    // Sort people by year and then by name
    const sortedResearchers = peopleData.Researchers.sort((a, b) => {
        const yearDiff = compareByAcademicPeriod(a.startYear, b.startYear);
        if (yearDiff !== 0) return yearDiff;
        return a.name.localeCompare(b.name);
    });

    const sortedCurrentStudents = peopleData.currentStudents.sort((a, b) => {
        const yearDiff = compareByAcademicPeriod(a.startYear, b.startYear);
        if (yearDiff !== 0) return yearDiff;
        return a.name.localeCompare(b.name);
    });

    const sortedVisitingStudents = peopleData.visitingStudents.sort((a, b) => {
        const yearDiff = compareByAcademicPeriod(a.startYear, b.startYear);
        if (yearDiff !== 0) return yearDiff;
        return a.name.localeCompare(b.name);
    });

    const sortedAlumni = peopleData.alumni.sort((a, b) => {
        const yearDiff = compareByAcademicPeriod(a.endYear, b.endYear);
        if (yearDiff !== 0) return yearDiff;
        return a.name.localeCompare(b.name);
    });

    const sortedCollaborators = [...peopleData.collaborators].sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));

    return (
        <>
            {/* Faculty */}
            <section className="max-w-6xl pt-6 pb-2 rounded-lg">
                <div className="flex flex-col px-4 md:px-6 py-2">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Faculty</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {peopleData.faculty.map((person, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md items-center text-center transition p-4">
                                <div className="flex items-center mb-4">
                                    <Image
                                        src={person.photo}
                                        alt={person.name}
                                        width={160}
                                        height={160}
                                        className="rounded-full mx-auto">
                                    </Image>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{person.name}</h3>
                                <p className="text-sm text-gray-900 mb-2">{person.title}</p>
                                <p className="text-xs text-gray-600 mb-0">{person.department.name}</p>
                                <p className="text-xs text-gray-600 mb-4">{person.university.name}</p>
                                {person.links && person.links.length > 0 && (
                                    <div className="flex items-center justify-center">
                                        {person.links.map((link, linkIndex) => (
                                            <a
                                                key={linkIndex}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-2 text-sm text-gray-800 hover:text-gray-900"
                                            >
                                                {SocialIcons[link.label as keyof typeof SocialIcons]}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Staff */}
            <section className="max-w-6xl pt-6 pb-2 rounded-lg">
                <div className="flex flex-col px-4 md:px-6 py-2">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Researchers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sortedResearchers.map((researcher, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md items-center text-center transition p-4">
                                <div className="flex items-center mb-4">
                                    <Image
                                        src={researcher.photo}
                                        alt={researcher.name}
                                        width={160}
                                        height={160}
                                        className="rounded-full mx-auto">
                                    </Image>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{researcher.name}</h3>
                                <p className="text-sm text-gray-900 mb-2">{researcher.title} {formatOpenRange(researcher.startYear)}</p>
                                <p className="text-xs text-gray-600 mb-4">{researcher.university}</p>
                                {researcher.links && researcher.links.length > 0 && (
                                    <div className="flex items-center justify-center">
                                        {researcher.links.map((link, linkIndex) => (
                                            <a
                                                key={linkIndex}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 text-sm text-gray-800 hover:text-gray-900"
                                            >
                                                {SocialIcons[link.label as keyof typeof SocialIcons]}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* currentStudents */}
            <section className="max-w-6xl pt-6 pb-2 rounded-lg">
                <div className="flex flex-col px-4 md:px-6 py-2">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">PhD Students</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sortedCurrentStudents.map((student, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md items-center text-center transition p-4">
                                <div className="flex items-center mb-4">
                                    <Image
                                        src={student.photo}
                                        alt={student.name}
                                        width={160}
                                        height={160}
                                        className="rounded-full mx-auto">
                                    </Image>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{student.name}</h3>
                                <p className="text-sm text-gray-900 mb-2">{student.title} {formatOpenRange(student.startYear)}</p>
                                {student.label && (
                                <p className="text-sm text-gray-600">
                                {student.label}
                                </p>
                                )}
                                {student.coSupervisors && (
                                <p className="text-sm text-gray-600">
                                with {student.coSupervisors}
                                </p>
                                )}
                                <p className="text-xs text-gray-600 mb-4">{student.university}</p>
                                {student.links && student.links.length > 0 && (
                                    <div className="flex items-center justify-center">
                                        {student.links.map((link, linkIndex) => (
                                            <a
                                                key={linkIndex}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 text-sm text-gray-800 hover:text-gray-900"
                                            >
                                                {SocialIcons[link.label as keyof typeof SocialIcons]}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* visitingStudents */}
            <section className="max-w-6xl pt-6 pb-2 rounded-lg">
                <div className="flex flex-col px-4 md:px-6 py-2">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Visiting Students</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sortedVisitingStudents.map((student, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md items-center text-center transition p-4">
                                <div className="flex items-center mb-4">
                                    <Image
                                        src={student.photo}
                                        alt={student.name}
                                        width={160}
                                        height={160}
                                        className="rounded-full mx-auto">
                                    </Image>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{student.name}</h3>
                                <p className="text-sm text-gray-900 mb-2">{student.title} {formatOpenRange(student.startYear)}</p>
                                {student.coSupervisors && (
                                <p className="text-sm text-gray-600">
                                with {student.coSupervisors}
                                </p>
                                )}
                                <p className="text-xs text-gray-600 mb-4">{student.university}</p>
                                {student.links && student.links.length > 0 && (
                                    <div className="flex items-center justify-center">
                                        {student.links.map((link, linkIndex) => (
                                            <a
                                                key={linkIndex}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 text-sm text-gray-800 hover:text-gray-900"
                                            >
                                                {SocialIcons[link.label as keyof typeof SocialIcons]}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* alumni */}
            <section className="max-w-6xl pt-6 pb-2 rounded-lg">
                <div className="flex flex-col px-4 md:px-6 py-2">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Alumni</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sortedAlumni.map((student, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md items-center text-center transition p-4">
                                <div className="flex items-center mb-4">
                                    <Image
                                        src={student.photo}
                                        alt={student.name}
                                        width={160}
                                        height={160}
                                        className="rounded-full mx-auto">
                                    </Image>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{student.name}</h3>
                                <p className="text-sm text-gray-900 mb-2">{student.title} {formatClosedRange(student.startYear, student.endYear)}</p>
                                {student.coSupervisors && (
                                <p className="text-sm text-gray-600">
                                with {student.coSupervisors}
                                </p>
                                )}
                                <p className="text-xs text-gray-600 mb-2">{student.university}</p>
                                <p className="text-xs text-gray-600 mb-4">{student.workposition}</p>
                                {student.links && student.links.length > 0 && (
                                    <div className="flex items-center justify-center">
                                        {student.links.map((link, linkIndex) => (
                                            <a
                                                key={linkIndex}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 text-sm text-gray-800 hover:text-gray-900"
                                            >
                                                {SocialIcons[link.label as keyof typeof SocialIcons]}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Collaborator */}
            <section className="max-w-4xl pt-6 pb-2 rounded-lg">
                <div className="flex flex-col px-4 md:px-6 py-2">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Collaborators</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        {sortedCollaborators.map((collaborator, index) => (
                            <li key={index} className="text-gray-900">
                                {collaborator.name} - {collaborator.university}
                                {collaborator.links && collaborator.links.length > 0 && (
                                    <span className="justify-start mt-1">
                                        {collaborator.links.map((link, linkIndex) => (
                                            <a
                                                key={linkIndex}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-1 text-sm text-blue-800 hover:text-blue-900"
                                            >
                                                {SocialIcons[link.label as keyof typeof SocialIcons]}
                                            </a>
                                        ))}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}