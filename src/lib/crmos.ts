/**
 * CRMos REST API Client
 * Bi-directionele integratie met CRMos (https://crmos.one/api/v1)
 * Ecosysteem Authenticatie: crm_live_master_jamaldrenthe_2026_all_ecosystem
 */

export interface CrmosContactUpsert {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  company?: string;
  company_tags?: string[];
  tags?: string[];
  notes?: string;
  status?: 'lead' | 'qualified' | 'customer' | 'active' | 'applicant';
  source?: string;
}

export interface CrmosCandidate {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  skills?: string[];
  experience_years?: number;
  location?: string;
  notes?: string;
  contract_type?: string;
  hours?: string;
  role_id?: string;
  role_title?: string;
  linkedin_url?: string;
  source?: string;
}

export interface CrmosDeal {
  name: string;
  value: number;
  stage: 'lead' | 'contacted' | 'proposal' | 'negotiation' | 'won' | 'lost';
  company_name: string;
  contact_id?: string;
  probability?: number;
  tags?: string[];
}

export interface CrmosActivity {
  contact_id?: string;
  email?: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'trade' | 'application';
  title: string;
  description: string;
  performed_by?: string;
}

class CrmosClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = (typeof process !== 'undefined' && process.env?.VITE_CRMOS_API_URL) || 'https://crmos.one/api/v1';
    this.apiKey = (typeof process !== 'undefined' && process.env?.VITE_CRMOS_API_KEY) || 'crm_live_master_jamaldrenthe_2026_all_ecosystem';
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'X-CRMOS-API-KEY': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`
    };
  }

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<{ success: boolean; data?: T; error?: string }> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...(options.headers || {})
        }
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        // Fallback for non-JSON or HTML 404 responses
        return {
          success: response.ok,
          data: undefined,
          error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const json = await response.json();
      if (!response.ok) {
        return {
          success: false,
          error: json.message || json.error || `HTTP ${response.status}`
        };
      }

      return {
        success: true,
        data: json
      };
    } catch (err: any) {
      console.warn(`[CRMos API] Error connecting to ${url}:`, err.message || err);
      return {
        success: false,
        error: err.message || 'Verbindingsfout met CRMos'
      };
    }
  }

  /**
   * 1. DATA OPHALEN & REALTIME ZOEKEN
   */

  // Universeel Zoeken: Doorzoekt contacten, deals, kandidaten en teams tegelijk
  async search(query: string) {
    return this.request(`/search?q=${encodeURIComponent(query)}`, {
      method: 'GET'
    });
  }

  // Contacten filteren
  async getContacts(params?: { q?: string; company_tag?: string; tag?: string }) {
    const query = new URLSearchParams();
    if (params?.q) query.append('q', params.q);
    if (params?.company_tag) query.append('company_tag', params.company_tag);
    if (params?.tag) query.append('tag', params.tag);
    const qs = query.toString();
    return this.request(`/contacts${qs ? `?${qs}` : ''}`, {
      method: 'GET'
    });
  }

  // Enkel contact op ID
  async getContactById(id: string) {
    return this.request(`/contacts/${encodeURIComponent(id)}`, {
      method: 'GET'
    });
  }

  // Referral Teams & Kernleiders
  async getTeams() {
    return this.request('/teams', { method: 'GET' });
  }

  // Bedrijven & Pipelines
  async getCompanies() {
    return this.request('/companies', { method: 'GET' });
  }

  async getDeals(company?: string) {
    const qs = company ? `?company=${encodeURIComponent(company)}` : '';
    return this.request(`/deals${qs}`, { method: 'GET' });
  }

  async getCandidates() {
    return this.request('/candidates', { method: 'GET' });
  }

  /**
   * 2. DATA TERUGSCHRIJVEN & VERRIJKEN
   */

  // A. Contact Inschrijven of Slim Verrijken (Upsert)
  async upsertContact(data: CrmosContactUpsert) {
    return this.request('/contacts/upsert', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        source: data.source || 'logs.rent'
      })
    });
  }

  // B. Nieuw Contact Aanmaken
  async createContact(data: CrmosContactUpsert) {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        source: data.source || 'logs.rent'
      })
    });
  }

  // C. Bestaand Contact Bijwerken
  async updateContact(id: string, data: Partial<CrmosContactUpsert>) {
    return this.request(`/contacts/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  // D. Deal / Verkoopkans Inschrijven in de Sales Pipeline
  async createDeal(deal: CrmosDeal) {
    return this.request('/deals', {
      method: 'POST',
      body: JSON.stringify(deal)
    });
  }

  // E. Activiteit / Notitie Loggen
  async logActivity(activity: CrmosActivity) {
    return this.request('/activities', {
      method: 'POST',
      body: JSON.stringify({
        ...activity,
        performed_by: activity.performed_by || 'logs.rent Agent'
      })
    });
  }

  // F. Sollicitant Inschrijven
  async registerCandidate(candidate: CrmosCandidate) {
    return this.request('/candidates', {
      method: 'POST',
      body: JSON.stringify({
        ...candidate,
        source: candidate.source || 'logs.rent / Career'
      })
    });
  }
}

export const crmos = new CrmosClient();
