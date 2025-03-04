import { FC, Fragment, useEffect, useState } from "react";
import {
  BlackArrowSvg,
  CallTableSvg,
  DarkEyeSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  DownloadYellowSvg,
  EditTableSvg,
  ExcelSvg,
  MessageTableSvg,
  PdfSvg,
  SearchFieldSvg,
  StopActionSvg,
  TabPrimaryActionMenu,
  UserActionSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import {
  UsersListingMain,
  UsersListingSection,
  UsersListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useSystemAdministration from "../../useHooks";
import useUtils from "hooks/useUtils";
import useOrganization from "containers/private/organization/useHooks";
import useAlert from "hooks/useAlert";
import { UserManagementDTO } from "utils/helpers/models/system-administration/user-management.dto";
import KalaAvatar from '../../../../../assets/images/common/others/avatar-9.jpg';
import { useForm } from "react-hook-form";
const UsersListing: FC = () => {
  let [formData, setFormData] = useState<UserManagementDTO>(new UserManagementDTO());
  const navigate = useNavigate();
  const { getUsers, deleteUserById, getRoles } = useSystemAdministration();
  const { getCitiesAdmin } = useOrganization();
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<UserManagementDTO>();
  const { getRolesByAdmin } = useOrganization();
  const [search, setSearch] = useState<string>('');

  const [data, setData] = useState<UserManagementDTO[]>([]);
  const [cities, setCities] = useState<any[]>([]);


  const { hasAccess } = useStore();
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { handleSearchChange, handleTableSearch } = useUtils();
  const [role, setRole] = useState<any[]>([]);
  useEffect(() => {
    getAllUsers(pagination.page, search, formData);
    getRoles(setRole);
    getCitiesAdmin(setCities);
  }, []);
  console.log(role, 'roleeee');
  const {
    isComponentVisible: showDropdownMenu,
    setIsComponentVisible: setShowDropdownMenu,
    ref: dropdownMenuRef,
  } = useComponentVisible(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);

  const columns: string[] = [
    "",
    "image",
    "Name",
    "CNIC",
    "Gender",
    "City",
    "Country",
    "status"
  ];
  const { confirmationPopup } = useAlert();
  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllUsers(page + 1, search, formData);
  };

  const getAllUsers = (page: number, search: string, filters: any = {}) => {
    const queryParams: any = {
      per_page: pagination.per_page,
      page,
      search,
    };
    if (filters && filters.city) {
      queryParams['city'] = filters.city;
    }
    if (filters && filters.cnic) {
      queryParams['cnic'] = filters.cnic;
    }
    if (filters && filters.status) {
      queryParams['status'] = filters.status;
    }
    getUsers(setData, queryParams, setPagination);
  };


  const toggleRowExpand = (index: number) => {
    (data as any)[index].isExpanded = !(data as any)[index].isExpanded;
    setData([...data]);
  };

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const goToCreateUSer = () => {
    navigate(siteRoutes.createSystemUsers);
  };

  const handleChangeFilter = (event: any) => {
    const { value, name } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  }

  const handleResetFilters = () => {
    const filtersHelper = { ...formData };

    getAllUsers(1, search, formData);
  }
  const goToUpdateUser = (userId: number) => {
    navigate(
      `${siteRoutes.createSystemUsers}?id=${userId}`
    );
  };

  const handleDelete = async (id: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      deleteUserById(id, setData, pagination, setPagination);
    }
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    console.log(name, value);
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  };

  const goToViewCnicImage = (path: string | null) => {
    if (path) window.open(path, '_blank');
  }

  return (
    <UsersListingMain>
      <UsersListingTop>
        <div className="left">
          <span className="page-heading">Users</span>
          {/* <Breadcrumb /> */}
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn" onClick={goToCreateUSer}>
              + Add New
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
              {/* <div className="input-field">
                <label> User Type</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All</option>
                    </select>
                  </div>
                </div>
              </div> */}
              <div className="input-field">
                <label>CNIC</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>City</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={formData.city} onChange={handleChangeFilter} name="city">
                      <option value="">Select City</option>
                      {cities?.map((city, index) => {
                        return <option value={city.id} key={index}>{city.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="radio-field">
                <label htmlFor="no">Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="radio" id="active" name="status" value={1} onChange={handleChange} />
                    <label htmlFor="yes">Active</label>
                  </div>
                  <div className="field">
                    <input type="radio" id="active" value={0} name="status" onChange={handleChange} />
                    <label htmlFor="no">De-active</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                {/* <button className="lg-rounded-btn gray" onClick={handleResetFilters}>Reset</button> */}
                <button className="lg-rounded-btn" onClick={() => getAllUsers(1, search, formData)}>Apply Filters</button>
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
                handleSearchChange(e, setSearch, getAllUsers)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllUsers)}
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
                      {/* <img src={KalaAvatar} alt="" /> */}
                      <td>
                        <img
                          src={item?.profile_image && item.profile_image !== '' ? item.profile_image : KalaAvatar}
                          alt="Profile"
                          style={{
                            height: '35px',  // Adjust height as needed
                            width: '35px',   // Adjust width as needed
                            borderRadius: '50%',  // For circular image
                            objectFit: 'cover'  // Ensures the image fits within the given dimensions
                          }}
                        />
                      </td>

                      <td>
                        <div>{item?.name}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.cnic}</div>
                      </td>
                      <td>
                        <div className="mw-100">{item?.gender}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.city_relation?.title}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.country_relation?.name}</div>
                      </td>
                      <td>
                        <div className=""> {item?.status ? <div className="status-tile">Active</div> : <div className="status-tile red">Inactive</div>}</div>
                      </td>
                    </tr>

                    {item.isExpanded && (
                      <tr>
                        <td></td>
                        <td colSpan={7}>
                          <div className="expanded-content">
                            <div className="particular-info">
                              <span className="title">Address</span>
                              <span className="info">{item?.address}</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Passport No.</span>
                              <span className="info">{item?.passport_no}</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Created Date</span>
                              <div className="info">
                                <span className="status">{new Date(item?.created_at).toISOString().split('T')[0]}</span>
                              </div>
                            </div>
                            {item?.cnic_image ? (
                              <div className="particular-info">
                                <span className="title">CNIC Image</span>
                                <div className="info">
                                  <span className="status">
                                    <div className="action-icon cp" onClick={() => goToViewCnicImage(item?.cnic_image)}>
                                      <DarkEyeSvg />
                                    </div>
                                  </span>
                                </div>
                              </div>
                            ) : null}

                            <div className="particular-info">
                              <span className="title">Action</span>
                              <div className="info">
                                <div className="table-action-icons">
                                  {hasAccess(
                                    sitePermissions.studentRegEdit
                                  ) && (
                                      <div className="action-icon"
                                        onClick={() => goToUpdateUser(item?.id)}
                                      >
                                        <EditTableSvg />
                                      </div>
                                    )}

                                  <div className="action-icon">
                                    <CallTableSvg />
                                  </div>

                                  <div className="action-icon">
                                    <MessageTableSvg />
                                  </div>
                                  {hasAccess(sitePermissions.deleteUserByAdmin) && (
                                    <div
                                      className="action-icon"
                                      onClick={() => handleDelete(item.id)}
                                    >
                                      <DeleteTableSvg />
                                    </div>
                                  )}
                                  <div className="action-icon">
                                    <UserActionSvg />
                                  </div>
                                  <div className="action-icon">
                                    <StopActionSvg />
                                  </div>
                                  <div className="action-icon">
                                    <DownloadYellowSvg />
                                  </div>
                                  <div className="action-icon">
                                    <BlackArrowSvg />
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
          <Pagination
            onPageChange={onPageChange}
            {...pagination}
          />
        </Fragment>
      </UsersListingSection>
    </UsersListingMain>
  );
};

export default UsersListing;
