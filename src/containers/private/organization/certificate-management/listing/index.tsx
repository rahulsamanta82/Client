import { FC, Fragment, useEffect, useState } from "react";
import {
    CertificateManagementListingMain,
    CertificateManagementListingSection,
    CertificateManagementListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    LinkActionSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { DropdownMain } from "components/particles/forms/multiselect-dropdown/style";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useOrganization from "../../useHooks";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";
import useUtils from "hooks/useUtils";

interface AdmissionDocumentsMasterListingProps { }

const CertificateManagementListing: FC<AdmissionDocumentsMasterListingProps> = () => {
    const columns: string[] = [
        "Title",
        "Ask for subject",
        "Is Specialization",
        "Required Subjects",
        "Required Marks",
        "Status",
        "Action",
    ];

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState("");
    const [data, setData] = useState<any[]>([]);
    const navigate = useNavigate();
    const { getDegreeCertificates, deleteDegreeCertificate, updateDegreeCertificate } = useOrganization();
    const { handleSearchChange, handleTableSearch } = useUtils();
    const { isLoading } = useSelector((state: any) => state.sharedReducer);

    const handleClick = () => {
        navigate(siteRoutes.certificateManagementCreate);
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllDegreeCertificates(page + 1, search);
    };
    const getAllDegreeCertificates = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getDegreeCertificates(setData, queryParams, setPagination);
    };

    useEffect(() => {
        getAllDegreeCertificates(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteDegreeCertificate(id, setData, queryParams, setPagination);
        }
    };

    const goToEditDegreeCertificate = (id: number) => {
        navigate(`${siteRoutes.certificateManagementCreate}?id=${id}`);
    };

    const handleUpdateDegreeCertificate = (certificate: any, index: number) => {
        data[index] = certificate;
        setData([...data]);
        const { id } = certificate;
        certificate.level = 'inter';
        delete certificate.created_at;
        delete certificate.updated_at;
        updateDegreeCertificate(id, certificate);
    }
    return (
        <CertificateManagementListingMain>
            <CertificateManagementListingTop>
                <div className="left">
                    <span className="page-heading">Manage Certificate / Degree </span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="add-new-button">
                        <button className="lg-rounded-btn" onClick={handleClick}>
                            + New
                        </button>
                    </div>
                </div>
            </CertificateManagementListingTop>

            <CertificateManagementListingSection className="content-radius-shadow">
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
                            onChange={(e) => handleSearchChange(e, setSearch, getAllDegreeCertificates)}
                            onKeyUp={e => handleTableSearch(e, getAllDegreeCertificates)}
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
                                    <tr key={index}>
                                        <td>
                                            <div className="mw-150">{item.title}</div>
                                        </td>
                                        <td>
                                            <div className="table-radio-field">
                                                <div className="radio">
                                                    <input
                                                        type="radio"
                                                        name={`ask-for-subject-${index}`}
                                                        id={`ask-for-subject-yes-${index}`}
                                                        checked={item.ask_for_subject == 1}
                                                        onChange={() => handleUpdateDegreeCertificate({ ...item, ask_for_subject: 1 }, index)}
                                                    />
                                                    <label htmlFor={`ask-for-subject-yes-${index}`}>
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="radio">
                                                    <input
                                                        type="radio"
                                                        name={`ask-for-subject-${index}`}
                                                        id={`ask-for-subject-no-${index}`}
                                                        checked={item.ask_for_subject == 0}
                                                        onChange={() => handleUpdateDegreeCertificate({ ...item, ask_for_subject: 0 }, index)}
                                                    />
                                                    <label htmlFor={`ask-for-subject-no-${index}`}>
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
                                                        name={`is-specialization-${index}`}
                                                        id={`is-specialization-yes-${index}`}
                                                        checked={item.is_specialization == 1}
                                                        onChange={() => handleUpdateDegreeCertificate({ ...item, is_specialization: 1 }, index)}
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
                                                        checked={item.is_specialization == 0}
                                                        onChange={() => handleUpdateDegreeCertificate({ ...item, is_specialization: 0 }, index)}
                                                    />
                                                    <label htmlFor={`is-specialization-no-${index}`}>
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.required_subjects < 10 ? `0${item.required_subjects}` : item.required_subjects}
                                        </td>
                                        <td>
                                            <div className="table-radio-field">
                                                <div className="radio">
                                                    <input
                                                        type="radio"
                                                        name={`required_marks-${index}`}
                                                        id={`required_marks-yes-${index}`}
                                                        checked={item.required_marks == 1}
                                                        onChange={() => handleUpdateDegreeCertificate({ ...item, required_marks: 1 }, index)}
                                                    />
                                                    <label htmlFor={`required_marks-yes-${index}`}>
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="radio">
                                                    <input
                                                        type="radio"
                                                        name={`required_marks-${index}`}
                                                        id={`required_marks-no-${index}`}
                                                        checked={item.required_marks == 0}
                                                        onChange={() => handleUpdateDegreeCertificate({ ...item, required_marks: 0 }, index)}
                                                    />
                                                    <label htmlFor={`required_marks-no-${index}`}>
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
                                                        name={`is_active-${index}`}
                                                        id={`is_active-yes-${index}`}
                                                        checked={item.is_active == 1}
                                                        onChange={() => handleUpdateDegreeCertificate({ ...item, is_active: 1 }, index)}
                                                    />
                                                    <label htmlFor={`is_active-yes-${index}`}>
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="radio">
                                                    <input
                                                        type="radio"
                                                        name={`is_active-${index}`}
                                                        id={`is_active-no-${index}`}
                                                        checked={item.is_active == 0}
                                                        onChange={() => handleUpdateDegreeCertificate({ ...item, is_active: 0 }, index)}
                                                    />
                                                    <label htmlFor={`is_active-no-${index}`}>
                                                        Deactive
                                                    </label>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="table-action-icons">
                                                <div className="action-icon">
                                                    <LinkActionSvg />
                                                </div>
                                                <div
                                                    className="action-icon"
                                                    onClick={() => goToEditDegreeCertificate(item.id)}
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
                    <Pagination
                        {...pagination}
                        onPageChange={onPageChange}
                    />
                </Fragment>
            </CertificateManagementListingSection>
        </CertificateManagementListingMain>
    );
};

export default CertificateManagementListing;
