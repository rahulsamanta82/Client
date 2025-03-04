import { FC, Fragment, useEffect, useState } from "react";
import {
  BanksListingSection,
  BanksListingMain,
  BanksListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useFinance from "../../useHooks";
import { BankInfoDTO } from "utils/helpers/models/finance/bank-info.dto";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";

interface BanksListingProps { }

const BanksListing: FC<BanksListingProps> = ({ }) => {
  const navigate = useNavigate();
  const { getBankInfos, deleteBankInfo } = useFinance();
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

  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch } = useUtils();

  const goToCreateBank = () => {
    navigate(siteRoutes.createBank);
  };

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
      deleteBankInfo(id, setData, queryParams, setPagination);
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
    getBankInfos(setData, queryParams, setPagination);
  };

  const goToEditBankInfo = (id: number) => {
    navigate(`${siteRoutes.createBank}?id=${id}`);
  }
  return (
    <BanksListingMain>
      <BanksListingTop>
        <div className="left">
          <span className="page-heading">Fine slots</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createBank) && (
            <div className="create-fine-slot-btn">
              <button className="lg-rounded-btn" onClick={goToCreateBank}>
                + Add Bank info
              </button>
            </div>
          )}
        </div>
      </BanksListingTop>

      <BanksListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
            <div className="export-btn">
              <span>
                <PdfSvg className="icon" />
              </span>
              <span className="text">PDF</span>
            </div>
            <div className="export-btn">
              <span>
                <ExcelSvg className="icon" />
              </span>
              <span className="text">Excel</span>
            </div>
          </div>
          <div className="table-search-field">
            <span className="search-icon">
              <SearchFieldSvg className="icon" />
            </span>
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) =>
                handleSearchChange(e, setSearch, getAllBankInfos)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllBankInfos)}
            />
          </div>
        </div>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {columns.map((column: string, index: number) => {
                  return <th key={index}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((bank, index) => {
                return (
                  <tr key={index}>
                    <td>{bank.bank}</td>
                    <td>{bank.account_no}</td>
                    <td>
                      {bank.account_title}
                    </td>
                    <td>{bank.ftn}</td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon" onClick={() => goToEditBankInfo(bank.id)}>
                          <EditTableSvg />
                        </div>
                        <div className="action-icon" onClick={() => handleDelete(bank.id)}>
                          <DeleteTableSvg />
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
          <DataNotFound show={!isLoading && !data.length} />
          <Pagination
            {...pagination}
            onPageChange={onPageChange}
          />
        </Fragment>
      </BanksListingSection>
    </BanksListingMain>
  );
};

export default BanksListing;
