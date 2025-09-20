import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://hppdgrkjskfhbcpyopwp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwcGRncmtqc2tmaGJjcHlvcHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNDMzMzksImV4cCI6MjA3MzkxOTMzOX0.LYlEXbi2YoL395UjEpLp8Y0NmITLDvH2OgD9mYZODLM';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
});

// Database Types
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  full_name?: string;
  avatar_url?: string;
  subscription_status?: 'free' | 'premium' | 'enterprise';
  usage_limit?: number;
  usage_count?: number;
}

export interface DocumentProcessing {
  id: string;
  user_id: string;
  original_text: string;
  simplified_text: string;
  file_name?: string;
  file_type?: string;
  file_size?: number;
  processing_time: number;
  accuracy_score: number;
  complexity_reduction: number;
  word_count: number;
  key_terms_simplified: any;
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface UsageTracking {
  id: string;
  user_id: string;
  document_processing_id?: string;
  action_type: 'document_upload' | 'text_processing' | 'result_download' | 'api_call' | 'document_authenticity_check';
  api_endpoint?: string;
  processing_time?: number;
  tokens_used?: number;
  cost_incurred?: number;
  metadata?: any;
  created_at: string;
}

export interface BillingRecord {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  description: string;
  document_count: number;
  billing_period_start: string;
  billing_period_end: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentAuthenticity {
  id: string;
  user_id: string;
  document_id: string; // Verification ID like AUTH-xyz-abc
  file_name?: string;
  file_type?: string;
  file_size?: number;
  authenticity_score: number; // 0-100
  confidence_score: number; // 0-100
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  is_authentic: boolean;
  fraud_risk_score?: number; // 0-100
  fraud_indicators?: any; // JSON array
  compliance_status?: 'COMPLIANT' | 'NON_COMPLIANT' | 'PARTIAL_COMPLIANCE';
  missing_elements?: any; // JSON array
  legal_requirements?: any; // JSON array
  key_findings?: any; // JSON array
  recommendations?: any; // JSON array
  document_metadata?: any; // JSON object
  analysis_result?: any; // Complete analysis response JSON
  processing_time?: number; // in milliseconds
  verification_timestamp: string;
  created_at: string;
  updated_at: string;
}

// Database service functions
export class DatabaseService {
  // User management
  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  static async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    if (error) throw error;
    return data;
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // Document processing
  static async saveDocumentProcessing(processing: Omit<DocumentProcessing, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('document_processing')
      .insert([processing])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getDocumentHistory(userId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('document_processing')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }

  static async getDocumentById(id: string) {
    const { data, error } = await supabase
      .from('document_processing')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Usage tracking
  static async trackUsage(usage: Omit<UsageTracking, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('usage_tracking')
      .insert([usage])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getUserUsageStats(userId: string, startDate?: string, endDate?: string) {
    let query = supabase
      .from('usage_tracking')
      .select('*')
      .eq('user_id', userId);

    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Billing
  static async createBillingRecord(billing: Omit<BillingRecord, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('billing_records')
      .insert([billing])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getUserBillingHistory(userId: string) {
    const { data, error } = await supabase
      .from('billing_records')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // User profile
  static async updateUserProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Document Authenticity
  static async saveDocumentAuthenticity(authenticity: {
    user_id: string;
    document_id: string;
    file_name?: string;
    file_type?: string;
    file_size?: number;
    authenticity_score: number;
    confidence_score?: number;
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    is_authentic: boolean;
    fraud_risk_score?: number;
    fraud_indicators?: any;
    compliance_status?: 'COMPLIANT' | 'NON_COMPLIANT' | 'PARTIAL_COMPLIANCE';
    missing_elements?: any;
    legal_requirements?: any;
    key_findings?: any;
    recommendations?: any;
    document_metadata?: any;
    analysis_result?: any;
    processing_time?: number;
  }) {
    const { data, error } = await supabase
      .from('document_authenticity')
      .insert([{
        ...authenticity,
        confidence_score: authenticity.confidence_score || authenticity.authenticity_score,
        fraud_risk_score: authenticity.fraud_risk_score || 0,
        verification_timestamp: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getDocumentAuthenticityHistory(userId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('document_authenticity')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }

  static async getDocumentAuthenticityById(documentId: string) {
    const { data, error } = await supabase
      .from('document_authenticity')
      .select('*')
      .eq('document_id', documentId)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateDocumentAuthenticity(id: string, updates: Partial<DocumentAuthenticity>) {
    const { data, error } = await supabase
      .from('document_authenticity')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteDocumentAuthenticity(id: string, userId: string) {
    const { error } = await supabase
      .from('document_authenticity')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    
    if (error) throw error;
  }

  // Analytics for document authenticity
  static async getAuthenticityAnalytics(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('document_authenticity')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }
}

export default DatabaseService;