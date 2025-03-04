import { FC, Fragment, useEffect, useState } from "react";
import {
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  UsersListingMain,
  UsersListingSection,
  UsersListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import useCareers from "../../useHooks";
import { JobPostDTO } from "utils/helpers/models/careers/job-post.dto";
import { JobBatchDTO } from "utils/helpers/models/careers/job-batch.dto";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

const PostListing: FC = () => {
  const [data, setData] = useState<JobPostDTO[]>([]);
  const { hasAccess } = useStore();
  const [search, setSearch] = useState("");
  const { handleSearchChange, handleTableSearch } = useUtils();
  const { getJobPosts, deleteJobPost, getJobBatches } = useCareers();
  const [jobBatches, setJobBatches] = useState<JobBatchDTO[]>([]);
  const [filters, setFilters] = useState<any>({ batch_id: '' });
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "",
    "Template",
    "Advertisement Number",
    "Batch",
    "Case Number",
  ];

  const toggleRowExpand = (index: number) => {
    (data as any)[index].isExpanded = !(data as any)[index].isExpanded;
    setData([...data]);
  };

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  useEffect(() => {
    getAllJobPosts(pagination.page, search, filters);
    getJobBatches(setJobBatches);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteJobPost(id, setData, queryParams, setPagination);
    }
  };

  const goToEditPost = (postId: number) => {
    navigate(`${siteRoutes.createCareerPost}?id=${postId}`);
  }

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllJobPosts(page + 1, search, filters);
  };
  const getAllJobPosts = (page: number, search: string, filters: any) => {
    const queryParams: any = {
      per_page: pagination.per_page,
      page,
      search
    };
    if (filters.batch_no) {
      queryParams['batch_no'] = filters.batch_no;
    }
    getJobPosts(setData, queryParams, setPagination);
  };

  const navigate = useNavigate();

  const goToCreatePost = () => {
    navigate(siteRoutes.createCareerPost);
  };

  const handleChangeFilter = (event: any) => {
    const { value, name } = event.target;
    console.log(name, value);
    setFilters({ ...filters, [name]: value });
  }

  const handleResetFilters = () => {
    const filtersHelper = { ...filters };
    for (let key in filters) {
      filtersHelper[key] = '';
    }
    getAllJobPosts(1, search, filters);
  }

  return (
    <UsersListingMain>
      <UsersListingTop>
        <div className="left">
          <span className="page-heading">Posts</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn" onClick={goToCreatePost}>
              + Add Posts
            </button>
          </div>
        </div>
      </UsersListingTop>

      <FilterSection className="content-radius-shadow">
        <FilterHeader showFilterDropdown={openFilterDropdown}>
          <span className="filter-heading">Filter</span>
          <span className="dropdown-arrow cp" onClick={toggleFilterDropdown}>
            <DownArrowLightgrayMediumSvg className="icon" />
          </span>
        </FilterHeader>
        {openFilterDropdown && (
          <Filters>
            <div className="filter-fields">
              <div className="input-field">
                <label> Select Batch</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.batch_no} onChange={handleChangeFilter} name="batch_no">
                      <option value="">Select batch</option>
                      {jobBatches.map((batch, index) => {
                        return <option value={batch.id} key={index}>{batch.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" onClick={handleResetFilters}>Reset</button>
                <button className="lg-rounded-btn" onClick={() => getAllJobPosts(1, search, filters)}>Apply Filters</button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>
      <UsersListingSection className="content-radius-shadow">
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
              onChange={(e) =>
                handleSearchChange(e, setSearch, getAllJobPosts)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllJobPosts)}
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
              {data.map((post, index) => {
                return (
                  <Fragment key={index}>
                    <tr className={`expandable ${(post as any).isExpanded && "opened"}`}>
                      <td>
                        <div
                          className="rounded-expand-button"
                          onClick={() => toggleRowExpand(index)}
                        >
                          <span>{(post as any).isExpanded ? "-" : "+"}</span>
                        </div>
                      </td>
                      <td>
                        {post?.job_template?.title ?? '-'}
                      </td>
                      <td>
                        {post.add_no}
                      </td>
                      <td>
                        {post.job_batch.title}
                      </td>
                      <td>
                        {post.case_no}
                      </td>
                      {/* <td>
                        {" "}
                        <div className="table-action-icons">
                          <div className="action-icon">
                            <EditTableSvg />
                          </div>

                          <div className="action-icon" onClick={() => }>
                            <DeleteTableSvg />
                          </div>
                        </div>
                      </td> */}
                    </tr>

                    {(post as any).isExpanded && (
                      <tr>
                        <td></td>
                        <td colSpan={7}>
                          <div className="expanded-content">
                            <div className="particular-info">
                              <span className="title">Post for Women:</span>
                              <span className="info">{post.women_post}</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Post for Disabled Person:</span>
                              <span className="info">{post.disabled_post}</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Post for Minorities:</span>
                              <div className="info">
                                <span className="status">{post.minorities_post}</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Special Quota:</span>
                              <div className="info">
                                <span className="status">{post.special_quota}</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">in House Closing Date:</span>
                              <div className="info">
                                <span className="status">{post.in_house_date}</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">For internal Employees:</span>
                              <div className="info">
                                <span className="status">{post.internal_employee}</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">admin users to apply for this post:</span>
                              <div className="info">
                                <span className="status">{post.in_house_user ? 'Yes' : 'No'}</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Departments:</span>
                              <div className="info">
                                <span className="status">--</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Job Type:</span>
                              <div className="info">
                                <span className="status">--</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Campus:</span>
                              <div className="info">
                                <span className="status">--</span>
                              </div>
                            </div>

                            <div className="particular-info">
                              <span className="title">Action</span>
                              <div className="info">
                                <div className="table-action-icons">
                                  <div className="action-icon" onClick={() => goToEditPost(post.id)}>
                                    <EditTableSvg />
                                  </div>

                                  <div className="action-icon" onClick={() => handleDelete(post.id)}>
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
            onPageChange={onPageChange}
            {...pagination}
          />
        </Fragment>
      </UsersListingSection>
    </UsersListingMain>
  );
};

export default PostListing;
