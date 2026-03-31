export type PlanId = 'powertrain' | 'gold' | 'goldPlus' | 'platinum'

export const PLAN_ORDER: PlanId[] = [
  'powertrain',
  'gold',
  'goldPlus',
  'platinum',
]

export const PLAN_LABELS: Record<PlanId, string> = {
  powertrain: 'Powertrain',
  gold: 'Gold',
  goldPlus: 'Gold Plus',
  platinum: 'Platinum',
}

export const PLAN_SUMMARY: Record<PlanId, string> = {
  powertrain: 'Core mechanical protection for engine, transmission, and drive axle.',
  gold: 'Powertrain plus steering, brakes, air conditioning, and more.',
  goldPlus: 'Gold coverage plus suspension, expanded electrical, cooling, and fuel.',
  platinum: 'Most comprehensive mechanical coverage — builds on Gold Plus with premium systems.',
}

/** Grouped bullet lists as shown on the KDM Automotive plan brochure */
export const PLAN_COVERAGE_SECTIONS: Record<
  PlanId,
  { heading: string; items: string[] }[]
> = {
  powertrain: [
    {
      heading: 'Engine',
      items: [
        'Block and all internal lubricated parts',
        'Cylinder heads',
        'Oil pump',
        'Timing belt / chain',
        'Valve covers',
        'Flywheel',
      ],
    },
    {
      heading: 'Transmission',
      items: [
        'Case and all internal lubricated parts',
        'Torque converter',
        'Vacuum modulator',
      ],
    },
    {
      heading: 'Drive axle',
      items: [
        'Differential housing and all internal lubricated parts',
        'Axle shafts',
        'Universal joints',
      ],
    },
  ],
  gold: [
    {
      heading: 'Includes Powertrain plan',
      items: [
        'All components listed under Powertrain for engine, transmission, and drive axle',
      ],
    },
    {
      heading: 'Engine (additional)',
      items: ['Oil pan', 'Valve timing and side covers', 'Water pump'],
    },
    {
      heading: 'Transmission (additional)',
      items: ['Oil pan', 'Detent cable', 'Kickdown link'],
    },
    {
      heading: 'Drive axle (additional)',
      items: ['Constant velocity joints', 'Slip joint'],
    },
    {
      heading: 'Steering',
      items: [
        'Steering gear housing and internal parts',
        'Power steering pump',
      ],
    },
    {
      heading: 'Brakes',
      items: [
        'Master cylinder',
        'Vacuum / hydraulic power brake booster',
        'Calipers',
        'Wheel cylinders',
      ],
    },
    {
      heading: 'Air conditioning',
      items: ['Compressor', 'Condenser', 'Evaporator'],
    },
  ],
  goldPlus: [
    {
      heading: 'Includes Gold plan',
      items: ['All components listed under the Gold plan'],
    },
    {
      heading: 'Front suspension',
      items: [
        'Upper and lower control arms',
        'Ball joints',
        'Wheel bearings',
      ],
    },
    {
      heading: 'Electrical',
      items: [
        'Alternator',
        'Starter motor',
        'Voltage regulator',
        'Power window and lock motors',
      ],
    },
    {
      heading: 'Cooling',
      items: ['Radiator', 'Fan motor', 'Heater core'],
    },
    {
      heading: 'Fuel',
      items: ['Fuel pump', 'Fuel pressure regulator', 'Fuel injectors'],
    },
    {
      heading: 'Air conditioning (additional)',
      items: ['Expansion valve', 'Orifice tube'],
    },
  ],
  platinum: [
    {
      heading: 'Includes Gold Plus plan',
      items: ['All components listed under the Gold Plus plan'],
    },
    {
      heading: 'Steering (additional)',
      items: ['Steering wheel', 'Telescoping mechanism'],
    },
    {
      heading: 'Front & rear suspension',
      items: [
        'Coil and leaf springs',
        'Electronic level control components',
      ],
    },
    {
      heading: 'Electrical (additional)',
      items: [
        'Cruise control module',
        'Instrument cluster',
        'Oxygen sensors',
        'Mass air flow sensor',
      ],
    },
    {
      heading: 'Other',
      items: [
        'Compact disc player',
        'Anti-theft system',
        'Heated windshield',
      ],
    },
  ],
}

export const NOT_COVERED_ITEMS: string[] = [
  'Maintenance services and parts (e.g. oil changes, filters, spark plugs)',
  'Normal wear items (e.g. brake pads, rotors, tires, wiper blades)',
  'Body panels, trim, glass, and upholstery',
  'Aftermarket accessories or equipment not installed by the manufacturer',
]

export const ADMIN_AND_LEGAL = {
  administrator:
    'Administrator registration and company details on file — verify Florida Company Code, administrator address, and KDM Automotive, LLC disclosures on your contract.',
  contact:
    'Confirm phone numbers, website, and mailing address on your service contract documents.',
  notes: [
    'This is a vehicle service contract, not an insurance policy. Benefits and exclusions are governed by your contract and applicable state law.',
    'Certain states require specific disclosures (e.g. Florida, Idaho). Refer to your contract packet for state-specific terms.',
  ],
} as const
