import { FC, Fragment, useEffect, useState } from "react";
import {
  AuthorotiesListingMain,
  AuthorotiesListingSection,
  AuthorotiesListingTop,
} from "./style";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  AddProgramTableSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useAuthorities from "../../useHooks";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useStore from "hooks/useStore";

import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

const AuthorotiesListing: FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { hasAccess } = useStore();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const { getAuthorities, deleteAuthorityById} = useAuthorities();
  const { handleTableSearch, handleSearchChange } = useUtils();

  const columns: string[] = [
    "Name",
    "Type",
    "Fuculty",
    "Department",
    "Total Members",
    "Total Notification",
    "Total Meetings",
    "Action",
  ];

  const navigate = useNavigate();

  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllAuthorities(page + 1, search);
  };

  useEffect(() => {
    getAllAuthorities(pagination.page, search);
  }, []);

  const getAllAuthorities = (page: number, search: string) => {
    const queryParams: any = {
      per_page: pagination.per_page,
      page,
      search,
      type: 'auth_com_type'
    };
    getAuthorities(setData, queryParams, setPagination);
  };


  const handleDelete = async (id: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      deleteAuthorityById(id, setData, pagination, setPagination);
    }
  };

  const goToCreateAuthorities = () => {
    navigate(siteRoutes.createAuthorities);
  };
  const goToViewMembers = (authorityId: number) => {
    navigate(
      `${siteRoutes.viewMembers}?id=${authorityId}`
    );
  };
  const goToViewDocuments = (authorityId: number) => {
    navigate(
      `${siteRoutes.viewDocuments}?id=${authorityId}`
    );
  };
  const goToViewNotifications = (authorityId: number) => {
    navigate(
      `${siteRoutes.councilNotificationsListing}?id=${authorityId}`
    );
  };

  const goToViewMeetings = (authorityId: number) => {
    navigate(
      `${siteRoutes.senateMeetingList}?id=${authorityId}`
    );
  };

  const goToUpdateAuthority  = (authorityId: number) => {
    navigate(
      `${siteRoutes.createAuthorities}?id=${authorityId}`
    );
  };

  return (
    <AuthorotiesListingMain>
      <AuthorotiesListingTop>
        <div className="left">
          <span className="page-heading">Authorities & Committees</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn" onClick={goToCreateAuthorities}>
              + Add New
            </button>
          </div>
        </div>
      </AuthorotiesListingTop>
      <AuthorotiesListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllAuthorities)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllAuthorities)}
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
                      <div>{item?.name}</div>
                    </td>
                    <td>
                      <div>{item?.type?.title}</div>
                    </td>
                    <td>{item?.faculty?.title}</td>
                    <td>{item?.department?.title}</td>
                    <td>{(item?.internal_members_count ?? 0) + (item?.external_members_count ?? 0)}</td>
                    <td>{item?.authority_notifications_count}</td>
                    <td>{item?.authority_meetings_count}</td>

                    <td className="mw-120">
                      <div className="table-action-icons mw-150">
                      {hasAccess(
                          sitePermissions.viewDocuments
                        ) && (
                        <div className="action-button">
                          <button
                            className="criteria-btn"
                            onClick={() => goToViewDocuments(item?.id)}
                          >
                            View Document
                          </button>
                        </div>
                      )}
                        {hasAccess(
                          sitePermissions.viewMembers
                        ) && (
                            <div className="action-button">
                              {/* <button className="seats-btn" > */}
                              <button className="seats-btn" onClick={() => goToViewMembers(item?.id)}>
                                View Members
                              </button>
                            </div>
                          )}
                           {hasAccess(
                          sitePermissions.senateMeetingList
                        ) && (
                        <div className="action-button">
                          <button className="entry-test-btn" onClick={() => goToViewMeetings(item?.id)}>Meetings</button>
                        </div>
                         )}
                        <br />
                        {hasAccess(
                          sitePermissions.councilNotificationsListing
                        ) && (
                            <div className="action-button">
                              <button className="special-btn" onClick={() => goToViewNotifications(item?.id)}>
                                Sent Notifications
                              </button>
                            </div>
                          )}
                        {hasAccess(
                          sitePermissions.editAuthority
                        ) && (
                            <div className="action-icon" title="mr shayan" onClick={() => goToUpdateAuthority(item?.id)}>
                              <EditTableSvg />
                            </div>
                          )}
                        {hasAccess(
                          sitePermissions.deleteAuthority
                        ) && (
                            <div className="action-icon" title="mr shayan" onClick={() => handleDelete(item.id)}>
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
          <Pagination {...pagination} onPageChange={onPageChange} />
        </Fragment>
      </AuthorotiesListingSection>
    </AuthorotiesListingMain>
  );
};

export default AuthorotiesListing;
