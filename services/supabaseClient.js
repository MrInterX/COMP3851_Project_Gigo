import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// ❗ 临时禁用 Supabase，避免 Expo 报错
export const supabase = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    eq: () => Promise.resolve({ data: [], error: null }),
    gte: () => Promise.resolve({ data: [], error: null }),
    lte: () => Promise.resolve({ data: [], error: null }),
  })
};
