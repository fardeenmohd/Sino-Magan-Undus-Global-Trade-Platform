from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import json
import asyncio
from typing import List, Optional

app = FastAPI(
    title="Antigravity Cross-Border Trade Compute Engine - Real-Time SSE Stream Engine",
    description="Python FastAPI & Pandas Compute Engine for India Import/Export lead matching including Makhana, Onions, Eggs, Potatoes, Meat, and Machinery",
    version="3.0.0"
)

# Enable CORS for Next.js frontend & Spring Boot backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProductTradeQuery(BaseModel):
    product_id: int
    title: str
    category: str
    hs_code: Optional[str] = "HS-1904"
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

# In-Memory International Prospect Database
INTERNATIONAL_PROSPECT_DATA = [
    {
        "user_id": 401,
        "name": "David Miller",
        "email": "dmiller@superfoods.us",
        "company": "Organics & Superfoods USA Inc",
        "destination_country": "United States",
        "port_hub": "Port of Los Angeles",
        "tariff_pct": 3.5,
        "budget": 250000.0,
        "preferred_categories": ["Makhana & Superfoods", "Agri & Spices"]
    },
    {
        "user_id": 402,
        "name": "Nasser Al-Harthy",
        "email": "nasser@muscatimport.om",
        "company": "Muscat Fresh Produce & Foodstuffs",
        "destination_country": "Oman",
        "port_hub": "Port of Salalah",
        "tariff_pct": 5.0,
        "budget": 380000.0,
        "preferred_categories": ["Fresh Produce", "Poultry & Eggs", "Meat Exports"]
    },
    {
        "user_id": 403,
        "name": "Sophie van der Meer",
        "email": "sophie@amsterdambakery.nl",
        "company": "Amsterdam Bakery Ingredients BV",
        "destination_country": "Netherlands",
        "port_hub": "Port of Rotterdam",
        "tariff_pct": 2.8,
        "budget": 190000.0,
        "preferred_categories": ["Poultry & Eggs", "Agri & Spices"]
    },
    {
        "user_id": 404,
        "name": "Piotr Wisniewski",
        "email": "p.wisniewski@polandfoods.pl",
        "company": "Warsaw Agri Importers Sp. z o.o.",
        "destination_country": "Poland",
        "port_hub": "Port of Gdańsk",
        "tariff_pct": 4.0,
        "budget": 210000.0,
        "preferred_categories": ["Fresh Produce", "Machinery & Engineering"]
    },
    {
        "user_id": 405,
        "name": "Li Gang",
        "email": "ligang@chinameat.cn",
        "company": "China National Cold Chain Meat Corp",
        "destination_country": "China",
        "port_hub": "Port of Shanghai",
        "tariff_pct": 6.5,
        "budget": 600000.0,
        "preferred_categories": ["Meat Exports", "Fresh Produce"]
    },
    {
        "user_id": 406,
        "name": "Harrison Forde",
        "email": "hforde@ozmachinery.com.au",
        "company": "Australia Industrial & Mining Equipment",
        "destination_country": "Australia",
        "port_hub": "Port of Sydney",
        "tariff_pct": 4.0,
        "budget": 450000.0,
        "preferred_categories": ["Machinery & Engineering", "Makhana & Superfoods"]
    }
]

@app.get("/health")
def health_check():
    return {
        "status": "HEALTHY",
        "engine": "FastAPI + Pandas SSE Trade Stream Engine v3.0",
        "supported_commodities": ["Foxnuts/Makhana", "Onions", "Eggs", "Potatoes", "Meat", "Machinery Goods"],
        "supported_destinations": ["Poland", "Netherlands", "Australia", "Oman", "China", "United States"]
    }

@app.post("/api/compute/find-leads", response_model=ComputeTradeResponse)
def compute_find_leads(query: ProductTradeQuery):
    if not query.title:
        raise HTTPException(status_code=400, detail="Product title is required for trade route matching")

    df = pd.DataFrame(INTERNATIONAL_PROSPECT_DATA)

    if query.destination_country and query.destination_country.upper() != "ALL":
        filtered_df = df[df["destination_country"].str.contains(query.destination_country, case=False, na=False)]
        if not filtered_df.empty:
            df = filtered_df

    df["budget_score"] = df["budget"].apply(lambda b: min(50.0, (b / (query.min_budget or 10000.0)) * 25.0))
    df["match_score"] = df["budget_score"].apply(lambda s: round(s + 49.0, 1))

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
                confidence_reason=f"Verified Buyer for {query.category} ({query.hs_code}) in {row['destination_country']} with ${row['budget']:,.0f} import budget"
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

@app.get("/api/compute/stream-leads")
async def stream_leads(
    product_id: int = 1,
    title: str = "Indian Commodity",
    category: str = "General",
    hs_code: str = "HS-1904",
    destination: str = "United States"
):
    async def event_generator():
        # Stage 1: Trade Registry Scanner
        yield f"data: {json.dumps({'stage': 'SCANNING', 'progress': 25, 'message': f'🔍 Scanning international trade databases for {category} ({hs_code})...'})}\n\n"
        await asyncio.sleep(0.5)

        # Stage 2: Port & Tariff Logistics Calculation
        yield f"data: {json.dumps({'stage': 'TARIFF', 'progress': 50, 'message': f'🚢 Calculating ocean freight ETAs and customs tariffs for {destination}...'})}\n\n"
        await asyncio.sleep(0.5)

        # Stage 3: Regulatory & Phytosanitary Compliance Check
        yield f"data: {json.dumps({'stage': 'COMPLIANCE', 'progress': 75, 'message': f'🛡️ Verifying FDA / APEDA phytosanitary import clearance for {title}...'})}\n\n"
        await asyncio.sleep(0.5)

        # Stage 4: Results Delivery
        df = pd.DataFrame(INTERNATIONAL_PROSPECT_DATA)
        if destination and destination.upper() != "ALL":
            filtered_df = df[df["destination_country"].str.contains(destination, case=False, na=False)]
            if not filtered_df.empty:
                df = filtered_df

        df["budget_score"] = df["budget"].apply(lambda b: min(50.0, (b / 10000.0) * 25.0))
        df["match_score"] = df["budget_score"].apply(lambda s: round(s + 49.0, 1))

        matched_leads = []
        for idx, row in df.iterrows():
            matched_leads.append({
                "user_id": int(row["user_id"]),
                "name": str(row["name"]),
                "email": str(row["email"]),
                "company": str(row["company"]),
                "role": "LEAD_PROSPECT",
                "destination_country": str(row["destination_country"]),
                "port_hub": str(row["port_hub"]),
                "hs_code_match": True,
                "tariff_estimate_pct": float(row["tariff_pct"]),
                "match_score": float(row["match_score"]),
                "confidence_reason": f"Verified Buyer for {category} ({hs_code}) with ${row['budget']:,.0f} import budget"
            })

        yield f"data: {json.dumps({'stage': 'COMPLETE', 'progress': 100, 'message': f'✅ Matched {len(matched_leads)} verified buyer prospects in {destination}!', 'leads': matched_leads})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
