import unittest
from fastapi.testclient import TestClient
from compute_agent import app

class TestComputeAgent(unittest.TestCase):

    def setUp(self):
        self.client = TestClient(app)

    def test_health_check(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "HEALTHY")
        self.assertIn("Foxnuts/Makhana", response.json()["supported_commodities"])

    def test_compute_find_makhana_leads_success(self):
        payload = {
            "product_id": 201,
            "title": "Bihar Premium Organic Foxnuts (Makhana)",
            "category": "Makhana & Superfoods",
            "hs_code": "HS-1904",
            "origin_country": "India",
            "destination_country": "United States",
            "min_budget": 50000.0
        }
        response = self.client.post("/api/compute/find-leads", json=payload)
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(data["product_id"], 201)
        self.assertEqual(data["origin_country"], "India")
        self.assertGreater(data["total_leads_found"], 0)

if __name__ == "__main__":
    unittest.main()
