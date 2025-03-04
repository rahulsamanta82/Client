import { FC, Fragment, useState } from "react";
import {
    ConsolidatedResultsListingSection,
    ConsolidatedResultsListingTop,
    ConsolidatedResultsListingMain,
    FilterSection,
    FilterHeader,
    Filters,
} from "./style";
import {
    BlackTableViewSvg,
    DeleteTableSvg,
    DownArrowLightgrayMediumSvg,
    ExcelSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

interface ConsolidatedResultsListingProps { }

const ConsolidatedResultsListing: FC<
    ConsolidatedResultsListingProps
> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics/ ", path: siteRoutes.academicSessionListing },
        {
            title: "Consolidated Results",
            path: siteRoutes.consolidatedResultsListing,
        },
    ];

    const navigate = useNavigate();

    const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);

    const columns: string[] = [
        "Program",
        "Campus",
        "Submitted Courses",
        "Verified Courses",
        "Action",
    ];

    const [data, setData] = useState<any[]>([]);

    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown);
    };

    const goToSectionCourses = () => {
        navigate(siteRoutes.sectionCoursesListing);
    }

    return (
        <ConsolidatedResultsListingMain>
            <ConsolidatedResultsListingTop>
                <div className="left">
                    <span className="page-heading">Consolidated Results</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </ConsolidatedResultsListingTop>

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
                                <label htmlFor="">Select Academic Section</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select>
                                            <option value="">Select Academic Section</option>
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
            <ConsolidatedResultsListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
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
                        <input type="search" placeholder="Search" />
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
                            {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <tr>
                                            <td>
                                                <div className="mw-150p">
                                                    Advanced diploma in Clinical Psychology
                                                </div>
                                            </td>
                                            <td>
                                                BAHAWALPUR
                                            </td>
                                            <td>
                                                16
                                            </td>
                                            <td>10</td>
                                            <td>
                                                <div className="table-action-buttons">
                                                    <div className="table-action-button" onClick={goToSectionCourses}>
                                                        <button>View Sections</button>
                                                    </div>
                                                    <div className="table-action-button">
                                                        <button className="black">View Positions</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </ConsolidatedResultsListingSection>
        </ConsolidatedResultsListingMain>
    );
};

export default ConsolidatedResultsListing;
