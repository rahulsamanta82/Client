import { FC, Fragment, useEffect, useState } from "react";
import {
    AcademicCourseGroupsListingSection,
    AcademicCourseGroupsListingMain,
    AcademicCourseGroupsListingTop,
} from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
    BlackSettingTableSvg,
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
    SettingsSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useFinance from "containers/private/finance/useHooks";
// import { AcademicCourseInfoDTO } from "utils/helpers/models/finance/bank-info.dto";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";

interface AcademicCourseGroupsListingProps { }

const CommonCoursesPoolsListing: FC<AcademicCourseGroupsListingProps> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: 'Academics / ', path: siteRoutes.academicSessionListing },
        { title: 'Common Courses Pools', path: siteRoutes.commonCoursesPoolsListing },
    ]
    const navigate = useNavigate();
    // const { getAcademicCourseInfos, deleteAcademicCourseInfo } = useFinance();
    const [data, setData] = useState<any[]>([]);
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");
    const columns: string[] = [
        "Title",
        "Total Teachers",
        "Action",
    ];

    const { hasAccess } = useStore();
    const { handleSearchChange, handleTableSearch } = useUtils();

    const goToCreateCommonCoursePool = () => {
        navigate(siteRoutes.createCommonCoursesPools);
    };

    useEffect(() => {
        getAllAcademicCourseInfos(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            // deleteAcademicCourseInfo(id, setData, queryParams, setPagination);
        }
    };

    const goToPoolTeachers = () => {
        navigate(siteRoutes.poolTeachersListing);
    }

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllAcademicCourseInfos(page + 1, search);
    };
    const getAllAcademicCourseInfos = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        // getAcademicCourseInfos(setData, queryParams, setPagination);
    };

    const goToEditAcademicCourseInfo = (id: number) => {
        navigate(`${siteRoutes.createAcademicCourse}?id=${id}`);
    }
    return (
        <AcademicCourseGroupsListingMain>
            <AcademicCourseGroupsListingTop>
                <div className="left">
                    <span className="page-heading">Common Courses Pools</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createAcademicCourse) && (
                        <div className="create-fine-slot-btn">
                            <button className="lg-rounded-btn" onClick={goToCreateCommonCoursePool}>
                                + Add Pool
                            </button>
                        </div>
                    )}
                </div>
            </AcademicCourseGroupsListingTop>

            <AcademicCourseGroupsListingSection className="content-radius-shadow">
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
                                handleSearchChange(e, setSearch, getAllAcademicCourseInfos)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllAcademicCourseInfos)}
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
                            {[1, 1, 1, 1, 1, 1, 1].map((bank, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="mw-150">
                                                Islamic Studies
                                            </div>
                                        </td>
                                        <td>17</td>
                                        <td>
                                            <div className="table-action-icons">
                                                <div className="action-icon">
                                                    <EditTableSvg />
                                                </div>
                                                <div className="action-icon" title="Manage Teachers" onClick={goToPoolTeachers}>
                                                    <BlackSettingTableSvg />
                                                </div>
                                                <div className="action-icon">
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
                    {/* <DataNotFound show={!isLoading && !data.length} /> */}
                    <Pagination
                        {...pagination}
                        onPageChange={onPageChange}
                    />
                </Fragment>
            </AcademicCourseGroupsListingSection>
        </AcademicCourseGroupsListingMain>
    );
};

export default CommonCoursesPoolsListing;
