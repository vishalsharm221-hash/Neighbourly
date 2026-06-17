// Area data for Indian cities
export const CITIES_DATA = {
  Delhi: [
    { id: 'delhi_central', name: 'Central Delhi', pincode: '110001' },
    { id: 'delhi_north', name: 'North Delhi', pincode: '110007' },
    { id: 'delhi_south', name: 'South Delhi', pincode: '110016' },
    { id: 'delhi_east', name: 'East Delhi', pincode: '110091' },
    { id: 'delhi_west', name: 'West Delhi', pincode: '110015' },
    { id: 'delhi_newdelhi', name: 'New Delhi', pincode: '110001' },
    { id: 'delhi_dwarka', name: 'Dwarka', pincode: '110075' },
    { id: 'delhi_rohini', name: 'Rohini', pincode: '110085' },
    { id: 'delhi_southex', name: 'South Extension', pincode: '110049' },
    { id: 'delhi_coninaught', name: 'Connaught Place', pincode: '110001' },
    { id: 'delhi_rrk', name: 'R K Puram', pincode: '110066' },
    { id: 'delhi_greaterkhel', name: 'Greater Kailash', pincode: '110048' },
    { id: 'delhi_vasant', name: 'Vasant Kunj', pincode: '110070' },
    { id: 'delhi_gurgaon', name: 'Gurgaon Adjacent', pincode: '122001' },
    { id: 'delhi_ncr', name: 'NCR Adjacent', pincode: '121002' },
  ],
  Noida: [
    { id: 'noida_sec1', name: 'Sector 1', pincode: '201301' },
    { id: 'noida_sec2', name: 'Sector 2', pincode: '201302' },
    { id: 'noida_sec3', name: 'Sector 3', pincode: '201303' },
    { id: 'noida_sec4', name: 'Sector 4', pincode: '201304' },
    { id: 'noida_sec5', name: 'Sector 5', pincode: '201305' },
    { id: 'noida_sec6', name: 'Sector 6', pincode: '201306' },
    { id: 'noida_sec7', name: 'Sector 7', pincode: '201307' },
    { id: 'noida_sec8', name: 'Sector 8', pincode: '201308' },
    { id: 'noida_sec9', name: 'Sector 9', pincode: '201309' },
    { id: 'noida_sec10', name: 'Sector 10', pincode: '201310' },
    { id: 'noida_sec11', name: 'Sector 11', pincode: '201311' },
    { id: 'noida_sec12', name: 'Sector 12', pincode: '201312' },
    { id: 'noida_sec15', name: 'Sector 15', pincode: '201315' },
    { id: 'noida_sec16', name: 'Sector 16', pincode: '201316' },
    { id: 'noida_sec18', name: 'Sector 18', pincode: '201318' },
  ],
  Ghaziabad: [
    { id: 'ghz_indirapuram', name: 'Indirapuram', pincode: '201014' },
    { id: 'ghz_vasundhara', name: 'Vasundhara', pincode: '201012' },
    { id: 'ghz_kavi', name: 'Kavi Nagar', pincode: '201007' },
    { id: 'ghz_loni', name: 'Loni', pincode: '201102' },
    { id: 'ghz_sahibabad', name: 'Sahibabad', pincode: '201005' },
    { id: 'ghz_meerut', name: 'Meerut Road', pincode: '201009' },
    { id: 'ghz_mohan', name: 'Mohan Nagar', pincode: '201007' },
    { id: 'ghz_crossroad', name: 'Crossroad', pincode: '201001' },
    { id: 'ghz_central', name: 'Central Ghaziabad', pincode: '201001' },
    { id: 'ghz_vijay', name: 'Vijay Nagar', pincode: '201012' },
    { id: 'ghz_ashok', name: 'Ashok Nagar', pincode: '201009' },
    { id: 'ghz_radhpur', name: 'Radhpur', pincode: '201009' },
    { id: 'ghz_jaypee', name: 'Jaypee Green', pincode: '201009' },
    { id: 'ghz_yojana', name: 'Yojana Vihar', pincode: '201014' },
    { id: 'ghz_apex', name: 'Apex Orchid', pincode: '201012' },
  ],
};

export function getAreasByCity(city: 'Delhi' | 'Noida' | 'Ghaziabad') {
  return CITIES_DATA[city] || [];
}

export function getAllAreas() {
  return {
    Delhi: CITIES_DATA.Delhi,
    Noida: CITIES_DATA.Noida,
    Ghaziabad: CITIES_DATA.Ghaziabad,
  };
}
