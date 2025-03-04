import { FC, Fragment, useEffect, useState } from "react";
import {
  VoucherTemplateBodiesListingSection,
  VoucherTemplateBodiesListingMain,
  VoucherTemplateBodiesListingTop,
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
import AddParticularToChallan from "./components/add-particulars-to-challan";
import EditTemplateBody from "./components/edit-template-body";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { VoucherTemplateBodyDTO } from "utils/helpers/models/finance/voucher-template-body.dto";
import useFinance from "../../useHooks";
import useUtils from "hooks/useUtils";
interface VoucherTemplateHeadersListingProps { }

const VoucherTemplateBodiesListing: FC<
  VoucherTemplateHeadersListingProps
> = ({ }) => {
  const columns: string[] = ["Particular", "Amount", "Action"];
  const [search, setSearch] = useState<string>('');
  const { getQueryParams } = useUtils();
  const { header_id } = getQueryParams() || {};
  const [data, setData] = useState<VoucherTemplateBodyDTO[]>([]);
  const [templateBodyToEdit, setTemplateBodyToEdit] = useState<VoucherTemplateBodyDTO>(new VoucherTemplateBodyDTO());
  const { getVoucherTemplateBodies, deleteVoucherTemplateBody } = useFinance();
  const { handleSearchChange, handleTableSearch } = useUtils();

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [openAddTemplateBody, setOpenAddTemplateBody] = useState<boolean>(false);
  const [openEditTemplateBody, setOpenEditTemplateBody] = useState<boolean>(false);


  useEffect(() => {
    if(!openAddTemplateBody){
      getAllVoucherTemplateBodies(pagination.page, search);
    }
  }, [openAddTemplateBody]);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteVoucherTemplateBody(id, setData, queryParams, setPagination);
    }
  };

  const openEditTemplateBodyDialog = (templateBody: VoucherTemplateBodyDTO) => {
    setTemplateBodyToEdit({...templateBody, header_id });
    setOpenEditTemplateBody(true);
  }

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllVoucherTemplateBodies(page + 1, search);
  };
  const getAllVoucherTemplateBodies = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      header_id
    };
    getVoucherTemplateBodies(setData, queryParams, setPagination);
  };

  return (
    <VoucherTemplateBodiesListingMain>
      <VoucherTemplateBodiesListingTop>
        <div className="left">
          <span className="page-heading">Voucher Template Body</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-fine-slot-btn">
            <button
              className="lg-rounded-btn"
              onClick={() => setOpenAddTemplateBody(true)}
            >
              + Link Voucher Particular
            </button>
          </div>
        </div>
      </VoucherTemplateBodiesListingTop>

      <VoucherTemplateBodiesListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllVoucherTemplateBodies)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllVoucherTemplateBodies)}
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
              {data.map((templateBody, index) => {
                return <tr key={index}>
                  <td>{templateBody.voucher_particular.title}</td>
                  <td>{templateBody.amount}</td>

                  <td>
                    <div className="table-action-icons">
                      <div
                        className="action-icon"
                        onClick={() => openEditTemplateBodyDialog(templateBody)}
                      >
                        <EditTableSvg />
                      </div>

                      <div className="action-icon" onClick={() => handleDelete(templateBody.id)}>
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
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
        {openAddTemplateBody ? (
          <AddParticularToChallan setOpen={setOpenAddTemplateBody} />
        ) : (
          ""
        )}
        {openEditTemplateBody ? (
          <EditTemplateBody setOpen={setOpenEditTemplateBody} templateBody={templateBodyToEdit} voucherTemplateBodies={data} setVoucherTemplateBodies={setData}/>
        ) : (
          ""
        )}
      </VoucherTemplateBodiesListingSection>
    </VoucherTemplateBodiesListingMain>
  );
};

export default VoucherTemplateBodiesListing;
