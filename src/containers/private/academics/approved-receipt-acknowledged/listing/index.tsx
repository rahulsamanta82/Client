import { FC, Fragment, useState } from "react";
import {
    ApprovedReceiptAcknowledgedListingSection,
    ApprovedReceiptAcknowledgedListingTop,
    ApprovedReceiptAcknowledgedListingMain,
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

interface ApprovedReceiptAcknowledgedListingProps { }

const ApprovedReceiptAcknowledgedListing: FC<
    ApprovedReceiptAcknowledgedListingProps
> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics/ ", path: siteRoutes.academicSessionListing },
        {
            title: "Approved & Receipt Acknowledged",
            path: siteRoutes.approvedReceiptAcknowledgedListing,
        },
    ];

    const navigate = useNavigate();

    const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);

    const columns: string[] = [
        "Campus",
        "Department",
        "Course",
        "Course Code",
        "Teachers",
        "Approved",
        "Acknowledged",
        "Action",
    ];

    const [data, setData] = useState<any[]>([]);

    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown);
    };

    const goToViewAwardList = () => {
        navigate(siteRoutes.appRecAckViewAwardList);
    }

    return (
        <ApprovedReceiptAcknowledgedListingMain>
            <ApprovedReceiptAcknowledgedListingTop>
                <div className="left">
                    <span className="page-heading">Approved & Receipt Acknowledged</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </ApprovedReceiptAcknowledgedListingTop>

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
                                <label htmlFor="">Session</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select>
                                            <option value="">Select Session</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label htmlFor="">Campus</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select>
                                            <option value="">Select Campus</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label htmlFor="">Department</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select>
                                            <option value="">Select Department</option>
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
            <ApprovedReceiptAcknowledgedListingSection className="content-radius-shadow">
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
                                                BAHAWALPUR
                                            </td>
                                            <td>
                                                <div className="mw-150">
                                                    Department of Economics
                                                </div>
                                            </td>
                                            <td>
                                                <div className="mw-150">
                                                    Introduction to Development Economics
                                                </div>
                                            </td>
                                            <td>ECON-00203</td>
                                            <td>rashid.sattar</td>
                                            <td>
                                                <div className="status">
                                                    <span className="status-tile green">Yes</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="status">
                                                    <span className="status-tile green">Yes</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="table-action-icons">
                                                    <div className="action-icon" onClick={goToViewAwardList}>
                                                        <BlackTableViewSvg />
                                                    </div>
                                                    <div className="action-icon">
                                                        <DeleteTableSvg />
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
            </ApprovedReceiptAcknowledgedListingSection>
        </ApprovedReceiptAcknowledgedListingMain>
    );
};

export default ApprovedReceiptAcknowledgedListing;
