import { FC, Fragment, useEffect, useState } from "react";
import {
  LeavesLedgerListingSection,
  LeavesLedgerListingMain,
  LeavesLedgerListingTop,
} from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { DarkEyeSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
// import useFinance from "../../useHooks";
import { BankInfoDTO } from "utils/helpers/models/finance/bank-info.dto";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";

interface LeavesLedgerListingProps {}

const LeavesLedgerListing: FC<LeavesLedgerListingProps> = ({}) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
    // {title: 'Leaves Ledger', path: siteRoutes.hrManagementLeavesLedgerListing},
  ];
  const navigate = useNavigate();
  //   const { getBankInfos, deleteBankInfo } = useFinance();
  const [data, setData] = useState<BankInfoDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");
  const columns: string[] = [
    "Bank Title",
    "Account Number",
    "Account Title",
    "FTN",
    "Action",
  ];

  const tab1Columns: string[] = ["Name", "Time Taken", "Total Days", "Action"];
  const tab2Columns: string[] = [
    "From Date",
    "To Date",
    "Total Days",
    "Paid Status",
    "Remarks",
    "Action",
  ];

  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch } = useUtils();

  useEffect(() => {
    getAllBankInfos(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      //   deleteBankInfo(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllBankInfos(page + 1, search);
  };
  const getAllBankInfos = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    // getBankInfos(setData, queryParams, setPagination);
  };

  const goToEditBankInfo = (id: number) => {
    navigate(`${siteRoutes.createBank}?id=${id}`);
  };
  return (
    <LeavesLedgerListingMain>
      <LeavesLedgerListingTop>
        <div className="left">
          <span className="page-heading">Leaves Ledger</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </LeavesLedgerListingTop>

      <LeavesLedgerListingSection className="content-radius-shadow">
        <div className="table-info">
          <div className="heading">
            <span>Habib bin Munir - Network Administrator | BPS-17</span>
          </div>
        </div>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {tab1Columns.map((column: string, index: number) => {
                  return <th key={index}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {[1, 1, 1, 1, 1, 1].map((bank, index) => {
                return (
                  <tr key={index}>
                    <td>Paternity Leaves</td>
                    <td>20</td>
                    <td>26</td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <DarkEyeSvg />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          {/* <DataNotFound show={!isLoading && !data.length} /> */}
          <Pagination {...pagination} onPageChange={onPageChange} />
        </Fragment>
      </LeavesLedgerListingSection>
      <LeavesLedgerListingSection className="content-radius-shadow">
        <div className="table-info">
          <div className="heading">
            <span>Casual Leave Details</span>
          </div>
        </div>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {tab2Columns.map((column: string, index: number) => {
                  return <th key={index}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {[1, 1, 1, 1, 1, 1].map((bank, index) => {
                return (
                  <tr key={index}>
                    <td>2024-05-09</td>
                    <td>2024-05-09</td>
                    <td>20</td>
                    <td>Paid</td>
                    <td>
                      <div className="mw-150">
                        Due to Some Urgent Work At home so i am unable to attend
                        the office today. Thanks and regards
                      </div>
                    </td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <DarkEyeSvg />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          {/* <DataNotFound show={!isLoading && !data.length} /> */}
          <Pagination {...pagination} onPageChange={onPageChange} />
        </Fragment>
      </LeavesLedgerListingSection>
    </LeavesLedgerListingMain>
  );
};

export default LeavesLedgerListing;
