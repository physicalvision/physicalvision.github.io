"use client";

import Link from "next/link";
import { MdEmail } from "react-icons/md";

export default function PositionPage() {
    return (
        <>
            <section id="position" className="max-w-6xl pt-6 pb-2 rounded-lg text-justify">
                <div className="flex flex-col px-4 md:px-6 py-2">
                        <div className="flex-1">
                            {/* Position */}
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Position Openings</h1>
                            <p className="text-gray-700 mb-4 ">
                            We are looking for talented and motivated individuals to join our team as <strong>PostDoc, PhD students, and Research Assistants</strong>.
                            If you are passionate about <strong>computer vision</strong> and <strong>machine learning</strong>, we would love to hear from you!
                            In general, we are looking for candidates who are deeply enthusiastic about research
                            and ambitious in tackling challenging problems.
                            Please refer to the information below as a general rule.
                            </p>
                            <p className="mb-6">
                            <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-700">
                                <li><strong>PostDoc:</strong> A Postdoc will typically work with us for 2-3 years,
                                help ensure a healthy and vibrant research environment. The general requirements for a Postdoc position include:
                                conduct individual research,
                                author and co-author high-quality research papers,
                                contribute ideas for new research projects,
                                and mentor students if applicable.
                                </li>
                                <li><strong>PhD Students:</strong> A PhD student will typically work with us for 3-4 years on a long-term topic.
                                If you are interested in becoming a PhD student in Physical Vision Group, please apply through &nbsp;
                                <a href="https://venus.wis.ntu.edu.sg/GOAL/OnlineApplicationModule/frmOnlineApplication.aspx" className="text-blue-800 hover:underline">
                                 Application Portal &nbsp;
                                </a>
                                (check out the deadlines &nbsp;
                                <a href="https://www.ntu.edu.sg/mse/admissions/postgraduates/prospective-students/doctor-of-philosophy-master-of-engineering" className="text-blue-800 hover:underline">
                                 here
                                </a>).
                                The PhD would normally be fully founded by one of our projects.
                                Besides, there are many other &nbsp;
                                <a href="https://www.ntu.edu.sg/admissions/graduate/financialmatters/scholarships" className="text-blue-800 hover:underline">
                                 scholarships
                                </a> in NTU. The candidates are also welcome to apply for these scholarships and opportunities.
                                </li>
                                <li><strong>Research Assistants:</strong> A Research Assistant will typically work on a specific project with us for a period of time, usually <strong>1-2 years</strong>.
                                Candidates should have some experience in programming and data analysis.</li>
                                <li><strong>Interns:</strong> If you are interested in an internship or visitor position (<strong>six months or longer</strong>),
                                feel free to contact.</li>
                            </ul>
                            </p>

                            {/* Position requirements*/}
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Require Documents</h1>
                            <p className="text-gray-700 mb-4">
                            When applying, please compile all required documents into a <strong>single pdf</strong> and email to &nbsp;
                            <a href="mailto:chuanxia.zheng@ntu.edu.sg" className="text-blue-800 hover:underline">
                                <MdEmail
                                size={16}
                                className="inline-block align-text-bottom text-blue-800 hover:text-blue-900 transition-colors duration-200"
                                >
                                </MdEmail>
                                chuanxia.zheng@ntu.edu.sg
                            </a>
                            &nbsp; with the subject line "Application for [Position] - [Your Name]":
                            </p>
                            <p className="mb-6">
                            <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-700">
                                <li><strong>Curriculum Vitae (CV):</strong> Your full CV including your contact details, education, 
                                work experience, skills, awards and publications, link to your website and/or github site.
                                A current photograph is optional.
                                </li>
                                <li><strong>Cover Letter:</strong> A letter (1 page) to explain how you meet the position, using examples of your skills and experience.</li>
                                <li><strong>References:</strong> Name and email address of 2-3 referees who you have worked with. 
                                You should ensure they are aware of you applications, and ensure that they would be content to write
                                a reference for you when you are in the shortlist.</li>
                                <li><strong>Research Statement:</strong> A document (1-2 pages) that outlines your research interests, past research experience, and future research goals.
                                Your past research experience should include any projects you have worked on, your role in those projects,
                                and any significant outcomes or contributions.
                                Your future research goals should include a specific topic (link to research papers and codes) you are interested in,
                                and why you think it is important to the community.
                                </li>
                                <li><strong>Transcripts and Certificates:</strong> Scans of your academic transcripts and certificates from your previous degrees.
                                </li>
                            </ul>
                            </p>

                            {/* Other Information */}
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Useful Links</h1>
                            <h2 className="text-lg font-semibold text-gray-500 mb-2">Guidelines (NTU)</h2>
                            <ul className="list-disc pl-5 space-y-1 mb-4 font-serif text-gray-700">
                                <li>
                                    <Link href="https://www.ntu.edu.sg/mse/admissions/postgraduates/prospective-students/doctor-of-philosophy-master-of-engineering" className="text-blue-800 hover:underline">
                                        Phd and MEng application
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.ntu.edu.sg/mse/admissions/postgraduates/prospective-students/doctor-of-philosophy-master-of-engineering/admission-requirements" className="text-blue-800 hover:underline">
                                        Admission Requirements
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.ntu.edu.sg/admissions/graduate/financialmatters/scholarships" className="text-blue-800 hover:underline">
                                        Scholarships
                                    </Link>
                                </li>
                            </ul>

                            <p className="text-gray-700 mb-4">
                                Note that, due to the high volume of applications, we may not be able to respond to all applicants.
                                Generally, we will only contact shortlisted candidates for interviews (in 2-3 weeks). 
                            </p>
                        </div>
                </div>

            </section>
        </>
    );
}