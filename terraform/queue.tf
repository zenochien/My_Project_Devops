resource "aws_mq_broker" "this" {
  broker_name = "${local.app_trackable_name}-${random_string.suffix.result}"

  engine_type         = "RabbitMQ"
  engine_version      = "3.8.23"
  host_instance_type  = "mq.t3.micro"
  deployment_mode     = "SINGLE_INSTANCE" # [ SINGLE_INSTANCE | ACTIVE_STANDBY_MULTI_AZ | CLUSTER_MULTI_AZ ]
  subnet_ids          = [module.vpc.private_subnets[0]]
  publicly_accessible = true
  #  security_groups    = [aws_security_group.sg["rabbitmq"].id] # disable due to enable publicly_accessible

  user {
    username = var.rabbitmq_user
    password = var.rabbitmq_pass
  }

  tags = merge(local.commonTags, {
    service        = "rabbitmq",
    CmBillingGroup = "urn:c2c:billing:${var.project}.rabbitmq.${var.environment_name}"
  })

  lifecycle {
    prevent_destroy = true
  }
}


