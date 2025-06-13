"use client";

import { useState, useEffect, use } from "react";
import newsData from "@/pvg_db/news.json";
import { Input } from "@/components/ui/input";
import { Search } from "@/components/ui/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const typeColors = {
    "publication": "bg-blue-100 text-blue-800",
    "award": "bg-yellow-100 text-yellow-800",
    "project": "bg-pink-100 text-pink-800",
    "event": "bg-green-100 text-green-800",
    "other": "bg-purple-100 text-purple-800",
    };

const typeIcons = {
    "publication": "📄",
    "award": "🏆",
    "project": "🔧",
    "event": "📅",
    "other": "ℹ️",
};

const typeLabels = {
    "publication": "Publication",
    "award": "Award",
    "project": "Project",
    // "event": "Event",
    "other": "Other",
};

export default function NewsPage() {
    // State for search, filters, and publications
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all categories");
    const [yearFilter, setYearFilter] = useState("all years");
    const [filteredNews, setFilteredNews] = useState(newsData);

    // Filtered news items based on search and filters
    useEffect(() => {
        setFilteredNews(
            newsData.filter(item => {
                // Filter by search term
                const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
                // Filter by category
                const matchesCategory = categoryFilter === "all categories" || (Array.isArray(item.type) ? item.type.includes(categoryFilter) : item.type === categoryFilter);
    
                // Filter by year
                const itemYear = item.date?.split("/")?.[2] || "Unknown";
                const matchesYear = yearFilter === "all years" || itemYear === yearFilter;
    
                return matchesSearch && matchesCategory && matchesYear;
            }).sort((a, b) => Number.parseInt(b.date?.split("/")?.[2]) - Number.parseInt(a.date?.split("/")?.[2])), // Sort by year descending
        )
    }, [searchTerm, categoryFilter, yearFilter]);

    // Get unique years for filtering
    const uniqueYears = Array.from(new Set(newsData.map(item => item.date?.split("/")?.[2] || "Unknown"))).sort((a, b) => Number.parseInt(b) - Number.parseInt(a));

    // Get unique categories for filtering
    const uniqueCategories = Array.from(
    new Set(newsData.flatMap(item => Array.isArray(item.type) ? item.type : [item.type]))
    ).sort();

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    // Clear filters
    const clearFilters = () => {
        setSearchTerm("");
        setCategoryFilter("all categories");
        setYearFilter("all years");
    };

    return (
        <>
            <section className="max-w-6xl pt-6 pb-2 rounded-lg">
                <div className="flex flex-col px-4 md:px-6 py-2">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">News</h1>
                    <p className="text-gray-900 mb-4">
                        Stay updated with the latest news, publications, projects, awards, and events from the Physical Vision Group.
                    </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            {/* Filter and search controls */}
                            <div className="flex relative min-w-[480px]">
                                <Input
                                    type="text"
                                    placeholder="Search news..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="pl-10 text-gray-900"
                                />
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground text-gray-400" />
                            </div>

                            {/* Filter and select controls */}
                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                    <SelectTrigger className="w-full sm:w-[240px] text-left text-gray-900">
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all categories">
                                            <span className="px-4 py-1 rounded text-gray-700">
                                                All Categories
                                            </span>
                                        </SelectItem>
                                        {uniqueCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                <span className={`bg-white text-gray-700 px-4 py-1 text-left`}>
                                                    {typeLabels[category as keyof typeof typeLabels]}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={yearFilter} onValueChange={setYearFilter}>
                                    <SelectTrigger className="w-full sm:w-[240px] text-left text-gray-900">
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
                        {(searchTerm || categoryFilter !== "all categories" || yearFilter !== "all years") && (
                        <div className="flex items-center justify-between bg-muted/50 rounded-lg p-2">
                            <div className="text-sm text-gray-900">
                                <span className="font-semibold">Filters:</span>
                                {searchTerm && <span>Searching for: <strong>{searchTerm}</strong></span>}
                                {categoryFilter !== "all types" && <span> | Type: <strong>{typeLabels[categoryFilter as keyof typeof typeLabels]}</strong></span>}
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

            {/* News items list */}
            <section className="w-full flex justify-center bg-white py-6">
                <div className="w-full max-w-6xl px-4 md:px-6">
                    {filteredNews.length > 0 ? (
                    Array.from(new Set(filteredNews.map(item => item.date?.split("/")?.[2] || 
                    "Unknown"))).sort((a, b) => Number.parseInt(b) - Number.parseInt(a)).map(year => (
                        <div key={year} className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-1">{year}</h2>
                            <div className="space-y-6">
                                {filteredNews
                                .filter(item => item.date?.split("/")?.[2] === year)
                                .map((item, index) => (
                                    <article
                                    key={index}
                                    className="w-full bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-4"
                                    >
                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                                            {item.links && item.links.length > 0 && (
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                {item.links.map((link, linkIndex) => (
                                                    <a
                                                    key={linkIndex}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-3 py-1 text-sm text-blue-800 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg"
                                                    >
                                                    {link.name}
                                                    </a>
                                                ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col justify-between items-end">
                                        <div className="flex flex-wrap gap-2 justify-end">
                                            {(Array.isArray(item.type) ? item.type : [item.type]).map((type, typeIndex) => (
                                            <span
                                                key={typeIndex}
                                                className={`px-3 py-1 text-sm rounded-lg ${typeColors[type as keyof typeof typeColors]}`}
                                            >
                                                {typeIcons[type as keyof typeof typeIcons]} {typeLabels[type as keyof typeof typeLabels]}
                                            </span>
                                            ))}
                                        </div>
                                        <div className="text-sm text-gray-400 whitespace-nowrap mt-2">{item.date}</div>
                                        </div>
                                    </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    ))) : (
                    <p className="text-center text-gray-500">No news items found.</p>
                    )}
                </div>
            </section>
        </>
    )
}
// This is a client-side component that uses hooks and state management