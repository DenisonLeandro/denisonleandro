import { createClient } from '@supabase/supabase-js'

// Credenciais PÚBLICAS — seguro para o frontend
const SUPABASE_URL = 'https://pgimbjfdxwefahxmpdpc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnaW1iamZkeHdlZmFoeG1wZHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzMTcxNzksImV4cCI6MjAzNDg5NzE3OX0.GPz3j9Vf3VDPNmQbYp1yQzC2X9aB8cD4eF5gH6iJ7kL'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  cover_image_url?: string
  category?: string
  published_at: string
  created_at: string
}
