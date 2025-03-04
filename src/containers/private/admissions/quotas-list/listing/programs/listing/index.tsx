import { FC, Fragment, useEffect, useState } from "react";
import {
  QoutasProgramListMain,
  QoutasProgramListSection,
  QoutasProgramListTop,
} from "./style";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import Pagination from "components/particles/table/pagination";
import CreateQoutaListProgram from "../create";
import { useLocation } from "react-router-dom";
import useAdmissions from "containers/private/admissions/useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import EditQoutaListProgram from "../edit";

const QoutasProgramList: FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  const columns: string[] = [
    "Program",
    "Quota Seats",
    "Accounts Code",
    "Action",
  ];

  const {
    state: { quota },
  } = useLocation();
  const { getQuotaProgramLinks, deleteQuotaProgramLink } = useAdmissions();
  const { handleSearchChange, handleTableSearch } = useUtils();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [headerId, setHeaderId] = useState<number>(0);

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenEditModal = (headerId: number) => {
    setOpenEditModal(true);
    setHeaderId(headerId);
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllQuotaProgramLinks(page + 1, search);
  };
  const getAllQuotaProgramLinks = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      quota_id: quota?.id,
    };

    getQuotaProgramLinks(setData, queryParams, setPagination);
  };

  useEffect(() => {
    if (!openModal) {
      getAllQuotaProgramLinks(pagination.page, search);
    }
  }, [openModal]);

  useEffect(() => {
    if (!openEditModal) getAllQuotaProgramLinks(pagination.page, search);
  }, [openEditModal]);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
        quota_id: quota?.id,
      };

      deleteQuotaProgramLink(id, setData, queryParams, setPagination);
    }
  };
  console.log(data);

  return (
    <QoutasProgramListMain>
      <QoutasProgramListTop>
        <div className="left">
          <span className="page-heading">{quota?.title}</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn" onClick={handleOpenModal}>
              + Add New
            </button>
          </div>
        </div>
      </QoutasProgramListTop>
      <QoutasProgramListSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllQuotaProgramLinks)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllQuotaProgramLinks)}
            />
          </div>
        </div>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {columns.map((column: string, index: number) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr key={index}>
                  <td>
                    <div className="mw-150">
                      {item?.admission_session?.program?.title}
                    </div>
                  </td>
                  <td>
                    <div className="mw-150">
                      {item?.quota_seats ? item.quota_seats : "-"}
                    </div>
                  </td>
                  <td>{item?.acc_voucher_id ? item.acc_voucher_id : "-"}</td>
                  <td>
                    <div className="table-action-icons">
                      <div
                        className="action-icon "
                        onClick={() => handleOpenEditModal(item.id)}
                      >
                        <EditTableSvg />
                      </div>
                      <div
                        className="action-icon"
                        onClick={() => handleDelete(item?.id)}
                      >
                        <DeleteTableSvg />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Fragment>
          <DataNotFound show={!isLoading && !data.length} />
          <Pagination {...pagination} onPageChange={onPageChange} />
        </Fragment>
      </QoutasProgramListSection>
      {openModal && <CreateQoutaListProgram setOpen={setOpenModal} />}
      {openEditModal && (
        <EditQoutaListProgram
          setOpenEditModal={setOpenEditModal}
          headerId={headerId}
        />
      )}
    </QoutasProgramListMain>
  );
};

export default QoutasProgramList;
