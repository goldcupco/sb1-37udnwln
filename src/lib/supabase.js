import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cicooqxfwjpwzapoulwc.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpY29vcXhmd2pwd3phcG91bHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2Njc4NjYsImV4cCI6MjA0OTI0Mzg2Nn0.Ijsva7dlEljpH_WOyke1AiDok8kEOv53BTsrbslto8k'

export const supabase = createClient(supabaseUrl, supabaseKey)