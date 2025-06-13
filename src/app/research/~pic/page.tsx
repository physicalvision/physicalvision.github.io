"use client"

import publicationsData from "@/pvg_db/publications.json";
import { HiChevronDown } from "react-icons/hi";
import { SocialIcons, linkIcons} from "@/components/ui/icons";

const paperKey = "Pluralistic (Free-Form) Image Completion";
const bibtex = `@inproceedings{zheng2019pluralistic,
    title={Pluralistic image completion},
    author={Zheng, Chuanxia and Cham, Tat-Jen and Cai, Jianfei},
    booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
    pages={1438--1447},
    year={2019}
  }
  @article{zheng2021pluralistic,
    title={Pluralistic free-form image completion},
    author={Zheng, Chuanxia and Cham, Tat-Jen and Cai, Jianfei},
    journal={International Journal of Computer Vision},
    volume={129},
    number={10},
    pages={2786--2805},
    year={2021},
    publisher={Springer}
  }
`;
const researchLinks = [
    {name: "PanoDiffusion", url: "https://sm0kywu.github.io/panodiffusion/"},
    {name: "UniD3", url: "https://mhh0318.github.io/unid3/"},
    {name: "PICFormer", url: "https://chuanxiaz.com/picformer/static/images/TPAMI2024_PICFormer.pdf"},
    {name: "TFill", url: "/research/~tfill/"}
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
                    <img src="/research/~pic/static/images/example.png"/>
                    {/* abstract */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Abstract</h3>
                    <div className="space-y-2 text-base text-gray-700 text-justify">
                        <p>
                            In this paper, we present an approach for pluralistic image completion the task of generating 
                        <strong> multiple diverse and plausible </strong> solutions for image completion. 
                        </p>
                        <p>
                            A major challenge faced by learning-based approaches is that here the conditional label itself 
                            is a partial image, and there is usually only one ground truth training instance per label. 
                            As such, sampling from conditional VAEs still leads to minimal diversity. 
                        </p>
                        <p>
                            To overcome this, we propose a novel and probabilistically principled framework with two parallel paths. 
                            One is a reconstructive path that extends the VAE through a latent space that covers all partial images 
                            with different mask sizes, and imposes priors that adapt to the number of pixels. 
                            The other is a generative path for which the conditional prior is coupled to distributions obtained 
                            in the reconstructive path. Both are supported by GANs. 
                            We also introduce a new short+long term attention layer that exploits distant relations among decoder 
                            and encoder features, improving appearance consistency. 
                        </p>
                    </div>
                    {/* framework */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Framework</h3>
                    <div className="space-y-2 text-base text-gray-700 text-justify">
                        <img src="/research/~pic/static/images/inpainting_framework.png"/>
                        <p>Given a masked images, the generative pipeline (blue line) infers the conditional distribution of missing regions, 
                            that can be sampled during the testing to generate multiple and diverse results. 
                            During the training, the missing regions are encodered to a distribution, 
                            that can be sampled to rebuild the original input by combing with the features of visible part (yellow line). 
                            This structure is designed on a probabilistically principled freamework. 
                            The details can be found in the paper.</p>
                    </div>
                    {/* Videos */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Video</h3>
                    <div className="relative w-full max-w-4xl mx-auto pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                        <iframe 
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/9V7rNoLVmSs?rel=0&amp;showinfo=0"
                        title="Publication Video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        ></iframe>
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
