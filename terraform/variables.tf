variable "aws_region" {
  description = "AWS Cloud Region for EKS & VPC Infrastructure"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Deployment environment name"
  type        = string
  default     = "production"
}

variable "vpc_cidr" {
  description = "CIDR block for Virtual Private Cloud (VPC)"
  type        = string
  default     = "10.0.0.0/16"
}

variable "eks_cluster_name" {
  description = "AWS EKS Kubernetes Cluster Name"
  type        = string
  default     = "sino-magan-eks-cluster"
}
