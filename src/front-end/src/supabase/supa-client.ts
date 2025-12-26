import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://ywrcuzbtbswaiynmzkti.supabase.co'
// const supabaseAnonKey = 'sb_publishable_wavl55SPw4Y8kBvepotzqQ_44IlRgmm'


export const supabase = createClient(
    'https://ywrcuzbtbswaiynmzkti.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cmN1emJ0YnN3YWl5bm16a3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyMjQ3MTksImV4cCI6MjA4MTgwMDcxOX0.N3WGjy2LGKCq19OOQi4x-PpDOTKggWpMwVR4Uhg2pAM')