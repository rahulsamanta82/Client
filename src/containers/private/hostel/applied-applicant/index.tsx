import { FC } from "react";
import {
    AppliedApplicantSection,
    AppliedApplicantMain,
    AppliedApplicantTop,
} from "./style";
import { useState } from "react";
import FormErrorMessage from "components/particles/forms/form-error-message";
import {
    AddPersonSvg,
    CancelRedSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    PrintSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
// import HostelCreate from '../create';
import Breadcrumb from "components/particles/breadcrumb";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import { useForm } from "react-hook-form";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

const AppliedApplicant: FC = () => {
    const [formData, setFormData] = useState<AddEntryTestDTO>(
        new AddEntryTestDTO()
    );

    const {
        handleSubmit,
        register,
        trigger,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<any>({ defaultValues: formData });
    const { hasAccess } = useStore();

    const onSubmit = (formData: AddEntryTestDTO) => {
        console.log(formData, "formdata");
    };

    const columns: string[] = [
        "",
        "Application No",
        "CNIC",
        "Registration No",
        "Student Name",
        "Action",
    ];

    const items: any = [
        {
            ApplicationNo: "345678",
            CNIC: "31303-5280411-9",
            RegistrationNo: "F20BAGRI1O01089",
            StudentName: "Asad Shahid",
        },
        {
            ApplicationNo: "345678",
            CNIC: "31303-5280411-9",
            RegistrationNo: "F20BAGRI1O01089",
            StudentName: "Asad Shahid",
        },
    ];

    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllOrganizations(page + 1);
    };
    const getAllOrganizations = (page: number = 1) => {
        // getOrganizations(setData, { ...pagination, page }, setPagination, search);
    };
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(siteRoutes.createHostelRoom);
    };

    return (
        <AppliedApplicantMain>
            <AppliedApplicantTop>
                <div className="left">
                    <span className="page-heading">Applicant Applied for Hostels</span>
                    <Breadcrumb />
                </div>
                <div className="right"></div>
            </AppliedApplicantTop>

            {hasAccess(sitePermissions.filterAppliedApplicants) && <AppliedApplicantSection className="content-radius shadow">
                <div className="top-heading">
                    <p>Filter</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Select Session</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option>Select One</option>
                                        <option>Select Two</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Select Voucher Status</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option>Select One</option>
                                        <option>Select Two</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Select Application Status</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option>Select One</option>
                                        <option>Select Two</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                    </div>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Form Date</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="date" />
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>To Date</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="date" />
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>CHC's Approval</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option>None</option>
                                        <option>Select Two</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                    </div>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Student Status</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option>Select One</option>
                                        <option>Select Two</option>
                                        <option>None</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>HOD's Approval</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option value="">None</option>
                                        <option>Select One</option>
                                        <option>Select Two</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Chief Warden's Approval</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option value="">None</option>
                                        <option>Select One</option>
                                        <option>Select Two</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                    </div>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Warden's Approval</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option value="">None</option>
                                        <option>Select One</option>
                                        <option>Select Two</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Assisstant Warden's Approval</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option value="">None</option>
                                        <option>Select One</option>
                                        <option>Select Two</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Registration #</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="number" />
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                    </div>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>CNIC</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="number" />
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn" type="submit">
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </AppliedApplicantSection>}

            <AppliedApplicantSection className="content-radius shadow">
                <div className="flex">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadAppliedApplicantsPDF) && (
                            <div className="export-btn">
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}

                        {hasAccess(sitePermissions.downloadAppliedApplicantsExcel) && (
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
                            {items?.map((items: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div>
                                                {" "}
                                                <input type="checkbox" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="">{items.ApplicationNo}</div>
                                        </td>

                                        <td>
                                            <div>{items.CNIC}</div>
                                        </td>
                                        <td>{items.RegistrationNo}</td>
                                        <td className="mw-150">{items.StudentName}</td>

                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(sitePermissions.acceptAppliedApplicant) && (
                                                    <div className="action-icon">
                                                        <AddPersonSvg />
                                                    </div>
                                                )}
                                                {hasAccess(sitePermissions.rejectAppliedApplicant) && (
                                                    <div className="action-icon">
                                                        <CancelRedSvg />
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
            </AppliedApplicantSection>
        </AppliedApplicantMain>
    );
};

export default AppliedApplicant;
