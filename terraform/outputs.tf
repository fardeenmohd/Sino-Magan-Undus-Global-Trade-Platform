output "vpc_id" {
  description = "Created AWS VPC ID"
  value       = aws_vpc.main.id
}

output "eks_cluster_name" {
  description = "Created AWS EKS Cluster Name"
  value       = aws_eks_cluster.main.name
}

output "eks_cluster_endpoint" {
  description = "Created AWS EKS Kubernetes Control Plane Endpoint"
  value       = aws_eks_cluster.main.endpoint
}
