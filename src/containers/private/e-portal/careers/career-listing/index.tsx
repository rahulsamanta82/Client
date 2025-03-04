import { FC, Fragment, useEffect, useState } from "react";
import {
  JobListingLeft,
  JobListingMain,
  JobListingRight,
  JobListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useSelector } from "react-redux";
import { JobPostDTO } from "utils/helpers/models/careers/job-post.dto";
import useEportal from "../../useHooks";
import JobApplyModal from "./components/job-apply";
import { JobTypeDTO } from "utils/helpers/models/careers/job-type.dto";
import useUtils from "hooks/useUtils";
import Pagination from "components/particles/table/pagination";

const CareerListing: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<JobPostDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [openJobModal, setOpenJobModal] = useState<boolean>(false);
  const [jobTypes, setJobTypes] = useState<JobTypeDTO[]>([]);
  const [certificateLevels, setCertificateLevels] = useState<any[]>([]);
  const [jobIdToApply, setJobIdToApply] = useState<number>(0);
  const [jobDepartments, setJobDepartments] = useState<any[]>([]);
  const [jobCampuses, setJobCampuses] = useState<any[]>([]);
  const [jobTypesToSend, setJobTypesToSend] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [filters, setFilters] = useState<any>({
    required_experience: "",
    min_qualification: "",
    job_type: "",
    sort_by: "asc",
  });

  const {
    checkJobEligibility,
    getCertificateLevelsByUser,
    getJobTypesByUser,
    getJobsToApply,
  } = useEportal();
  const { handleSearchChange, handleTableSearch } = useUtils();

  const handleOpenApplyJobModal = (jobId: number) => {
    setJobIdToApply(jobId);
    checkJobEligibility(
      jobId,
      setOpenJobModal,
      setJobDepartments,
      setJobCampuses,
      setJobTypesToSend
    );
  };

  useEffect(() => {
    getCertificateLevelsByUser(setCertificateLevels);
    getJobTypesByUser(setJobTypes);
    getAllJobsToApply(pagination.page, search, filters);
  }, []);

  const getAllJobsToApply = (page: number, search: string, filters: any) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      ...filters,
    };
    getJobsToApply(setData, queryParams, setPagination);
  };

  const handleFilterChange = (event: any) => {
    const { value, name } = event.target;
    filters[name] = value;
    setFilters({ ...filters });
    if (name === "sort_by") {
      getAllJobsToApply(1, search, filters);
    }
  };

  const onResetFilters = () => {
    for (let key in filters) {
      filters[key] = "";
    }
    setFilters({ ...filters });
    setSearch("");
    getAllJobsToApply(pagination.page, "", filters);
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllJobsToApply(page + 1, search, filters);
  };

  return (
    <JobListingMain>
      <JobListingTop>
        <div className="left">
          <span className="page-heading">Job Listing</span>
          <Breadcrumb />
        </div>
      </JobListingTop>

      <div className="container">
        <JobListingLeft className="p-custom-scrollbar-4">
          <div className="common-fields">
            <div className="input-field">
              <label htmlFor="">Search</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) =>
                      handleSearchChange(e, setSearch, getAllJobsToApply)
                    }
                    onKeyUp={(e) => handleTableSearch(e, getAllJobsToApply)}
                  />
                </div>
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="">Job Type</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    name="job_type"
                    value={filters.job_type}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Job Type</option>
                    {jobTypes.map((type, index) => {
                      return (
                        <option value={type.id} key={index}>
                          {type.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="">Qualification</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    name="min_qualification"
                    value={filters.min_qualification}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Qualification</option>
                    {certificateLevels.map((level: any, index: number) => {
                      return (
                        <option value={level.id} key={index}>
                          {level.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="">Experience</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    name="required_experience"
                    value={filters.required_experience}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Experience</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((exp) => {
                      return (
                        <option value={exp} key={exp}>
                          {exp} Year{exp > 1 ? "s" : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="lg-rounded-btn gray" onClick={onResetFilters}>
              Reset
            </button>
            <button
              className="lg-rounded-btn"
              onClick={() => getAllJobsToApply(1, search, filters)}
            >
              Submit
            </button>
          </div>
        </JobListingLeft>
        <JobListingRight>
          <div className="left-top">
            <div>
              <span className="main-heading">Active Jobs</span>
            </div>
            <div className="select-field">
              <select
                name="sort_by"
                value={filters.sort_by}
                onChange={handleFilterChange}
              >
                <option value="asc">Newest First</option>
                <option value="desc">Oldest First</option>
              </select>
            </div>
          </div>

          <div className="jobs-listing">
            {data.map((post: any, index) => {
              return (
                <div className="job-description-main" key={index}>
                  <div className="title-main">
                    <span className="description-title">{post.title}</span>
                    <div>
                      <p className="status-tile green">
                        {post?.jobType?.map((t: any) => t.title).join("/")}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="job-description">
                      {/* Bachelor's degree in Computer Science/IT/MIS/E-Commerce /
                    Software Engineering / Computer Engineering awarded after 16
                    years of education or equivalent from an HEC recognized
                    university / institution. Must be fluent in written and spoken
                    English. */}
                      {post?.description}
                    </p>
                  </div>
                  <div>
                    <p className="department">
                      Department / Field
                      <span className="office">
                        {post?.department?.map((d: any) => d.title).join(" / ")}
                      </span>
                    </p>
                  </div>

                  <div className="job-details">
                    <div className="detail">
                      <p className="job-title">Last Date :</p>
                      <p className="job-data">{post?.closing_date}</p>
                    </div>
                    <div className="detail">
                      <p className="job-title">Scale/Equivalent :</p>
                      <p className="job-data">BPS 16</p>
                    </div>
                    <div className="detail">
                      <p className="job-title">Max Age Limit :</p>
                      <p className="job-data">{post?.age_max}</p>
                    </div>
                    <div className="detail">
                      <p className="job-title">Job Batch :</p>
                      <p className="job-data">{post?.job_batch?.title}</p>
                    </div>
                  </div>
                  <div className="submit-buttons">
                    <div className="buttons">
                      <button
                        type="button"
                        className="lg-rounded-btn"
                        onClick={() => handleOpenApplyJobModal(post?.id)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <Fragment>
              <Pagination {...pagination} onPageChange={onPageChange} />
            </Fragment>
          </div>
        </JobListingRight>
      </div>
      <Fragment>
        {openJobModal && (
          <JobApplyModal
            job_id={jobIdToApply}
            jobDepartments={jobDepartments}
            jobCampuses={jobCampuses}
            jobTypes={jobTypesToSend}
            setOpen={setOpenJobModal}
          />
        )}
      </Fragment>
    </JobListingMain>
  );
};

export default CareerListing;
