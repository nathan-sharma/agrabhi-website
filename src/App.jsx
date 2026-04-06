import React, { useState } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E2E8F0] font-sans overflow-x-hidden">
      
      {/* STANDARD NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1117]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-full mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center text-xl font-bold tracking-tighter text-white">
            <img src="logo.png" alt="AgraBhi Logo" className="h-14 w-auto translate-y-1" />
            <div>
              Agra<span className="text-emerald-400">Bhi</span>
            </div>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#abstract" className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400 transition-colors">Abstract</a>
            <a href="#development" className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400 transition-colors">Current Work</a>
            <a href="#poster" className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400 transition-colors">Poster</a>
            <a href="#support" className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-500 transition-colors">Support Us</a>
            <a href="https://github.com/nathan-sharma/Agrabhi" className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-500 transition-colors">GitHub</a>
          </div>

          {/* Hamburger Icon (Mobile Only) */}
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
            <a href="#abstract" onClick={toggleMenu} className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400">Abstract</a>
            <a href="#development" onClick={toggleMenu} className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400">Current Work</a>
            <a href="#poster" onClick={toggleMenu} className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400">Poster</a>
            <a href="#support" onClick={toggleMenu} className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-500">Support Us</a>
            <a href="https://github.com/nathan-sharma/Agrabhi" onClick={toggleMenu} className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-500">GitHub</a>
          </div>
        )}
      </nav>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15 -z-20"></div>

      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

      {/* Header / Hero Section */}
      <header className="relative pt-32 pb-8 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight text-white py-2">
          AgraBhi
        </h1>
        <h2 className="text-xl md:text-3xl font-medium mb-4 tracking-tight text-slate-300 max-w-7xl mx-auto leading-tight">
          The First Low-Cost RTK-GPS and Regression Kriging System for <span className="text-emerald-400">Precision Irrigation.</span>
        </h2>
      </header>

      {/* AWARDS BAR */}
      <section className="relative z-10 px-6 mb-4">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/50 px-5 py-3 rounded-full shadow-lg shadow-emerald-900/20">
            <span className="text-2xl">🥈</span>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">State Finalist</p>
              <p className="text-sm font-semibold text-white">2026 Science & Engineering Fair of Houston</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/50 px-5 py-3 rounded-full shadow-lg shadow-emerald-900/20">
            <span className="text-2xl">🥉</span>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Category Winner</p>
              <p className="text-sm font-semibold text-white">2026 Texas Science & Engineering Fair</p>
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

        {/* RESTORED: RICHLY FORMATTED ABSTRACT */}
        <section id="abstract" className="py-10 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6">
            2025-26 Abstract
          </h2>
          <div className="text-base font-light text-slate-300 leading-relaxed space-y-6">
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
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* CURRENT DEVELOPMENT SECTION */}
        <section id="development" className="py-10 scroll-mt-24">
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
        <section id="poster" className="py-10 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6">
            2025-26 Poster Board
          </h2>
          <div className="bg-[#161B22] border border-slate-800 p-1 rounded-xl shadow-xl">
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
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-8">
            Where We Need Your Help
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="text-white font-bold mb-2">1. Farm Fields</h3>
              <p className="text-slate-400 font-light leading-relaxed max-w-7xl">
                We want to test how accurate our image models are and whether adaptive sampling will really improve the accuracy of our drone's predictions. To do so, we need access to a small farm field to collect moisture and image data. Please let us know of any connections you may have to Texan farmers!
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">2. Hardware Cost</h3>
              <p className="text-slate-400 font-light leading-relaxed max-w-7xl">
                Hardware costs for this prototype are ~$2,000, but our families are on very tight budgets and can't afford to pay for all parts. Any form of donation or sponsorship would be really appreciated!
              </p>
              <p className="mt-4 text-slate-300">
                Interested in helping? Please reach out to us at <a href="mailto:nathansharma007@gmail.com" className="text-emerald-400 hover:underline transition-colors">nathansharma007@gmail.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-600">
          <p>AgraBhi, a project by Nathan Sharma, Naitik Patel, and Evan Quach</p>
        </div>
      </footer>
    </div>
  );
}