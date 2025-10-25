import Image from "next/image"
import Link from "next/link"

const Become = () => {
    return (
        <section className="bg-[#FEFEFE] mb-20 px-4">

            <div className="max-w-7xl mx-auto flex flex-col gap-5 sm:flex-row">
                <div className="md:w-[50%]">
                    <h2 className="text-[#185F9D] text-2xl my-6">
                        Become a Premium Member
                    </h2>
                    <p className="font-extrabold pb-5 text-3xl tracking-[1px] leading-10 md:leading-[57px] lg:text-[40px] md:pr-16">
                        A secure future for you
                        and your family
                    </p>
                    <p className="leading-10 mb-6">DocTime is the leading digital healthcare app in the country. DocTime is committed to bringing modern healthcare to people along with 24/7 doctor video consultation. DocTime healthcare package is there for healthcare assurance and your secure healthy future. Choose your favorite packages based on your needs. Anyone can enjoy this service by paying a one-time annual subscription fee.</p>
                    <Link
                        href="/consultation"
                        className="text-white bg-[#185F9D] hover:bg-[#185F9D] font-bold text-base rounded px-6 sm:px-16 py-2 sm:py-3 mr-2"
                    >
                        Consultation
                    </Link>
                </div>

                <div className="md:w-[50%] mt-16">

                    <div className="sm:w-[200px] md:w-[580px] md:h-[500px]">

                        <Image
                            src="https://doctime.com.bd/images/Home/Become%20a%20Premium%20Member.webp"
                            alt="why"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-full object-center"
                        />
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Become