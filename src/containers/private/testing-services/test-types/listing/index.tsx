import { FC, Fragment, useEffect, useState } from "react";
import {
    TestTypesListingMain,
    TestTypesListingSection,
    TestTypesListingTop,
} from "./style";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import { useNavigate } from "react-router-dom";
import useAlert from "hooks/useAlert";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import Pagination from "components/particles/table/pagination";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useAdmissions from "../../../admissions/useHooks";

interface TestTypesListingProps { }

const TestTypesListing: FC<TestTypesListingProps> = ({ }) => {
    const navigate = useNavigate();
    const [queryParams, setQueryParams] = useState({ search: "", page: 1 });
    const { confirmationPopup } = useAlert();
    const { hasAccess } = useStore();

    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const {getAdmissionEntryTests, deleteAdmissionEntryTest } = useAdmissions();
    const columns: string[] = [
        "ID",
        "Name",
        "Fee",
        "Account Code",
        "Total Marks",
        "Passing Marks",
        "Action",
    ];

    const goToCreateTestType = () => {
        navigate(siteRoutes.createTestType);
    };

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };

            deleteAdmissionEntryTest(id, setData, queryParams, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setQueryParams({ ...queryParams, page });
    };

    const goToEdit = (id: number) => {
        navigate(`${siteRoutes.createTestType}?id=${id}`);
    };

    const getAllAdmissionEntryTests = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };

        getAdmissionEntryTests(setData, queryParams, setPagination);
    };

    useEffect(() => {
        getAllAdmissionEntryTests(pagination.page, search);
    }, []);

    return (
        <TestTypesListingMain>
            <TestTypesListingTop>
                <div className="left">
                    <span className="page-heading">Test Types</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createAdmissionTestType) && (
                        <div className="create-org-btn">
                            <button className="lg-rounded-btn" onClick={goToCreateTestType}>
                                + Add New
                            </button>
                        </div>
                    )}
                </div>
            </TestTypesListingTop>
            <TestTypesListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadAdmissionTestTypePDF) && (
                            <div className="export-btn">
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}

                        {hasAccess(sitePermissions.downloadAdmissionTestTypeExcel) && (
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
                            {data.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                            <div className="mw-150">
                                                {item?.title}
                                            </div>
                                        </td>
                                        <td>{item?.fee}</td>
                                        <td>{item?.short_code}</td>
                                        <td>{item?.total_marks}</td>
                                        <td>{item?.obt_marks}</td>
                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(sitePermissions.editAdmissionTestType) && (
                                                    <div
                                                        className="action-icon"
                                                        onClick={() => goToEdit(item?.id)}
                                                    >
                                                        <EditTableSvg />
                                                    </div>
                                                )}

                                                {hasAccess(sitePermissions.deleteAdmissionTestType) && (
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
                    <DataNotFound show={!isLoading && !data.length}/>
                    <Pagination onPageChange={onPageChange} {...pagination}/>
                </Fragment>
            </TestTypesListingSection>
        </TestTypesListingMain>
    );
};

export default TestTypesListing;
