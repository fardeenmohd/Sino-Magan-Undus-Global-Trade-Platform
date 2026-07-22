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
        self.assertIn("Poland", response.json()["supported_destinations"])

    def test_compute_find_crossborder_leads_success(self):
        payload = {
            "product_id": 101,
            "title": "Organic Basmati Rice & Spices",
            "category": "Agri & Spices",
            "hs_code": "HS-1006",
            "origin_country": "India",
            "destination_country": "Oman",
            "min_budget": 50000.0
        }
        response = self.client.post("/api/compute/find-leads", json=payload)
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(data["product_id"], 101)
        self.assertEqual(data["origin_country"], "India")
        self.assertGreater(data["total_leads_found"], 0)
        self.assertIn("leads", data)

if __name__ == "__main__":
    unittest.main()
