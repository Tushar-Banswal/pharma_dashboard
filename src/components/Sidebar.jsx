import React from 'react';
import { Filter, Database, ChevronDown } from 'lucide-react';

const Sidebar = ({ 
  categories, 
  clusters, 
  selectedCategory, 
  setSelectedCategory, 
  selectedCluster, 
  setSelectedCluster,
  totalCount,
  filteredCount
}) => {
  return (
    <div className="h-full bg-slate-50 border-r border-slate-200 p-6 overflow-y-auto">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-blue-200 shadow-lg">
          <Database className="text-white" size={20} />
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          Brooksphere
        </h1>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
            <Filter size={14} />
            Filter by Category
          </label>
          <div className="relative group">
            <select 
              className="w-full p-3 pr-10 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:border-blue-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
            <Filter size={14} />
            Filter by Cluster
          </label>
          <div className="relative group">
            <select 
              className="w-full p-3 pr-10 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:border-blue-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
            >
              <option value="All">All Clusters</option>
              {clusters.map(cluster => (
                <option key={cluster} value={cluster}>{cluster}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
            Selection Status
          </p>
          <p className="text-center text-slate-600 text-sm mt-1 font-medium">
            Showing {filteredCount} of {totalCount} Suppliers
          </p>
        </div>
      </div>

      <div className="mt-auto pt-10 text-[10px] text-slate-400 text-center uppercase tracking-[0.2em] font-bold">
        v1.0 Brooksphere Pharma
      </div>
    </div>
  );
};

export default Sidebar;
