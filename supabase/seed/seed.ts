// seed.ts - Seed data for areas
// Run with: supabase db execute seed.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const areasData = {
  Delhi: [
    { name: 'Central Delhi', pincode: '110001' },
    { name: 'North Delhi', pincode: '110007' },
    { name: 'South Delhi', pincode: '110016' },
    { name: 'East Delhi', pincode: '110091' },
    { name: 'West Delhi', pincode: '110015' },
    { name: 'New Delhi', pincode: '110001' },
    { name: 'Dwarka', pincode: '110075' },
    { name: 'Rohini', pincode: '110085' },
    { name: 'South Extension', pincode: '110049' },
    { name: 'Connaught Place', pincode: '110001' },
    { name: 'R K Puram', pincode: '110066' },
    { name: 'Greater Kailash', pincode: '110048' },
    { name: 'Vasant Kunj', pincode: '110070' },
    { name: 'Gurgaon Adjacent', pincode: '122001' },
    { name: 'NCR Adjacent', pincode: '121002' },
  ],
  Noida: [
    { name: 'Sector 1', pincode: '201301' },
    { name: 'Sector 2', pincode: '201302' },
    { name: 'Sector 3', pincode: '201303' },
    { name: 'Sector 4', pincode: '201304' },
    { name: 'Sector 5', pincode: '201305' },
    { name: 'Sector 6', pincode: '201306' },
    { name: 'Sector 7', pincode: '201307' },
    { name: 'Sector 8', pincode: '201308' },
    { name: 'Sector 9', pincode: '201309' },
    { name: 'Sector 10', pincode: '201310' },
    { name: 'Sector 11', pincode: '201311' },
    { name: 'Sector 12', pincode: '201312' },
    { name: 'Sector 15', pincode: '201315' },
    { name: 'Sector 16', pincode: '201316' },
    { name: 'Sector 18', pincode: '201318' },
  ],
  Ghaziabad: [
    { name: 'Indirapuram', pincode: '201014' },
    { name: 'Vasundhara', pincode: '201012' },
    { name: 'Kavi Nagar', pincode: '201007' },
    { name: 'Loni', pincode: '201102' },
    { name: 'Sahibabad', pincode: '201005' },
    { name: 'Meerut Road', pincode: '201009' },
    { name: 'Mohan Nagar', pincode: '201007' },
    { name: 'Crossroad', pincode: '201001' },
    { name: 'Central Ghaziabad', pincode: '201001' },
    { name: 'Vijay Nagar', pincode: '201012' },
    { name: 'Ashok Nagar', pincode: '201009' },
    { name: 'Radhpur', pincode: '201009' },
    { name: 'Jaypee Green', pincode: '201009' },
    { name: 'Yojana Vihar', pincode: '201014' },
    { name: 'Apex Orchid', pincode: '201012' },
  ],
};

async function seedAreas() {
  try {
    console.log('🌱 Starting to seed areas...');

    for (const [city, areas] of Object.entries(areasData)) {
      console.log(`\n📍 Seeding ${city}...`);

      for (const area of areas) {
        const { data, error } = await supabase.from('areas').insert({
          city,
          name: area.name,
          pincode: area.pincode,
        });

        if (error) {
          console.error(`Error inserting ${area.name}:`, error.message);
        } else {
          console.log(`✅ Created: ${area.name}`);
        }
      }
    }

    console.log('\n✨ Seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedAreas();
