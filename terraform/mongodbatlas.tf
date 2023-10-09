resource "aws_route" "private_route_to_mongodbatlas" {
  route_table_id            = module.vpc.private_route_table_ids[0]
  destination_cidr_block    = var.mongodbatlas_destination_cidr_block
  vpc_peering_connection_id = var.mongodbatlas_vpc_peering_connection_id
  depends_on                = [module.vpc]
}

resource "aws_route" "public_route_to_mongodbatlas" {
  route_table_id            = module.vpc.public_route_table_ids[0]
  destination_cidr_block    = var.mongodbatlas_destination_cidr_block
  vpc_peering_connection_id = var.mongodbatlas_vpc_peering_connection_id
  depends_on                = [module.vpc]
}

# TODO: implement
#
#resource "aws_vpc_peering_connection_accepter" "this" {
#  vpc_peering_connection_id = mongodbatlas_network_peering.this.connection_id
#  auto_accept = true
#}
#
#data "mongodbatlas_project" "this" {
#  project_id = var.mongodbatlas_project_id
#}
#
#data "mongodbatlas_network_containers" "this" {
#  project_id          = data.mongodbatlas_project.this.project_id
#  provider_name        = "AWS"
#}
#
#resource "mongodbatlas_network_peering" "this" {
#  accepter_region_name    = var.aws_region
#  project_id              = data.mongodbatlas_project.this.project_id
#  container_id            = data.mongodbatlas_network_containers.this.results[0].id
#  provider_name           = "AWS"
#  route_table_cidr_block  = local.vpc_cidr
#  vpc_id                  = aws_vpc.this.id
#  aws_account_id          = data.aws_caller_identity.current.account_id
#}
#
#data "mongodbatlas_network_peering" "this" {
#  project_id = mongodbatlas_network_peering.this.project_id
#  peering_id = mongodbatlas_network_peering.this.id
#}
