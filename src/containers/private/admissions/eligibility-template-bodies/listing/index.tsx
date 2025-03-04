import { FC, Fragment, useEffect, useState } from "react";
import {
  AdmissionETBListingMain,
  AdmissionETBListingTop,
  AdmissionETBListingSection,
} from "./style";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  RedCloseSvg,
  RoutesArrowWhiteSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useUtils from "hooks/useUtils";
import useAdmissions from "containers/private/admissions/useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface AdmissionETBListingProps {}

const AdmissionETBListing: FC<AdmissionETBListingProps> = () => {
  const [search, setSearch] = useState<any>("");
  const [data, setData] = useState<any[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { getQueryParams, handleSearchChange, handleTableSearch } = useUtils();
  const params = getQueryParams();
  const {
    getTemplateBodies,
    deleteTemplateBody,
    mergeTemplateBodies,
    removeTemplateBodiesGroup,
  } = useAdmissions();
  const { hasAccess } = useStore();

  const columns: string[] = [
    "",
    "Field",
    "Operator",
    "Value",
    "Combined Group",
    "OR Group",
    "Action",
  ];
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const handleDelete = async (id: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      const queryParams = {per_page: 'All'};
      deleteTemplateBody(id, params?.headerId, setData, queryParams);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllTemplateBodies(page + 1, search);
  };

  useEffect(() => {
    getAllTemplateBodies(pagination.page, search);
  }, []);

  const getAllTemplateBodies = (page: number, search: string) => {
    const queryParams = {
      ...pagination,
      page,
      search,
    };
    getTemplateBodies(params?.headerId, setData, queryParams);
  };

  const goToCreateTemplateBody = () => {
    const { title, headerId } = params;
    navigate(
      `${siteRoutes.createAdmissioneligibilityTemplateBody}?headerId=${headerId}&title=${title}`
    );
  };

  const goToEditTemplateBody = (bodyId: number) => {
    const { title, headerId } = params;
    navigate(
      `${siteRoutes.createAdmissioneligibilityTemplateBody}?headerId=${headerId}&title=${title}&bodyId=${bodyId}`
    );
  };

  const onSelectRecord = (id: number) => {
    if (selectedRecords.includes(id)) {
      const index = selectedRecords.indexOf(id);
      selectedRecords.splice(index, 1);
    } else {
      selectedRecords.push(id);
    }

    setSelectedRecords([...selectedRecords]);
  };

  const handleMergingGroup = async (record_type: string) => {
    const response = await confirmationPopup("Are you sure you want to merge?");
    if (response.isConfirmed) {
      const queryParams = { per_page: "All", page: "1" };
      mergeTemplateBodies(
        {
          record_type,
          record_ids: selectedRecords.join(","),
          group_number: "new",
        },
        params?.headerId,
        setData,
        queryParams
      );
      setSelectedRecords([...[]]);
    }
  };

  const handleRemoveGroup = async (record_type: string, templateBody: any) => {
    const response = await confirmationPopup(
      "Are you sure you want to remove the group?"
    );
    if (response.isConfirmed) {
      const queryParams = { per_page: "All", page: "1" };
      removeTemplateBodiesGroup(
        {
          record_type,
          record_id: templateBody[record_type],
        },
        params?.headerId,
        setData,
        queryParams
      );
    }
  };

  return (
    <AdmissionETBListingMain>
      <AdmissionETBListingTop>
        <div className="left">
          <span className="page-heading">
            {decodeURIComponent(params?.title)}
          </span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="download-buttons">
            {selectedRecords?.length ? (
              <Fragment>
                <div className="particular-button">
                  <button
                    className="lg-rounded-btn iconed black"
                    onClick={() => handleMergingGroup("or_group")}
                  >
                    <div className="icon">
                      <RoutesArrowWhiteSvg />
                    </div>
                    <span className="text">Merge OR group</span>
                  </button>
                </div>
                <div className="particular-button">
                  <button
                    className="lg-rounded-btn iconed black"
                    onClick={() => handleMergingGroup("combined_group")}
                  >
                    <div className="icon">
                      <RoutesArrowWhiteSvg />
                    </div>
                    <span className="text">Merge combined group</span>
                  </button>
                </div>
              </Fragment>
            ) : (
              ""
            )}
            <div className="particular-button">
              <button
                className="lg-rounded-btn"
                onClick={goToCreateTemplateBody}
              >
                + Add New
              </button>
            </div>
          </div>
        </div>
      </AdmissionETBListingTop>

      <AdmissionETBListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
            {hasAccess(
              sitePermissions.downloadAdmissionEligibilityTemplateBodyPDF
            ) && (
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}
            {hasAccess(
              sitePermissions.downloadAdmissionEligibilityTemplateBodyExcel
            ) && (
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
                handleSearchChange(e, setSearch, getAllTemplateBodies)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllTemplateBodies)}
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
                      <div className="checkbox cp">
                        <input
                          type="checkbox"
                          checked={selectedRecords.includes(item?.id)}
                          onChange={() => onSelectRecord(item?.id)}
                        />
                      </div>
                    </td>
                    <td>{item?.field}</td>
                    <td>{item?.op ?? '-'}</td>
                    <td>{item?.value}</td>
                    <td>
                      {item?.combined_group ? (
                        <div className="data-wrap">
                          <span className="text">{item?.combined_group}</span>
                          <div
                            className="close-icon cp"
                            onClick={() =>
                              handleRemoveGroup("combined_group", item)
                            }
                          >
                            <RedCloseSvg />
                          </div>
                        </div>
                      ) : (
                        <span>--</span>
                      )}
                    </td>
                    <td>
                      {item?.or_group ? (
                        <div className="data-wrap">
                          <span className="text">{item?.or_group}</span>
                          <div
                            className="close-icon cp"
                            onClick={() => handleRemoveGroup("or_group", item)}
                          >
                            <RedCloseSvg />
                          </div>
                        </div>
                      ) : (
                        <span>--</span>
                      )}
                    </td>
                    <td>
                      <div className="table-action-icons">
                        {hasAccess(
                          sitePermissions.admissioneligibilityTemplateBodyEdit
                        ) && (
                          <div
                            className="action-icon"
                            onClick={() => goToEditTemplateBody(item?.id)}
                          >
                            <EditTableSvg />
                          </div>
                        )}
                        {hasAccess(
                          sitePermissions.admissioneligibilityTemplateBodyDelete
                        ) && (
                          <div
                            className="action-icon"
                            onClick={() => handleDelete(item?.id)}
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
      </AdmissionETBListingSection>
    </AdmissionETBListingMain>
  );
};

export default AdmissionETBListing;
