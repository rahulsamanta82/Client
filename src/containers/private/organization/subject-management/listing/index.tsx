import { FC, Fragment, useEffect, useState } from "react";
import { SubjectManagementListingMain, SubjectManagementListingSection, SubjectManagementListingTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { DeleteTableSvg, EditTableSvg, ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { DropdownMain } from "components/particles/forms/multiselect-dropdown/style";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useOrganization from "../../useHooks";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useUtils from "hooks/useUtils";


interface AdmissionDocumentsMasterListingProps { }



const SubjectManagementListing: FC<AdmissionDocumentsMasterListingProps> = () => {

    const columns: string[] = [
        'Title',
        'Type',
        'Is Specialization',
        'Status',
        'Action'
    ];

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const { handleSearchChange, handleTableSearch } = useUtils();
    const [data, setData] = useState<any[]>([]);
    const { updateSubject, getSubjects, deleteSubject } = useOrganization();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { isLoading } = useSelector((state: any) => state.sharedReducer);

    const handleClick = () => {
        navigate(siteRoutes.subjectManagementCreate)
    }
    const handleDelete = async (id: number) => {
        const result = await confirmationPopup();
        if (result.isConfirmed) {
            const queryParams = {
                per_page: pagination.per_page,
                page: 1,
            };
            deleteSubject(id, setData, queryParams, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllSubjects(page + 1, search);
    };

    const getAllSubjects = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getSubjects(setData, queryParams, setPagination);
    };

    useEffect(() => {
        getAllSubjects(pagination.page, search);
    }, []);

    const handleEditSubject = (subject: any, index: number) => {
        const { id, is_specialization, is_active, title, type } = subject;
        data[index] = subject;
        setData([...data]);
        updateSubject(id, { is_specialization, is_active, title, type });
    };

    const goToEditSubject = (id: number) => {
        navigate(`${siteRoutes.subjectManagementCreate}?id=${id}`);
    }
    return (
        <SubjectManagementListingMain>
            <SubjectManagementListingTop>
                <div className="left">
                    <span className="page-heading">Manage Subjects </span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="add-new-button">
                        <button className="lg-rounded-btn" onClick={handleClick}>+ Add New</button>
                    </div>
                </div>
            </SubjectManagementListingTop>

            <SubjectManagementListingSection className="content-radius-shadow">
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
                            onChange={(e) => handleSearchChange(e, setSearch, getAllSubjects)}
                            onKeyUp={e => handleTableSearch(e, getAllSubjects)}
                        />
                    </div>
                </div>
                <div className="data-table">
                    <table className="bottom-bordered-cells">
                        <thead>
                            <tr>
                                {columns.map((column: string, index: number) => {
                                    return <th key={index}>{column}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="mw-150">
                                                {item.title}
                                            </div>
                                        </td>
                                        <td className="text-capitalize">{item.type}</td>
                                        <td>
                                            <div className="table-radio-field">
                                                <div className="radio">
                                                    <input
                                                        type="radio"
                                                        name={`is-specialization-${index}`}
                                                        id={`is-specialization-yes-${index}`}
                                                        checked={item?.is_specialization == 1}
                                                        onChange={() => handleEditSubject({ ...item, is_specialization: 1 }, index)}
                                                    />
                                                    <label htmlFor={`is-specialization-yes-${index}`}>
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="radio">

                                                    <input
                                                        type="radio"
                                                        name={`is-specialization-${index}`}
                                                        id={`is-specialization-no-${index}`}
                                                        checked={item?.is_specialization == 0}
                                                        onChange={() => handleEditSubject({ ...item, is_specialization: 0 }, index)}
                                                    />
                                                    <label htmlFor={`is-specialization-no-${index}`}>
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-radio-field">
                                                <div className="radio">
                                                    <input
                                                        type="radio"
                                                        name={`is-active-${index}`}
                                                        id={`is-active-yes-${index}`}
                                                        checked={item?.is_active == 1}
                                                        onChange={() => handleEditSubject({ ...item, is_active: 1 }, index)}
                                                    />
                                                    <label htmlFor={`is-active-yes-${index}`}>
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="radio">

                                                    <input
                                                        type="radio"
                                                        name={`is-active-${index}`}
                                                        id={`is-active-no-${index}`}
                                                        checked={item?.is_active == 0}
                                                        onChange={() => handleEditSubject({ ...item, is_active: 0 }, index)}
                                                    />
                                                    <label htmlFor={`is-active-no-${index}`}>
                                                        Deactive
                                                    </label>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="table-action-icons">
                                                <div
                                                    className="action-icon"
                                                    onClick={() => goToEditSubject(item.id)}
                                                >
                                                    <EditTableSvg />
                                                </div>

                                                <div
                                                    className="action-icon"
                                                    onClick={() => handleDelete(item.id)}
                                                >
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


                <div>
                    <DropdownMain />
                </div>
                <Fragment>
                    <DataNotFound show={!isLoading && !data.length} />
                    <Pagination {...pagination} onPageChange={onPageChange} />
                </Fragment>
            </SubjectManagementListingSection>
        </SubjectManagementListingMain>
    )
}

export default SubjectManagementListing;