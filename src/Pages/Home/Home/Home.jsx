import React from 'react';
import HeroBanner from '../Banner/Banner';
import PremiumBioData from '../PremiumBioData.jsx/PremiumBioData';
import HowItWorks from '../HowItWork/HowItWorks';
import SuccessStory from '../SuccessStory/SuccessStory';
import SuccessCounter from '../SuccessCounter/SuccessCounter';
import FAQ from '../FAQ/faq';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import About from '../HomeAbout/About';

const Home = () => {
    return (
        <div>
        <div className='mt-20'>
                <HeroBanner></HeroBanner>
            </div>
             <div className='mt-40 '>
               <About></About>
            </div>
            <div className='mt-40'>
                <PremiumBioData></PremiumBioData>
            </div>
            <div className='mt-40'>
                <HowItWorks></HowItWorks>
            </div>
            <div className='mt-40'>
                <SuccessCounter></SuccessCounter>
            </div>
            <div className='mt-40'>
                <SuccessStory></SuccessStory>
            </div>
            <div className='mt-40'>
                <FAQ></FAQ>
            </div>
            <div className='mt-40 mb-20'>
                <WhyChooseUs></WhyChooseUs>
            </div>
           
        </div>
    );
};

export default Home;