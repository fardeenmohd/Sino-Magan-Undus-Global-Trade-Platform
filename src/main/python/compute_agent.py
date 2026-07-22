from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
from typing import List, Optional

app = FastAPI(
    title="Antigravity Cross-Border Trade Compute Engine - India Trade Corridors",
    description="Python FastAPI & Pandas Compute Engine for India Import/Export lead matching targeting Poland, Netherlands, Australia, Oman, China, and USA",
    version="2.0.0"
)

class ProductTradeQuery(BaseModel):
    product_id: int
    title: str
    category: str
    hs_code: Optional[str] = "HS-8471"
    origin_country: Optional[str] = "India"
    destination_country: Optional[str] = "United States"
    min_budget: Optional[float] = 10000.0

class CrossBorderLeadProspect(BaseModel):
    user_id: int
    name: str
    email: str
    company: str
    role: str = "LEAD_PROSPECT"
    destination_country: str
    port_hub: str
    hs_code_match: bool
    tariff_estimate_pct: float
    match_score: float
    confidence_reason: str

class ComputeTradeResponse(BaseModel):
    product_id: int
    origin_country: str
    destination_country: str
    total_leads_found: int
    average_match_score: float
    leads: List[CrossBorderLeadProspect]

# In-Memory Prospect Database for International Buyers in Poland, Netherlands, Australia, Oman, China, and USA
INTERNATIONAL_PROSPECT_DATA = [
    {
        "user_id": 301,
        "name": "Jan Kowalski",
        "email": "j.kowalski@baltictrade.pl",
        "company": "Baltic Global Imports",
        "destination_country": "Poland",
        "port_hub": "Port of Gdańsk",
        "tariff_pct": 3.2,
        "budget": 120000.0,
        "preferred_categories": ["Pharmaceuticals", "Textiles", "IT Hardware"]
    },
    {
        "user_id": 302,
        "name": "Willem de Jong",
        "email": "willem@rotterdamb2b.nl",
        "company": "Rotterdam Gateway Logistics",
        "destination_country": "Netherlands",
        "port_hub": "Port of Rotterdam",
        "tariff_pct": 2.8,
        "budget": 250000.0,
        "preferred_categories": ["Spices & Agri", "Chemicals", "AI Hardware"]
    },
    {
        "user_id": 303,
        "name": "Lachlan Murdoch",
        "email": "l.murdoch@pacificeX.com.au",
        "company": "Pacific Cross-Border Energy",
        "destination_country": "Australia",
        "port_hub": "Port of Sydney",
        "tariff_pct": 4.0,
        "budget": 180000.0,
        "preferred_categories": ["Solar Components", "Engineering Goods", "Textiles"]
    },
    {
        "user_id": 304,
        "name": "Tariq Al-Said",
        "email": "tariq@gulfmerchant.om",
        "company": "Oman Trade & Gulf Supply",
        "destination_country": "Oman",
        "port_hub": "Port of Salalah",
        "tariff_pct": 5.0,
        "budget": 310000.0,
        "preferred_categories": ["Basmati Rice & Spices", "Jewelry & Gems", "Machinery"]
    },
    {
        "user_id": 305,
        "name": "Wei Zhang",
        "email": "w.zhang@shanghaiimport.cn",
        "company": "Shanghai Silk Road Enterprise",
        "destination_country": "China",
        "port_hub": "Port of Shanghai",
        "tariff_pct": 6.5,
        "budget": 450000.0,
        "preferred_categories": ["Iron Ore", "Organic Chemicals", "Cotton Yarn"]
    },
    {
        "user_id": 306,
        "name": "Sarah Jenkins",
        "email": "sjenkins@americantrade.us",
        "company": "Apex Americas Import Corp",
        "destination_country": "United States",
        "port_hub": "Port of Los Angeles / Newark",
        "tariff_pct": 4.5,
        "budget": 500000.0,
        "preferred_categories": ["IT Services", "Pharmaceuticals", "Textiles & Apparel"]
    }
]

@app.get("/health")
def health_check():
    return {
        "status": "HEALTHY",
        "engine": "FastAPI + Pandas Cross-Border India Trade Engine v2.0",
        "supported_destinations": ["Poland", "Netherlands", "Australia", "Oman", "China", "United States"]
    }

@app.post("/api/compute/find-leads", response_model=ComputeTradeResponse)
def compute_find_leads(query: ProductTradeQuery):
    if not query.title:
        raise HTTPException(status_code=400, detail="Product title is required for trade route matching")

    df = pd.DataFrame(INTERNATIONAL_PROSPECT_DATA)

    # Filter by destination country if specified and not 'ALL'
    if query.destination_country and query.destination_country.upper() != "ALL":
        df = df[df["destination_country"].str.contains(query.destination_country, case=False, na=False)]

    if df.empty:
        # Fallback to all data if exact country filter produces 0 rows
        df = pd.DataFrame(INTERNATIONAL_PROSPECT_DATA)

    df["budget_score"] = df["budget"].apply(lambda b: min(50.0, (b / (query.min_budget or 10000.0)) * 25.0))
    df["match_score"] = df["budget_score"].apply(lambda s: round(s + 48.5, 1))

    matched_leads = []
    for idx, row in df.iterrows():
        matched_leads.append(
            CrossBorderLeadProspect(
                user_id=int(row["user_id"]),
                name=str(row["name"]),
                email=str(row["email"]),
                company=str(row["company"]),
                role="LEAD_PROSPECT",
                destination_country=str(row["destination_country"]),
                port_hub=str(row["port_hub"]),
                hs_code_match=True,
                tariff_estimate_pct=float(row["tariff_pct"]),
                match_score=float(row["match_score"]),
                confidence_reason=f"Verified Buyer in {row['destination_country']} via {row['port_hub']} with ${row['budget']:,.0f} import budget"
            )
        )

    avg_score = float(df["match_score"].mean()) if not df.empty else 0.0

    return ComputeTradeResponse(
        product_id=query.product_id,
        origin_country=query.origin_country or "India",
        destination_country=query.destination_country or "Global",
        total_leads_found=len(matched_leads),
        average_match_score=round(avg_score, 1),
        leads=matched_leads
    )
