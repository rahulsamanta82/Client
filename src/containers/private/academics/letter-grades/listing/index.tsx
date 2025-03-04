import { FC, Fragment, useEffect, useState } from "react";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
    AcademicLetterGradesListingMain,
    AcademicLetterGradesListingSection,
    AcademicLetterGradesListingTop
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useSelector } from "react-redux";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { LetterGradeDTO } from "utils/helpers/models/academics/letter-grade.dto";
import useAcademics from "../../useHooks";
import DataNotFound from "components/particles/table/data-not-found";

const AcademicLetterGradesListing: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Letter Grades", path: siteRoutes.academicLetterGradesListing },
    ]
    const navigate = useNavigate();
    const { hasAccess } = useStore();
    const { getLetterGrades, deleteLetterGrade } = useAcademics();
    const [data, setData] = useState<LetterGradeDTO[]>([]);
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");
    const columns: string[] = ["Sequential Order", "Letter Grade", "Grading Point", "Action"];

    const goToCreate = () => {
        navigate(siteRoutes.createAcademicLetterGrade);
    };

    useEffect(() => {
        getAllLetterGrades(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteLetterGrade(id, setData, queryParams, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllLetterGrades(page + 1, search);
    };
    const getAllLetterGrades = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getLetterGrades(setData, queryParams, setPagination);
    };

    const goToEdit = (id: number) => {
        navigate(`${siteRoutes.createAcademicLetterGrade}?id=${id}`);
    }

    return (
        <AcademicLetterGradesListingMain>
            <AcademicLetterGradesListingTop>
                <div className="left">
                    <span className="page-heading">Letter Grades</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createAcademicLetterGrade) && <div className="add-new-button">
                        <button className="lg-rounded-btn" onClick={goToCreate}>
                            + Add Letter Grades
                        </button>
                    </div>}
                </div>
            </AcademicLetterGradesListingTop>

            <AcademicLetterGradesListingSection className="content-radius-shadow">
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
                            onChange={(e) => setSearch(e.target.value)}
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
                            {data.map((grade, index) => {
                                return <tr key={index}>
                                    <td>
                                        {grade.sequential_order}
                                    </td>
                                    <td>
                                        {grade.letter_grade}
                                    </td>
                                    <td>
                                        {grade.grade_point}
                                    </td>
                                    <td>
                                        <div className="table-action-icons">
                                            <div className="action-icon" onClick={() => goToEdit(grade.id)}>
                                                <EditTableSvg />
                                            </div>
                                            <div className="action-icon" onClick={() => handleDelete(grade.id)}>
                                                <DeleteTableSvg />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <Fragment>
                    <DataNotFound show={!isLoading && !data.length} />
                    <Pagination
                        onPageChange={onPageChange}
                        {...pagination}
                    />
                </Fragment>
            </AcademicLetterGradesListingSection>
        </AcademicLetterGradesListingMain>
    );
};

export default AcademicLetterGradesListing;
