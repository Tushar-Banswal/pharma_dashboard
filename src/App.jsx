import React, { useState, useEffect, useMemo } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import { parseSuppliers } from './utils/parseData';
import { Menu, X } from 'lucide-react';

function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCluster, setSelectedCluster] = useState('All');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await parseSuppliers();
        setSuppliers(data);
        setFilteredSuppliers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Extract unique categories and clusters for filters
  const categories = useMemo(() => {
    return [...new Set(suppliers.map(s => s.category))].sort();
  }, [suppliers]);

  const clusters = useMemo(() => {
    return [...new Set(suppliers.map(s => s.cluster))].sort();
  }, [suppliers]);

  // Apply filters
  useEffect(() => {
    let filtered = suppliers;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }
    
    if (selectedCluster !== 'All') {
      filtered = filtered.filter(s => s.cluster === selectedCluster);
    }
    
    setFilteredSuppliers(filtered);
  }, [selectedCategory, selectedCluster, suppliers]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-slate-600 font-medium">Loading Pharma Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-slate-900/50 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar 
          categories={categories}
          clusters={clusters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCluster={selectedCluster}
          setSelectedCluster={setSelectedCluster}
          totalCount={suppliers.length}
          filteredCount={filteredSuppliers.length}
        />
        {/* Mobile Close Button */}
        <button 
          className="absolute top-4 right-[-48px] p-2 bg-white rounded-r-lg border border-l-0 border-slate-200 lg:hidden shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">BP</span>
            </div>
            <h1 className="font-bold text-slate-800">Pharma Map</h1>
          </div>
          <button 
            className="p-2 text-slate-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Map View */}
        <div className="flex-1 overflow-hidden">
          <MapView data={filteredSuppliers} />
        </div>
      </main>
    </div>
  );
}

export default App;
