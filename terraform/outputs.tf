output "aws_region" {
  value = var.aws_region
}
output "aws_account_id" {
  value = data.aws_caller_identity.this.account_id
}

output "vpc_id" {
  value = module.vpc.vpc_id
}
output "public_subnet_ids" {
  value = join(", ", module.vpc.public_subnets)
}
output "private_subnet_ids" {
  value = join(", ", module.vpc.private_subnets)
}

output "app_sg_ids" {
  value = join(", ", [aws_security_group.sg["app"].id])
}

output "rabbitmq_url" {
  value = aws_mq_broker.this.instances.0.endpoints.0
}
