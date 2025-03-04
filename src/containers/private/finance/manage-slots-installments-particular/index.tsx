import { FC, Fragment, useEffect, useState } from "react";
import {
  SlotsParticularListingSection,
  SlotsParticularListingMain,
  SlotsParticularListingTop,
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
import EditTemplateBody from "./components/edit-particular-amount";
import AddParticularToSlot from "./components/add-particulars-to-slot";
import useUtils from "hooks/useUtils";
import useFinance from "../useHooks";
import { useSelector } from "react-redux";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { AccSlotInstallmentParticular } from "utils/helpers/models/finance/acc-slot-installment-particular.dto";
import DataNotFound from "components/particles/table/data-not-found";
interface VoucherTemplateHeadersListingProps { }

const SlotsParticular: FC<VoucherTemplateHeadersListingProps> = ({ }) => {
  const columns: string[] = ["Particular", "Amount", "Action"];
  const { handleSearchChange, handleTableSearch, getQueryParams } = useUtils();
  const { slot_id } = getQueryParams();
  const { getAccSlotInstallmentParticulars, deleteAccSlotInstallmentParticular } = useFinance();
  const [data, setData] = useState<AccSlotInstallmentParticular[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [slotToEdit, setSlotToEdit] = useState<AccSlotInstallmentParticular>(new AccSlotInstallmentParticular());
  const [search, setSearch] = useState<string>("");
  const [openAddParticularToChallan, setOpenAddParticularChallan] = useState<boolean>(false);
  const [openEditTemplateBody, setOpenEditTemplateBody] = useState<boolean>(false);

  useEffect(() => {
    if (!openAddParticularToChallan) {
      getAllAccSlotInstallmentParticulars(pagination.page, search);
    }
  }, [openAddParticularToChallan]);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
        slot_id
      };
      deleteAccSlotInstallmentParticular(id, setData, queryParams, setPagination);
    }
  };

  const openEditSlotDialog = (slotParticular: AccSlotInstallmentParticular) => {
    setSlotToEdit(slotParticular);
    setOpenEditTemplateBody(true);
  }

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllAccSlotInstallmentParticulars(page + 1, search);
  };
  const getAllAccSlotInstallmentParticulars = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      slot_id
    };
    getAccSlotInstallmentParticulars(setData, queryParams, setPagination);
  };

  return (
    <SlotsParticularListingMain>
      <SlotsParticularListingTop>
        <div className="left">
          <span className="page-heading">
            Manage Slots Installment Particular
          </span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-fine-slot-btn">
            <button
              className="lg-rounded-btn"
              onClick={() => setOpenAddParticularChallan(true)}
            >
              + Add Voucher Particular
            </button>
          </div>
        </div>
      </SlotsParticularListingTop>

      <SlotsParticularListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllAccSlotInstallmentParticulars)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllAccSlotInstallmentParticulars)}
            />
          </div>
        </div>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {columns.map((column: string, index: number) => {
                  return <th key={index}>{column}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((slotParticular, index) => {
                return <tr key={index}>
                  <td>{slotParticular.particular.title}</td>
                  <td>{slotParticular.amount}</td>

                  <td>
                    <div className="table-action-icons">
                      <div
                        className="action-icon"
                        onClick={() => openEditSlotDialog(slotParticular)}
                      >
                        <EditTableSvg />
                      </div>

                      <div className="action-icon" onClick={() => handleDelete(slotParticular.id)}>
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
        {openAddParticularToChallan ? (
          <AddParticularToSlot setOpen={setOpenAddParticularChallan} />
        ) : (
          ""
        )}
        {openEditTemplateBody ? (
          <EditTemplateBody setOpen={setOpenEditTemplateBody} particularSlot={slotToEdit} particularSlots={data} setParticularSlots={setData} />
        ) : (
          ""
        )}
      </SlotsParticularListingSection>
    </SlotsParticularListingMain>
  );
};

export default SlotsParticular;
