import { useState } from 'react';
import { Search, ChevronRight, Droplets, Waves, Coffee, Bath, Shirt, Flame, Wind, Filter } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'supply',
    label: 'Water Supply System',
    icon: Droplets,
    color: 'blue',
    fixtures: [
      {
        id: 'f-wm', name: 'Water Meter', description: 'Measures total water consumption entering the property.',
        lifespan: '15–25 years', icon: Droplets,
        commonIssues: ['Slow reader', 'Corrosion', 'Tamper evidence'],
        inspectionPoints: ['Check for leaks at connections', 'Verify accurate reading', 'Inspect for corrosion'],
        parts: ['Register', 'Body/Chamber', 'Inlet/Outlet connections'],
      },
      {
        id: 'f-prv', name: 'Pressure Regulator (PRV)', description: 'Reduces incoming high street pressure to safe building levels (typically 60–80 PSI).',
        lifespan: '10–15 years', icon: Filter,
        commonIssues: ['Loss of pressure regulation', 'Chatter/vibration', 'Leaking'],
        inspectionPoints: ['Test downstream pressure', 'Check for leaks', 'Inspect adjustment screw'],
        parts: ['Diaphragm', 'Spring', 'Adjustment screw', 'Inlet strainer'],
      },
      {
        id: 'f-sov', name: 'Shut-off Valve', description: 'Controls water flow to individual fixtures or entire zones.',
        lifespan: '20+ years', icon: Filter,
        commonIssues: ['Seized handle', 'Leaking packing', 'Corroded stem'],
        inspectionPoints: ['Verify full open/close operation', 'Check packing nut for leaks', 'Inspect for corrosion'],
        parts: ['Ball/Gate', 'Handle', 'Packing nut', 'Body'],
      },
      {
        id: 'f-bfp', name: 'Backflow Preventer', description: 'Prevents contaminated water from reversing into the clean supply.',
        lifespan: '10–15 years', icon: Filter,
        commonIssues: ['Failed check valve', 'Leaking relief valve', 'Clogged strainer'],
        inspectionPoints: ['Annual test required', 'Inspect relief valve discharge', 'Check strainer'],
        parts: ['Check valves (2)', 'Relief valve', 'Shutoffs', 'Test cocks'],
      },
    ],
  },
  {
    id: 'drainage',
    label: 'Drainage System',
    icon: Waves,
    color: 'teal',
    fixtures: [
      {
        id: 'f-fd', name: 'Floor Drain', description: 'Collects excess water on floors in utility rooms, garages, and basements.',
        lifespan: '20+ years', icon: Waves,
        commonIssues: ['Clogged strainer', 'Dry trap', 'Cracked body'],
        inspectionPoints: ['Ensure free flow', 'Check trap water seal', 'Inspect grate condition'],
        parts: ['Grate', 'Body', 'Trap', 'Strainer'],
      },
      {
        id: 'f-ptrap', name: 'P-Trap', description: 'U-shaped pipe that holds water to block sewer gases from entering.',
        lifespan: '25+ years', icon: Waves,
        commonIssues: ['Dry trap', 'Clog', 'Cracked pipe'],
        inspectionPoints: ['Check for leaks at slip joints', 'Verify water seal present', 'Inspect for cracks'],
        parts: ['Trap arm', 'U-bend', 'Slip joints', 'Cleanout plug'],
      },
      {
        id: 'f-co', name: 'Cleanout', description: 'Access point for drain line inspection and clearing blockages.',
        lifespan: '30+ years', icon: Waves,
        commonIssues: ['Missing plug', 'Cross-threaded plug', 'Buried/inaccessible'],
        inspectionPoints: ['Confirm accessibility', 'Check plug condition', 'Ensure proper cap'],
        parts: ['Plug/cap', 'Body', 'Threads'],
      },
      {
        id: 'f-vs', name: 'Vent Stack', description: 'Allows sewer gases to escape and air to enter drains for proper flow.',
        lifespan: '30+ years', icon: Wind,
        commonIssues: ['Bird nests', 'Debris blockage', 'Frost closure', 'Cracked pipe'],
        inspectionPoints: ['Check for blockages at roof termination', 'Inspect pipe condition', 'Verify proper flashing'],
        parts: ['Vent pipe', 'Roof flashing', 'Vent cap/screen'],
      },
    ],
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: Coffee,
    color: 'orange',
    fixtures: [
      {
        id: 'f-ks', name: 'Kitchen Sink', description: 'Primary kitchen fixture for washing and food prep.',
        lifespan: '15–30 years', icon: Coffee,
        commonIssues: ['Slow drain', 'Leaking faucet', 'Corroded drain basket'],
        inspectionPoints: ['Test hot/cold supply', 'Check drain flow', 'Inspect supply lines and P-trap'],
        parts: ['Faucet', 'Sprayer', 'Drain basket', 'P-trap', 'Supply lines', 'Aerator'],
      },
      {
        id: 'f-dw', name: 'Dishwasher Connection', description: 'Supply and drain connection for dishwasher appliance.',
        lifespan: '10–15 years', icon: Coffee,
        commonIssues: ['Kinked drain hose', 'Leaking supply valve', 'Air gap clogged'],
        inspectionPoints: ['Inspect supply valve', 'Check drain hose for kinks', 'Verify air gap present'],
        parts: ['Supply valve', 'Drain hose', 'Air gap', 'Connection fitting'],
      },
      {
        id: 'f-ice', name: 'Ice Maker Line', description: 'Small-diameter water supply line feeding refrigerator ice maker.',
        lifespan: '8–10 years', icon: Coffee,
        commonIssues: ['Pinhole leaks', 'Crimped tubing', 'Leaking saddle valve'],
        inspectionPoints: ['Inspect entire line for moisture', 'Check saddle valve', 'Look for kinks'],
        parts: ['Saddle valve', 'Supply tubing', 'Compression fitting'],
      },
    ],
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: Bath,
    color: 'purple',
    fixtures: [
      {
        id: 'f-tl', name: 'Toilet', description: 'Gravity-flush toilet for waste disposal.',
        lifespan: '30–50 years (tank parts 5–10 years)', icon: Bath,
        commonIssues: ['Running toilet', 'Rocking base', 'Partial flush', 'Mineral buildup'],
        inspectionPoints: ['Test flush and refill', 'Check for base leaks', 'Inspect supply line', 'Dye test flapper'],
        parts: ['Tank', 'Bowl', 'Fill valve', 'Flapper', 'Flush handle', 'Supply line', 'Wax ring', 'Bolts'],
      },
      {
        id: 'f-bs', name: 'Bathroom Sink', description: 'Basin for hand washing and personal hygiene.',
        lifespan: '20–30 years', icon: Bath,
        commonIssues: ['Slow drain', 'Dripping faucet', 'Leaking P-trap'],
        inspectionPoints: ['Test hot/cold water', 'Check drain pop-up', 'Inspect P-trap and supply lines'],
        parts: ['Faucet', 'Pop-up drain', 'P-trap', 'Supply lines', 'Aerator', 'Overflow'],
      },
      {
        id: 'f-sh', name: 'Shower / Bathtub', description: 'Bathing fixture with hot/cold mixing valve and drain.',
        lifespan: '20–40 years', icon: Bath,
        commonIssues: ['Leaking valve', 'Slow drain', 'Grout failure', 'Dripping showerhead'],
        inspectionPoints: ['Test pressure and temperature balance', 'Check drain flow', 'Inspect caulk/grout', 'Look for wall water damage'],
        parts: ['Mixing valve', 'Showerhead', 'Diverter', 'Drain', 'P-trap', 'Overflow plate'],
      },
    ],
  },
  {
    id: 'laundry',
    label: 'Laundry',
    icon: Shirt,
    color: 'green',
    fixtures: [
      {
        id: 'f-wm-conn', name: 'Washing Machine', description: 'Hot and cold supply connections and standpipe drain for washing machine.',
        lifespan: '10–15 years (hoses 5 years)', icon: Shirt,
        commonIssues: ['Burst supply hose', 'Slow standpipe drain', 'Vibration damage to connections'],
        inspectionPoints: ['Replace rubber hoses with braided steel', 'Check standpipe height', 'Verify P-trap present'],
        parts: ['Hot supply valve', 'Cold supply valve', 'Supply hoses', 'Standpipe', 'P-trap'],
      },
      {
        id: 'f-us', name: 'Utility Sink', description: 'Deep laundry sink for hand-washing and utility tasks.',
        lifespan: '20+ years', icon: Shirt,
        commonIssues: ['Slow drain', 'Dripping faucet', 'Cracked basin'],
        inspectionPoints: ['Check drain flow', 'Test faucet operation', 'Inspect P-trap'],
        parts: ['Basin', 'Faucet', 'P-trap', 'Supply lines', 'Drain strainer'],
      },
    ],
  },
  {
    id: 'waterheater',
    label: 'Water Heater',
    icon: Flame,
    color: 'red',
    fixtures: [
      {
        id: 'f-wh', name: 'Tank Water Heater', description: 'Storage water heater that heats and holds hot water ready for use.',
        lifespan: '8–12 years', icon: Flame,
        commonIssues: ['Sediment buildup', 'Anode rod depletion', 'T&P valve failure', 'Rust'],
        inspectionPoints: ['Test T&P relief valve', 'Check anode rod annually', 'Flush sediment annually', 'Inspect flue/venting'],
        parts: ['Tank shell', 'Anode rod', 'T&P relief valve', 'Dip tube', 'Thermostat', 'Heating element/burner', 'Drain valve'],
      },
      {
        id: 'f-twh', name: 'Tankless Water Heater', description: 'On-demand water heater that heats water only when needed.',
        lifespan: '15–25 years', icon: Flame,
        commonIssues: ['Descaling needed', 'Venting issues', 'Ignition failure', 'Flow sensor problems'],
        inspectionPoints: ['Descale annually in hard water areas', 'Check venting for blockages', 'Test minimum flow rate', 'Inspect gas connections'],
        parts: ['Heat exchanger', 'Flow sensor', 'Igniter', 'Burner', 'Venting system', 'Filter screen'],
      },
    ],
  },
  {
    id: 'outdoor',
    label: 'Outdoor / Utility',
    icon: Wind,
    color: 'gray',
    fixtures: [
      {
        id: 'f-hb', name: 'Hose Bib', description: 'Exterior faucet for garden hose connections.',
        lifespan: '10–20 years', icon: Wind,
        commonIssues: ['Frozen pipe damage', 'Leaking packing', 'Broken handle'],
        inspectionPoints: ['Check for winter freeze damage', 'Inspect packing nut', 'Test anti-siphon device'],
        parts: ['Body', 'Stem', 'Packing', 'Handle', 'Vacuum breaker'],
      },
      {
        id: 'f-irr', name: 'Irrigation System', description: 'Automated sprinkler system for landscaping.',
        lifespan: '10–20 years', icon: Wind,
        commonIssues: ['Broken heads', 'Controller malfunction', 'Backflow preventer failure', 'Leaking valves'],
        inspectionPoints: ['Test each zone', 'Inspect backflow preventer', 'Check controller programming', 'Look for leaking valve boxes'],
        parts: ['Controller', 'Zone valves', 'Sprinkler heads', 'Backflow preventer', 'Drip lines'],
      },
      {
        id: 'f-sp', name: 'Sump Pump', description: 'Removes groundwater from basement or crawl space.',
        lifespan: '7–10 years', icon: Waves,
        commonIssues: ['Float switch failure', 'Clogged intake', 'Check valve failure', 'Power outage vulnerability'],
        inspectionPoints: ['Test by pouring water into pit', 'Check float switch movement', 'Inspect discharge line', 'Verify check valve'],
        parts: ['Pump motor', 'Float switch', 'Check valve', 'Discharge pipe', 'Pit liner', 'Screen/grate'],
      },
    ],
  },
];

const FixtureCard = ({ fixture }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <fixture.icon className="w-4.5 h-4.5 text-indigo-600" style={{ width: '1.125rem', height: '1.125rem' }} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{fixture.name}</p>
            <p className="text-xs text-gray-400">Lifespan: {fixture.lifespan}</p>
          </div>
        </div>
        {expanded ? <ChevronRight className="w-4 h-4 text-gray-400 rotate-90 transition-transform" /> : <ChevronRight className="w-4 h-4 text-gray-400 transition-transform" />}
      </button>

      {expanded && (
        <div className="border-t border-gray-100 p-4 space-y-4">
          <p className="text-sm text-gray-600">{fixture.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Common Issues</p>
              <ul className="space-y-1">
                {fixture.commonIssues.map((issue) => (
                  <li key={issue} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Inspection Points</p>
              <ul className="space-y-1">
                {fixture.inspectionPoints.map((pt) => (
                  <li key={pt} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Parts / Components</p>
              <ul className="space-y-1">
                {fixture.parts.map((part) => (
                  <li key={part} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {part}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FixturesLibrary = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = CATEGORIES.map((cat) => ({
    ...cat,
    fixtures: cat.fixtures.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) =>
    (activeCategory === 'all' || cat.id === activeCategory) && cat.fixtures.length > 0
  );

  const totalFixtures = CATEGORIES.reduce((sum, c) => sum + c.fixtures.length, 0);

  return (
    <div className="flex h-full">
      {/* Category Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 p-4 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Categories</p>
        <div className="space-y-0.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeCategory === 'all' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Filter className="w-4 h-4" />
            All ({totalFixtures})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${activeCategory === cat.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <cat.icon className="w-4 h-4" />
              <span className="truncate">{cat.label}</span>
              <span className="ml-auto text-xs text-gray-400">{cat.fixtures.length}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fixtures Library</h1>
            <p className="text-sm text-gray-500">{totalFixtures} fixture types across {CATEGORIES.length} systems</p>
          </div>
          <div className="w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search fixtures…"
                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full"
              />
            </div>
          </div>
        </div>

        {/* Fixture Groups */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No fixtures match your search.</div>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat.id}>
              <div className="flex items-center gap-2 mb-3">
                <cat.icon className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-semibold text-gray-900">{cat.label}</h2>
                <span className="text-xs text-gray-400">{cat.fixtures.length} fixtures</span>
              </div>
              <div className="space-y-2">
                {cat.fixtures.map((fixture) => (
                  <FixtureCard key={fixture.id} fixture={fixture} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FixturesLibrary;
