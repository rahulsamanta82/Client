import { FC, Fragment, useState } from "react";
import {
    CallTableSvg,
    DeleteTableSvg,
    DownArrowLightgrayMediumSvg,
    EditTableSvg,
    ExcelSvg,
    MessageTableSvg,
    PdfSvg,
    SearchFieldSvg,
    TabPrimaryActionMenu,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
    StudentRegListingMain,
    StudentRegListingSection,
    StudentRegListingTop,
    FilterHeader,
    Filters,
    FilterSection,
} from "./style";
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface StudentRegListingProps { }

const StudentRegListing: FC<StudentRegListingProps> = ({ }) => {
    const [data, setData] = useState<any[]>([
        { isExpanded: false },
        { isExpanded: false },
        { isExpanded: false },
        { isExpanded: false },
    ]);
    const { hasAccess } = useStore();
    const [search, setSearch] = useState("");
    const {
        isComponentVisible: showDropdownMenu,
        setIsComponentVisible: setShowDropdownMenu,
        ref: dropdownMenuRef,
    } = useComponentVisible(false);
    const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const columns: string[] = [
        "",
        "Application No.",
        "Name",
        "CNIC",
        "Academic Session",
        "Program",
        "Fee Status",
    ];

    const toggleRowExpand = (index: number) => {
        const dat = [...data];
        dat[index].isExpanded = !dat[index].isExpanded;
        setData([...dat]);
    };

    const toggleFilterDropdown = () => {
        setOpenFilterDropdown(!openFilterDropdown);
    };

    const toggleDropdownMenu = () => {
        setShowDropdownMenu(!showDropdownMenu);
    };

    return (
        <StudentRegListingMain>
            <StudentRegListingTop>
                <div className="left">
                    <span className="page-heading">Student Registration</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="menu-bar" ref={dropdownMenuRef}>
                        <div className="menu-button cp" onClick={toggleDropdownMenu}>
                            <TabPrimaryActionMenu />
                        </div>
                        {showDropdownMenu && (
                            <div className="dropdown-menu content-radius-shadow">
                                <div className="particular-menu">
                                    <span className="text">City Head Count Campus Wise</span>
                                </div>
                                <div className="particular-menu">
                                    <span className="text">
                                        City Head Count Campus Wise(Combine){" "}
                                    </span>
                                </div>
                                <div className="particular-menu">
                                    <span className="text">
                                        City Head Count Campus Faculty Wise
                                    </span>
                                </div>
                                <div className="particular-menu">
                                    <span className="text">
                                        City Head Count Campus Faculty Wise(Combine)
                                    </span>
                                </div>
                                <div className="particular-menu">
                                    <span className="text">Anomalies</span>
                                </div>
                                <div className="particular-menu">
                                    <span className="text">Bulk Admit Application</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </StudentRegListingTop>

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
                                        <select>
                                            <option value="">All Programs</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Category</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select>
                                            <option value="">2023</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Select Program</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="city_id">
                                            <option value="">All</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Fee Status</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="city_id">
                                            <option value="">Paid</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Check List</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="city_id"></select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Admission Type</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="city_id"></select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Hostel Facility</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="city_id"></select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Admission Eligibility</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="city_id"></select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>CNIC</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input type="text" name="" id="" />
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
            <StudentRegListingSection className="content-radius-shadow">
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
                                            <td>
                                                <div className="mw-150">BWP-5425-54</div>
                                            </td>
                                            <td>
                                                <div className="mw-100">Jessica Baker</div>
                                            </td>
                                            <td>
                                                <div className="mw-150">31203-3567057-2</div>
                                            </td>
                                            <td>
                                                <div className="mw-150">Fall 2024</div>
                                            </td>
                                            <td>
                                                <div className="mw-150">BS Computer Science</div>
                                            </td>
                                            <td>
                                                <span className="status-tile green">Paid</span>
                                            </td>
                                        </tr>

                                        {item.isExpanded && (
                                            <tr>
                                                <td></td>
                                                <td colSpan={7}>
                                                    <div className="expanded-content">
                                                        <div className="particular-info">
                                                            <span className="title">Check List</span>
                                                            <span className="info">--</span>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">Admission Type</span>
                                                            <span className="info">--</span>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">Hostel Facility</span>
                                                            <div className="info">
                                                                <span className="status">--</span>
                                                            </div>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">
                                                                Admission Eligibility
                                                            </span>
                                                            <div className="info">
                                                                <span className="status">--</span>
                                                            </div>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">Reg Date</span>
                                                            <div className="info">
                                                                <span className="status">2023-08-21</span>
                                                            </div>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">Action</span>
                                                            <div className="info">
                                                                <div className="table-action-icons">
                                                                    {hasAccess(
                                                                        sitePermissions.studentRegEdit
                                                                    ) && (
                                                                            <div className="action-icon">
                                                                                <EditTableSvg />
                                                                            </div>
                                                                        )}

                                                                    <div className="action-icon">
                                                                        <CallTableSvg />
                                                                    </div>

                                                                    <div className="action-icon">
                                                                        <MessageTableSvg />
                                                                    </div>

                                                                    {hasAccess(
                                                                        sitePermissions.studentRegDelete
                                                                    ) && (
                                                                            <div className="action-icon">
                                                                                <DeleteTableSvg />
                                                                            </div>
                                                                        )}
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
                        onPageChange={(page: any) => console.log(page)}
                        {...pagination}
                    />
                </Fragment>
            </StudentRegListingSection>
        </StudentRegListingMain>
    );
};

export default StudentRegListing;
