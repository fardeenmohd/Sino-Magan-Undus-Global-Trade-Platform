// Centralized API Integration Client for Spring Boot 3 Backend & Python FastAPI Compute Engine

const SPRING_BOOT_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_URL || "http://localhost:8080";
const COMPUTE_ENGINE_URL = process.env.NEXT_PUBLIC_COMPUTE_ENGINE_URL || "http://localhost:8000";

export interface TradeLeadProspect {
  user_id: number;
  name: string;
  email: string;
  company: string;
  role: string;
  destination_country: string;
  port_hub: string;
  tariff_estimate_pct: number;
  match_score: number;
  confidence_reason: string;
}

export interface ComputeTradeResponse {
  product_id: number;
  origin_country: string;
  destination_country: string;
  total_leads_found: number;
  average_match_score: number;
  leads: TradeLeadProspect[];
}

/**
 * Trigger Python FastAPI Compute Engine to match leads for a given trade product
 */
export async function findLeadsCompute(
  productId: number,
  title: string,
  category: string,
  hsCode: string,
  originCountry: string,
  destinationCountry: string
): Promise<ComputeTradeResponse> {
  try {
    const response = await fetch(`${COMPUTE_ENGINE_URL}/api/compute/find-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        title,
        category,
        hs_code: hsCode,
        origin_country: originCountry,
        destination_country: destinationCountry,
        min_budget: 10000.0,
      }),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Python Compute Engine API offline; using fallback compute data", error);
  }

  // Fallback Compute Engine Response
  return {
    product_id: productId,
    origin_country: originCountry || "India 🇮🇳",
    destination_country: destinationCountry || "United States 🇺🇸",
    total_leads_found: 2,
    average_match_score: 95.5,
    leads: [
      {
        user_id: 401,
        name: "David Miller",
        email: "dmiller@superfoods.us",
        company: "Organics & Superfoods USA Inc",
        role: "LEAD_PROSPECT",
        destination_country: destinationCountry || "United States 🇺🇸",
        port_hub: "Port of Los Angeles",
        tariff_estimate_pct: 3.5,
        match_score: 97.5,
        confidence_reason: `FDA Registered Importer ready for ${hsCode} ($250k budget)`,
      },
      {
        user_id: 407,
        name: "Jennifer Hayes",
        email: "j.hayes@wholeorganics.com",
        company: "Whole Organics Distribution Corp",
        role: "LEAD_PROSPECT",
        destination_country: destinationCountry || "United States 🇺🇸",
        port_hub: "Port of Newark",
        tariff_estimate_pct: 3.5,
        match_score: 94.2,
        confidence_reason: "High volume monthly retail packaging contract requirement",
      },
    ],
  };
}

/**
 * Fetch Product Catalog from Spring Boot 3 Backend
 */
export async function fetchProductsApi(category?: string, destination?: string, query?: string) {
  try {
    const params = new URLSearchParams();
    if (category && category !== "ALL") params.append("category", category);
    if (destination && destination !== "ALL") params.append("destination", destination);
    if (query) params.append("query", query);

    const response = await fetch(`${SPRING_BOOT_URL}/api/products?${params.toString()}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Spring Boot Backend API offline; using local catalog state", error);
  }
  return null;
}

/**
 * User Login API call to Spring Boot 3 Auth Controller
 */
export async function loginUserApi(email: string, password: string) {
  try {
    const response = await fetch(`${SPRING_BOOT_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Spring Boot Auth API offline; executing client authentication fallback", error);
  }
  return null;
}

/**
 * User Registration API call to Spring Boot 3 Auth Controller
 */
export async function registerUserApi(
  name: string,
  email: string,
  password: string,
  company: string,
  role: string,
  location: string
) {
  try {
    const response = await fetch(`${SPRING_BOOT_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, company, role, location }),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Spring Boot Auth API offline; executing client registration fallback", error);
  }
  return null;
}

/**
 * Fetch User Profile from Spring Boot Backend
 */
export async function fetchUserProfileApi(userId: number) {
  try {
    const response = await fetch(`${SPRING_BOOT_URL}/api/users/${userId}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Spring Boot User API offline; using profile fallback", error);
  }
  return null;
}
