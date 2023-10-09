variable "project" {
  default = "hairlie"
}
variable "application_name" {}
variable "environment_name" {}
variable "vpc_cidr" {}
variable "vpc_private_subnets" {}
variable "vpc_public_subnets" {}

variable "aws_region" {
  default = "ap-northeast-1"
}

#variable "instance_type" {
#  default = "t3.small"
#}

#variable "vol_size" {
#  description = "The size of the drive in GiBs"
#  default     = "10"
#}

## MongoDB Atlas
#variable "mongodbatlas_project_id" {}
#variable "mongodbatlas_public_key" {}
#variable "mongodbatlas_private_key" {}
variable "mongodbatlas_destination_cidr_block" {}
variable "mongodbatlas_vpc_peering_connection_id" {}

### Domain
#variable "project_domain_name" {}

variable "rabbitmq_user" {}
variable "rabbitmq_pass" {}

##
# OPTIONAL
##
### Observer VPC CIDR
variable "observer_vpc_cidr" {
  default = "172.27.0.0/16" # All environments
}
## Company VPN
variable "vpn_cidr" {
  default = "35.74.105.102/32"
}
