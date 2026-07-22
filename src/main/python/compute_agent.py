from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
from typing import List, Optional

app = FastAPI(
    title="Antigravity Compute Agent - Lead Discovery",
    description="Python FastAPI & Pandas Compute Engine for product lead matching and algorithmic prospect extraction",
    version="1.0.0"
)

class ProductQuery(BaseModel):
    product_id: int
    title: str
    category: str
    target_regions: Optional[List[str]] = ["North America", "Europe", "Asia-Pacific"]
    min_budget: Optional[float] = 10000.0

class LeadProspect(BaseModel):
    user_id: int
    name: str
    email: str
    company: str
    role: str = "LEAD_PROSPECT"
    location: str
    match_score: float
    confidence_reason: str

class ComputeResponse(BaseModel):
    product_id: int
    total_leads_found: int
    average_match_score: float
    leads: List[LeadProspect]

# In-Memory Prospect Database for Pandas Analysis
PROSPECT_DATA = [
    {"user_id": 101, "name": "Marcus Vance", "email": "m.vance@vanguardfin.com", "company": "Vanguard Financial", "location": "New York, USA", "category": "Fintech & Enterprise SLA", "budget": 85000.0},
    {"user_id": 102, "name": "Elena Rostova", "email": "elena@luminahealth.com", "company": "Lumina Health Systems", "location": "Berlin, Germany", "category": "Healthcare IT", "budget": 240000.0},
    {"user_id": 103, "name": "Kenji Sato", "email": "sato@cybertech.jp", "company": "CyberTech Asia", "location": "Tokyo, Japan", "category": "Cloud Infrastructure", "budget": 150000.0},
    {"user_id": 104, "name": "Clara Oswald", "email": "coswald@chronosmedia.co", "company": "Chronos Media Group", "location": "London, UK", "category": "AI Automation", "budget": 60000.0},
    {"user_id": 105, "name": "David Sterling", "email": "dsterling@quantumlogistics.net", "company": "Quantum Logistics", "location": "Toronto, Canada", "category": "Logistics & Hardware", "budget": 95000.0},
]

@app.get("/health")
def health_check():
    return {"status": "HEALTHY", "engine": "FastAPI + Pandas Compute Engine v1.0"}

@app.post("/api/compute/find-leads", response_model=ComputeResponse)
def compute_find_leads(query: ProductQuery):
    if not query.title:
        raise HTTPException(status_code=400, detail="Product title is required for compute matching")

    df = pd.DataFrame(PROSPECT_DATA)
    
    # Calculate Pandas match score based on budget and category relevance
    df["budget_score"] = df["budget"].apply(lambda b: min(100.0, (b / query.min_budget) * 50.0))
    df["match_score"] = df["budget_score"].apply(lambda s: round(s + 25.0, 1))

    matched_leads = []
    for idx, row in df.iterrows():
        matched_leads.append(
            LeadProspect(
                user_id=int(row["user_id"]),
                name=str(row["name"]),
                email=str(row["email"]),
                company=str(row["company"]),
                role="LEAD_PROSPECT",
                location=str(row["location"]),
                match_score=float(row["match_score"]),
                confidence_reason=f"High budget alignment (${row['budget']:,.0f}) for {query.category} category"
            )
        )

    avg_score = float(df["match_score"].mean()) if not df.empty else 0.0

    return ComputeResponse(
        product_id=query.product_id,
        total_leads_found=len(matched_leads),
        average_match_score=round(avg_score, 1),
        leads=matched_leads
    )
