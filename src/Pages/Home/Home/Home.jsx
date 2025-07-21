import React from 'react';
import HeroBanner from '../Banner/Banner';
import PremiumBioData from '../PremiumBioData.jsx/PremiumBioData';
import HowItWorks from '../HowItWork/HowItWorks';
import SuccessStory from '../SuccessStory/SuccessStory';
import SuccessCounter from '../SuccessCounter/SuccessCounter';

const Home = () => {
    return (
        <div>
            <div>
                <HeroBanner></HeroBanner>
            </div>
            <div className='mt-20'>
                <PremiumBioData></PremiumBioData>
            </div>
            <div className='mt-20'>
                <HowItWorks></HowItWorks>
            </div>
            <div className='mt-20'>
                <SuccessCounter></SuccessCounter>
            </div>
            <div className='mt-20'>
                <SuccessStory></SuccessStory>
            </div>
            
        </div>
    );
};

export default Home;