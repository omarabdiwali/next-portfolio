import React from 'react';
import Image from 'next/image'; // Next.js Image for optimization

export default function ExperienceCard({ experience }) {
  return (
    <div className="group bg-slate-900/70 hover:bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/40 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl shadow-emerald-500/10 max-w-4xl mx-auto p-10 md:p-12">
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
        {/* Company Logo/Icon Section */}
        <div className="flex flex-col items-center lg:items-start gap-4 flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 overflow-hidden">
            {experience.logo ? (
              <Image
                src={experience.logo}
                alt={`${experience.title[1]} logo`}
                width={96}
                height={96}
                className="w-full h-full transition-all duration-300 drop-shadow-lg group-hover/grayscale:scale-105"
                priority={true}
              />
            ) : (
              // Fallback to initial if no logo provided
              <span className="text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 drop-shadow-lg">
                {experience.title[1][0]}
              </span>
            )}
          </div>
          <div className="text-center lg:text-left">
            <span className="block text-sm font-mono text-slate-500 uppercase tracking-wider">{experience.title[1]}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-100 leading-tight group-hover:text-emerald-50 transition-colors">
              {experience.title[0]}
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 text-slate-400">
              <span className="font-mono text-lg">{experience.location}</span>
              <span className="hidden sm:inline">/</span>
              <span className="font-mono text-emerald-400 text-lg font-medium bg-emerald-500/10 px-3 py-1 rounded-full">
                {experience.duration}
              </span>
            </div>
          </div>

          <ul className="space-y-5 pl-0">
            {experience.points.map((point, i) => (
              <li key={i} className="group/list flex items-start gap-4 text-slate-300 text-base md:text-lg leading-relaxed hover:text-slate-200 transition-colors duration-200">
                <div className="flex-shrink-0 w-6 h-6 mt-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-80 group-hover/list:opacity-100 transition-all duration-200 flex items-center justify-center"></div>
                <span className="flex-1">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}