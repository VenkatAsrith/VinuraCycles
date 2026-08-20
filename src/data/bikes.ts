export interface BikeSpec {
  label: string;
  value: string;
  icon: string;
}

export interface BikeDetail {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface BikeData {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  accentClass: string;      // e.g., 'copper' or 'cyan' or 'silver' or 'yellow' or 'red'
  accentColor: string;      // Hex color
  glowClass: string;        // glow styling
  textGlowClass: string;    // text glow styling
  specs: {
    range: string;
    motor: string;
    battery: string;
    weight: string;
    topSpeed: string;
  };
  details: BikeDetail[];
}

export const BIKES: BikeData[] = [
  {
    id: 'cruxon-a',
    name: 'Cruxon Model A',
    brand: 'Vinura Cycles',
    tagline: 'FUTURE BICYCLE',
    description: 'A sophisticated masterpiece of engineering featuring an aerodynamic carbon monocoque frame, integrated high-density energy system, and intelligent mid-drive motor.',
    price: '$8,250',
    image: '/assets/hero_model_a.jpg',
    accentClass: 'copper',
    accentColor: '#E6D5BC',
    glowClass: 'glow-copper',
    textGlowClass: 'text-glow-copper',
    specs: {
      range: '120 KM',
      motor: '750 W',
      battery: '720 Wh',
      weight: '18.4 KG',
      topSpeed: '45 KM/H'
    },
    details: [
      {
        id: '01',
        title: 'CARBON FRAME',
        description: 'Ultra-light carbon fiber frame for maximum strength and agility.',
        image: '/assets/tech_frame.jpg'
      },
      {
        id: '02',
        title: 'INTEGRATED BATTERY',
        description: '720Wh high-density battery seamlessly built into the frame.',
        image: '/assets/tech_frame.jpg'
      },
      {
        id: '03',
        title: 'SMART MOTOR',
        description: '750W rear hub motor delivers smooth, powerful assistance.',
        image: '/assets/tech_motor.jpg'
      },
      {
        id: '04',
        title: 'INTELLIGENT COCKPIT',
        description: 'Minimalist display with smart controls and real-time ride data.',
        image: '/assets/tech_cockpit.jpg'
      },
      {
        id: '05',
        title: 'AERODYNAMIC DESIGN',
        description: 'Sculpted for speed. Designed to cut through the wind.',
        image: '/assets/bike_side_profile.jpg'
      }
    ]
  },
  {
    id: 'cruxon-s',
    name: 'Cruxon Model S',
    brand: 'Vinura Cycles',
    tagline: 'AERO SPORT EDITION',
    description: 'Built for pure velocity. Experience the adrenaline of a hyper-streamlined racing posture, advanced carbon weave, and our reactive cyber-assist drive.',
    price: '$9,800',
    image: '/assets/hero_model_s.jpg',
    accentClass: 'cyan',
    accentColor: '#06B6D4',
    glowClass: 'glow-cyan',
    textGlowClass: 'text-glow-cyan',
    specs: {
      range: '140 KM',
      motor: '1000 W',
      battery: '840 Wh',
      weight: '17.2 KG',
      topSpeed: '55 KM/H'
    },
    details: [
      {
        id: '01',
        title: 'AERO CARBON CORE',
        description: 'Grade-11 carbon monocoque with extreme torsional rigidity.',
        image: '/assets/tech_frame.jpg'
      },
      {
        id: '02',
        title: 'HYPERCELL BATTERY',
        description: '840Wh smart cell tech with rapid charge capability.',
        image: '/assets/tech_frame.jpg'
      },
      {
        id: '03',
        title: 'CYBER-DRIVE MOTOR',
        description: '1000W peak motor with real-time torque vectoring.',
        image: '/assets/tech_motor.jpg'
      },
      {
        id: '04',
        title: 'HUD VIRTUAL COCKPIT',
        description: 'Holographic display showing speed, navigation and biosync telemetry.',
        image: '/assets/tech_cockpit.jpg'
      },
      {
        id: '05',
        title: 'SLIPSTREAM PROFILE',
        description: 'Zero drag wind-sculpted design optimized for headwind speed.',
        image: '/assets/bike_side_profile.jpg'
      }
    ]
  },
  {
    id: 'cruxon-d',
    name: 'Cruxon Model D',
    brand: 'Vinura Cycles',
    tagline: 'CYBER ENDURO RUNNER',
    description: 'Conquer any terrain. Features double-wishbone suspension integration, stealth titanium-reinforced frame, and high-torque dual electric motors.',
    price: '$11,500',
    image: '/assets/hero_model_d.jpg',
    accentClass: 'silver',
    accentColor: '#94A3B8',
    glowClass: 'glow-silver',
    textGlowClass: 'text-glow-silver',
    specs: {
      range: '100 KM',
      motor: '1200 W',
      battery: '960 Wh',
      weight: '21.5 KG',
      topSpeed: '50 KM/H'
    },
    details: [
      {
        id: '01',
        title: 'STEALTH SHIELD FRAME',
        description: 'Titanium-carbon skeleton built to withstand extreme impacts.',
        image: '/assets/tech_frame.jpg'
      },
      {
        id: '02',
        title: 'EXTREME POWERPACK',
        description: '960Wh impact-shielded battery pack for maximum reliability.',
        image: '/assets/tech_frame.jpg'
      },
      {
        id: '03',
        title: 'DUAL CORE MOTOR',
        description: '1200W high-torque motor optimized for extreme climbing angles.',
        image: '/assets/tech_motor.jpg'
      },
      {
        id: '04',
        title: 'TACTICAL INTERFACE',
        description: 'Ruggedized shock-resistant instrumentation and offline GPS.',
        image: '/assets/tech_cockpit.jpg'
      },
      {
        id: '05',
        title: 'REINFORCED GEOMETRY',
        description: 'All-terrain chassis with double-suspension and wide-track wheels.',
        image: '/assets/bike_side_profile.jpg'
      }
    ]
  },
  {
    id: 'cruxon-x',
    name: 'Cruxon Model X',
    brand: 'Vinura Cycles',
    tagline: 'URBAN ELECTRIC COMMUTER',
    description: 'The ultimate urban vehicle. Engineered for daily commutes with modular front-rear carrying mounts, active headlight guides, and clean carbon belt-drive integration.',
    price: '$6,900',
    image: '/assets/hero_model_x.jpg',
    accentClass: 'yellow',
    accentColor: '#EAB308',
    glowClass: 'glow-yellow',
    textGlowClass: 'text-glow-yellow',
    specs: {
      range: '90 KM',
      motor: '500 W',
      battery: '540 Wh',
      weight: '19.5 KG',
      topSpeed: '32 KM/H'
    },
    details: [
      {
        id: '01',
        title: 'COMMUTER CARBON',
        description: 'Comfort-oriented carbon fiber frame geometry with integrated carrier points.',
        image: '/assets/tech_frame.jpg'
      },
      {
        id: '02',
        title: 'COMPACT CELL PACK',
        description: '540Wh high-capacity battery for optimal urban weight distribution.',
        image: '/assets/tech_frame.jpg'
      },
      {
        id: '03',
        title: 'BELT DRIVE MOTOR',
        description: 'Silent 500W motor paired with grease-free carbon belt drive.',
        image: '/assets/tech_motor.jpg'
      },
      {
        id: '04',
        title: 'INTEGRATED HUD DISPLAY',
        description: 'Bright stem-embedded OLED display showing speed, range, and turn indicators.',
        image: '/assets/tech_cockpit.jpg'
      },
      {
        id: '05',
        title: 'COMMUTER PROFILE',
        description: 'Upright riding profile designed for maximum comfort and traffic visibility.',
        image: '/assets/bike_side_profile.jpg'
      }
    ]
  },
  {
    id: 'cruxon-r',
    name: 'Cruxon Model R',
    brand: 'Vinura Cycles',
    tagline: 'VELOCITA TRACK EDITION',
    description: 'Limitless track performance. Integrated aerodynamic racing handlebars, high-frequency kinetic energy recovery system, and a blistering 1500W peak motor.',
    price: '$14,500',
    image: '/assets/hero_model_r.jpg',
    accentClass: 'red',
    accentColor: '#EF4444',
    glowClass: 'glow-red',
    textGlowClass: 'text-glow-red',
    specs: {
      range: '110 KM',
      motor: '1500 W',
      battery: '800 Wh',
      weight: '14.8 KG',
      topSpeed: '65 KM/H'
    },
    details: [
      {
        id: '01',
        title: 'RACING AERO SHELL',
        description: 'Nanotube reinforced carbon chassis with drag-reducing paint coat.',
        image: '/assets/tech_frame.jpg'
      },
      {
        id: '02',
        title: 'RACEPOWER CELLS',
        description: 'High-discharge 800Wh lithium cell configuration for rapid acceleration support.',
        image: '/assets/tech_frame.jpg'
      },
      {
        id: '03',
        title: 'TRACK HYPER-DRIVE',
        description: '1500W mid-drive motor with customized racing performance mapping.',
        image: '/assets/tech_motor.jpg'
      },
      {
        id: '04',
        title: 'AERO COCKPIT R',
        description: 'Integrated track bars with integrated digital HUD and tactile trigger switches.',
        image: '/assets/tech_cockpit.jpg'
      },
      {
        id: '05',
        title: 'TRACK-TUNED GEOMETRY',
        description: 'Aggressive racing geometry with three-spoke aerodynamic wheels.',
        image: '/assets/bike_side_profile.jpg'
      }
    ]
  }
];
