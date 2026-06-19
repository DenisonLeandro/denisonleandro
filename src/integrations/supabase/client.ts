import { createClient } from '@supabase/supabase-js'

// Credenciais PÚBLICAS — seguro para o frontend
const SUPABASE_URL = 'https://pgimbjfdxwefahxmpdpc.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_iJUl_R_VWamc4p2eC2XAWw_3Li5jJ0t'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)

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
