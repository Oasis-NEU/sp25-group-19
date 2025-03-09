import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://woxqmoiiqajjltaqfeym.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndveHFtb2lpcWFqamx0YXFmZXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMjE5ODAsImV4cCI6MjA1NDY5Nzk4MH0.91VxcnWHmTayah2kt1gwgxmAtFno8CR14r3_tHWYYiA";

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;