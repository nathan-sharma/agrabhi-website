import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "/blogo.png";
import { HashLink } from 'react-router-hash-link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFullAbstract, setShowFullAbstract] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E2E8F0] font-sans overflow-x-hidden">
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1117]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-full mx-auto px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center text-xl font-bold tracking-tighter text-white">
            <img src={logo} alt="AgraBhi Logo" className="h-6 w-auto translate-y-[1px]" />
            <div>
              <Link to="/">Agra<span className="text-emerald-400">Bhi</span></Link>
            </div>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">

            <HashLink
              smooth
              to="#abstract"
              onClick={() => setShowFullAbstract(true)}
              className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Abstract
            </HashLink>

            <HashLink
              smooth
              to="#development"
              className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Current Work
            </HashLink>

            <HashLink
              smooth
              to="#poster"
              className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Poster
            </HashLink>

            <HashLink
              smooth
              to="#support"
              className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-500 transition-colors"
            >
              Support Us
            </HashLink>

            <a target="_blank" rel="noopener noreferrer" href="https://github.com/nathan-sharma/Agrabhi" className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-500 transition-colors">
              GitHub
            </a>

            {/* ✅ UPDATED DATA HUB BUTTON */}
            <Link 
              to="/data-hub" 
              className="text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-full bg-blue-500 text-[#0D1117] hover:bg-blue-400 transition-all"
            >
              Data Hub
            </Link>

          </div>

          <button 
            onClick={toggleMenu}
            className="md:hidden text-slate-400 hover:text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav Links */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0D1117] border-b border-slate-800 px-6 py-4 flex flex-col gap-4">

            <HashLink smooth to="#abstract" onClick={() => { setShowFullAbstract(true); toggleMenu(); }}
              className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400">
              Abstract
            </HashLink>

            <HashLink smooth to="#development" onClick={toggleMenu}
              className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400">
              Current Work
            </HashLink>

          <a 
  href="https://drive.google.com/file/d/1TR2aueFCylzw7Rai_YTZquHvooWqFICa/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
  className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400 transition-colors"
>
  Poster
</a>


            <HashLink smooth to="#support" onClick={toggleMenu}
              className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-500">
              Support Us
            </HashLink>

            <a href="https://github.com/nathan-sharma/Agrabhi" onClick={toggleMenu}
              className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-500">
              GitHub
            </a>

            {/* ✅ UPDATED MOBILE DATA HUB BUTTON */}
          

          </div>
        )}
      </nav>

      {/* EVERYTHING BELOW IS COMPLETELY UNCHANGED */}
      {/* (rest of your file remains exactly the same) */}

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15 -z-20"></div>

      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

   {/* Header / Hero Section */}
      <header className="relative pt-32 pb-8 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight text-white py-2 animate-pop-slow">
          AgraBhi
        </h1>
        <h2 className="text-xl md:text-3xl font-medium mb-4 tracking-tight text-slate-300 max-w-7xl mx-auto leading-tight animate-slide-slow">
         A Low Cost Drone-Based Soil Moisture Mapping System for <span className="text-emerald-400">Smarter Irrigation.</span>
        </h2>
      </header>

      {/* AWARDS BAR */}
      <section className="relative z-10 px-6 mb-4">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-6 justify-center">
          
          {/* Award 1 */}
          <div className="flex items-center gap-4 bg-slate-900/50 border-l-2 border-emerald-500/50 px-6 py-3 rounded-r-xl">
            <span className="text-3xl">🥈</span>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/80 font-bold mb-0.5">State Finalist</p>
              <p className="text-sm font-semibold text-slate-100">2026 Science & Engineering Fair of Houston</p>
            </div>
          </div>
          
          {/* Award 2 */}
          <div className="flex items-center gap-4 bg-slate-900/50 border-l-2 border-emerald-500/50 px-6 py-3 rounded-r-xl">
            <span className="text-3xl">🥉</span>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/80 font-bold mb-0.5">Category Winner</p>
              <p className="text-sm font-semibold text-slate-100">2026 Texas Science & Engineering Fair</p>
            </div>
          </div>

        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6">
        
        {/* PROJECT VIDEO SECTION */}
        <section className="py-8">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-black">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/Bgpvw7TuoMc"
              title="AgraBhi Project Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* UPDATED ABSTRACT SECTION */}
        <section id="abstract" className="py-10 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6">
            What AgraBhi Does
          </h2>
          <div className="text-base font-light text-slate-300 leading-relaxed space-y-6">
            <p>
              AgraBhi is a low-cost drone system designed to help farmers better understand soil moisture patterns on their farm fields. Rather than solely relying on camera images, AgraBhi uses a physical soil sensor to measure moisture at the root level of crops, significantly improving measurement accuracy. It then uses interpolation models to predict moisture across the rest of the farm field.
            </p>
            
            <p>
              The goal of our project is to make irrigation decisions more precise, efficient, and affordable for farmers.
            </p>

            <div className="pt-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">
                Why This Matters
              </h2>
              <p className="mb-4">
                Soil moisture varies dramatically across farm fields, and today, many farmers are simply guessing on how to irrigate their crops. This leads to overwatering, underwatering, wasted resources, and unhealthy yield. 
              </p>
              <p>
                AgraBhi is being created to make moisture mapping more affordable, accurate, and practical, especially in places where high quality agricultural tools are too expensive to afford.
              </p>
            </div>

            {!showFullAbstract ? (
              <button 
                onClick={() => setShowFullAbstract(true)}
                className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-full border border-slate-700 transition-all"
              >
                Read full abstract
              </button>
            ) : (
              <div className="animate-fade-in pt-4 border-t border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">2025-26 Science Fair Abstract</h3>
                <div className="space-y-6">
                  <p>
                    Variation in soil moisture across agricultural fields reduces crop yields and leads to inefficient water management. Climate change has increased the variability of soil moisture, intensifying this problem. Existing soil moisture gauging methods fail to capture moisture at the root level of crops.
                  </p>
                  
                  <p>
                    An autonomous drone system, built for under $1000, collects soil moisture data and generates high-resolution field maps using various interpolation models and environmental covariates. The drone uses:
                  </p>

                  <ul className="list-disc list-inside space-y-3 text-slate-400 pl-4 border-l border-emerald-500/30">
                    <li>A custom <span className="font-bold">linear actuator-driven soil sensor probe</span>, extending the sensor 11 centimeters into the ground.</li>
                    <li>A <span className="font-bold">Real-Time Kinematic (RTK) GPS</span> system providing centimeter-level accuracy using corrections from a fixed base station.</li>
                    <li>Raspberry Pi / Pixhawk communication for hands-free data collection upon landing.</li>
                  </ul>

                  <p>
                    The drone can be controlled completely hands-free via a custom-coded application called the <span className="font-bold">AgraBhi Data Hub</span>, which is accessible on any web browser with a stable internet connection. 
                  </p>

                  <p>
                    Regarding data analysis, among Ordinary Kriging, Regression Kriging, and Inverse Distance Weighted Interpolation, <span className="font-bold">Regression Kriging</span> demonstrated the smallest Root-Mean-Square Error (RMSE) in Leave-One-Out-Cross-Validation (LOOCV) and reasonable Mean Error (ME) when coupled with elevation data.
                  </p>

                  <p>
                    Field validation shows interpolated moisture values are within experimental uncertainty of ground-truth measurements. While commercial agricultural drones cost several thousand dollars, our relatively low-cost system provides high-resolution, spatially explicit moisture mapping, revealing detailed patterns of soil moisture variation and potentially supporting improved irrigation decision-making and water efficiency.
                  </p>
                  
                  <button 
                    onClick={() => setShowFullAbstract(false)}
                    className="text-xs text-slate-500 hover:text-emerald-400 underline underline-offset-4 transition-colors"
                  >
                    Show less
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* CURRENT DEVELOPMENT SECTION */}
        <section id="development" className="py-5 scroll-mt-24 ">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-8">
            What we're working on now
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                Image Analysis
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed">
                The drone will take multiple GPS-tagged images to stitch into a field map. Then, an image model will then identify overly dry areas by color (if they are very brown or yellow) and mark them as points of interest. This will allow the drone to quickly identify underwatered areas on farm fields and provide farmers with accurate data at those points.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                Adaptive Path Planning
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed">
                The drone will initially measure 15-20 randomly scattered points on the field. Then, our model will try to create a heatmap from these measurements. From here, the drone can fly to the areas on the heatmap the model is the most uncertain about, repeating the process until uncertainty is approximately the same across the field. This lets the drone improve its own predictive accuracy.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* RESEARCH POSTER SECTION */}
        <section id="poster" className="hidden md:block py-5 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6">
            2025-26 Poster Board
          </h2>
          
          {/* Button for smaller screens */}
          <div className="md:hidden">
            <a 
              href="https://drive.google.com/file/d/1TR2aueFCylzw7Rai_YTZquHvooWqFICa/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center py-2 bg-emerald-500 hover:bg-emerald-600 text-[#0D1117] font-bold uppercase tracking-widest transition-all "
            >
             Open in new tab
            </a>
          </div>

          {/* Hidden on small screens, shown on md and up */}
          <div className="hidden md:block bg-[#161B22] border border-slate-800 p-1 rounded-xl shadow-xl">
            <div className="bg-[#0D1117] w-full h-[800px] overflow-hidden rounded-lg">
              <iframe
                src="/agrabhi-website/poster.pdf"
                className="w-full h-full border-none"
                title="AgraBhi Research Poster"
              ></iframe>
            </div>
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* NEXT STEPS & SUPPORT */}
        <section id="support" className="py-5 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-5">
            Where We Need Your Help
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold mb-2">1. Access to Farm Fields</h3>
              <p className="text-slate-400 font-light leading-relaxed max-w-7xl">
                We are currently looking for access to small farm fields to collect data and test whether our adapative path planning and image analysis methods will actually lead to prediction improvements on real farms.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">2. Hardware Support</h3>
              <p className="text-slate-400 font-light leading-relaxed max-w-7xl">
                Some components are very expensive for us to afford. We would really appreciate any sponsorships, donations, or connections to organizations that may be willing to support the project.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">3. Experience in Agriculture</h3>
              <p className="text-slate-400 font-light leading-relaxed max-w-7xl">
                If you have experience in farming, irrigation, or precision agriculture, we would also value your feedback on the project.
              </p>
            </div>
          </div>
        </section>
      </main>

   <footer className="border-t border-slate-800 bg-[#0D1117] py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-y-2 md:gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start  mb-1">
              <img src="blogo.png" alt="Logo" className="h-5 w-auto" />
              <h2 className="text-lg font-bold text-white leading-none">
                Agra<span className="text-emerald-400">Bhi</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Created by <span className="text-slate-200">Nathan Sharma, Naitik Patel, & Evan Quach</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-x-6 gap-y-0 md:gap-y-1 text-center">
            <a href="mailto:nathansharma007@gmail.com" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
              nathansharma007@gmail.com
            </a>
            <a href="mailto:naitik.s.patel10@gmail.com" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
              naitik.s.patel10@gmail.com
            </a>
            <a href="mailto:quachevan@gmail.com" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
              quachevan@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}