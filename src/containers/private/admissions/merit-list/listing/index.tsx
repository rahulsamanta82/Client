import { FC, Fragment, useEffect, useState } from "react";
import {
  CallTableSvg,
  DownArrowLightgrayMediumSvg,
  DownloadPdfIconSvg,
  DownloadWhiteIconSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  MeritListingMain,
  MeritListingSection,
  StatsListingSection,
  MeritListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useAdmissions from "../../useHooks";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";
import useUtils from "hooks/useUtils";

interface MeritListingProps {}

const AdmissionMeritListing: FC<MeritListingProps> = ({}) => {
  const [data, setData] = useState<any[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<any>({});
  const [search, setSearch] = useState("");
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(true);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const {
    getMeritList,
    getStudenApplicantsFilterData,
    getStudentApplicantFilterProgram,
  } = useAdmissions();
  const [quotas, setQuotas] = useState<any[]>([]);
  const [academicSessions, setAcademiceSessions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [meritLists, setMeritLists] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  // const [downloadPdf , setDowloadPdf] = useState<any>({})
  const [filters, setFilters] = useState<any>({
    academic_session: "",
    category: "",
    program_id: "",
    program_quota: "",
    ml: "",
    offer_date: "",
    exp_date: "",
    title: "",
    download: "",
  });
  const { downloadFileWithUrl } = useUtils();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    filters[name] = value;

    if (name === "category") {
      filters.program = "";
      filters.program_quota = "";
      filters.ml = "";
      setPrograms([]);
      setQuotas([]);
      setMeritLists([]);
    } else if (name === "program_id") {
      filters.program_quota = "";
      filters.ml = "";
      setQuotas([]);
      setMeritLists([]);
    } else if (name === "program_quota") {
      filters.ml = "";
      setMeritLists([]);
    }
    const fieldsToGetOptions: string[] = [
      "academic_session",
      "category",
      "program_id",
      "program_quota",
    ];
    if (fieldsToGetOptions.includes(name)) {
      get3FieldsData(filters);
    }
    setFilters({ ...filters });
  };

  const getMeritListData = async (filters: any) => {
    getMeritList(setData, filters, setSummary, (url: any) => {
      // console.log("something", url.file_url_path);

      setDownloadUrl(url.file_url_path);
      downloadFileWithUrl(url.file_url_path);
    });
  };

  const onApplyFilters = () => {
    const validFilters = getValidFilters(filters);
    getMeritListData({ ...validFilters, program: validFilters.program_id });
  };

  const { hasAccess } = useStore();
  const statsColumns: string[] = [
    "Confirmed",
    "Transfer",
    "Other Program",
    "Other Merit List",
    "Not Confirm",
    "Total",
    "Challan Issue",
  ];

  const columns: string[] = [
    "",
    "Application",
    "Name",
    "CNIC",
    "Offer Letters",
    "City",
    "Merit",
    "Challan",
  ];

  const toggleRowExpand = (index: number) => {
    const dat = [...data];
    dat[index].isExpanded = !dat[index].isExpanded;
    setData([...dat]);
  };

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  useEffect(() => {
    getStudenApplicantsFilterData(setAcademiceSessions, setCategories);
  }, []);

  const get3FieldsData = (filters: any) => {
    const validFilters = getValidFilters(filters);
    getStudentApplicantFilterProgram(
      validFilters,
      setPrograms,
      setQuotas,
      setMeritLists
    );
  };

  const getValidFilters = (filters: any) => {
    const queryParams: any = {};
    for (let key in filters) {
      const param = filters[key];
      if (param) {
        queryParams[key] = param;
      }
    }

    return queryParams;
  };

  const resetFilters = () => {
    for (let key in filters) {
      filters[key] = "";
    }

    setFilters({ ...filters });
    setPrograms([]);
    setQuotas([]);
    setMeritLists([]);
    get3FieldsData(filters);
    setData([]);
  };
  // console.log(data);
  // const setDownloadFilter = (format: string) => {
  //   setFilters({
  //     ...filters,
  //     download: format,
  //   });
  // };
  const setDownloadFilter = (format: string) => {
    setFilters({
      ...filters,
      download: format,
    });
  };
  useEffect(() => {
    if (filters.download) {
      onApplyFilters();
    }
    // downloadFileWithUrl(data.file_url_path);
  }, [filters.download]);
  return (
    <MeritListingMain>
      <MeritListingTop>
        <div className="left">
          <span className="page-heading">Merit List</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="download-buttons">
            {hasAccess(sitePermissions.admissionMeritListAllField) && (
              <div className="particular-button">
                <button className="lg-rounded-btn">
                  <DownloadWhiteIconSvg />
                  <span>Download All Fields</span>
                </button>
              </div>
            )}
            {hasAccess(sitePermissions.admissionMeritListDownload) && (
              <div className="particular-button">
                <button
                  className="lg-rounded-btn"
                  onClick={() => setDownloadFilter("pdf")}
                >
                  <DownloadPdfIconSvg />
                  <span>Download pdf</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </MeritListingTop>

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
                <label>Academic Session</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      name="academic_session"
                      value={filters.academic_session}
                      onChange={handleChange}
                    >
                      <option value={""}>Select One</option>
                      {academicSessions?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.id}>
                            {item?.session_title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Category</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      name="category"
                      onChange={handleChange}
                      value={filters.category}
                    >
                      <option value={""}>Select One</option>
                      {categories?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.slug}>
                            {item?.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Program</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      name="program_id"
                      onChange={handleChange}
                      value={filters.program_id}
                    >
                      <option value={""}>Select One</option>
                      {programs?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.id}>
                            {item?.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Quota</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      name="program_quota"
                      onChange={handleChange}
                      value={filters.program_quota}
                    >
                      <option value="">Select One</option>
                      {quotas?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.id}>
                            {item?.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Seats</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="number"
                      value={filters.seats}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Merit List</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      name="ml"
                      onChange={handleChange}
                      value={filters.ml}
                    >
                      <option value="">Select One</option>
                      {meritLists?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.ml}>
                            {item.ml}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Offer Date</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="date"
                      name="offer_date"
                      onChange={handleChange}
                      value={filters.offer_date}
                    />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Expire Date</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="date"
                      name="exp-date"
                      onChange={handleChange}
                      value={filters.exp_date}
                    />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Title</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      name="title"
                      onChange={handleChange}
                      value={filters.title}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" onClick={resetFilters}>
                  Reset
                </button>
                <button className="lg-rounded-btn" onClick={onApplyFilters}>
                  Apply Filters
                </button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>
      <StatsListingSection className="content-radius-shadow">
        <div className="list-header">
          <span className="stats-heading">Admission Status Summary </span>
        </div>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {statsColumns.map((column: string, index: number) => {
                  return <th key={index}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {summary ? (
                <tr>
                  <td>{summary?.confirmed}</td>
                  <td>{summary?.transfer}</td>
                  <td>{summary?.OtherProgram}</td>
                  <td>{summary?.OtherMeritlist}</td>
                  <td>{summary?.NotConfirmed}</td>
                  <td>{summary?.total ?? "-"}</td>

                  <td>{summary?.challan_issued}</td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          </table>
        </div>
      </StatsListingSection>
      <MeritListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.downloadAdmissionMeritListPDF) && (
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}

            {hasAccess(sitePermissions.downloadAdmissionMeritListExcel) && (
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
                  return <th key={index}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => {
                return (
                  <Fragment key={index}>
                    <tr className={`expandable ${item.isExpanded && "opened"}`}>
                      <td>
                        <div
                          className="rounded-expand-button"
                          onClick={() => toggleRowExpand(index)}
                        >
                          <span>{item.isExpanded ? "-" : "+"}</span>
                        </div>
                      </td>
                      <td>{item?.app_no ? item?.app_no : "-"}</td>

                      <td>{item?.name ?? "-"}</td>

                      <td>{item?.cnic ?? "-"}</td>

                      <td>{item?.offer_letter ?? "-"}</td>

                      <td>{item?.city ?? "-"}</td>

                      <td>{item?.merit ?? "-"}</td>

                      <td>{item?.challan_no ?? "-"}</td>
                    </tr>

                    {item.isExpanded && (
                      <tr>
                        <td></td>
                        <td colSpan={7}>
                          <div className="expanded-content">
                            <div className="particular-info">
                              <span className="title">Intermediate</span>
                              <span className="info">
                                {item?.["INTERMEDIATE / HSSC"]}
                              </span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Offer Letter </span>
                              <span className="info">
                                {item?.offer_letter ? item?.offer_letter : "-"}
                              </span>
                            </div>

                            <div className="particular-info">
                              <span className="title">Action</span>
                              <div className="info">
                                <div className="table-action-icons">
                                  <div className="action-button">
                                    <button className="black">
                                      Download Fee Challan
                                    </button>
                                  </div>

                                  <div className="action-button yellow">
                                    <button className="yellow">
                                      Extend Date
                                    </button>
                                  </div>

                                  <div className="action-button">
                                    <button className="orange">
                                      Fee Challan
                                    </button>
                                  </div>
                                  <div className="action-button">
                                    <button className="voilet">
                                      View Application
                                    </button>
                                  </div>

                                  <div className="action-icon">
                                    <CallTableSvg />
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
          <DataNotFound show={!isLoading && !data?.length} />
          <Pagination
            onPageChange={(page: any) => console.log(page)}
            {...pagination}
          />
        </Fragment>
      </MeritListingSection>
    </MeritListingMain>
  );
};

export default AdmissionMeritListing;
