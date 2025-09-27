"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import videoData from "@/pvg_db/home_video.json";
import newsData from "@/pvg_db/news.json";
import projectData from "@/pvg_db/projects.json";
import { BsArrowRightCircle } from "react-icons/bs";

export default function Home() {

  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoCycle = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % videoData.length);
    }, 10000);
  };

  useEffect(() => {
    startAutoCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement).load();
      (videoRef.current as HTMLVideoElement).play().catch(() => {});
    }
  }, [activeIndex]);

  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoCycle();
  };

  const currentVideo = videoData[activeIndex];
  const currentNews = newsData.filter(p => p.id == "selected");  // Get the first 4 news items
  const currentProjects = projectData.currentProjects.slice(0, 4); // Get the first 4 current projects

  return (
    <>
    {/* Welcome page: with project video for physical world reconstruction */}
    <section id="teaser" className="w-full justify-center pt-6 pb-8 bg-muted text-justify">
        <div className="relative container px-4 md:px-2">
          <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
            <div className="flex flex-col space-y-0 bg-white justify-between">
              <h1 className="text-1xl sm:text-1xl md:text-1xl lg:text-2xl font-bold text-gray-900 drop-shadow">Welcome to</h1>
              <h1 className="text-1xl sm:text-1xl md:text-1xl lg:text-2xl font-bold text-orange-400 drop-shadow"> Physical Vision Group (PVG).</h1>
              <hr className="border-t-2 border-gray-400 mt-2 mb-2 w-full" />
              <h1 className="text-gray-600 font-semibold justify-between">
                Our group conducts research in computer vision and machine learning, focusing on 
                <span className="text-orange-400"> reconstructing and understanding the physical world</span>.
              </h1>
              <h1 className="text-sm max-w-[400px] text-gray-600 justify-between mt-3">
                We study
                <span className="text-orange-500"> Physical Natural World Creation</span>,
                building systems that can perceive, reconstruct, and interact with the physical world.
                Beyond classical tasks such as appearance, content and geometry generation, we investigate deeper physical properties, like
                <span className="text-orange-500"> occlusion, motion, gravity, interaction, mass and sound</span>.
                Our broader goal is to build realistic digital twins of the natural world, with various physical properties.
                Our group is part of the&nbsp;
                <a href="https://www.ntu.edu.sg/computing/research/institutes-centres/micl" className="underline">Computer Vision and Language (CVL)</a>&nbsp;
                within the &nbsp;
                <a href="https://www.ntu.edu.sg/computing" className="underline">College of Computing and Data Science (CCDS)</a>&nbsp;
                at &nbsp;
                <a href="https://www.ntu.edu.sg" className="underline">NTU</a>, Singapore.
              </h1>
            </div>

            {/* Video Presentation */}
            <div className="relative max-w-full aspect-video overflow-hidden rounded-lg">
              <a href={currentVideo.url} target="_blank" rel="noopener noreferrer">
                <video
                  ref={videoRef}
                  key={currentVideo.src}
                  className="w-full h-auto object-cover"
                  loop 
                  autoPlay
                  muted
                  playsInline
                >
                  <source src={currentVideo.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </a>
              <div className="absolute top-0 left-0 bg-orange-500 bg-opacity-50 font-bold text-white px-2 py-1 text-base rounded drop-shadow">
                {currentVideo.category}
              </div>
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-100 text-white px-2 py-1 text-xs rounded">
                {currentVideo.title}
              </div>

              {/* Manual Slider Buttons */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                {videoData.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-red-600' : 'bg-gray-600'} transition-colors`}
                    onClick={() => handleManualSelect(index)}
                    aria-label={`Video ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
    </section>

    {/* Positions section */}
    <section id="positions" className="w-full pt-2 pb-8 max-w-full text-justify">
      <div className="px-4 md:px-6 text-justify bg-yellow-100">
        <h3 className="text-base font-medium italic flex items-center text-gray-900">
        <span className="mr-2 text-lg">📍</span>
          If you are looking for research positions, please see &nbsp;<a href="/position" className="text-blue-800 hover:text-blue-900">here</a>.
        </h3>
      </div>
    </section>

    {/* latest news */}
    <section id="news" className="w-full pt-2 pb-8 max-w-ful text-justify">
      <div className="container px-4 md:px-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-1xl sm:text-1xl md:text-1xl lg:text-2xl font-bold text-gray-800">News</h3>
          <Link href="/news" className="text-blue-800 hover:underline text-sm md:text-base mt-2 px-2">
            View All News ...
          </Link>
        </div>
        <hr className="border-t-2 border-gray-400 mb-2 w-full" />
      </div>
      
      <div className="container px-4 md:px-2 space-y-2 pb-2 rounded-lg shadow-md">
        {currentNews.map((item, index) => (
          <article
            key={index}
            className="border-b-1 border-gray-200 bg-white p-2 last:border-0"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm md:text-sm text-gray-700 mb-2">{item.description}</p>
              </div>

              <div className="flex flex-col justify-between items-end">
                {item.links && item.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-end">
                      {item.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 text-xs text-blue-800 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg"
                        >
                          {link.name}
                        </a>
                      ))}
                  </div>
                  )}
                <div className="text-sm text-gray-600 whitespace-nowrap mt-2">{item.date}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* latest projects */}
    <section id="projects" className="w-full pt-2 pb-8 w-full max-w-ful text-justify">
      <div className="container px-4 md:px-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-1xl sm:text-1xl md:text-1xl lg:text-2xl font-bold text-gray-800">Projects</h3>
          <Link href="/projects" className="text-blue-800 hover:underline text-sm md:text-base mt-2 px-2">
            View All Projects ...
          </Link>
        </div>
        <hr className="border-t-2 border-gray-400 mb-2 w-full" />
      </div>

      <div className="container px-4 md:px-2 space-y-2 pb-2">
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
    </section>
            
  </>
  );
}
