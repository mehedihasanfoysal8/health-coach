import Image from "next/image";
import React from "react";

const ItemsSection = () => {
    const items = [
        {
            img: "https://doctime.com.bd/images/ServicesImage/Video_call.webp",
            title: "Live Video Consultation",
            des: "Get instant video consultation or schedule your",
        },
        {
            img: "https://doctime.com.bd/images/ServicesImage/Medicine.webp",
            title: "Order Medicine",
            des: "Order easily and get the medicine in 1 hour and more",
        },
        {
            img: "https://doctime.com.bd/images/ServicesImage/DiagnosticTests.webp",
            title: "Diagnostic Tests",
            des: "Get instant video consultation or schedule your appointment",
        },
        {
            img: "https://doctime.com.bd/images/ServicesImage/HealthcarePackages.webp",
            title: "Healthcare Packages",
            des: "Consultations, hospital care, insurance & more",
        },
        {
            img: "https://doctime.com.bd/images/ServicesImage/ItServices.webp",
            title: "Healthcare IT Services",
            des: "Our expert engineer can help build your health-tech solutions",
        },
        {
            img: "https://doctime.com.bd/images/ServicesImage/CareGlobal.webp",
            title: "CareGlobal",
            des: "Quality & hassle free healthcare checking abroad.",
        },
    ];

    return (
        <div className="flex flex-wrap items-center justify-center gap-6 max-w-screen-xl mx-auto px-4 my-20 text-center">
            {items?.map((item, index) => (


                <div
                    key={index}

                    className="bg-white dark:bg-gray-900 w-full md:w-[185px] h-auto md:h-[280px] border py-5 px-2 rounded-xl overflow-hidden hover:shadow hover:border-[#185F9D] transition-all duration-300"
                >
                    <div className="flex items-center justify-center w-full">

                        <div className="w-[130px] h-[100px]">

                            <Image
                                src={item.img}
                                alt={item.title}
                                width={150}
                                height={150}
                                className="w-full h-full object-center"
                            />
                        </div>
                    </div>
                    <div className="">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                            {item.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {item.des}
                        </p>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default ItemsSection;
