import Papa from 'papaparse';

export const parseSuppliers = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/suppliers.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cleanedData = results.data.map((row) => {
          const keys = Object.keys(row);
          
          // Dynamically find keys to prevent mismatch due to line breaks or spaces in headers
          // We look for key substrings to be resilient to formatting changes
          const nameKey = keys.find(k => k.toLowerCase().includes('name')) || keys[0];
          const catKey = keys.find(k => k.toLowerCase().includes('category')) || keys[1];
          const clusterKey = keys.find(k => k.toLowerCase().includes('zone') || k.toLowerCase().includes('cluster')) || keys[2];
          const statusKey = keys.find(k => k.toLowerCase().includes('usfda') || k.toLowerCase().includes('gmp')) || keys[3];
          const latKey = keys.find(k => k.toLowerCase().includes('latitude')) || keys[4];
          const lngKey = keys.find(k => k.toLowerCase().includes('longitude')) || keys[5];
          const prodKey = keys.find(k => k.toLowerCase().includes('key product')) || keys[6];

          const latValue = row[latKey];
          const lngValue = row[lngKey];
          
          const lat = parseFloat(latValue);
          const lng = parseFloat(lngValue);
          
          return {
            name: row[nameKey]?.trim() || 'Unknown Supplier',
            category: row[catKey]?.trim() || 'Uncategorized',
            cluster: row[clusterKey]?.trim() || 'Unknown Zone',
            regulatoryStatus: row[statusKey]?.trim() || 'No',
            keyProducts: row[prodKey]?.trim() || '',
            lat: isNaN(lat) ? null : lat,
            lng: isNaN(lng) ? null : lng,
            originalRow: row
          };
        }).filter(item => item.lat !== null && item.lng !== null); // Only include markers with valid coordinates

        resolve(cleanedData);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};
