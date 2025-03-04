import { FC, Fragment, useEffect, useState } from "react";
import {
  AcademicSectionsListingSection,
  AcademicSectionsListingMain,
  AcademicSectionsListingTop,
  FilterSection,
  FilterHeader,
  Filters,
} from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useFinance from "containers/private/finance/useHooks";
// import { AcademicSectionDTO } from "utils/helpers/models/finance/bank-info.dto";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useAcademics from "../../useHooks";
import { AcademicSectionDTO } from "utils/helpers/models/academics/academic-section.dto";
import useOrganization from "containers/private/organization/useHooks";

interface AcademicSectionsListingProps {}

const AcademicSectionsListing: FC<AcademicSectionsListingProps> = ({}) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    { title: "Sections", path: siteRoutes.academicSectionsListing },
  ];
  const navigate = useNavigate();
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
  // const { getAcademicSections, deleteAcademicSection } = useFinance();
  const [data, setData] = useState<AcademicSectionDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [programs, setPrograms] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<any>({
    program_id: '',
    section_size: '',
    academic_session_id: ''
  })
  const columns: string[] = [
    "Section Title",
    "Program",
    "Department",
    // "Section size(Readonly)",
    "Section size",
    "Semester No",
    "Shift",
    "Sequence No.",
    "Is First Half",
    "Is Active",
    "Action",
  ];

  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch } = useUtils();
  const { getAcademicSections, deleteAcademicSection} = useAcademics();
  const { getPrograms } = useOrganization();

  const goToCreate = () => {
    navigate(siteRoutes.createAcademicSection);
  };

  useEffect(() => {
    getAllAcademicSections(pagination.page, search, filters);
    getPrograms(setPrograms);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteAcademicSection(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllAcademicSections(page + 1, search, filters);
  };
  const getAllAcademicSections = (page: number, search: string, filters: any) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      ...filters
    };
    getAcademicSections(setData, queryParams, setPagination);
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };
  const goToRooms = (id: number) => {
    navigate(siteRoutes.academicSectionRoomsListing);
  };

  const goToEdit = (id: number) => {
    navigate(`${siteRoutes.createAcademicSection}?id=${id}`);
  }

  const handleFilterChange = (event: any) => {
    const {name,value} = event.target;
    setFilters({...filters, [name]: value});
  }

  const resetFilters = () => {
    for(let key in filters){
      filters[key] = '';
    }

    getAllAcademicSections(1, search, filters);

    setFilters({...filters});
  }

  return (
    <AcademicSectionsListingMain>
      <AcademicSectionsListingTop>
        <div className="left">
          <span className="page-heading">Sections</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createAcademicCourse) && (
            <div className="create-fine-slot-btn">
              <button className="lg-rounded-btn" onClick={goToCreate}>
                + Add Section
              </button>
            </div>
          )}
        </div>
      </AcademicSectionsListingTop>

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
                <label htmlFor="">Academic Session</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Academic Session</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Program</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.progarm_id} onChange={handleFilterChange} name="program_id">
                      <option value="">Select Program</option>
                      {programs.map((program,index) => {
                        return <option value={program.id} key={index}>{program.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Section Size</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="number" value={filters.section_size} onChange={handleFilterChange} name="section_size"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" onClick={resetFilters}>Reset</button>
                <button className="lg-rounded-btn" onClick={() => getAllAcademicSections(1,search,filters)}>Apply Filters</button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>

      <AcademicSectionsListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllAcademicSections)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllAcademicSections)}
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
              {data.map((section, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="mw-100">{section.title}</div>
                    </td>
                    <td>
                      <div className="mw-150">BS Pakistan Studies(M)</div>
                    </td>
                    <td>
                      <div className="mw-150">Department of Physics</div>
                    </td>
                    {/* <td>21</td> */}
                    <td>{section.enrollment_size}</td>
                    <td>{section.semester_number}</td>
                    <td>{section.Shift}</td>
                    <td>{section.sequence_number}</td>
                    <td>
                      <div className="status">
                        {section.is_first_half == 1 ? <span className="status-tile green">Yes</span> : <span className="status-tile red">No</span>}
                      </div>
                    </td>
                    <td>
                    {section.is_active == 1 ? <span className="status-tile green">Yes</span> : <span className="status-tile red">No</span>}
                    </td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon" onClick={() => goToEdit(section.id)}>
                          <EditTableSvg />
                        </div>
                        <div className="action-button" onClick={() => goToRooms(section.id)}>
                          <button className="room-btn">Rooms</button>
                        </div>
                        <div className="action-icon" onClick={() => handleDelete(section.id)}>
                          <DeleteTableSvg />
                        </div>
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
          <Pagination {...pagination} onPageChange={onPageChange} />
        </Fragment>
      </AcademicSectionsListingSection>
    </AcademicSectionsListingMain>
  );
};

export default AcademicSectionsListing;
