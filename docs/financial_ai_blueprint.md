# David Wade Marine: Financial Operations, AI & Enterprise Blueprint

## 1. Financial Operations Core
_Translating Dealership physical velocity into Accounting-ready Operational Finance._

- **Deposits & Balances Due**: 
  - Deposits taken on Boats or Special Order parts enter a `LIABILITY_DEPOSIT` staging state. They do not hit revenue until the `TRANSACTION_COMPLETE` event.
- **Customer Payments, Refunds & Credits**:
  - Refunds automatically trigger an inverse journal entry against original tax jurisdictions. 
  - Store Credits apply as a negative line-item tender on future quotes.
- **Payables & PO-to-Receipt Matching**:
  - The "Three-Way Match": System compares (1) Generated PO, (2) Scanned Receiving Manifest, (3) Vendor Invoice sum. Variances > $1 require GM override before marking `READY_FOR_PAY`.
- **Profitability Engines**:
  - *Labor Profitability*: (Flat-Rate Hours Billed * Customer Rate) - (Actual Hours Clocked * Tech Hourly Cost).
  - *Parts Profitability*: Current Retail Price vs Moving Average Cost (MAC) logic to account for varying OEM freight surcharges.
- **Estimate vs Actual Variance**:
  - Auto-flags ROs where Actual Cost exceeded Quoted Cost by > 5%. 
- **Accounting Export & GL Mapping**:
  - System is completely agnostic to ERP (Quickbooks/NetSuite). Exports a flattened CSV/JSON array mapping to specific GL Codes (e.g., `4001: Outboard Sales`, `2100: Sales Tax Payable`).

## 2. Reporting & Analytics / Exports
_Every report guarantees visual Exploration first, CSV/Excel Export second. All charts support Drill-down to source entities._

- **Executive & Department Scorecards**:
  - *Measures*: Gross Margin, Active Capital (Inventory Valuation), Open A/R.
  - *Dimensions*: Time, Location, Department (Sales/Service/Parts).
- **Service Cycle-Time & Profitability**:
  - *Measures*: Dwell time per status (e.g., Average 2.4 days in WAITING_ON_PARTS).
  - *Drill-down*: Filter by "Engine Rebuilds" to identify structural bottlenecks.
- **Campaign ROI & Lead Conversion**:
  - *Filters*: UTM Source, Date.
  - *Rollup*: "Facebook Ads: $500 spend. 12 Leads. 2 Conversions. Gross Profit: $12,000. ROI: 2300%."
- **Parts Performance & Stockout Analysis**:
  - *Measures*: Inventory Turn velocity. 
  - *Exception*: "Dead Stock" (0 sales, 0 RO issues > 365 Days).
- **Employee Productivity (Tech & Cashier)**:
  - Tech: Proficiency percentage (Billed/Clocked). Cashier: Void frequency and Drawer Variance frequency.

## 3. AI Command Layer
_Orchestrating 11 explicitly constrained AI Copilots. All outputs are advisory and require human 'Accept' to commit state changes._

1. **Executive Copilot**: Accesses complete platform. Summarizes intraday cashflow vs historicals. Blocked from altering settings.
2. **GM Copilot**: Focuses on escalations. Highlights prolonged ROs or severe drawer variances.
3. **Service Manager Copilot**: Suggests Bay optimization and Flags low-confidence quotes (e.g., "Tech C usually takes 4 hrs for this, you quoted 2").
4. **Parts Manager Copilot**: Analyzes 3-year seasonality to draft Min/Max reorder POs predicting spring rushes.
5. **Marketing Copilot**: Drafts A/B test emails targeting Win-back campaigns (customers with no ROs in 2 years).
6. **Call Center Copilot**: Transcribes Twilio Voice webhooks, dropping sentiment metrics into the Lead payload.
7. **Payroll Anomaly Copilot**: Flags 300% efficiency outliers before GM locks payroll export.
8. **Forecasting Copilot**: Predicts EOM revenue based on current pipeline velocity.
9. **Research Copilot**: RAG-pipeline indexing uploaded OEM Manuals to answer specific tech queries instantly.
10. **Cashier Assistant**: Prompts "Related/Cross-sell" items (e.g., "Customer buying Oil; suggest Oil Filter").
11. **Inventory Optimization Copilot**: Detects supersession chains (e.g., Yamaha updated Part A to Part B).

**AI Governance**: 
- *Explainability*: Every Copilot output features an "Analyze Drivers" button revealing the exact database query triggering the advice.
- *Audit*: Accepting an AI input logs `{ event_type: 'AI_ASSISTED', agent_name: 'PartsForecasting' }`.

## 4. Enterprise Expansion Design & Sequencing

### Expansion Scope
- **Phase-1 (MVP)**: Single-store operational dominancy. Core POS, Repair Orders, CRM, Accounting Exports.
- **Phase-2**: Mobile technician workflows (tablet water-testing checklists), OEM Warranty API integrations.
- **Phase-3 (Enterprise)**: Multi-tenant `location_id` activated globally. Centralized warehouse ordering, Cross-store part transfers, Unified Holding Company executive rollups.

### Technical Risk Register & Mitigation
- **Risk**: Concurrent barcode scans during physical counts creating DB locks.
  - *Mitigation*: Optimistic locking (`version_hash`) and asynchronous ledger queues.
- **Risk**: AI Hallucinating incorrect OEM part numbers.
  - *Mitigation*: AI is hard-restricted to `SELECT` operations within the authorized `InventoryItem` tables. It cannot invent parts not present in the catalog.

### Final Build Sequencing & Priority Roadmap
1. **Sprint 1-2**: Scaffold React/Vite, Postgres Schema, Auth, RBAC, and Audit Logging Middleware.
2. **Sprint 3-4**: Establish the Customer Hub (CRM) and Lead routing pipes.
3. **Sprint 5-6**: Deploy Parts Master, Setup POS scanning buffering, and Receiving processes.
4. **Sprint 7-8**: Service Lane Command Center (RO Lifecycle, Kanban UI, Labor Matrices).
5. **Sprint 9-10**: Timeclocks, Payroll Aggregation, and Operational Finance Journal mapping.
6. **Sprint 11-12**: Overlay Executive Dashboards and deploy the 11 AI Copilots based on live generated data.
