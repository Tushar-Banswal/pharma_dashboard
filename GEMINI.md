# Pharma Map (Brooksphere)

A data visualization dashboard for pharmaceutical suppliers, built with React, Vite, and Leaflet.

## Project Overview

- **Purpose**: To provide a visual, map-based interface for managing and filtering pharmaceutical supplier data.
- **Main Technologies**:
  - **Framework**: React 19
  - **Build Tool**: Vite
  - **Styling**: Tailwind CSS
  - **Mapping**: Leaflet & React-Leaflet
  - **Data Parsing**: Papaparse (for CSV)
  - **Icons**: Lucide React
- **Architecture**:
  - **Data Layer**: Supplier data is stored in `public/suppliers.csv` and parsed dynamically at runtime.
  - **UI Layer**: A responsive layout with a fixed sidebar for controls and a full-screen map view.
  - **State Management**: Uses React Hooks (`useState`, `useEffect`, `useMemo`) for filtering and data handling.

## Building and Running

| Task | Command |
| :--- | :--- |
| **Development** | `npm run dev` |
| **Build** | `npm run build` |
| **Linting** | `npm run lint` |
| **Preview Build** | `npm run preview` |

## Development Conventions

- **Data Handling**:
  - Supplier data must be valid CSV with headers for name, category, cluster (or zone), and coordinates (latitude/longitude).
  - Use `src/utils/parseData.js` to add or modify data normalization logic.
- **Components**:
  - **MapView**: Handles map rendering, custom marker icons, and popups. It also fetches India's boundary GeoJSON.
  - **Sidebar**: Contains the filtering logic and branding.
- **Styling**:
  - Follow utility-first CSS using **Tailwind CSS**.
  - Custom animations (like `animate-pin-bounce`) may be used for map markers.
- **Mapping**:
  - Uses OpenStreetMap tiles.
  - Custom marker icons are generated based on the `regulatoryStatus` of the supplier.

## Key Files

- `public/suppliers.csv`: The source of truth for supplier data.
- `src/utils/parseData.js`: Centralized logic for parsing and cleaning CSV data.
- `src/components/MapView.jsx`: Primary visualization component using Leaflet.
- `src/components/Sidebar.jsx`: Filtering and navigation component.
- `src/App.jsx`: Main application container and filtering logic.
