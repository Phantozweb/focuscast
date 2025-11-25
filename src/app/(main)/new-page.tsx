'use client';

import React, { useState } from 'react';
import { Play, Heart, Share2, Search, Clock, Users, List, Mic, ChevronRight, ChevronLeft, Calendar, Info } from 'lucide-react';

const FocusCastRedesign = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Mock Data based on your screenshots
  const episodes = [
    {
      id: 1,
      series: "Focus Bites",
      title: "Chromatic Aberration: The Rainbow Edges of Vision",
      desc: "Explore chromatic aberration, where different colors focus differently, impacting visual quality...",
      duration: "03:56",
      date: "Jun 03, 2025",
      color: "bg-sky-600"
    },
    {
      id: 2,
      series: "Pediatric Playbook",
      title: "Visual Impairment in Children: Causes and Support",
      desc: "Understand the causes, assessment, and support strategies for children with reduced vision.",
      duration: "05:02",
      date: "Nov 01, 2025",
      color: "bg-blue-500"
    },
    {
      id: 3,
      series: "Focus Bites",
      title: "Troxler's Fading - The Disappearing Act",
      desc: "Discover Troxler's fading, the optical illusion where stationary peripheral objects vanish...",
      duration: "01:52",
      date: "Jun 01, 2025",
      color: "bg-sky-600"
    },
    {
      id: 4,
      series: "Clinical Skills",
      title: "Dilation Procedures: Safe and Effective Mydriasis",
      desc: "A guide to mastering pharmacologic pupil dilation (mydriasis) for a thorough fundus examination...",
      duration: "03:59",
      date: "Oct 12, 2025",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F0F5FA] font-sans text-slate-800">
      
      {/* 2. Hero Section - Centered, Clean, Soft */}
      <div className="relative pt-16 pb-12 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
            The #1 Optometry Audio Source
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Listen to optometry <br className="hidden md:block"/> knowledge <span className="text-blue-500">anytime.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Your daily source for clear, concise, and professional insights. 
            From clinical skills to pediatric care.
          </p>

          {/* Premium Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-12 pr-4 py-4 bg-white border-none rounded-full text-slate-900 placeholder-slate-400 shadow-xl shadow-blue-100/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              placeholder="Search topics like 'Contact Lens Fitting'..." 
            />
            <button className="absolute right-2 top-2 bottom-2 bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-full transition-colors font-medium">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        
        {/* 3. Dashboard / Stats Section - Rounded Cards instead of plain icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Episodes', val: '126', icon: Mic, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Series', val: '7', icon: List, color: 'text-purple-500', bg: 'bg-purple-50' },
            { label: 'Listening Time', val: '8h 33m', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Listeners', val: '1.3k', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stat.val}</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Featured Banner - "New Series Drop" */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 mb-12 text-white relative overflow-hidden shadow-2xl shadow-slate-300">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 text-blue-300 text-sm font-bold tracking-wider uppercase">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> New Series Drop
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">Low Vision Living</h2>
                    <p className="text-slate-300 max-w-lg text-lg leading-relaxed">
                        Empowering patients with strategies, tools, and resources for living confidently with low vision.
                    </p>
                    <button className="mt-4 bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
                        Start Learning <ChevronRight size={18} />
                    </button>
                </div>
                {/* Mock Image Placeholder */}
                <div className="w-full md:w-80 h-48 bg-orange-200 rounded-2xl flex items-center justify-center relative shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <span className="text-orange-800 font-bold opacity-50">Series Cover Art</span>
                </div>
            </div>
        </div>

        {/* 5. Content Controls - Segmented Toggle */}
        <div className="flex justify-center mb-10">
            <div className="bg-white p-1 rounded-full shadow-sm border border-slate-200 inline-flex">
                <button 
                    onClick={() => setActiveTab('all')}
                    className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'all' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    All Episodes
                </button>
                <button 
                    onClick={() => setActiveTab('series')}
                    className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'series' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    Explore Series
                </button>
            </div>
        </div>

        {/* 6. Episode Grid - Clean Cards with Soft Shadows */}
        <div className="grid md:grid-cols-2 gap-6">
            {episodes.map((ep) => (
                <div key={ep.id} className="group bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 flex flex-col sm:flex-row gap-5">
                    {/* Thumbnail Area */}
                    <div className={`w-full sm:w-32 h-32 ${ep.color} rounded-2xl flex-shrink-0 flex items-center justify-center text-white p-4 text-center text-xs font-bold shadow-inner`}>
                        {ep.series} Art
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide">
                                    {ep.series}
                                </span>
                                <div className="flex items-center gap-3">
                                    <button className="text-slate-300 hover:text-red-500 transition-colors"><Heart size={18}/></button>
                                    <button className="text-slate-300 hover:text-blue-500 transition-colors"><Share2 size={18}/></button>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                                {ep.title}
                            </h3>
                            <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-3">
                                {ep.desc}
                            </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                                <span className="flex items-center gap-1"><Clock size={12}/> {ep.duration}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span className="flex items-center gap-1"><Calendar size={12}/> {ep.date}</span>
                            </div>
                            
                            {/* Play Button - The Hero Action */}
                            <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-900 border border-slate-200 flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all shadow-sm">
                                <Play size={16} className="ml-0.5" fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors">
                <ChevronLeft size={20} />
            </button>
            <span className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-slate-300">1</span>
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-medium">2</button>
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-medium">3</button>
            <span className="text-slate-300">...</span>
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-medium">16</button>
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 hover:border-slate-300 transition-colors">
                <ChevronRight size={20} />
            </button>
        </div>

      </div>
    </div>
  );
};

export default FocusCastRedesign;
