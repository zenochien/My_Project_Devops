const holdingCompanyService = {};

holdingCompanyService.prepareholdingCompanyInfo = ({ holdingCompany }) => {
  return {
    objectId: holdingCompany.objectId,
    name: holdingCompany.name,
    status: holdingCompany.status,
  };
};

module.exports = holdingCompanyService;
