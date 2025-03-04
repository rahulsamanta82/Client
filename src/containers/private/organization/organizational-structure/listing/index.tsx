import Breadcrumb from "components/particles/breadcrumb";
import { FC, Fragment, useEffect, useState } from "react";
import {
  FilterHeader,
  Filters,
  FilterSection,
  OrgSTListingMain,
  OrgSTListingSection,
  OrgSTListingTop,
} from "./style";
import { useNavigate } from "react-router-dom";
import {
  CallTableSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  MessageTableSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import useAlert from "hooks/useAlert";
import useOrganization from "../../useHooks";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useStore from "hooks/useStore";
import Pagination from "components/particles/table/pagination";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

interface OrganizationalStructureListingProps { }

const OrganizationalStructureListing: FC<
  OrganizationalStructureListingProps
> = () => {
  const breadcrumbLinks = [
    {
      title: "Organization /",
      path: siteRoutes.organizationListing,
    },
    {
      title: "Organizational Structure Listing",
      path: siteRoutes.orgStructureListing,
    },
  ]
  const navigate = useNavigate();
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(true);
  const [structureTypes, setStructureTypes] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({
    categories_types_id: "",
    parent_id: "",
    city_id: "",
    search: "",
  });
  const { hasAccess } = useStore();
  const {
    getOrgStructures,
    getStructureTypesAdmin,
    getCitiesAdmin,
    deleteOrgStructure,
    downloadOrgStructuresExcelFile,
    downloadOrgStructuresPdfFile,
  } = useOrganization();
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [data, setData] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const columns: string[] = [
    "Logo",
    "Name",
    "Type",
    "Parent",
    "City",
    "Action",
  ];
  const { confirmationPopup } = useAlert();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const goToCreateOrgST = () => {
    navigate(siteRoutes.createOrgStructure);
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleDelete = async (id: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      const filterOptions = { ...filters };
      delete filterOptions.search;

      for (let key in filterOptions) {
        if (!filters[key]) {
          delete filterOptions[key];
        }
      }
      const queryParams = {
        per_page: pagination.per_page,
        page: 1,
        ...filterOptions,
      };
      deleteOrgStructure(id, setData, queryParams, setPagination);
    }
  };

  const goToUpdateOrgStructure = (id: number) => {
    navigate(`${siteRoutes.createOrgStructure}?id=${id}`);
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllOrgStructures(page + 1);
  };

  const getAllOrgStructures = (page: number = 1) => {
    const filterOptions = { ...filters };

    for (let key in filterOptions) {
      if (!filters[key]) {
        delete filterOptions[key];
      }
    }
    const queryParams = {
      per_page: pagination.per_page,
      page,
      ...filterOptions,
    };
    getOrgStructures(setData, queryParams, setPagination);
  };

  useEffect(() => {
    getAllOrgStructures();
    getStructureTypesAdmin(setStructureTypes);
    getCitiesAdmin(setCities);
  }, []);

  const handleFilterChange = (event: any) => {
    const { value, name } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const resetFilters = () => {
    setFilters({
      ...filters,
      city_id: "",
      categories_types_id: "",
      search: "",
      parent_id: "",
    });
    getOrgStructures(
      setData,
      { page: 1, per_page: pagination.per_page },
      setPagination
    );
  };

  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      getAllOrgStructures();
    }
  };

  return (
    <OrgSTListingMain>
      <OrgSTListingTop>
        <div className="left">
          <span className="page-heading">Organizational Structure Listing</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createOrgStructure) && (
            <div className="create-org-btn">
              <button className="lg-rounded-btn" onClick={goToCreateOrgST}>
                + Add Organizational Structure
              </button>
            </div>
          )}
        </div>
      </OrgSTListingTop>
      <FilterSection className="content-radius-shadow">
        <FilterHeader showFilterDropdown={showFilterDropdown}>
          <span className="filter-heading">Filter</span>
          <span className="dropdown-arrow cp" onClick={toggleFilterDropdown}>
            <DownArrowLightgrayMediumSvg className="icon" />
          </span>
        </FilterHeader>
        {showFilterDropdown && (
          <Filters>
            <div className="filter-fields">
              <div className="input-field">
                <label>Structure Type</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      value={filters.categories_types_id}
                      onChange={handleFilterChange}
                      name="categories_types_id"
                    >
                      <option value="">All</option>
                      {structureTypes.map((item: any, index: number) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Parent</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      value={filters.parent_id}
                      onChange={handleFilterChange}
                      name="parent_id"
                    >
                      <option value="">All</option>

                      {structureTypes.map((item: any, index: number) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>City</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      value={filters.city_id}
                      onChange={handleFilterChange}
                      name="city_id"
                    >
                      <option value="">All</option>
                      {cities.map((item: any, index: number) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" onClick={resetFilters}>
                  Reset
                </button>
                <button
                  className="lg-rounded-btn"
                  onClick={() => getAllOrgStructures()}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>

      <OrgSTListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.downloadOrgStructureListPdf) && (
              <div
                className="export-btn"
                onClick={downloadOrgStructuresPdfFile}
              >
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}

            {hasAccess(sitePermissions.downloadOrgStructureListExcel) && (
              <div
                className="export-btn"
                onClick={downloadOrgStructuresExcelFile}
              >
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
              value={filters.search}
              name="search"
              onChange={handleFilterChange}
              onKeyUp={handleSearch}
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
                    <td>
                      {item?.logo ? (
                        <div className="org-logo">
                          <img src={item?.logo} alt="" />
                        </div>
                      ) : (
                        <div className="fallback-logo"></div>
                      )}
                    </td>
                    <td>
                      <div className="mw-150">{item.title}</div>
                    </td>
                    <td>{item?.type?.title}</td>
                    <td>
                      <div className="mw-150">{item?.parent?.title ?? "-"}</div>
                    </td>
                    <td>{item?.city?.title}</td>
                    <td>
                      <div className="table-action-icons">
                        {hasAccess(sitePermissions.editOrgStructure) && (
                          <div
                            className="action-icon"
                            onClick={() => goToUpdateOrgStructure(item.id)}
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
                        {hasAccess(sitePermissions.deleteOrgStructure) && (
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
      </OrgSTListingSection>
    </OrgSTListingMain>
  );
};

export default OrganizationalStructureListing;
