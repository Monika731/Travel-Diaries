// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fbjrfaigcevbiqnlnscx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZianJmYWlnY2V2Ymlxbmxuc2N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzI3NDIsImV4cCI6MjA2OTkwODc0Mn0.6W6l-AnKy5Nj8fHJuFsuDjx_NSrhdDyF_oF6e7m3Pgw';


export const supabase = createClient(supabaseUrl, supabaseKey);
