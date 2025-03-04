import { FC, Fragment, useEffect, useState } from "react";
import {
  InstallmemtListingSection,
  InstallmemtListingMain,
  InstallmemtListingTop,
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
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useFinance from "../../useHooks";
import { useSelector } from "react-redux";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { AccInstallmentDTO } from "utils/helpers/models/finance/acc-installment.dto";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
interface VoucherTemplateHeadersListingProps { }

const InstallmemtListing: FC<VoucherTemplateHeadersListingProps> = ({ }) => {
  const columns: string[] = ["Title", "Show Percentage", "Action"];
  const { handleSearchChange, handleTableSearch, getQueryParams } = useUtils();
  const {template_header_id} = getQueryParams();
  const navigate = useNavigate();
  const { getAccInstallments, deleteAccInstallment, updateAccInstallment } = useFinance();
  const [data, setData] = useState<AccInstallmentDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");
  const goToAddInstallments = () => {
    navigate(`${siteRoutes.createFinanceInstallment}?template_header_id=${template_header_id}`);
  };
  const goToSlots = (installmentId: number) => {
    navigate(`${siteRoutes.installmentSlotListing}?installment_id=${installmentId}`);
  };

  useEffect(() => {
    getAllAccInstallments(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
        template_header_id
      };
      deleteAccInstallment(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllAccInstallments(page + 1, search);
  };
  const getAllAccInstallments = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      template_header_id
    };
    getAccInstallments(setData, queryParams, setPagination);
  };

  const handleEditShowPercentage = (installment: AccInstallmentDTO, index: number) => {
    const { id } = installment;
    data[index] = installment;
    setData([...data]);
    updateAccInstallment(id, installment);
  }

  const goToEditInstallment = (id: number) => {
    // navigate(`${siteRoutes.createAccInstallment}?id=${id}`);
  }
  return (
    <InstallmemtListingMain>
      <InstallmemtListingTop>
        <div className="left">
          <span className="page-heading">Installments</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-fine-slot-btn" onClick={goToAddInstallments}>
            <button className="lg-rounded-btn">+ Add Installment</button>
          </div>
        </div>
      </InstallmemtListingTop>

      <InstallmemtListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllAccInstallments)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllAccInstallments)}
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
              {data.map((installment, index) => {
                return <tr key={index}>
                  <td>{installment.title}</td>
                  <td>
                    <div className="table-radio-field">
                      <div className="radio">
                        <label htmlFor="show_percentage_no">No</label>
                        <input id="show_percentage_yes" type="radio" name="show_percentage" checked={installment.show_percentage == 0} onChange={() => handleEditShowPercentage({...installment, show_percentage: 0}, index)}/>
                      </div>
                      <div className="radio">
                        <label htmlFor="show_percentage_yes">Yes</label>
                        <input id="show_percentage_yes" type="radio" name="show_percantage" checked={installment.show_percentage == 1} onChange={() => handleEditShowPercentage({...installment, show_percentage: 1}, index)}/>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="table-action-icons">
                      <div className="action-icon" onClick={() => goToEditInstallment(installment.id)}>
                        <EditTableSvg />
                      </div>
                      <div className="action-button">
                        <button className="black-btn" onClick={() => goToSlots(installment.id)}>
                          Manage Slots
                        </button>
                      </div>
                      <div className="action-icon" onClick={() => handleDelete(installment.id)}>
                        <DeleteTableSvg />
                      </div>
                    </div>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <DataNotFound show={!isLoading && !data.length}/>
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </InstallmemtListingSection>
    </InstallmemtListingMain>
  );
};

export default InstallmemtListing;
