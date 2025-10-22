import React from "react";
import { Stethoscope, Clock, Users, Star, Download } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: <Stethoscope className="w-12 h-12 text-[#185F9D]" />,
      number: "1700+",
      text: "BMDC verified doctors",
    },
    {
      icon: <Clock className="w-12 h-12 text-[#185F9D]" />,
      number: "10 Minutes",
      text: "Average waiting time",
    },
    {
      icon: <Users className="w-12 h-12 text-[#185F9D]" />,
      number: "700K+",
      text: "People have trusted us with their health",
    },
    {
      icon: <Star className="w-12 h-12 text-[#F4A300]" />,
      number: "95%",
      text: "Users gave 5 star rating",
    },
    {
      icon: <Download className="w-12 h-12 text-[#185F9D]" />,
      number: "1+ Million",
      text: "App download on Playstore",
    },
  ];

  return (
    <section className="bg-[#EEF7FF] py-16 mb-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center px-4">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <div className="mb-3 bg-[#FFFFFF] p-5 rounded-full border hover:border-[#185F9D] transition-all duration-300">{item.icon}</div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              {item.number}
            </h3>
            <p className="text-gray-700 text-sm md:text-base mt-1">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
