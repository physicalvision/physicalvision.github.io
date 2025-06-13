"use client"

import Image from "next/image";
import publicationsData from "@/pvg_db/publications.json";
import peopleData from "@/pvg_db/people.json";
import { FaGithub } from "react-icons/fa";
import { SocialIcons } from "@/components/ui/icons";
import { typeColors, typeLabels, linkIcons } from "@/components/ui/icons";

const peopleName = "Chuanxia"

export default function ChuanxiaPage() {
    // Find the person data for Chuanxia
    const person = peopleData.faculty.find(p => p.name && p.name.toLowerCase().includes(peopleName.toLowerCase()));
    
    const selctedPublications = publicationsData.filter(pub => pub.id && pub.id === "selected");

    return (
        <>

        <section className="max-w-6xl pt-6 pb-2 rounded-lg">
            <div className="flex flex-col md:flex-row gap-8 px-4 md:px-6 py-2">
                {/* Image */}
                <div className="w-1/5 flex items-center">
                    <Image
                        src={person?.photo}
                        alt={person?.name}
                        width={960}
                        height={960}
                        className="rounded-xl mx-auto">
                    </Image>
                </div>
                {/* Person Info */}
                <div className="w-4/5 flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                        {/* Name and Title */}
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">{person?.name}</h1>
                        <p className="text-gray-900 mb-4">{person?.title}</p>
                        <p className="text-blue-800 hover:text-blue-900 underline"><a href={person?.group.url}>{person?.group.name}</a></p>
                        <p className="text-blue-800 hover:text-blue-900"><a href={person?.department.url}>{person?.department.name}</a></p>
                        <p className="text-blue-800 hover:text-blue-900 mb-4"><a href={person?.university.url}>{person?.university.name}</a></p>
                        {/* Link */}
                        {person?.links && person.links.length > 0 && (
                            <div className="items-center justify-center">
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
                </div>
            </div>
            {/* Biography */}
            <div className="w-full px-4 md:px-6 mb-2 py-2 text-justify">
                <p className="text-gray-900 mb-4">
                    I am currently a <a href="https://marie-sklodowska-curie-actions.ec.europa.eu/actions/postdoctoral-fellowships" className="text-blue-800 hover:text-blue-900">Marie Skłodowska-Curie Actions (MSCA) Fellow </a>
                    in <a href="https://www.robots.ox.ac.uk/~vgg/" className="text-blue-800 hover:text-blue-900"> VGG </a> 
                    at the <a href="https://www.ox.ac.uk/" className="text-blue-800 hover:text-blue-900">University of Oxford</a>,
                    working with <a href="https://www.robots.ox.ac.uk/~vedaldi/" className="text-blue-800 hover:text-blue-900">Andrea Vedaldi</a> on feed-forward photorealistic 3D and 4D reconstruction.
                    I was very fortunate to also collaborate with <a href="https://www.robots.ox.ac.uk/~az/" className="text-blue-800 hover:text-blue-900">Andrew Zisserman</a>,
                    <a href="https://chrirupp.github.io/" className="text-blue-800 hover:text-blue-900"> Christian Rupprecht</a>,
                    and <a href="https://scholar.google.com/citations?user=n9nXAPcAAAAJ&hl=en" className="text-blue-800 hover:text-blue-900">Iro Laina </a>
                    in  <a href="https://www.robots.ox.ac.uk/~vgg/" className="text-blue-800 hover:text-blue-900"> VGG</a>.
                    I received my Ph.D. degree in Computer Science from the
                    <a href="https://www.ntu.edu.sg/" className="text-blue-800 hover:text-blue-900"> Nanyang Technological University (NTU)</a>,
                    advised by <a href="https://personal.ntu.edu.sg/astjcham/" className="text-blue-800 hover:text-blue-900"> Prof. Tat-Jen Cham </a>
                    and <a href="https://jianfei-cai.github.io/" className="text-blue-800 hover:text-blue-900"> Prof. Jianfei Cai</a>.             
                </p>
                <p className="text-gray-900 mb-4">
                    I am an incoming <a href="https://www.ntu.edu.sg/research/research-careers/nanyang-assistant-professorship-(nap)" className="text-blue-800 hover:text-blue-900">{person?.title} </a>
                    (starting from Fall 2025) at the <a href={person?.department.url} className="text-blue-800 hover:text-blue-900"> {person?.department.name}</a>,
                    <a href={person?.university.url} className="text-blue-800 hover:text-blue-900"> {person?.university.name}</a>,
                    where I lead the <a href={person?.group.url} className="text-blue-800 hover:text-blue-900"> {person?.group.name}</a>.
                    My research focuses on <strong>Creative AI</strong>, aiming to develop systems that perceive, reconstruct and interact with the physical world.
                    The broader goal is to create realistic digital twins of the natural world, with various physical properties,
                    capturing not only appearance, content, and geometry but also <strong>occlusion, dynamics, gravity, interaction, sound and more.</strong>
                </p>
            </div>

            {/* Positions */}
            <div className="w-full px-4 md:px-6 mb-6 py-2 text-justify bg-yellow-100">
                <h3 className="text-base font-medium italic flex items-center text-gray-900">
                <span className="mr-2 text-lg">📍</span>
                    Openings: more details are available at &nbsp;<a href="/position" className="text-blue-800 hover:text-blue-900">Position</a>.
                </h3>
                <ul className="list-disc font-medium italic pl-5 mb-1 text-gray-900">
                    <li className="mb-1"><strong className="underline">Phd student:</strong> &nbsp;
                    we have multiple PhD openings for Spring 2026 and Fall 2026.
                    </li>
                    <li className="mb-1"><strong className="underline">Postdoc position:</strong> &nbsp;
                    we have two postdoc positions available.
                    </li>
                    <li className="mb-1"><strong className="underline">Research Assistant:</strong> &nbsp;
                    we have two research assistant positions available.
                    </li>
                </ul>
            </div>

            {/* Publucations */}
            <div className="w-full px-4 md:px-6 mb-6 py-2">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Selected Publications</h1>
                <p className="text-gray-900 mb-2">
                    <a href="/publications" className="text-blue-800 hover:underline">
                        More Publications
                    </a>
                    &nbsp; and &nbsp;
                    <a href="https://scholar.google.com/citations?user=mvpE6bIAAAAJ" className="text-blue-800 hover:underline">
                        Google Scholar
                    </a>
                </p>
                {selctedPublications.length > 0 ? (
                    Array.from(new Set(selctedPublications.map(pub => pub.date?.split("/")?.[2] || 
                    "Unknown"))).sort((a, b) => Number.parseInt(b) - Number.parseInt(a)).map(year => (
                        <div key={year} className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-1">{year}</h2>
                            <div className="space-y-4">
                                {selctedPublications.filter(pub => pub.date?.split("/")?.[2] === year).map((pub, index) => (
                                    <article key={`${pub.title}-${index}`}
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
                                                            {type == "workshop" && <span>{pub.workshop}</span>}
                                                            {type == "book" && <span>{pub.book}</span>}
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
                ))):(
                    <div className="text-center text-gray-500">
                        <p>No selected publications.</p>
                    </div>
                )}
            </div>

            {/* Service */}
            <div className="w-full px-4 md:px-6 mb-6 py-2">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Professional Services</h1>
                <ul className="list-disc pl-5 text-gray-900">
                    <li className="mb-1">Area chair: BMVC (2024-2025), ACM MM 2024</li>
                    <li className="mb-1">Conference reviewer: CVPR (2020-2025), ICCV (2019-2025), ECCV (2020-2024), NeurIPS (2022-2025), ICLR (2021-2025), ICML 2023</li>
                    <li className="mb-1">Journal reviewer: TPAMI, IJCV, TIP, PR, TMM (Outstanding Reviewer Award, 2021), TCSVT</li>
                </ul>
            </div>

            {/* Awards & Honors */}
            <div className="w-full px-4 md:px-6 mb-6 py-2">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Awards and Honors</h1>
                <ul className="list-disc pl-5 text-gray-900">
                    <li className="mb-1">
                        <a href="https://www.nrf.gov.sg/grants/nrff/" className="underline">
                            Singapore NRF Fellow
                        </a>, National Research Foundation, 2025
                    </li>
                    <li className="mb-1">
                        <a href="https://www.daad.de/en/the-daad/postdocnet/fellows/fellows/" className="underline">
                            DAAD Ainet Fellow
                        </a>, 2024
                    </li>
                    <li className="mb-1">
                        <a href="https://marie-sklodowska-curie-actions.ec.europa.eu/actions/postdoctoral-fellowships" className="underline">
                            Marie Skłodowska-Curie Actions (MSCA) Fellow
                        </a>, 2024
                    </li>
                    <li className="mb-1">
                        <a href="https://www.ntu.edu.sg/computing/news-events/news/detail/scse-outstanding-phd-thesis-award-2022" className="underline">
                            NTU Outstanding PhD Thesis Award
                        </a>, 2022
                    </li>
                </ul>
            </div>        
        </section>
        </>
    );
}

