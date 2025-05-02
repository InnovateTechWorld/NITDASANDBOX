import { ArrowButton } from "../components/Icon";
import { Footer } from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import Button from "../components/ui/Button";
import { featureList, steps } from "../constants";
import { FaCheck } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

export default function LandingPage() {
    return (
        <div className="font-lexend relative">
            <div className="relative z-10 bg-[var(--primary)]">
                {/* NAVBAR */}
                <div className="px-4 md:px-16">
                    <Navbar />
                </div>

                {/* HERO */}
                <section className=" text-white px-4 md:px-16 pt-16">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between mb-12">
                        <h1 className="text-5xl font-bold mb-4 md:w-2/3">Test Your Innovation,<br />Safely and Compliantly.</h1>
                        <div className="md:w-1/3 flex flex-col items-start">
                            <p className="mb-6 max-w-md text-[var(--gray)]">
                                A digital sandbox for Nigerian eCommerce startups to innovate without fear of regulatory penalties.
                            </p>
                            <div className="flex space-x-4">
                                <Button variant="white" to="/auth/register">Get Started for Free</Button>
                                <Button variant="primaryLight" to="#features" className="text-white border-white">Learn More</Button>
                            </div>
                        </div>
                    </div>

                    {/* HERO IMAGE */}
                    <div className="relative rounded-2xl">
                        <img src="/images/Hero-1.jpg" alt="Team collaboration" className="w-full h-[60%] rounded-3xl" />
                        <div className="absolute bottom-12 left-12 bg-[var(--primary)] text-white px-4 py-4 rounded-xl flex items-center space-x-2">
                            <div className="flex bg-white p-2 rounded-full w-fit justify-center items-center">
                                <img src="/NITDA_Logo.png" alt="NITDA Logo" className="h-6 inline-block" />
                            </div>
                            <span className="font-semibold">NITDA <span>Compliance</span></span>
                        </div>
                    </div>
                </section>

                <div className="absolute top-0 left-0 w-full h-full -z-10">
                    <img
                        src="/Background.svg"
                        alt="background"
                        className="w-full h-full object-contain object-top"
                        aria-hidden="true"
                    />
                </div>
            </div>



            {/* COMPLIANCE CARD */}
            <section className="px-4 md:px-16 py-16 bg-white flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
                <div className="md:w-1/2 max-h-[395px] overflow-hidden rounded-2xl relative flex items-center justify-center">
                    <img src="/images/Hero-2.png" alt="Woman on laptop" className="rounded-xl w-full object-cover" />
                    <div className="absolute bottom-8 left-8 bg-[var(--primary)] w-1/2 text-white px-4 py-4 rounded-xl flex items-center space-x-2">
                        <div className="flex bg-white p-2 rounded-full w-fit justify-center items-center">
                            <img src="/NITDA_Logo.png" alt="NITDA Logo" className="h-6 inline-block" />
                        </div>
                        <div className="ml-6 w-[80%]">
                            <p className="font-semibold">Safe Testing Zone</p>
                            <p className="text-[var(--gray)] text-[10px]">Simulate real-world compliance scenarios without penalties.</p>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 flex flex-col items-start space-y-3">
                    <h2 className="text-4xl font-bold text-[var(--text)]">
                        Relieve Your Compliance Burdens and Focus on Building What Matters.
                    </h2>
                    <p className="text-[var(--gray2)] text-md ">
                        Join a secure sandbox designed to help Nigerian startups test eCommerce solutions without the fear of regulatory penalties.
                    </p>
                    <Button variant="gradient" className="w-fit !mt-5">Explore Now</Button>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section id="features" className="bg-[#FAFAFA] py-16 px-4 md:px-16 relative">
                <div className="max-w-6xl mx-auto text-center space-y-3 z-20">
                    <div className="mb-10 md:w-1/2 text-left">
                        <h2 className="text-3xl font-bold ">Built for Innovation & Trust</h2>
                        <p className="text-[var(--gray2)] text-md ">
                            Empowering startups to launch confidently with structured guidance, smart tools, and zero guesswork.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 text-left">
                        {featureList.map((feature, i) => (
                            <div key={i} className="bg-white shadow-md rounded-xl p-6">
                                <div className="flex items-center justify-center mb-4 w-16 h-16 rounded-full bg-[#E8F5E9]">
                                    <feature.Icon />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-[#717171] text-sm  mb-4">
                                    {feature.note}
                                </p>
                                <div className="space-y-2 text-sm text-[#5A5A5A]">
                                    {feature.points.map((point, index) => (
                                        <div className="flex items-start gap-2">
                                            <ArrowButton />
                                            <p key={index} className="w-[85%]">{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="py-16 pl-16 bg-white flex flex-row gap-8 items-center justify-between">
                <div className="w-1/2">
                    <div className="text-left mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Built for Startups, Backed by NITDA
                        </h2>
                        <p className="text-sm text-[var(--gray2)] max-w-3xl mx-auto">
                            A smart, intuitive dashboard that keeps your compliance journey clear and actionable.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 mb-8">
                        <div className="flex flex-row gap-2">
                            <div className="bg-[#E8F5E9] border text-sm font-medium border-[#006E3B] flex items-center justify-center  rounded-full w-5 h-5 mt-1">
                                <FaCheck className="w-3 h-3" />
                            </div>
                            <div>
                                <h3 className="text-md font-medium">Track Your Application Journey</h3>
                                <p className="text-[var(--gray2)] text-sm">
                                    See your approval status, updates, and feedback all in one place.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="bg-[#E8F5E9] border text-sm font-medium border-[#006E3B] flex items-center justify-center  rounded-full w-5 h-5 mt-1">
                                <FaCheck className="w-3 h-3" />
                            </div>
                            <div>
                                <h3 className="text-md font-medium">Complete Test Cases with Confidence</h3>
                                <p className="text-[var(--gray2)] text-sm">
                                    Access assigned requirements and follow a clear path to compliance.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="bg-[#E8F5E9] border text-sm font-medium border-[#006E3B] flex items-center justify-center  rounded-full w-5 h-5 mt-1">
                                <FaCheck className="w-3 h-3" />
                            </div>
                            <div>
                                <h3 className="text-md font-medium">Submit Progress & Documentation</h3>
                                <p className="text-[var(--gray2)] text-sm">
                                    Upload reports, logs, and self-assessments to showcase your work.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="bg-[#E8F5E9] border text-sm font-medium border-[#006E3B] flex items-center justify-center  rounded-full w-5 h-5 mt-1">
                                <FaCheck className="w-3 h-3" />
                            </div>
                            <div>
                                <h3 className="text-md font-medium">Get Real-Time Support with AI Help</h3>
                                <p className="text-[var(--gray2)] text-sm">
                                    Ask questions and get instant answers from the built-in compliance assistant.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <Button
                            variant="successLight"
                            icon={<div className="border border-[var(--primary)] rounded-full p-1"><FaArrowRight /></div>}
                            iconPosition="right"
                            className="!w-fit"
                            to="#howItWorks"
                        >
                            See How It Works
                        </Button>
                    </div>
                </div>
                <div className="bg-[#DCE5FF82] rounded-xl py-8 pl-8 w-1/2  overflow-hidden">
                    <img
                        src="/images/UserPage.png"
                        alt="user dashboard"
                        className="w-full h-[380px] object-left rounded-xl"
                    />
                </div>
            </section>

            <section id="howItWorks" className="py-16 px-4 ">
                <div className="max-w-4xl mx-auto flex justify-between gap-16">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-sm text-[var(--gray2)] mb-12">Simple, Transparent, Supportive.</p>
                        <div className="w-fit">
                            <img
                                src="/images/HowItWorks.jpg"
                                alt="images"
                                className="w-full h-[380px] object-cover object-center rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="md:w-1/2 flex flex-col items-center justify-center relative">
                        <div className="flex flex-col gap-6 z-10 h-fit">
                            <div className="w-0.5 h-[60%] middle-0 absolute left-5 bg-[#5A5A5A]/40 z-1"></div>

                            {steps.map((step, index) => (
                                <div key={index} className="flex flex-row gap-4  z-20">
                                    <div className="flex items-center justify-center bg-white h-fit">
                                        <div className="w-12 h-12 border border-[#5A5A5A] bg-white my-2 p-2 rounded-full flex items-center justify-center text-[#414141] font-bold text-lg">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-semibold">{step.title}</h3>
                                        <p className="text-[#5A5A5A]">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-[var(--text)] py-16 px-4 flex flex-col items-center">
                <div className="max-w-4xl mx-auto text-center w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Build Boldly. We've Got the Compliance Checked.
                    </h2>
                    <p className="text-sm text-[var(--gray2)] mb-8 max-w-3xl mx-auto">
                        Join a platform where innovation meets regulation—test your eCommerce solutions in a secure, trusted environment backed by NITDA.
                    </p>
                    <div>
                        <Button
                            to="#"
                            variant="gradient"
                            className="!w-fit"
                        >
                            Apply To Sandbox
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}