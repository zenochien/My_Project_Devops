# --- providers.tf ---
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0, >= 3.73.0"
    }
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "1.4.6"
    }
  }

  backend "s3" {}
}

provider "aws" {
  region = var.aws_region
}
