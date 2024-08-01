
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fkkbobhpegfhfsvbhcid.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZra2JvYmhwZWdmaGZzdmJoY2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzNjAzOTAsImV4cCI6MjAzMzkzNjM5MH0.0g1YrLe4lF9HJUKHEuh5_toW_5f_k2C2g7dEMrpU3dQ"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
