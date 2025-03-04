import { FC, Fragment, useEffect, useState } from "react";
import {
  VoucherTemplateHeadersListingSection,
  VoucherTemplateHeadersListingMain,
  VoucherTemplateHeadersListingTop,
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
import { VoucherTemplateHeaderDTO } from "utils/helpers/models/finance/voucher-template-header.dto";
import useUtils from "hooks/useUtils";
import { confirmationPopup } from "utils/helpers/common/alert-service";

interface VoucherTemplateHeadersListingProps { }

const VoucherTemplateHeadersListing: FC<
  VoucherTemplateHeadersListingProps
> = ({ }) => {
  const navigate = useNavigate();
  const columns: string[] = ["Template", "Voucher Type", "Bank", "Action"];

  const { hasAccess } = useStore();

  const goToCreateVoucherTemplateHeader = () => {
    navigate(siteRoutes.createVoucherTemplateHeader);
  };

  const { getVoucherTemplateHeaders, deleteVoucherTemplateHeader } =
    useFinance();
  const [data, setData] = useState<VoucherTemplateHeaderDTO[]>([]);
  const { handleSearchChange, handleTableSearch } = useUtils();
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getAllVoucherTemplateHeaders(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteVoucherTemplateHeader(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllVoucherTemplateHeaders(page + 1, search);
  };
  const getAllVoucherTemplateHeaders = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getVoucherTemplateHeaders(setData, queryParams, setPagination);
  };

  const goToEditVoucherTemplateHeader = (id: number) => {
    navigate(`${siteRoutes.createVoucherTemplateHeader}?id=${id}`);
  };
  const goToTemplateBodiesListing = (header_id: number) => {
    navigate(`${siteRoutes.voucherTemplateBodiesListing}?header_id=${header_id}`);
  };
  const goToInstallments = (headerId: number) => {
    navigate(`${siteRoutes.financeInstallmentListing}?template_header_id=${headerId}`);
  };
  return (
    <VoucherTemplateHeadersListingMain>
      <VoucherTemplateHeadersListingTop>
        <div className="left">
          <span className="page-heading">Voucher Template Header</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createFineSlot) && (
            <div className="create-fine-slot-btn">
              <button
                className="lg-rounded-btn"
                onClick={goToCreateVoucherTemplateHeader}
              >
                + Add Template Header
              </button>
            </div>
          )}
        </div>
      </VoucherTemplateHeadersListingTop>

      <VoucherTemplateHeadersListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllVoucherTemplateHeaders)
              }
              onKeyUp={(e) =>
                handleTableSearch(e, getAllVoucherTemplateHeaders)
              }
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
              {data.map((templateHeader, index) => {
                return (
                  <tr key={index}>
                    <td>{templateHeader.title}</td>
                    <td>{templateHeader.voucher_type.title}</td>
                    <td>First Women Bank Ltd.HBL.Bank Alfala</td>
                    <td>
                      <div className="table-action-icons">
                        <div
                          className="action-icon"
                          onClick={() =>
                            goToEditVoucherTemplateHeader(templateHeader.id)
                          }
                        >
                          <EditTableSvg />
                        </div>
                        <div className="action-button">
                          <button
                            className="black-btn"
                            onClick={() => goToTemplateBodiesListing(templateHeader.id)}
                          >
                            Template Body
                          </button>
                        </div>
                        <div className="action-button">
                          <button
                            className="gray-btn"
                            onClick={() => goToInstallments(templateHeader.id)}
                          >
                            Installments
                          </button>
                        </div>
                        <div
                          className="action-icon"
                          onClick={() => handleDelete(templateHeader.id)}
                        >
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
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </VoucherTemplateHeadersListingSection>
    </VoucherTemplateHeadersListingMain>
  );
};

export default VoucherTemplateHeadersListing;
