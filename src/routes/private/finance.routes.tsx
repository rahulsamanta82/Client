import CreateApplicationTemplateLink from "containers/private/finance/applications-tamplate-link/create";
import ApplicationTemplateLinkListing from "containers/private/finance/applications-tamplate-link/listing";
import CreateFinanceApplication from "containers/private/finance/applications/create";
import FinanceApplicationsListing from "containers/private/finance/applications/listing";
import BankScrollLogsListing from "containers/private/finance/bank-scroll-logs/listing";
import BankTransactionsLogsListing from "containers/private/finance/bank-transactions-logs/listing";
import CreateBank from "containers/private/finance/banks/create";
import BanksListing from "containers/private/finance/banks/listing";
import CheckFinancialChallanStatusListing from "containers/private/finance/check-challan-status/listing";
import FinanceDashboard from "containers/private/finance/finance-dashboard";
import CreateFineSlot from "containers/private/finance/fine-slots/create";
import FineSlotsListing from "containers/private/finance/fine-slots/listing";
import CreateInstallmentSlots from "containers/private/finance/installment-slots/create";
import InstallmentSlotsListing from "containers/private/finance/installment-slots/listing";
import CreateInstallments from "containers/private/finance/installments/create";
import InstallmemtListing from "containers/private/finance/installments/listing";
import SlotsParticular from "containers/private/finance/manage-slots-installments-particular";
import MasterBookListing from "containers/private/finance/master-book/listing";
import ShowTransactionDetail from "containers/private/finance/master-book/show-transaction-detail";
import MasterBookTransactionDetail from "containers/private/finance/master-book/transaction-detail";
import StudentFinancialClearanceListing from "containers/private/finance/student-financial-clearance/listing";
import TemplateProgramAccountCodeListing from "containers/private/finance/template-program-account-code/listing";
import CreateVoucherParticular from "containers/private/finance/voucher-particulars/create";
import VoucherParticularsListing from "containers/private/finance/voucher-particulars/listing";
import VoucherTemplateBodiesListing from "containers/private/finance/voucher-template-bodies/listing";
import CreateVoucherTemplateHeader from "containers/private/finance/voucher-template-headers/create";
import VoucherTemplateHeadersListing from "containers/private/finance/voucher-template-headers/listing";
import CreateVoucherType from "containers/private/finance/voucher-types/create";
import VoucherTypesListing from "containers/private/finance/voucher-types/listing";
import useUtils from "hooks/useUtils";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const FinanceRoutes: FC<any> = ({}) => {
  const { getPathToSetRoute } = useUtils();
  return (
    <Routes>
      <Route
        path={getPathToSetRoute(siteRoutes.financeDashboard)}
        Component={FinanceDashboard}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.studentFinancialClearanceListing)}
        Component={StudentFinancialClearanceListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.checkFinancialChallanStatus)}
        Component={CheckFinancialChallanStatusListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.fineSlotsListing, true)}
        Component={FineSlotsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createFineSlot, true)}
        Component={CreateFineSlot}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.voucherTypesListing, true)}
        Component={VoucherTypesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createVoucherType, true)}
        Component={CreateVoucherType}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.voucherParticularListing, true)}
        Component={VoucherParticularsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createVoucherParticular, true)}
        Component={CreateVoucherParticular}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createVoucherType, true)}
        Component={CreateVoucherType}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.financeApplicationsListing, true)}
        Component={FinanceApplicationsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createFinanceApplications, true)}
        Component={CreateFinanceApplication}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.applicationTemplateLinkListing,
          true
        )}
        Component={ApplicationTemplateLinkListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createApplicationTemplateLink, true)}
        Component={CreateApplicationTemplateLink}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.voucherTemplateHeaderListing, true)}
        Component={VoucherTemplateHeadersListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createVoucherTemplateHeader, true)}
        Component={CreateVoucherTemplateHeader}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createBank, true)}
        Component={CreateBank}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.banksListing, true)}
        Component={BanksListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.bankTransactionLogsListing)}
        Component={BankTransactionsLogsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.bankScrollLogsListing)}
        Component={BankScrollLogsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.masterBookListing, true)}
        Component={MasterBookListing}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.showMasterBookTransactionDetail,
          true
        )}
        Component={ShowTransactionDetail}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.masterBookTransactionDetail, true)}
        Component={MasterBookTransactionDetail}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.templateProgramAccountCodeListing)}
        Component={TemplateProgramAccountCodeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.voucherTemplateBodiesListing, true)}
        Component={VoucherTemplateBodiesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.financeInstallmentListing, true)}
        Component={InstallmemtListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createFinanceInstallment, true)}
        Component={CreateInstallments}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.installmentSlotListing, true)}
        Component={InstallmentSlotsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createInstallmentSlot, true)}
        Component={CreateInstallmentSlots}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.slotsInstallmentParticulars, true)}
        Component={SlotsParticular}
      />
    </Routes>
  );
};

export default FinanceRoutes;
