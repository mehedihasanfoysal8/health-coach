import Become from "./Become"
import HeroSection from "./HeroSection"
import ItemsSection from "./Items"
import StatsSection from "./StatsSection"
import WhyHealthCoach from "./WhyHealthCoach"


const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <ItemsSection/>
            <StatsSection/>
            <WhyHealthCoach/>
            <Become/>
        </div>
    )
}

export default HomePage