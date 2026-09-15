-- Primary lead/newsletter datastore. Every lead-generating form (Contact,
-- Resources newsletter signup, DPA eligibility check) writes here through the
-- same shared handler, independent of whether the ReChat sync succeeds.
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  source_page TEXT NOT NULL,
  source_type TEXT NOT NULL DEFAULT 'contact', -- 'contact' | 'newsletter' | 'dpa'
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service_area TEXT, -- 'Nashville' | 'Memphis'
  message TEXT,
  synced_to_rechat INTEGER NOT NULL DEFAULT 0 -- boolean: 0 = false, 1 = true
);

CREATE INDEX IF NOT EXISTS idx_leads_synced_to_rechat ON leads (synced_to_rechat);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
