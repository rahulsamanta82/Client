import { FC, Fragment, useEffect, useState } from "react";
import {
  InstallmentSlotsListingSection,
  InstallmentSlotsListingMain,
  InstallmentSlotsListingTop,
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
import { AccInstallmentSlotDTO } from "utils/helpers/models/finance/acc-installment-slot.dto";
import { useSelector } from "react-redux";
import useFinance from "../../useHooks";
import useUtils from "hooks/useUtils";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
interface VoucherTemplateHeadersListingProps { }

const InstallmentSlotsListing: FC<
  VoucherTemplateHeadersListingProps
> = ({ }) => {
  const columns: string[] = [
    "Slot No.",
    "Due Date",
    "Percentage",
    "Action",
  ];
  const { handleSearchChange, handleTableSearch, getQueryParams } = useUtils();
  const { installment_id } = getQueryParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const { getAccInstallmentSlots, deleteAccInstallmentSlot } = useFinance();
  const [data, setData] = useState<AccInstallmentSlotDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });

  useEffect(() => {
    getAllAccInstallmentSlots(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
        installment_id
      };
      deleteAccInstallmentSlot(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllAccInstallmentSlots(page + 1, search);
  };
  const getAllAccInstallmentSlots = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      installment_id
    };
    getAccInstallmentSlots(setData, queryParams, setPagination);
  };

  const goToAddInstallmentSlots = () => {
    navigate(`${siteRoutes.createInstallmentSlot}?installment_id=${installment_id}`);
  };
  const goToEditSlot = (slotId: number) => {
    navigate(`${siteRoutes.createInstallmentSlot}?installment_id=${installment_id}&id=${slotId}`);
  };
  const goToParticulars = (slotId: number) => {
    navigate(`${siteRoutes.slotsInstallmentParticulars}?slot_id=${slotId}`);
  };


  return (
    <InstallmentSlotsListingMain>
      <InstallmentSlotsListingTop>
        <div className="left">
          <span className="page-heading">Installment Slots</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div
            className="create-fine-slot-btn"
            onClick={goToAddInstallmentSlots}
          >
            <button className="lg-rounded-btn">+ Add Installment Slot</button>
          </div>
        </div>
      </InstallmentSlotsListingTop>

      <InstallmentSlotsListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllAccInstallmentSlots)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllAccInstallmentSlots)}
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
              {data.map((installmentSlot, index) => {
                return <tr key={index}>
                  <td>{installmentSlot.slot_no}</td>
                  <td>{installmentSlot.due_date}</td>
                  <td>{installmentSlot.percentage}</td>

                  <td>
                    <div className="table-action-icons">
                      <div className="action-icon" onClick={() => goToEditSlot(installmentSlot.id)}>
                        <EditTableSvg />
                      </div>
                      <div className="action-button">
                        <button className="black-btn" onClick={() => goToParticulars(installmentSlot.id)}>
                          Manage Particulars
                        </button>
                      </div>
                      <div className="action-icon" onClick={() => handleDelete(installmentSlot.id)}>
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
          <DataNotFound show={!isLoading && !data.length} />
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </InstallmentSlotsListingSection>
    </InstallmentSlotsListingMain>
  );
};

export default InstallmentSlotsListing;
