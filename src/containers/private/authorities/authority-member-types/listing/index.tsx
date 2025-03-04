import { FC, Fragment, useEffect, useState } from "react";
import {
  AuthorityTypeListingMain,
  AuthorityTypeListingSection,
  AuthorityTypeListingTop,
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
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useAuthorities from "../../useHooks";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useUtils from "hooks/useUtils";
import useStore from "hooks/useStore";
import useAlert from "hooks/useAlert";

const AuthorityMemberTypeListing: FC = () => {
  const { getCommitteeTypes, deleteCommitteeMemberTypeById } = useAuthorities();
  const [search, setSearch] = useState<string>('');
  const { hasAccess } = useStore();
  const { confirmationPopup } = useAlert();
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });

  const [data, setData] = useState<any[]>([]);

  const columns: string[] = ["Name", "Action"];

  const navigate = useNavigate();
  const goToCreateQuotaList = () => {
    navigate(siteRoutes.createQuotasAdmissionList);
  };
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllCommitteeTypes(page + 1, search);
  };
  const { handleSearchChange, handleTableSearch } = useUtils();

  useEffect(() => {
    getAllCommitteeTypes(pagination.page, search);
  }, []);

  const getAllCommitteeTypes = (page: number, search: string) => {
    const queryParams: any = {
      per_page: pagination.per_page,
      page,
      search,
      type: 'member_type'
    };
    getCommitteeTypes(setData, queryParams, setPagination);
  };

  const goToCreateTypes = () => {
    navigate(siteRoutes.createAuthorityMemberType);
  };

  const goToUpdateType = (userId: number) => {
    navigate(
      `${siteRoutes.createAuthorityMemberType}?id=${userId}`
    );
  };

  const handleDelete = async (id: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      deleteCommitteeMemberTypeById(id, setData, pagination, setPagination);
    }
  };



  return (
    <AuthorityTypeListingMain>
      <AuthorityTypeListingTop>
        <div className="left">
          <span className="page-heading">
            Authority & Committee Member Types
          </span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn" onClick={goToCreateTypes}>
              + Add New
            </button>
          </div>
        </div>
      </AuthorityTypeListingTop>
      <AuthorityTypeListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllCommitteeTypes)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllCommitteeTypes)}
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
              {data.map((item: any, index: number) => {
                return (
                  <tr>
                    <td>
                      <div>{item?.title}</div>
                    </td>

                    <td>
                      <div className="table-action-icons mw-150">
                        {hasAccess(
                          sitePermissions.EditAuthorityMemberType
                        ) && (
                            <div className="action-icon"
                              onClick={() => goToUpdateType(item?.id)}
                            >
                              <EditTableSvg />
                            </div>
                          )}
                           {hasAccess(sitePermissions.DeleteAuthorityMemberType) && (
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
          {/* <DataNotFound show={!isLoading && !data.length} /> */}
          <Pagination
            onPageChange={onPageChange}
            {...pagination}
          />
        </Fragment>
      </AuthorityTypeListingSection>
    </AuthorityTypeListingMain>
  );
};

export default AuthorityMemberTypeListing;
