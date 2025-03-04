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
    StudentSpecializationsListingMain,
    StudentSpecializationsListingSection,
    StudentSpecializationsListingTop
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import { StudentSpecializationDTO } from "utils/helpers/models/academics/student-specialization.dto";
import useStore from "hooks/useStore";
import useUtils from "hooks/useUtils";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useAcademics from "../../useHooks";
import { useSelector } from "react-redux";

const StudentSpecializationsListing: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Student Specialization", path: siteRoutes.studentSpecializationsListing },
    ];
    const columns: string[] = ["Title", "Status", "Action"];

    const navigate = useNavigate();
    const { getStudentSpecializations, deleteStudentSpecialization, updateStudentSpecialization } = useAcademics();
    const [data, setData] = useState<StudentSpecializationDTO[]>([]);
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
      page: 1,
      per_page: 10,
      totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");
  
    const { hasAccess } = useStore();
    const { handleSearchChange, handleTableSearch } = useUtils();
  
    useEffect(() => {
      getAllStudentSpecializations(pagination.page, search);
    }, []);
  
    const handleDelete = async (id: number) => {
      const response = await confirmationPopup();
      if (response.isConfirmed) {
        const queryParams = {
          page: 1,
          per_page: pagination.per_page,
        };
        deleteStudentSpecialization(id, setData, queryParams, setPagination);
      }
    };
  
    const onPageChange = (pageInfo: { selected: number }) => {
      const { selected: page } = pageInfo;
      setPagination({ ...pagination, page: page + 1 });
      getAllStudentSpecializations(page + 1, search);
    };
    const getAllStudentSpecializations = (page: number, search: string) => {
      const queryParams = {
        per_page: pagination.per_page,
        page,
        search,
      };
      getStudentSpecializations(setData, queryParams, setPagination);
    };

    const goToCreate = () => {
        navigate(siteRoutes.createStudentSpecialization);
    };

    const goToEdit = (id: number) => {
        navigate(`${siteRoutes.createStudentSpecialization}?id=${id}`);
    };

    const handleUpdateStatus = (specialization: StudentSpecializationDTO, index: number) => {
        const { id } = specialization;
        data[index] = specialization;
        setData([...data]);
        updateStudentSpecialization(id, specialization);
    }

    return (
        <StudentSpecializationsListingMain>
            <StudentSpecializationsListingTop>
                <div className="left">
                    <span className="page-heading">Student Specialization</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    <div className="add-new-button">
                        <button className="lg-rounded-btn" onClick={goToCreate}>
                            + Add Specialization
                        </button>
                    </div>
                </div>
            </StudentSpecializationsListingTop>

            <StudentSpecializationsListingSection className="content-radius-shadow">
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
                            {data.map((status, index) => {
                                return <tr key={index}>
                                    <td>
                                        <div className="mw-150">
                                            {status.title}
                                        </div>
                                    </td>
                                    <td>
                                    <div className="table-radio-field">
                                                <div className="radio">
                                                    <label htmlFor={`status-active-${index}`}>
                                                        Active
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name={`status-${index}`}
                                                        id={`status-active-${index}`}
                                                        checked={status.status == 1}
                                                        onChange={() => handleUpdateStatus({...status, status: 1}, index)}
                                                    />
                                                </div>
                                                <div className="radio">
                                                    <label htmlFor={`status-inactive-${index}`}>
                                                        Inactive
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name={`status-${index}`}
                                                        id={`status-inactive-${index}`}
                                                        checked={status.status == 0}
                                                        onChange={() => handleUpdateStatus({...status, status: 0}, index)}
                                                    />
                                                </div>
                                            </div>
                                    </td>
                                    <td>
                                        <div className="table-action-icons">
                                            <div className="action-icon" onClick={() => goToEdit(status.id)}>
                                                <EditTableSvg />
                                            </div>
                                            <div className="action-icon" onClick={() => handleDelete(status.id)}>
                                                <DeleteTableSvg />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <Fragment>
                        <Pagination
                            onPageChange={onPageChange}
                            {...pagination}
                        />
                    </Fragment>
                </div>
            </StudentSpecializationsListingSection>
        </StudentSpecializationsListingMain>
    );
};

export default StudentSpecializationsListing;
