"use client"

import publicationsData from "@/pvg_db/publications.json";
import { HiChevronDown } from "react-icons/hi";
import { SocialIcons, linkIcons} from "@/components/ui/icons";

const paperKey = "free3d";
const bibtex = `@inproceedings{zheng2024free3d,
    title = {Free3d: Consistent novel view synthesis without 3d representation},
    author = {Zheng, Chuanxia and Vedaldi, Andrea},
    booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
    pages = {9720--9731},
    year = {2024}
  }`;
const researchLinks = [
    {name: "Flash3D", url: "https://www.robots.ox.ac.uk/~vgg/research/flash3d/"},
    {name: "MVSplat360", url: "https://donydchen.github.io/mvsplat360/"},
    {name: "MVSplat", url: "https://donydchen.github.io/mvsplat/"},
    {name: "Splatt3R", url: "https://splatt3r.active.vision/"},
    {name: "MatchNeRF", url: "https://donydchen.github.io/matchnerf/"}
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
                    <p className="text-lg text-gray-900">Visual Geometry Group, University of Oxford</p>
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
                    <video
                        id="teaser"
                        className="w-full h-auto object-cover rounded-lg"
                        loop 
                        autoPlay
                        muted
                    >
                        <source src="/research/~free3d/static/videos/teaser.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <p className="text-gray-700 text-lg pt-2 mb-8"><strong>Free3D</strong> synthesizes consistent novel view without the need of explicit 3D representation.</p>
                    {/* abstract */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Abstract</h3>
                    <div className="space-y-2 text-base text-gray-700 text-justify">
                        <p>
                            We introduce <strong>Free3D</strong>, a simple approach designed for <em>open-set</em>
                            novel view synthesis (NVS) from a single image.
                        </p>
                        <p>
                            Similar to Zero-1-to-3, we start from a pre-trained 2D image generator for generalization,
                            and fine-tune it for NVS.
                            Compared to recent and concurrent works, we obtain significant improvements without resorting to 
                            an explicit 3D representation, which is slow and memory-consuming.
                        </p>
                        <p>
                            We do so by encoding better the target camera pose via a new <em>per-pixel</em> ray conditioning 
                            normalization (RCN) layer.
                            The latter injects camera pose information in the underlying 2D image generator by telling each
                            pixel its specific viewing direction.
                            We also improve multi-view consistency via a light-weight multi-view attention layer 
                            and multi-view noise sharing.
                            We train <strong>Free3D</strong> on the Objaverse dataset and demonstrate
                            excellent generalization to various new categories in several large new datasets,
                            including OminiObject3D and Google Scanned Object (GSO).
                        </p>
                    </div>
                    {/* framework */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Framework</h3>
                    <div className="space-y-2 text-base text-gray-700 text-justify">
                        <img src="/research/~free3d/static/images/framework.jpg"/>
                        <p>The overall pipeline of our Free3D. (a) Given a single source input image, 
                            the proposed architecture jointly predicts multiple target views, 
                            instead of processing them independently. 
                            To achieve a consistent novel view synthesis without the need for 3D representation, 
                            (b) we first propose a novel ray conditional normalization (RCN) layer, 
                            which uses a per-pixel oriented camera ray to module the latent features, 
                            enabling the model’s ability to capture more precise viewpoints. 
                            (c) A memory-friendly pseudo-3D cross-attention module is introduced to 
                            efficiently bridge information across multiple generated views. 
                            Note that, here the similarity score is only calculated across multiple views 
                            in temporal instead of spatial, resulting in a minimal computational and memory cost.</p>
                    </div>
                    {/* Videos */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Video</h3>
                    <div className="relative w-full max-w-4xl mx-auto pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                        <iframe 
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/7CdYuZ7D1DY?rel=0&amp;showinfo=0"
                        title="Publication Video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        ></iframe>
                    </div>
                    {/* Results */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4 text-center">Results</h3>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-left">NVS for given camera viewpoint</h3>
                    <div className="text-base text-gray-700 text-justify">
                        <p><strong>Free3D</strong> significantly improves the accuracy of 
                            the generated pose compared to existing state-of-the-art methods on various datasets,
                            including Objaverse (Top two), OminiObject3D (Middle two) and GSO (Bottom two).
                        </p>
                        <img src="/research/~free3d//static/images/image_comparison.jpg"/>
                    </div>
                    <h3 className="pt-6 text-2xl font-semibold text-gray-900 mb-4 text-left">360 degree NVS</h3>
                    <div className="text-base text-gray-700 text-justify">
                        <p>Using <strong>Free3D</strong>, you can directly render a consistent 360-degree video without
                            the need of an additional explicit 3D representation or network.
                        </p>
                        <video className="w-full h-auto object-cover rounded-lg" loop autoPlay muted playsInline preload="metadata">
                            <source src="/research/~free3d/static/videos/video_comparison.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <h3 className="pt-6 text-xl font-semibold text-gray-900 mb-4 text-left">Videos on Objaverse Dataset</h3>
                    <div className="text-base text-gray-700 text-justify">
                        <video className="w-full h-auto object-cover rounded-lg" loop autoPlay muted playsInline preload="metadata">
                            <source src="/research/~free3d/static/videos/objaverse_70.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <h3 className="pt-6 text-xl font-semibold text-gray-900 mb-4 text-left">Videos on OminiObject3D Dataset</h3>
                    <div className="text-base text-gray-700 text-justify">
                        <video className="w-full h-auto object-cover rounded-lg" loop autoPlay muted playsInline preload="metadata">
                            <source src="/research/~free3d/static/videos/oo3d_32.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <h3 className="pt-6 text-xl font-semibold text-gray-900 mb-4 text-left">Videos on GSO Dataset</h3>
                    <div className="text-base text-gray-700 text-justify">
                        <video className="w-full h-auto object-cover rounded-lg" loop autoPlay muted playsInline preload="metadata">
                            <source src="/research/~free3d/static/videos/gso_32.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    {/* Concurrent work */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4">Related Links</h3>
                    <div className="space-y-2 text-base text-gray-700 text-justify">
                        <p>There's a lot of excellent work that was introduced around the same time as ours.</p>
                        <p>
                            <a href="https://stability.ai/news/stable-video-diffusion-open-ai-video-model" className="text-blue-800">Stable Video Diffusion </a> 
                            fine-tunes image-to-video diffusion model for multi-view generations.
                        </p>
                        <p>
                            <a href="https://arxiv.org/pdf/2310.03015.pdf" className="text-blue-800">Efficient-3DiM </a> 
                            fine-tunes the stable diffusion with a stronger vision transformer 
                            <a href="https://dinov2.metademolab.com/" className="text-blue-800"> DINO v2</a>.
                        </p>
                        <p>
                            <a href="https://jianglongye.com/consistent123/" className="text-blue-800">Consistent-1-to-3 </a> 
                            uses the epipolar-attention to extract coarse results for the diffusion model.
                        </p>
                        <p>
                            <a href="https://one-2-3-45.github.io/" className="text-blue-800">One-2-3-45</a> and 
                            <a href="https://sudo-ai-3d.github.io/One2345plus_page/" className="text-blue-800"> One-2-3-45++ </a>
                            directly train additional 3D network using the outputs of multi-view generator.
                        </p>
                        <p>
                            <a href="https://mv-dream.github.io/" className="text-blue-800">MVDream</a>, <a href="https://consistent-123.github.io/index.html" className="text-blue-800">Consistent123</a>
                            and <a href="https://www.xxlong.site/Wonder3D/" className="text-blue-800">Wonder3D</a> also train multi-view diffusion models, yet still requires post-processing for video rendering.
                        </p>
                        <p>
                            Some works employ 3D representation into the latent diffusion mdoel, such as
                            <a href="https://liuyuan-pal.github.io/SyncDre32qwDeamer/" className="text-blue-800">SyncDreamer</a> and <a href="https://jiayuyang.github.io/Consist_Net/" className="text-blue-800">ConsistNet</a>.
                        </p>
                    </div>
                    {/* acknowledgements */}
                    <h3 className="pt-8 text-3xl font-semibold text-gray-900 mb-4">Acknowledgements</h3>
                    <div className="space-y-2 text-base text-gray-700 text-justify">
                        <p>
                            Many thanks to <a href="https://dblp.org/pid/295/8991.html" className="text-blue-800">Stanislaw Szymanowicz</a>,
                            <a href="https://edgarsucar.github.io/" className="text-blue-800">Edgar Sucar</a>, and <a href="https://lukemelas.github.io/" className="text-blue-800">Luke Melas-Kyriazi</a>
                            of VGG for insightful discussions and <a href="https://ruiningli.com/" className="text-blue-800">Ruining Li</a>,
                            <a href="https://eldar.insafutdinov.com/" className="text-blue-800">Eldar Insafutdinov</a>, and <a href="https://yashbhalgat.github.io/" className="text-blue-800">Yash Bhalgat</a>
                            of VGG for their helpful feedback. We would also like to thank the authors of 
                            <a href="https://github.com/cvlab-columbia/zero123" className="text-blue-800">Zero-1-to-3</a> and <a href="https://github.com/allenai/objaverse-xl" className="text-blue-800">Objaverse-XL</a>
                            for their helpful discussions.
                        </p>
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
