import { FC, Fragment, useEffect, useState } from "react";
import {
  NotificationListingMain,
  NotificationListingSection,
  NotificationListingTop,
} from "./style";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  AddProgramTableSvg,
  DarkEyeSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup, warningToaster } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";
import useAuthorities from "../../useHooks";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useAlert from "hooks/useAlert";

const CouncilNotificationListing: FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const { hasAccess } = useStore();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const { getAcademicNotification, deleteAcademicNotificationById } = useAuthorities();
  const { handleTableSearch, handleSearchChange, concatPathWithBackendUrl } = useUtils();
  const columns: string[] = [
    "Date",
    "Subject",
    "Meeting",
    "Email To",
    "Created By",
    "Doccuments/Downloads",
    "Action",
  ];

  const navigate = useNavigate();

  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllAcademicNotifications(page + 1, search);
  };

  useEffect(() => {
    getAllAcademicNotifications(pagination.page, search);
  }, []);

  const getAllAcademicNotifications = (page: number, search: string) => {
    const queryParams: any = {
      per_page: pagination.per_page,
      page,
      search,
      authority_id: params.id
    };
    getAcademicNotification(setData, queryParams, setPagination);
  };

  const handleDelete = async (id: number, authority_id: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      deleteAcademicNotificationById(id, authority_id, setData, pagination, setPagination);
    }
  };

  const goToCreateNotifications = (authorityId: number) => {
    navigate(
      `${siteRoutes.createCouncilNotifications}?authority_id=${authorityId}`
    );
  };

  const goToUpdateNotifications = (userId: number) => {
    navigate(
      `${siteRoutes.createCouncilNotifications}?id=${userId}`
    );
  };

  const goToViewDocument = (path: string | null) => {
    if (path) {
      const concatenatedPath = concatPathWithBackendUrl(path);
      window.open(concatenatedPath, '_blank');
    } else {
      warningToaster("File doesn't exist or corrupted");
    }
  }

  return (
    <NotificationListingMain>
      <NotificationListingTop>
        <div className="left">
          <span className="page-heading">Academic Council Notifications</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button
              className="lg-rounded-btn"
              onClick={() => goToCreateNotifications(params.id)}

            >
              + Add New
            </button>
          </div>
        </div>
      </NotificationListingTop>
      <NotificationListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllAcademicNotifications)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllAcademicNotifications)}
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
                      <div>{item?.date}</div>
                    </td>
                    <td>
                      <div>{item?.subject}</div>
                    </td>
                    <td>{item?.meeting?.title}</td>
                    <td>
                      <div className="">
                        {item?.is_public === 1 ? "To All Accounts" : "Only Committee Members"}
                      </div>
                    </td>
                    <td>{item?.created_by}</td>
                    <td className="action-icon cp" onClick={() => goToViewDocument(item?.attachments)}>
                      <DarkEyeSvg />
                    </td>

                    <td className="mw-120">
                      <div className="table-action-icons mw-150">
                        {hasAccess(
                          sitePermissions.UpdateAuthorityNotification
                        ) && (
                            <div className="action-icon" title="mr shayan" onClick={() => goToUpdateNotifications(item?.id)}>
                              <EditTableSvg />
                            </div>
                          )}
                        {hasAccess(sitePermissions.DeleteAuthorityNotification) && (
                          <div className="action-icon" title="mr shayan" onClick={() => handleDelete(item.id, item.authority_id)}>
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
      </NotificationListingSection>
    </NotificationListingMain>
  );
};

export default CouncilNotificationListing;
