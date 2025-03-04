import { FC, Fragment, useEffect } from "react";
import {
  LinkedSpecializationListingSection,
  LinkedSpecializationListingMain,
  LinkedSpecializationListingTop,
} from "./style";
import { useState } from "react";
import {
  DeleteTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumb from "components/particles/breadcrumb";
import CreateLinkedSpecialization from "./components/create-linked-specialization";
import useOrganization from "containers/private/organization/useHooks";
import { useSelector } from "react-redux";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

const LinkedSpecializationListing: FC = () => {
  const columns: string[] = ["", "Titles", "Action"];

  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { hasAccess } = useStore();
  const [openSpecializeModal, setOpenSpecializeModal] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { getLinkSpecializations, deleteLinkSpecialization } =
    useOrganization();
  const { state: program } = useLocation();
  const { handleSearchChange, handleTableSearch } = useUtils();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllSpecializeLinks(page + 1, search, params?.id);
  };
  const handleOpenSpecializeModal = () => {
    setOpenSpecializeModal(true);
  };

  const { getQueryParams } = useUtils();

  const params = getQueryParams();

  const getAllSpecializeLinks = (page: number, search: string, id: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      admission_session_id: params?.admission_session_id,
    };
    getLinkSpecializations(setData, queryParams, setPagination);
  };

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
        admission_session_id: params?.admission_session_id,
      };
      deleteLinkSpecialization(id, setData, queryParams, setPagination);
    }
  };

  useEffect(() => {
    if (openSpecializeModal === false) {
      getAllSpecializeLinks(
        pagination.page,
        search,
        params?.admission_session_id
      );
    }
  }, [openSpecializeModal]);

  return (
    <LinkedSpecializationListingMain>
      <LinkedSpecializationListingTop>
        <div className="left">
          <span className="page-heading">{program?.title}</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createLinkedSpecialization) && (
            <div className="create-org-btn">
              <button
                className="lg-rounded-btn"
                onClick={handleOpenSpecializeModal}
              >
                + New
              </button>
            </div>
          )}
        </div>
      </LinkedSpecializationListingTop>

      <LinkedSpecializationListingSection className="content-radius-shadow">
        <div className="flex">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.downloadLinkedSpecializationPDF) && (
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}

            {hasAccess(sitePermissions.downloadLinkedSpecializationExcel) && (
              <div className="export-btn">
                <span>
                  <ExcelSvg className="icon" />
                </span>
                <span className="text">Excel</span>
              </div>
            )}
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
                handleSearchChange(e, setSearch, getAllSpecializeLinks)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllSpecializeLinks)}
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
              {data?.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <div>
                        <input type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div className="">{item?.specialization?.title}</div>
                    </td>
                    <td>
                      <div className="table-action-icons">
                        {hasAccess(
                          sitePermissions.deleteLinkedSpecialization
                        ) && (
                          <div
                            className="action-icon"
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteTableSvg />
                          </div>
                        )}
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
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </LinkedSpecializationListingSection>

      {openSpecializeModal && (
        <CreateLinkedSpecialization
          setOpen={setOpenSpecializeModal}
          admission_session_id={params?.admission_session_id}
        />
      )}
    </LinkedSpecializationListingMain>
  );
};

export default LinkedSpecializationListing;
