"use client"

import publicationsData from "@/pvg_db/publications.json";
import { HiChevronDown } from "react-icons/hi";
import { SocialIcons, linkIcons} from "@/components/ui/icons";

const paperKey = "Bridging global context interactions for high-fidelity image completion";
const bibtex = `@inproceedings{zheng2022bridging,
    title={Bridging global context interactions for high-fidelity image completion},
    author={Zheng, Chuanxia and Cham, Tat-Jen and Cai, Jianfei and Phung, Dinh},
    booktitle={Proceedings of the IEEE/CVF conference on computer vision and pattern recognition (CVPR)},
    pages={11512--11522},
    year={2022}
  }`;
const researchLinks = [
    {name: "PanoDiffusion", url: "https://sm0kywu.github.io/panodiffusion/"},
    {name: "UniD3", url: "https://mhh0318.github.io/unid3/"},
    {name: "PICFormer", url: "https://chuanxiaz.com/picformer/static/images/TPAMI2024_PICFormer.pdf"},
    {name: "PIC", url: "/research/~pic/"},
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
                    <p className="text-lg text-gray-900">Monash University, Nanyang Technological University </p>
                    {/* conference or journal */}
                    <div className="flex flex-wrap gap-2 text-lg text-gray-900">
                        {(Array.isArray(pub?.type) ? pub?.type : [pub?.type]).map((type, typeIndex) => (
                            <span key={typeIndex} className="rounded-lg">
                                {type == "conference" && <span className="mb-2">{pub?.conference}</span>}
                                {type == "journal" && <span className="mb-2">{pub?.journal}</span>}
                                {type == "workshop" && <span className="mb-2">{pub?.workshop}</span>}
                                {type == "book" && <span className="mb-2">{pub?.book}</span>}
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
                    {/* abstract */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Abstract</h3>
                    <div className="space-y-2 text-base text-gray-700 text-justify">
                        <p>
                        Bridging distant context interactions is important for high quality image completion with large masks.
                        Previous methods attempting this via deep or large receptive field (RF) convolutions cannot escape from the dominance of nearby interactions, which may be inferior.
                        In this paper, we propose treating image completion as a directionless sequence-to-sequence prediction task, and deploy a transformer to directly capture long-range dependence in the encoder in a first phase.
                        Crucially, we employ a restrictive CNN with small and non-overlapping RF for token representation, which allows the transformer to explicitly model the long-range context relations with equal importance in all layers,
                        without implicitly confounding neighboring tokens when larger RFs are used.
                        In a second phase, to improve appearance consistency between visible and generated regions, 
                        a novel attention-aware layer (AAL) is introduced to better exploit distantly related features and also avoid the insular effect of standard attention. 
                        Overall, extensive experiments demonstrate superior performance compared to state-of-the-art methods on several datasets.
                        </p>
                    </div>
                    {/* framework */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Framework</h3>
                    <div className="space-y-2 text-base text-gray-700 text-justify">
                        <img src="/research/~tfill/static/images/framework.png"/>
                        <p>The masked image is first resized to a fixed low resolution (256*256) and fed into the transformer to generate semantically correct content.
                            We then merge this inferred content with the original high resolution image and pass it to a refinement network with an Attention-Aware Layer (AAL) to transfer high-quality information from both visible and masked regions.</p>
                    </div>
                    {/* Videos */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Video</h3>
                    <div className="relative w-full max-w-4xl mx-auto pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                        <iframe 
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/efB1fw0jiLs?rel=0&amp;showinfo=0"
                        title="Publication Video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        ></iframe>
                    </div>
                    {/* Results */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Results</h3>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-left">Results for Center Mask</h3>
                    <div className="text-base text-gray-700 text-justify">
                        <p> All images are degraded by center mask.
                            Our model is able to complete both object shape and background scene.
                        </p>
                        <img src="/research/~tfill/static/images/center_imagenet.jpg"/>
                        <img src="/research/~tfill/static/images/center_places2.jpg"/>
                    </div>
                    <h3 className="pt-6 text-2xl font-semibold text-gray-900 mb-4 text-left">Results for face Editing</h3>
                    <div className="text-base text-gray-700 text-justify">
                        <p>All results are reported at 512*512 resolution. 
                           For each pair, the left one is the input image and the right one is the edited output.
                        </p>
                        <img src="/research/~tfill/static/images/free_face.jpg"/>
                    </div>
                    <h3 className="pt-6 text-xl font-semibold text-gray-900 mb-4 text-left">Results for Object Removal</h3>
                    <div className="text-base text-gray-700 text-justify">
                        <p>Here, we mainly show object removal in traditional image inpainting tasks.
                        </p>
                        <img src="/research/~tfill/static/images/free_nature.jpg"/>
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
