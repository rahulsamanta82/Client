import { FC, Fragment, useEffect, useState } from "react";
import {
  CallTableSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditGreenTableSvg,
  EmailSvg,
  ExcelSvg,
  LocationSvg,
  MannageRoomSvg,
  PdfSvg,
  SearchFieldSvg,
  TabPrimaryActionMenu,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  TestCenterListingMain,
  TestCenterListingSection,
  TestCenterListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { Navigate, useNavigate } from "react-router-dom";
import { LocationPrimarySquareSvg } from "assets/images/organization/svgs";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";
import useTestingServices from "../../useHooks";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";

interface StudentRegListingProps {}

const ListingTestCenter: FC = ({}) => {
  const navigate = useNavigate();
  const { getTestingCenters, deleteTestingCenter } = useTestingServices();
  const [data, setData] = useState<TestingCenterDTO[]>([]);
  const [search, setSearch] = useState<string>("");
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Center Name",
    "Address",
    "City",
    "Status",
    "Action",
  ];
  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch, createQuery } = useUtils();

  useEffect(() => {
    getAllTestingCenters(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteTestingCenter(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllTestingCenters(page + 1, search);
  };
  const getAllTestingCenters = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getTestingCenters(setData, queryParams, setPagination);
  };

  const toggleMenuDropdown = (index: number) => {
    (data as any)[index].isDropdownOpen = !(data as any)[index].isDropdownOpen;
    setData([...data]);
  };

  const goToCreateTestCenter = () => {
    navigate(siteRoutes.TestingServicesTestCentercreate);
  };
  const goToManageRooms = (centerId: number) => {
    navigate(`${siteRoutes.testingCenterRooms}?id=${centerId}`);
  };

  const goToEditCenter = (centerId: number) => {
    navigate(`${siteRoutes.TestingServicesTestCentercreate}?id=${centerId}`);
  };

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  return (
    <TestCenterListingMain>
      <TestCenterListingTop>
        <div className="left">
          <span className="page-heading">Test Centers</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.TestingServicesTestCentercreate) && (
            <div className="create-org-btn">
              <button onClick={goToCreateTestCenter} className="lg-rounded-btn">
                + Add New
              </button>
            </div>
          )}
        </div>
      </TestCenterListingTop>

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
                <label>Session</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Session</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Test Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Name</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Test Batch</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="city_id">
                      <option value="">Select Batch</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Test center</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="city_id">
                      <option value="">Select Center</option>
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
      <TestCenterListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllTestingCenters)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllTestingCenters)}
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
              {data.map((center, index) => {
                return (
                  <tr key={index}>
                    <td>{center.name}</td>
                    <td>
                      <div className="mw-150">{center.address}</div>
                    </td>
                    <td>{center?.center_cities?.title ?? "-"}</td>
                    <td>
                      {center.is_active ? (
                        <div>
                          <span className="status-tile">Active</span>
                        </div>
                      ) : (
                        <div>
                          <span className="status-tile red">Inactive</span>
                        </div>
                      )}
                    </td>

                    <td>
                      <div className="action-menu">
                        <div
                          className="menu-icon cp"
                          onClick={() => toggleMenuDropdown(index)}
                        >
                          <TabPrimaryActionMenu className="icon" />
                        </div>
                        {(center as any).isDropdownOpen && (
                          <div className="menu-dropdown">
                            <div
                              className="particular-menu cp"
                              onClick={() => goToEditCenter(center.id)}
                            >
                              <div className="action-icon">
                                <EditGreenTableSvg className="icon" />
                              </div>
                              <span className="title">Edit</span>
                            </div>
                            <div className="particular-menu cp">
                              <div className="action-icon">
                                <MannageRoomSvg className="icon" />
                              </div>
                              <span
                                className="title"
                                onClick={() => goToManageRooms(center.id)}
                              >
                                Manage Rooms
                              </span>
                            </div>
                            <div className="particular-menu cp">
                              <div className="action-icon">
                                <CallTableSvg className="icon" />
                              </div>
                              <span className="title">Call</span>
                            </div>
                            <div className="particular-menu cp">
                              <div className="action-icon">
                                <EmailSvg className="icon" />
                              </div>
                              <span className="title">Email</span>
                            </div>
                            <div className="particular-menu cp">
                              <div className="action-icon">
                                <LocationSvg className="icon" />
                              </div>
                              <span className="title">Location</span>
                            </div>

                            <div className="particular-menu cp">
                              <div className="action-icon">
                                <DeleteTableSvg className="icon" />
                              </div>
                              <span className="title">Delete Document</span>
                            </div>
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
      </TestCenterListingSection>
    </TestCenterListingMain>
  );
};

export default ListingTestCenter;
