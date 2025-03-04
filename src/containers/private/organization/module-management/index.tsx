import { FC, useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import {
    ModuleManagementMain,
    ModuleManagementTop,
    ModuleManagementSection,
} from "./style";
import { EditTableSvg, ExcelSvg, PdfSvg, SearchFieldSvg, UploadWhiteSvg } from "assets/images/common/svgs";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import Pagination from "components/particles/table/pagination";

interface AdmissionStudentListingProps { }

const ModuleManagement: FC<AdmissionStudentListingProps> = ({ }) => {
    const [data, setData] = useState<any[]>([
        { isExpanded: false },
        { isExpanded: false },
        { isExpanded: false },
        { isExpanded: false },
    ]);
    const [search, setSearch] = useState("");
    const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
    };

    const columns: string[] = ["", "Name", "", "Action"];
    const [items, setItems] = useState<any[]>([
        { ModuleName: "Admins" },
        { ModuleName: "Campus" },
        { ModuleName: "Categories" },
        { ModuleName: "Cities" },
        { ModuleName: "Department" },
        { ModuleName: "Employees" },
        { ModuleName: "Faculties" },
    ]);

    const navigate = useNavigate();

    const handleClick = () => {
        // navigate(siteRoutes.permissionManagementCreate);
    };

    return (
        <ModuleManagementMain>
            <ModuleManagementTop>
                <div className="left">
                    <span className="page-heading">Modules</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="submit-buttons">
                        <button className="lg-rounded-btn">
                            <UploadWhiteSvg /> Upload Module
                        </button>
                    </div>
                </div>
            </ModuleManagementTop>

            <ModuleManagementSection className="content-radius shadow">
                <div className="flex">
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
                        <input type="search" placeholder="Search" />
                    </div>
                </div>

                <div className="data-table">
                    <table className="bottom-bordered-cells">
                        <thead>
                            <tr>
                                {columns.map((column: string, index: number) => (
                                    <th key={index}>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {items?.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td>
                                        <input type="checkbox" />
                                    </td>

                                    <td>
                                        <div className="">{item.ModuleName}</div>
                                    </td>

                                    <td></td>

                                    <td>
                                        <div className="table-action-icons">
                                            <div className="action-icon">
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="last-portion">
                    <div className="drop-down-div">
                        <p>Show</p>
                        <select name="" id="" className="drop-down">
                            <option value="0">10</option>
                        </select>
                        <p>entries</p>
                    </div>
                    <div className="paginate-div">
                        <Pagination onPageChange={onPageChange} {...pagination} />
                    </div>
                </div>
            </ModuleManagementSection>
        </ModuleManagementMain>
    );
};

export default ModuleManagement;
