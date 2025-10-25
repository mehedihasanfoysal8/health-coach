import Image from "next/image";
import React from "react";

const BannerSection = () => {
  return (
    <section className="flex items-center justify-center w-full h-[200px] sm:h-[300px] md:h-[300px] lg:h-[400px] xl:h-[450px] relative overflow-hidden">
      <Image
        src="https://doctime-core-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/images/banners/884/1KvUomAx9LSBTYmlDF3aDdY7vZUq40zwbbTO0en0.jpg"
        alt="images"
        fill
        priority
        className="object-center"
      />
    </section>
  );
};

export default BannerSection;
