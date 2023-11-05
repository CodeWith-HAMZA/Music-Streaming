"use client";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseClient: SupabaseClient = <SupabaseClient>(
  createClient(
    "https://gwgbmbrbithttvcdhsyn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Z2JtYnJiaXRodHR2Y2Roc3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MDUyODAsImV4cCI6MjAxNDA4MTI4MH0.WzV8OIIEdffwlRAYC8tmFVqxMtKXdjEGallJhXgHfZ4"
  )
);

export default supabaseClient;
