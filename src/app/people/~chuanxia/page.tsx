"use client"

import Image from "next/image";
import Link from "next/link";
import publicationsData from "@/pvg_db/publications.json";
import peopleData from "@/pvg_db/people.json";
import projectData from "@/pvg_db/projects.json";
import { SocialIcons } from "@/components/ui/icons";
import { typeColors, typeLabels, linkIcons } from "@/components/ui/icons";
import { BsArrowRightCircle } from "react-icons/bs";

const peopleName = "Chuanxia"

export default function ChuanxiaPage() {
    // Find the person data for Chuanxia
    const person = peopleData.faculty[0]; //.find(p => p.name.toLowerCase().includes(peopleName.toLowerCase()));
    
    const selctedPublications = publicationsData.filter(pub => pub.id && pub.id === "selected");
    const currentProjects = projectData.currentProjects.slice(0, 1); // Get the first 4 current projects

    return (
        <>

        <section className="max-w-6xl pt-6 pb-2 rounded-lg">
            <div className="flex flex-col md:flex-row gap-8 px-4 md:px-6 py-2">
                {/* Image */}
                <div className="w-2/3 md:w-1/5 flex sm:flex-row items-center">
                    <Image
                        src={person.photo}
                        alt={person.name}
                        width={960}
                        height={960}
                        className="rounded-xl mx-auto">
                    </Image>
                </div>
                {/* Person Info */}
                <div className="w-2/5 flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                        {/* Name and Title */}
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">{person?.name}</h1>
                        <p className="text-gray-900 mb-4">{person?.curTitle}</p>
                        <p className="text-blue-800 hover:text-blue-900 underline"><a href={person?.curGroup.url}>{person?.curGroup.name}</a></p>
                        <p className="text-blue-800 hover:text-blue-900"><a href={person?.curDepartment.url}>{person?.curDepartment.name}</a></p>
                        <p className="text-blue-800 hover:text-blue-900 mb-4"><a href={person?.curUniversity.url}>{person?.curUniversity.name}</a></p>
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
                {/* Other Info */}
                <div className="w-2/5 flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                        {/* Research Direction */}
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Research Interests:</h1>
                        <p className="font-bold text-gray-700">Physical AI</p>
                        <p className="font-bold text-gray-700">Spatial AI</p>
                        <p className="font-bold text-gray-700 mb-4">Generative AI</p>
                        {/* CV Button */}
                        <a
                            href="/files/resume_chuanxia.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded shadow"
                        >
                            Resume
                        </a>
                        {/* Google Scholar Button */}
                        <a
                            href="https://scholar.google.com/citations?user=mvpE6bIAAAAJ&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded shadow ml-8"
                        >
                            Google Scholar
                        </a>
                    </div>
                </div>
            </div>
            {/* Biography */}
            <div className="w-full px-4 md:px-6 mb-2 py-2 text-justify">
                <p className="text-gray-900 mb-4">
                    I am a <a href="https://www.ntu.edu.sg/research/research-careers/nanyang-assistant-professorship-(nap)" className="text-blue-800 hover:text-blue-900">{person?.title} </a>
                    at the <a href={person?.department.url} className="text-blue-800 hover:text-blue-900"> {person?.department.name}</a>,
                    <a href={person?.university.url} className="text-blue-800 hover:text-blue-900"> {person?.university.name}</a>,
                    where I lead the <a href={person?.group.url} className="text-blue-800 hover:text-blue-900"> {person?.curGroup.name}</a>.
                    My research focuses on <strong>Creative AI</strong>, aiming to develop systems that perceive, reconstruct and interact with the physical world.
                    The broader goal is to create realistic digital twins of the natural world, with various physical properties in a simulator,
                    capturing not only appearance, content, and geometry but also <strong>occlusion, dynamics, gravity, interaction, sound and more.</strong>
                </p>
                <p className="text-gray-900 mb-4">
                    Before joining NTU, I was a <a href="https://marie-sklodowska-curie-actions.ec.europa.eu/actions/postdoctoral-fellowships" className="text-blue-800 hover:text-blue-900">Marie Skłodowska-Curie Actions (MSCA) Fellow </a>
                    in <a href="https://www.robots.ox.ac.uk/~vgg/" className="text-blue-800 hover:text-blue-900"> VGG </a> 
                    at the <a href="https://www.ox.ac.uk/" className="text-blue-800 hover:text-blue-900">University of Oxford</a>,
                    working with <a href="https://www.robots.ox.ac.uk/~vedaldi/" className="text-blue-800 hover:text-blue-900">Andrea Vedaldi</a> on feed-forward realistic 3D and 4D reconstruction.
                    I was very fortunate to also collaborate with <a href="https://www.robots.ox.ac.uk/~az/" className="text-blue-800 hover:text-blue-900">Andrew Zisserman</a>,
                    <a href="https://chrirupp.github.io/" className="text-blue-800 hover:text-blue-900"> Christian Rupprecht</a>,
                    and <a href="https://scholar.google.com/citations?user=n9nXAPcAAAAJ&hl=en" className="text-blue-800 hover:text-blue-900">Iro Laina </a>
                    in  <a href="https://www.robots.ox.ac.uk/~vgg/" className="text-blue-800 hover:text-blue-900"> VGG</a>.
                    I received my Ph.D. degree in Computer Science from the
                    <a href="https://www.ntu.edu.sg/" className="text-blue-800 hover:text-blue-900"> Nanyang Technological University (NTU)</a>,
                    advised by <a href="https://personal.ntu.edu.sg/astjcham/" className="text-blue-800 hover:text-blue-900"> Prof. Tat-Jen Cham </a>
                    and <a href="https://jianfei-cai.github.io/" className="text-blue-800 hover:text-blue-900"> Prof. Jianfei Cai</a>.             
                </p>
            </div>

            {/* Positions section */}
            <section id="positions" className="w-full pb-4 max-w-full text-justify">
            <div className="container px-6 md:px-6 bg-yellow-100" role="alert">
                <h3 className="text-base font-medium italic flex items-center text-gray-900">
                <span className="mr-2 text-lg">📍</span>
                If you are looking for research positions, please see &nbsp;<a href="/position" className="text-blue-800 hover:text-blue-900">here</a>.
                </h3>
            </div>
            </section>

            {/* News */}
            <div className="w-full px-4 md:px-6 mb-4 py-2">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">News</h1>
                <ul className="list-disc pl-5 text-gray-900">
                    <li className="mb-1">
                        [29/07/2025] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        I am one of eleven researchers selected for 
                        <a href="https://file.go.gov.sg/nrf-fellowship.pdf" className="text-blue-800 hover:text-blue-900"> Singapore National Research Foundation (NRF) Fellow of the Year 2025</a>,
                        awarded outstanding young scientists from around the world to conduct independent research in Singapore, over a five-year period.
                    </li>
                    <li className="mb-1">
                        [29/10/2024] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        I have been selected as a
                        <a href="https://www.daad.de/en/the-daad/postdocnet/fellows/fellows/" className="text-blue-800 hover:text-blue-900"> DAAD AInet fellow</a>,
                        a fellowship awarded to excellent international researchers from the field of AI.
                    </li>
                    <li className="mb-1">
                        [13/02/2024] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        I am awarded the prestigious
                        <a href="https://marie-sklodowska-curie-actions.ec.europa.eu/actions/postdoctoral-fellowships" className="text-blue-800 hover:text-blue-900"> Marie Skłodowska-Curie Actions (MSCA) Fellowship</a>.
                        The Marie Skłodowska-Curie Actions (MSCA) are among Europe's most competitive and prestigious research and innovation fellowships
                        (<a href="https://en.wikipedia.org/wiki/Marie_Sk%C5%82odowska-Curie_Actions" className="text-blue-800 hover:text-blue-900">Wikipedia</a>).
                    </li>
                </ul>
            </div>

            {/* latest projects */}
            <div className="container px-4 md:px-6">
                <div className="flex items-center justify-between mb-2">
                <h3 className="text-1xl sm:text-1xl md:text-1xl lg:text-2xl font-bold text-gray-800">Projects</h3>
                <Link href="/projects" className="text-blue-800 hover:underline text-sm md:text-base mt-2 px-2">
                    View All Projects ...
                </Link>
                </div>
                <hr className="border-t-2 border-gray-400 mb-2 w-full" />
            </div>

            <div className="container px-4 md:px-6 space-y-2 pb-2 mb-4">
                {currentProjects.length > 0 && (
                <div className="space-y-6">
                    {currentProjects.map((project, index) => (
                        <article key={index} className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex items-center px-4 py-3 border-b bg-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 pr-6">{project.name}</h3>
                            {project.website && (
                                <a
                                key={index}
                                href={project.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-1 text-lg text-blue-800 hover:text-blue-900"
                                >
                                <BsArrowRightCircle/>
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
                            {/* Links */}
                            {project.links && project.links.length > 0 && (
                            <div className="flex flex-wrap gap-2 items-bottom">
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
                )}
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
                                        <div className="w-2/3 md:w-1/7 flex sm:flex-row justify-between items-center">
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
                    <li className="mb-1">Area chair: BMVC (2024-2025), ACM MM 2024, ICLR 2026, CVPR 2026</li>
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

