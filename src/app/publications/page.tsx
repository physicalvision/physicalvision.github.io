"use client"

import { useState, useEffect, use } from "react";
import publicationsData from "@/pvg_db/publications.json";
import { Input } from "@/components/ui/input";
import { Search} from "@/components/ui/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { typeColors, typeLabels, linkIcons } from "@/components/ui/icons";

export default function PublicationsPage() {
    // State to manage search query and filtered publications
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("all types");
    const [yearFilter, setYearFilter] = useState("all years");
    const [topicFilter, setTopicFilter] = useState("all topics");
    const [filteredPublications, setFilteredPublications] = useState(publicationsData);

    // Filter publications based on search query and filters
    useEffect(() => {
        setFilteredPublications(
            publicationsData.filter(pub => {
                // Filter by Search term
                const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                      pub.conference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                      pub.authors.toSpliced(0, 0).some(author => author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                                      pub.description?.toLowerCase().includes(searchQuery.toLowerCase());
                // Filter by Type
                const matchesType = typeFilter === "all types" || (Array.isArray(pub.type) ? pub.type.includes(typeFilter) : pub.type === typeFilter);
                // Filter by Year
                const pubYear = pub.date?.split("/")?.[2] || "Unknown";
                const matchesYear = yearFilter === "all years" || pubYear === yearFilter;
                // Filter by Topic
                const matchesTopic = topicFilter === "all topics" || (Array.isArray(pub.topics) ? pub.topics.includes(topicFilter) : pub.topics === topicFilter);
                
                return matchesSearch && matchesType && matchesYear && matchesTopic;
            }).sort((a, b) => Number.parseInt(b.date?.split("/")?.[2]) - Number.parseInt(a.date?.split("/")?.[2])), // Sort by year descending
        )
    }, [searchQuery, typeFilter, yearFilter, topicFilter]);

    // Get unique types from publications
    const uniqueTypes = Array.from(new Set(publicationsData.flatMap(pub => Array.isArray(pub.type) ? pub.type : [pub.type]))).sort();

    // Get unique years from publications
    const uniqueYears = Array.from(new Set(publicationsData.map(pub => pub.date?.split("/")?.[2] || "Unknown"))).sort((a, b) => Number.parseInt(b) - Number.parseInt(a));

    // Get unique topics from publications
    const uniqueTopics = Array.from(new Set(publicationsData.flatMap(pub => Array.isArray(pub.topics) ? pub.topics : [pub.topics]))).sort();

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Clear filters
    const clearFilters = () => {
        setSearchQuery("");
        setTypeFilter("all types");
        setYearFilter("all years");
        setTopicFilter("all topics");
    };

    return (
        <>
            <section className="max-w-6xl pt-6 pb-2 rounded-lg">
                <div className="flex flex-col px-4 md:px-6 py-2">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Publications</h1>
                    <p className="text-gray-900 mb-4">See also the full list of publications in &nbsp;
                    <a href="https://scholar.google.com/citations?user=mvpE6bIAAAAJ" className="text-blue-800 hover:underline">
                        Google Scholar
                    </a>.</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {/* Filter and search controls */}
                        <div className="flex relative min-w-[480px]">
                            <Input
                                type="text"
                                placeholder="Search publications..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="pl-10 text-gray-900"
                            />
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground text-gray-400" />
                        </div>

                        {/* Filter and select controls */}
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <Select value={topicFilter} onValueChange={setTopicFilter}>
                                <SelectTrigger className="w-full sm:w-[240px] text-left text-gray-900">
                                    <SelectValue placeholder="All Topics" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all topics">
                                        <span className="px-4 py-1 rounded text-gray-700">
                                            All Topics
                                        </span>
                                    </SelectItem>
                                    {uniqueTopics.map((topic) => (
                                        <SelectItem key={topic} value={topic}>
                                            <span className={`bg-white text-gray-700 px-4 py-1 text-left`}>
                                                {topic}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-full sm:w-[160px] text-left text-gray-900">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all types">
                                        <span className="px-4 py-1 rounded text-gray-700">
                                            All Types
                                        </span>
                                    </SelectItem>
                                    {uniqueTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            <span className={`bg-white text-gray-700 px-4 py-1 text-left`}>
                                                {typeLabels[type as keyof typeof typeLabels]}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={yearFilter} onValueChange={setYearFilter}>
                                <SelectTrigger className="w-full sm:w-[160px] text-left text-gray-900">
                                    <SelectValue placeholder="All Years" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all years">
                                        <span className="px-4 py-1 rounded text-gray-700">
                                            All Years
                                        </span>
                                    </SelectItem>
                                    {uniqueYears.map((year) => (
                                        <SelectItem key={year} value={year}>
                                            <span className={`bg-white text-gray-700 px-4 py-1 text-left`}>
                                                {year}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Filter status and clear button */} 
                    {(searchQuery || typeFilter !== "all types" || yearFilter !== "all years" || topicFilter !== "all topics") && (
                        <div className="flex items-center justify-between bg-muted/50 rounded-lg p-2">
                            <div className="text-sm text-gray-900">
                                <span className="font-semibold">Filters:</span>
                                {searchQuery && <span>Searching for: <strong>{searchQuery}</strong></span>}
                                {topicFilter !== "all topics" && <span> | Topic: <strong>{topicFilter}</strong></span>}
                                {typeFilter !== "all types" && <span> | Type: <strong>{typeLabels[typeFilter as keyof typeof typeLabels]}</strong></span>}
                                {yearFilter !== "all years" && <span> | Year: <strong>{yearFilter}</strong></span>}
                            </div>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-blue-800 hover:underline whitespace-nowrap text-right px-4"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}  
                </div>
            </section>

            {/* Publication list */}
            <section className="w-full flex justify-center bg-white py-6">
                <div className="w-full max-w-6xl px-4 md:px-6">
                    {filteredPublications.length > 0 ? (
                        Array.from(new Set(filteredPublications.map(pub => pub.date?.split("/")?.[2] || 
                        "Unknown"))).sort((a, b) => Number.parseInt(b) - Number.parseInt(a)).map(year => (
                            <div key={year} className="mb-4">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-1">{year}</h2>
                                <div className="space-y-6">
                                    {filteredPublications
                                    .filter(pub => pub.date?.split("/")?.[2] === year)
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
                                                            className="rounded-lg"
                                                        >
                                                            {type == "conference" && <span>{pub.conference}</span>}
                                                            {type == "journal" && <span>{pub.journal}</span>}
                                                            {type == "preprint" && <span>{pub.preprint}</span>}
                                                            {/* {type == "workshop" && <span>{pub.workshop}</span>}
                                                            {type == "book" && <span>{pub.book}</span>} */}
                                                        </span>
                                                    ))}
                                                    {pub.category && (
                                                        <span className="text-red-700">
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
                            <p>No publications found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </section>

        </>
    );
}