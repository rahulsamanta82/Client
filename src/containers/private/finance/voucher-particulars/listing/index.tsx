import { FC, Fragment, useEffect, useState } from "react";
import {
  VoucherParticularListingSection,
  VoucherParticularListingMain,
  VoucherParticularListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useFinance from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { VoucherParticularDTO } from "utils/helpers/models/finance/voucher-particular.dto";
import useUtils from "hooks/useUtils";

interface VoucherParticularsListingProps {}

const VoucherParticularsListing: FC<VoucherParticularsListingProps> = ({}) => {
  const navigate = useNavigate();
  const { getVoucherParticulars, deleteVoucherParticular } = useFinance();
  const [data, setData] = useState<VoucherParticularDTO[]>([]);
  const { handleSearchChange, handleTableSearch } = useUtils();
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");
  const columns: string[] = ["Title", "Amount", "Action"];

  const { hasAccess } = useStore();

  useEffect(() => {
    getAllVoucherParticulars(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteVoucherParticular(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllVoucherParticulars(page + 1, search);
  };
  const getAllVoucherParticulars = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getVoucherParticulars(setData, queryParams, setPagination);
  };

  const goToEditVoucherParticular = (id: number) => {
    navigate(`${siteRoutes.createVoucherParticular}?id=${id}`);
  };

  const goToCreateVoucherParticular = () => {
    navigate(siteRoutes.createVoucherParticular);
  };
  return (
    <VoucherParticularListingMain>
      <VoucherParticularListingTop>
        <div className="left">
          <span className="page-heading">Voucher Particulars</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createVoucherParticular) && (
            <div className="create-fine-slot-btn">
              <button
                className="lg-rounded-btn"
                onClick={goToCreateVoucherParticular}
              >
                + Add Voucher Particulars
              </button>
            </div>
          )}
        </div>
      </VoucherParticularListingTop>

      <VoucherParticularListingSection className="content-radius-shadow">
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
            <input type="search" placeholder="Search" />
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
              {data.map((voucherParticular, index) => {
                return (
                  <tr key={index}>
                    <td>{voucherParticular.title}</td>
                    <td>{voucherParticular.amount}</td>
                    <td>
                      {/* <div className="table-action-icons">
                                            <div className="action-icon">
                                                <EditTableSvg/>
                                            </div>
                                            <div className="action-icon">
                                                <DeleteTableSvg/>
                                            </div>
                                        </div> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </VoucherParticularListingSection>
    </VoucherParticularListingMain>
  );
};

export default VoucherParticularsListing;
