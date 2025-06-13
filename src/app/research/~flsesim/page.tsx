"use client"

import publicationsData from "@/pvg_db/publications.json";
import { HiChevronDown } from "react-icons/hi";
import { SocialIcons, linkIcons} from "@/components/ui/icons";

const paperKey = "The Spatially-Correlative Loss for Various Image Translation Tasks";
const bibtex = `@inproceedings{zheng2021spatially,
    title={The spatially-correlative loss for various image translation tasks},
    author={Zheng, Chuanxia and Cham, Tat-Jen and Cai, Jianfei},
    booktitle={Proceedings of the IEEE/CVF conference on computer vision and pattern recognition (CVPR)},
    pages={16407--16417},
    year={2021}
  }`;
const researchLinks = [
    {name: "Semantix", url:"https://openreview.net/pdf?id=si37wk8U5D"},
    {name: "Cocktail", url: "https://mhh0318.github.io/cocktail/"},
    {name: "AgileGAN", url: "https://guoxiansong.github.io/homepage/agilegan.html"},
    {name: "T2Net", url: "/research/~t2net/"}
];

export default function Free3DPage() {
    // Filter publications for the specified paperKey
    const pub = publicationsData.find(
        (pub) => 
        pub.title.toLowerCase().includes(paperKey.toLowerCase())
    );

    return (
       <>
            <section className="max-w-4xl rounded-lg justify-between text-justify">
                {/* define the more research button */}
                <div className="flex flex-row item-center justify-center relative z-50">
                    {/* Home Button */}
                    <a
                        href="/"
                        rel="noopener noreferrer"
                        className="px-2 text-sm text-gray-800 hover:text-gray-900"
                    >
                        {SocialIcons["home"]}
                    </a>
                    {/* Dropdown */}
                    <div className="relative group">
                        <div className="cursor-pointer px-4 bg-white text-gray-800 flex items-center gap-2 hover:bg-gray-100 hover:text-black transition-colors duration-150">
                            More Research
                            <HiChevronDown className="text-xl text-blue-800 hover:text-blue-900"></HiChevronDown>
                        </div>

                        {/* Absolute dropdown list */}
                        <ul className="absolute top-full px-4 py-2 w-36 bg-white border shadow-lg rounded hidden group-hover:block z-50">
                            {researchLinks.map((item, index) => (
                                <li key={index}>
                                    <a
                                        key={index}
                                        href={item.url || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block py-1 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-colors duration-150"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                {/* header of the paper */}
                <div className="flex flex-col items-center mt-4">
                    {/* title */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">{pub?.title}</h3>
                    {/* authors */}
                    <div className="flex flex-wrap gap-1">
                        {pub?.authors.map((author, authorIndex)=> (
                            <a
                                key={authorIndex}
                                href={author.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-1 text-lg text-blue-800 hover:text-blue-900"         
                            >
                                {author.name}
                                {authorIndex < pub.authors.length - 1 && <span>,&nbsp;</span>}
                            </a>
                        ))}
                    </div>
                    {/* department */}
                    <p className="text-lg text-gray-900">Nanyang Technological University</p>
                    {/* conference or journal */}
                    <div className="flex flex-wrap gap-2 text-lg text-gray-900">
                        {(Array.isArray(pub?.type) ? pub?.type : [pub?.type]).map((type, typeIndex) => (
                            <span key={typeIndex} className="rounded-lg">
                                {type == "conference" && <span className="mb-2">{pub?.conference}</span>}
                                {type == "journal" && <span className="mb-2">{pub?.journal}</span>}
                            </span>
                        ))}
                        {pub?.category && (
                            <span className="text-red-700">
                                ({pub?.category})
                            </span>
                        )}
                    </div>
                    {/* links */}
                    <div className="flex flex-wrap gap-2 pt-4">
                        {pub?.links.map((link, linkIndex) => (
                        <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-lg text-blue-800 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg"
                        >
                            {linkIcons[link.label as keyof typeof linkIcons] || "🔗"} {link.label}
                        </a>
                        ))}
                    </div>
                </div>
                
                {/* body the paper */}
                <div className="flex flex-col justify-center mt-8">
                    {/* teaser */}
                    <img src="/research/~flsesim/static/images/unpairedI2I-translation.gif"/>
                    <p className="text-gray-700 text-lg pt-2 mb-8 text-center"><strong>Flsesim</strong> transfers images to arbitrary target domain.</p>
                    {/* abstract */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Abstract</h3>
                    <div className="space-y-2 text-base text-gray-700 text-justify">
                        <p>
                            We propose a novel <strong>spatially-correlative loss</strong> that is simple, 
                            efficient and yet effective for preserving scene structure consistency while 
                            supporting large appearance changes during <em>unpaired image-to-image (I2I)</em> translation.
                        </p>
                        <p>
                            Previous methods attempt this by using pixel-level cycle-consistency or feature-level matching losses, 
                            but the domain-specific nature of these losses hinder translation across large domain gaps. 
                            To address this, we exploit the spatial patterns of self-similarity as a means of defining scene structure.
                        </p>
                        <p>
                            Our spatially-correlative loss is geared towards only capturing spatial relationships within an image rather than domain appearance. 
                            We also introduce a new self-supervised learning method to explicitly learn spatially-correlative maps for each specific translation task. 
                            We show distinct improvement over baseline models in all three modes of unpaired I2I translation: 
                            single-modal, multi-modal, and even single-image translation.
                        </p>
                    </div>
                    {/* framework */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Framework</h3>
                    <div className="space-y-2 text-base text-gray-700 text-justify">
                        <img src="/research/~flsesim/static/images/FSeSim-frame.gif"/>
                    </div>
                    {/* Videos */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Video</h3>
                    <div className="relative w-full max-w-4xl mx-auto pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                        <iframe 
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/pu6PT1om2r0?rel=0&amp;showinfo=0"
                        title="Publication Video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        ></iframe>
                    </div>
                    {/* Results */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Results</h3>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-left">Error Map</h3>
                    <div className="text-base text-gray-700 text-justify">
                        <p>Given an input image, we consider an ideal result (the paired ground truth) and a totally wrong result (another image), repectively. 
                            Under such a setting, a good structure loss should penalize the wrong result, 
                            while supporting the ideal result. 
                            pixel-level loss is naturally unsuitable when there are large domain gaps, 
                            and while Perceptual loss will report significant errors for both aligned and unaligned results. 
                            PatchNCE mitigates the problem by calculating the cosine distance of features, 
                            but it can be seen the loss map still retains high errors in many regions within the aligned result. 
                            Our LSeSim has small errors on the left where ground truth paired data is provided, 
                            while having large errors on the right for unpaired data.
                        </p>
                        <img src="/research/~flsesim/static/images/error_map.jpg"/>
                    </div>
                    <h3 className="pt-6 text-2xl font-semibold text-gray-900 mb-4 text-left">Result for single-image translation</h3>
                    <div className="text-base text-gray-700 text-justify">
                        <img src="/research/~flsesim/static/images/single-translation.gif"/>
                    </div>
                    <h3 className="pt-6 text-xl font-semibold text-gray-900 mb-4 text-left">Result for visual comparison</h3>
                    <div className="text-base text-gray-700 text-justify">
                        <img src="/research/~flsesim/static/images/Supplementary_sinmod.png"/>
                    </div>
                    {/* citation */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4">Citation</h3>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm overflow-x-auto">
                        <pre className="text-sm text-gray-800">
                        <code>{bibtex}</code>
                        </pre>
                    </div>
                </div>
            </section>
            
       </>
    );
}
