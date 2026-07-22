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

    def test_compute_find_leads_success(self):
        payload = {
            "product_id": 42,
            "title": "Enterprise Cloud Suite",
            "category": "Cloud Infrastructure",
            "target_regions": ["North America", "Europe"],
            "min_budget": 50000.0
        }
        response = self.client.post("/api/compute/find-leads", json=payload)
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(data["product_id"], 42)
        self.assertGreater(data["total_leads_found"], 0)
        self.assertIn("leads", data)
        self.assertGreaterEqual(data["average_match_score"], 0.0)

    def test_compute_find_leads_missing_title_bad_request(self):
        payload = {
            "product_id": 42,
            "title": "",
            "category": "Cloud Infrastructure"
        }
        response = self.client.post("/api/compute/find-leads", json=payload)
        self.assertEqual(response.status_code, 400)

if __name__ == "__main__":
    unittest.main()
