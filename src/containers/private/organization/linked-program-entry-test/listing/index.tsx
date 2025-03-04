import { FC, Fragment, useEffect, useState } from "react";
import {
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  TableBlackRightArrowSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  LinkedProgramsEntryTestListingMain,
  LinkedProgramsEntryTestListingSection,
  LinkedProgramsEntryTestListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import { DropdownMain } from "components/particles/forms/multiselect-dropdown/style";
import { useNavigate, useParams } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useOrganization from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";
import useUtils from "hooks/useUtils";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface MeritListingProps {}

const LinkedProgramsEntryTestListing: FC<MeritListingProps> = ({}) => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const { hasAccess } = useStore();
  const columns: string[] = [
    // "Program",
    "Entry Test",
    "Minimum %",
    "Result Awaiting",
    "Status",
    "Action",
  ];
  const { getEntryTestLinks, deleteEntryTestLink, updateEntryTestLink } =
    useOrganization();

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });

  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const { handleSearchChange, handleTableSearch } = useUtils();

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };
  const navigate = useNavigate();

  const gotoCreateLinkedPrograms = (admission_session_id: string) => {
    navigate(
      `${siteRoutes.createLinkedProgramEntryTest}?admission_session_id=${admission_session_id}`
    );
  };

  const { getQueryParams } = useUtils();

  const params = getQueryParams();

  const handleDelete = async (id: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      const queryParams = {
        per_page: pagination.per_page,
        page: 1,
        admission_session_id: params?.admission_session_id,
        id: params?.id,
      };
      deleteEntryTestLink(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllEntryTestLinks(page + 1, search);
  };

  const getAllEntryTestLinks = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      admission_session_id: params?.admission_session_id,
      id: params?.id,
    };
    // console.log(params?.admission_session_id);

    getEntryTestLinks(setData, queryParams, setPagination);
  };

  useEffect(() => {
    getAllEntryTestLinks(pagination.page, search);
  }, []);

  const handleUpdateEntryTestLink = (item: any, index: number) => {
    data[index] = item;
    setData([...data]);
    delete item.updated_at;
    delete item.created_at;
    delete item.program;
    delete item.test;
    updateEntryTestLink(item.id, item);
  };

  const goToUpdateEntryTestLink = (id: number) => {
    navigate(`${siteRoutes.createLinkedProgramEntryTest}?id=${id}`);
  };

  return (
    <LinkedProgramsEntryTestListingMain>
      <LinkedProgramsEntryTestListingTop>
        <div className="left">
          <span className="page-heading">Linked Program to Entry Test</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="download-buttons">
            {hasAccess(sitePermissions.createLinkedProgramEntryTest) && (
              <div className="particular-button">
                <button
                  className="lg-rounded-btn"
                  onClick={() =>
                    gotoCreateLinkedPrograms(params?.admission_session_id)
                  }
                >
                  + Add New
                </button>
              </div>
            )}
          </div>
        </div>
      </LinkedProgramsEntryTestListingTop>

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
                <label>Category</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Programs</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Bachelors</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="city_id">
                      <option value="">All</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray">Reset</button>
                <button className="lg-rounded-btn">Apply Filters</button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>

      <LinkedProgramsEntryTestListingSection className="content-radius-shadow">
        <div className="heading-table">
          <p>{decodeURIComponent(params?.title)}</p>
        </div>

        <div className="list-header">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.downloadLinkedProgramEntryTestPDF) && (
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}

            {hasAccess(sitePermissions.downloadLinkedProgramEntryTestExcel) && (
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
                handleSearchChange(e, setSearch, getAllEntryTestLinks)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllEntryTestLinks)}
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
                  <tr key={index}>
                    {/* <td>
                      <div className="mw-150">
                        {item?.admission_session?.program?.title}
                      </div>
                    </td> */}
                    <td>{item?.test?.title}</td>
                    <td>{item?.min_required_percentage}%</td>
                    <td>
                      <div className="table-radio-field">
                        <div className="radio">
                          <input
                            type="radio"
                            name={`result-awating-${index}`}
                            id={`result-awating-no-${index}`}
                            checked={item?.allow_result_awaiting == 1}
                            onChange={() =>
                              handleUpdateEntryTestLink(
                                { ...item, allow_result_awaiting: 1 },
                                index
                              )
                            }
                          />
                          <label htmlFor={`result-awating-no-${index}`}>
                            Yes
                          </label>
                        </div>
                        <div className="radio">
                          <input
                            type="radio"
                            name={`result-awating-${index}`}
                            id={`result-awating-yes-${index}`}
                            checked={item?.allow_result_awaiting == 0}
                            onChange={() =>
                              handleUpdateEntryTestLink(
                                { ...item, allow_result_awaiting: 0 },
                                index
                              )
                            }
                          />
                          <label htmlFor={`result-awating-yes-${index}`}>
                            No
                          </label>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="table-radio-field">
                        <div className="radio">
                          <input
                            type="radio"
                            name={`status-${index}`}
                            id={`status-yes-${index}`}
                            checked={item?.status == 1}
                            onChange={() =>
                              handleUpdateEntryTestLink(
                                { ...item, status: 1 },
                                index
                              )
                            }
                          />
                          <label htmlFor={`status-yes-${index}`}>Active</label>
                        </div>
                        <div className="radio">
                          <input
                            type="radio"
                            name={`status-${index}`}
                            id={`status-no-${index}`}
                            checked={item?.status == 0}
                            onChange={() =>
                              handleUpdateEntryTestLink(
                                { ...item, status: 0 },
                                index
                              )
                            }
                          />
                          <label htmlFor={`status-no-${index}`}>Deactive</label>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="table-action-icons">
                        {hasAccess(
                          sitePermissions.editLinkedProgramEntryTest
                        ) && (
                          <div
                            className="action-icon"
                            onClick={() => goToUpdateEntryTestLink(item?.id)}
                          >
                            <EditTableSvg />
                          </div>
                        )}

                        {hasAccess(
                          sitePermissions.deleteLinkedProgramEntryTest
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

        <div>
          <DropdownMain />
        </div>
        <Fragment>
          <DataNotFound show={!isLoading && !data.length} />
          <Pagination {...pagination} onPageChange={onPageChange} />
        </Fragment>
      </LinkedProgramsEntryTestListingSection>
    </LinkedProgramsEntryTestListingMain>
  );
};

export default LinkedProgramsEntryTestListing;
