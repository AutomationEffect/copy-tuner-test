// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ruhcrsusmpuzcwqpcbiu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1aGNyc3VzbXB1emN3cXBjYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NTA4NjUsImV4cCI6MjA2MTEyNjg2NX0.2xPd501dxxJkmKtAlDj2vVpzPOc7e7DKtji2D7ZP0Is";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);