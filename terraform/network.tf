module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name            = local.app_trackable_name
  cidr            = local.vpc_cidr
  azs             = data.aws_availability_zones.available.names
  private_subnets = local.private_subnet_list
  public_subnets  = local.public_subnet_list

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(local.commonTags, { Name = local.app_trackable_name })
}
