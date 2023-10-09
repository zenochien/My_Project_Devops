locals {
  commonTags = {
    project        = var.project
    service        = var.application_name
    environment    = var.environment_name
    CmBillingGroup = "urn:c2c:billing:${var.project}.${var.application_name}.${var.environment_name}"
  }

  vpc_cidr            = var.vpc_cidr
  track               = var.environment_name
  app_trackable_name  = "${local.track}-${var.application_name}"
  private_subnet_list = split(",", trimspace(var.vpc_private_subnets))
  public_subnet_list  = split(",", trimspace(var.vpc_public_subnets))
  security_groups = {
    common = {
      name        = "${local.app_trackable_name}-common_sg"
      description = "application access"
      ingress = {
        ssh = {
          from        = 22
          to          = 22
          protocol    = "tcp"
          cidr_blocks = [var.observer_vpc_cidr]
        }
      }
    }
    app = {
      name        = "${local.app_trackable_name}-app_sg"
      description = "application access"
      ingress = {
        http = {
          from        = 80
          to          = 80
          protocol    = "tcp"
          cidr_blocks = ["10.0.0.0/8"]
        }
        cadvisor = {
          from        = 8080
          to          = 8080
          protocol    = "tcp"
          cidr_blocks = [var.vpc_cidr] # only allow access from inside VPC
        }
        otel = {
          from        = 9464
          to          = 9464
          protocol    = "tcp"
          cidr_blocks = [var.vpc_cidr] # only allow access from inside VPC
        }
      }
    }
    rabbitmq = {
      name        = "${local.app_trackable_name}-rabbitmq"
      description = "RabbitMQ access"
      ingress = {
        # 5672, 5671: used by AMQP 0-9-1 and AMQP 1.0 clients without and with TLS (see https://www.rabbitmq.com/networking.html#ports)
        amqp = {
          from        = 5671
          to          = 5672
          protocol    = "tcp"
          cidr_blocks = [var.vpc_cidr, var.observer_vpc_cidr, var.vpn_cidr]
        }
      }
    }
  }
}
