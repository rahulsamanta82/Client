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
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useAlert from "hooks/useAlert";

import useUtils from "hooks/useUtils";
import { AuthorityTypesDTO } from "utils/helpers/models/authorities/authorities-types.dto";

const AuthorityTypeListing: FC = () => {
  const { getCommitteeTypes, deleteCommitteeTypeById, updateCommitteeType } = useAuthorities();
  const [search, setSearch] = useState<string>('');
  const { hasAccess } = useStore();
  const { confirmationPopup } = useAlert();
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [data, setData] = useState<AuthorityTypesDTO[]>([]);
  const { handleSearchChange, handleTableSearch } = useUtils();

  const columns: string[] = ["Name", "Status", "Action"];

  const navigate = useNavigate();
  const { getQueryParams } = useUtils();
  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllCommitteeTypes(page + 1, search);
  };

  useEffect(() => {
    getAllCommitteeTypes(pagination.page, search);
  }, []);

  const getAllCommitteeTypes = (page: number, search: string) => {
    const queryParams: any = {
      per_page: pagination.per_page,
      page,
      search,
      type: 'auth_com_type'
    };
    getCommitteeTypes(setData, queryParams, setPagination);
  };

  const goToCreateTypes = () => {
    navigate(siteRoutes.createAuthorityType);
  };

  const goToUpdateType = (userId: number) => {
    navigate(
      `${siteRoutes.createAuthorityType}?id=${userId}`
    );
  };

  const handleDelete = async (id: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      deleteCommitteeTypeById(id, setData, pagination, setPagination);
    }
  };

  const handleUpdateStatus = (authorityType: AuthorityTypesDTO, index: number) => {
    data[index] = authorityType;
    setData([...data]);
    updateCommitteeType(authorityType.id, authorityType, false);
  }

  return (
    <AuthorityTypeListingMain>
      <AuthorityTypeListingTop>
        <div className="left">
          <span className="page-heading">Authority & Committee Types</span>
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
              {data.map((authorityType, index) => {
                return (
                  <tr>
                    <td>
                      <div>{authorityType?.title}</div>
                    </td>
                    <td>
                      <div className="table-radio-field">
                        <div className="radio">
                          <input
                            type="radio"
                            name={`status-${index}`}
                            checked={authorityType?.is_active == 1}
                            onChange={() => handleUpdateStatus({...authorityType, is_active: 1},index)} 
                          />
                          <label>Active</label>
                        </div>
                        <div className="radio">
                          <input
                            type="radio"
                            name={`status-${index}`}
                            checked={authorityType?.is_active == 0}
                            onChange={() => handleUpdateStatus({...authorityType, is_active: 0},index)}
                          />
                          <label>De-Active</label>
                        </div>
                      </div>
                    </td>


                    <td>
                      <div className="table-action-icons mw-150">
                      {hasAccess(
                          sitePermissions.EditAuthorityCommitteeType
                        ) && (
                            <div className="action-icon"
                              onClick={() => goToUpdateType(authorityType?.id)}
                            >
                              <EditTableSvg />
                            </div>
                          )}
                           {hasAccess(sitePermissions.DeleteAuthorityCommitteeType) && (
                        <div
                          className="action-icon"
                          onClick={() => handleDelete(authorityType.id)}
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

export default AuthorityTypeListing;
