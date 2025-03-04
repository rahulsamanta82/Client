import { FC, Fragment, useEffect, useState } from "react";
import {
    DownArrowLightgrayMediumSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
    AbsentEmployeesListingMain,
    AbsentEmployeesListingSection,
    AbsentEmployeesListingTop,
    FilterHeader,
    Filters,
    FilterSection,
} from "./style";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TestScheduleDTO } from "utils/helpers/models/testing-service/test-schedule.dto";
import useUtils from "hooks/useUtils";
// import useTestingServices from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";
import useAdmissions from "containers/private/admissions/useHooks";

const AbsentEmployeesListing: FC = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
        { title: "Absent Employees", path: siteRoutes.absentEmployeesListing },
    ]
    const navigate = useNavigate();
    // const { getTestSchedules, deleteTestSchedule, getTestingCenters, updateTestSchedule } = useTestingServices();
    const [search, setSearch] = useState<string>("");
    const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
    const [data, setData] = useState<TestScheduleDTO[]>([]);
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [testCenters, setTestCenters] = useState<TestingCenterDTO[]>([]);
    const [tests, setTests] = useState<any[]>([]);
    const [sessions, setSessions] = useState<any[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1
    });

    const { hasAccess } = useStore();
    const [filters, setFilters] = useState<any>({
        test_id: '',
        session_id: '',
        test_center_id: '',
        batch: ''
    })
    const { handleSearchChange, handleTableSearch } = useUtils();
    const { getAdmissionEntryTests, getAdmissionSessions } = useAdmissions();
    const columns: string[] = [
        "EMP NO",
        "Name",
        "Designation",
        "Department",
        "Absent Days",
        "Action",
    ];

    const toggleFilterDropdown = () => {
        setOpenFilterDropdown(!openFilterDropdown);
    };

    const goToCreateTestCenter = () => {
        navigate(siteRoutes.createTestingServicesTestSchedule);
    };

    const goToSeatingPLan = (id: number) => {
        // navigate(siteRoutes.testingServicesTestScheduleSeatingPlanlist);
        navigate(`${siteRoutes.testingServicesTestScheduleSeatingPlanlist}?schedule_id=${id}`);
    };

    useEffect(() => {
        // getAllTestSchedules(pagination.page, search, filters);
        // getTestingCenters(setTestCenters);
        // getAdmissionEntryTests(setTests);
        // getAdmissionSessions(setSessions);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            // deleteTestSchedule(id, setData, queryParams, setPagination);
        }
    };

    const toggleRowExpand = (index: number) => {
        (data as any)[index].isDropdownOpen = !(data as any)[index].isDropdownOpen;
        setData([...data]);
    }

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllTestSchedules(page + 1, search, filters);
    };
    const getAllTestSchedules = (page: number, search: string, filters: any) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
            ...filters
        };
        // getTestSchedules(setData, queryParams, setPagination);
    };

    const handleFilterChange = (event: any) => {
        const { value, name } = event.target;
        setFilters({ ...filters, [name]: value });
    }

    const resetFilters = () => {
        for (let key in filters) {
            filters[key] = '';
        }

        setFilters({ ...filters });
        getAllTestSchedules(1, search, filters);
    }

    const handleUpdateScheduleStatus = (schedule: TestScheduleDTO, index: number) => {
        data[index] = schedule;
        setData([...data]);
        // updateTestSchedule(schedule.id, schedule);
    }

    return (
        <AbsentEmployeesListingMain>
            <AbsentEmployeesListingTop>
                <div className="left">
                    <span className="page-heading">Absent Employees</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </AbsentEmployeesListingTop>

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
                                <label>From date</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input type="date" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>To date</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input type="date" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Test Name</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="test_id" value={filters.test_id} onChange={handleFilterChange}>
                                            <option value="">Select Name</option>
                                            {tests.map((test: any, index: number) => {
                                                return <option value={test.id} key={index}>{test.title}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Title</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                                            <option value="">All Titles</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Job Designations</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                                            <option value="">All Designations</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>BPS</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                                            <option value="">All BPS</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Bio Data Form</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                                            <option value="">Yes</option>
                                            <option value="">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Is HOD</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                                            <option value="">Yes</option>
                                            <option value="">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Is Teaching</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                                            <option value="">Yes</option>
                                            <option value="">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Type of Job</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                                            <option value="">All Job Type</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Job Status</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                                            <option value="">All Job Status</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Department</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                                            <option value="">All Departments</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Gender</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                                            <option value="">All Genders</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>ERV</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                                            <option value="">All ERV</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="submit-buttons">
                            <div className="buttons">
                                <button className="lg-rounded-btn gray" onClick={resetFilters}>Reset</button>
                                <button className="lg-rounded-btn" onClick={() => getAllTestSchedules(1, search, filters)}>Apply Filters</button>
                            </div>
                        </div>
                    </Filters>
                )}
            </FilterSection>
            <AbsentEmployeesListingSection className="content-radius-shadow">
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
                            onChange={(e) => handleSearchChange(e, setSearch, getAllTestSchedules)}
                            onKeyUp={e => handleTableSearch(e, getAllTestSchedules)}
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
                            {[1, 1, 1, 1, 1, 1, 1].map((schedule, index) => {
                                return <tr key={index}>
                                    <td>420001</td>
                                    <td>
                                        <div className="mw-150">
                                            Mr. Muhammad Tariq Iqbal
                                        </div>
                                    </td>
                                    <td>Legal Advisor</td>
                                    <td>Litigation Cell</td>
                                    <td>2</td>
                                    <td>
                                        <div className="table-action-buttons">
                                            <div className="table-action-button">
                                                <button className="black">View Attendance</button>
                                            </div>
                                            <div className="table-action-button">
                                                <button>Apply Leave</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <Fragment>
                    {/* <DataNotFound show={!isLoading && !data.length} /> */}
                    <Pagination
                        onPageChange={onPageChange}
                        {...pagination}
                    />
                </Fragment>
            </AbsentEmployeesListingSection>
        </AbsentEmployeesListingMain>
    );
};

export default AbsentEmployeesListing;
