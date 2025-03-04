import { FC, Fragment, useEffect, useState } from "react";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  PostTemplateListingMain,
  PostTemplateListingSection,
  PostTemplateListingTop,
} from "./style";
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { JobTemplateDTO } from "utils/helpers/models/careers/job-template.dto";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useCareers from "../../useHooks";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

const PostTemplateListing: FC = () => {
  const [data, setData] = useState<JobTemplateDTO[]>([]);
  const { hasAccess } = useStore();
  const [search, setSearch] = useState("");
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { getJobTemplates, deleteJobTemplate } = useCareers();
  const columns: string[] = [
    "",
    "Designation",
    "Title",
    "Experience",
    "Pay Scale",
    "Action",
  ];

  const toggleRowExpand = (index: number) => {
    (data as any)[index].isExpanded = !(data as any)[index].isExpanded;
    setData([...data]);
  };

  const navigate = useNavigate();

  const goToCreatePostTemplate = () => {
    navigate(siteRoutes.createCareerPostTemplate);
  };


  useEffect(() => {
    getAllJobTemplates(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteJobTemplate(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllJobTemplates(page + 1, search);
  };
  const getAllJobTemplates = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getJobTemplates(setData, queryParams, setPagination);
  };

  const goToEditJobTemplate = (id: number) => {
    navigate(`${siteRoutes.createCareerPostTemplate}?id=${id}`);
  }

  return (
    <PostTemplateListingMain>
      <PostTemplateListingTop>
        <div className="left">
          <span className="page-heading">Post Templates</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn" onClick={goToCreatePostTemplate}>
              + Add Post Template
            </button>
          </div>
        </div>
      </PostTemplateListingTop>

      <PostTemplateListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.downloadStudentRegPDF) && (
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}

            {hasAccess(sitePermissions.downloadStudentRegExcel) && (
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
              onChange={(e) => setSearch(e.target.value)}
            // onKeyUp={handleSearch}
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
              {data.map((template, index) => {
                return (
                  <Fragment key={index}>
                    <tr className={`expandable ${(template as any).isExpanded && "opened"}`}>
                      <td>
                        <div
                          className="rounded-expand-button"
                          onClick={() => toggleRowExpand(index)}
                        >
                          <span>{(template as any).isExpanded ? "-" : "+"}</span>
                        </div>
                      </td>
                      <td>
                        <div>Senior Imam</div>
                      </td>
                      <td>
                        {template.title}
                      </td>
                      <td>
                        {template.required_experience}
                      </td>
                      <td>
                        {template.pay_scale}
                      </td>
                      <td>
                        <div className="table-action-icons">
                          <div className="action-icon">
                            <EditTableSvg />
                          </div>

                          <div className="action-icon">
                            <DeleteTableSvg />
                          </div>
                        </div>
                      </td>
                    </tr>

                    {(template as any).isExpanded && (
                      <tr>
                        <td></td>
                        <td colSpan={7}>
                          <div className="expanded-content">
                            <div className="particular-info">
                              <span className="title">Eligbility:</span>
                              <span className="info">{template.eligibility}</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Age:</span>
                              <span className="info">{template.age_min}-{template.age_max}</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Challan Fee:</span>
                              <div className="info">
                                <span className="status">{template.challan_fee}</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Qualification :</span>
                              <div className="info">
                                <span className="status">Metric </span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Research:</span>
                              <div className="info">
                                <span className="status">Yes</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Preferences:</span>
                              <div className="info">
                                <span className="status">Inter</span>
                              </div>
                            </div>

                            <div className="particular-info">
                              <span className="title">Action</span>
                              <div className="info">
                                <div className="table-action-icons">
                                  <div className="action-icon">
                                    <EditTableSvg />
                                  </div>

                                  <div className="action-icon">
                                    <DeleteTableSvg />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <DataNotFound show={!isLoading && !data.length} />
          <Pagination
            onPageChange={(page: any) => console.log(page)}
            {...pagination}
          />
        </Fragment>
      </PostTemplateListingSection>
    </PostTemplateListingMain>
  );
};

export default PostTemplateListing;
