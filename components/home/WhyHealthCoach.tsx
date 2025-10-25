import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const WhyHealthCoach = () => {
    return (
        <section className="bg-[#FEFEFE] mb-20 px-4">

            <div className="max-w-7xl mx-auto">
                <div className="md:w-[650px] md:h-[500px]">
                    <Image
                        src="https://doctime.com.bd/images/why-doctime/Why_DocTime.webp"
                        alt="why"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-full object-center shadow "
                    />
                </div>

                <h2 className="text-[#185F9D] text-2xl my-6">
                    Why Health Coach?
                </h2>
                <p className="font-extrabold text-3xl tracking-[1px] leading-[40px] md:leading-[57px] md:text-[40px] md:pr-16">
                    Bangladesh’s leading healthcare platform for online doctor
                    consultation and personalized health management.
                </p>
                <div className="space-y-6 pt-6">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="text-blue-500 size-8 mt-1" />
                        <p className="text-gray-700 text-base md:text-[24px]">
                            Access any GP or specialist doctor you need at anytime from anywhere.
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 size-8 mt-1" />
                        <p className="text-gray-700 text-base md:text-[24px]">
                            Access to online prescriptions, medicine delivery, and diagnostic tests.
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <CheckCircle className="text-purple-500 size-8 mt-1" />
                        <p className="text-gray-700 text-base md:text-[24px]">
                            Easy subscription packages to protect you and your loved one’s health and wellbeing.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyHealthCoach;
