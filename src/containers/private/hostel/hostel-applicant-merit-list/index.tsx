import { FC } from "react";
import { HostelApplicantMeritListSection, HostelApplicantMeritListMain, HostelApplicantMeritListTop } from "./style";
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

const HostelApplicantMeritList: FC = () => {
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

    const onSubmit = (formData: AddEntryTestDTO) => {
        console.log(formData, "formdata");
    };

    const columns: string[] = [
        "Sr#",
        "CNIC",
        "RegNo",
        "Student Name",
        "Gender",
        "Status",
        "Status Title",
        "Due Date Voucher Status",
        "Free Quota",
        "Action"
    ];

    const items: any = [
        {
            CNIC: "No data available in table",



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
        navigate(siteRoutes.createHostelRoom)
    };

    return (
        <HostelApplicantMeritListMain>
            <HostelApplicantMeritListTop>
                <div className="left">
                    <span className="page-heading">Applicant Applied for Hostels</span>
                    <Breadcrumb />
                </div>
                <div className="right">

                </div>
            </HostelApplicantMeritListTop>

            <HostelApplicantMeritListSection className="content-radius shadow">

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
                            <label>Select Merit List</label>
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
                    </div>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Select Gender</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select name="" id="">
                                        <option value="">Male</option>
                                        <option value="">Female</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Gender</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select name="" id="">
                                        <option value="">Male</option>
                                        <option value="">Female</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>CNIC</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="number" />
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                    </div>






                    <div className="action-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn gray" type="reset">
                                Reset
                            </button>

                            <button className="lg-rounded-btn" type="submit">
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </form>
            </HostelApplicantMeritListSection>

            <HostelApplicantMeritListSection className="content-radius shadow">
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
                        <div className="export-btn">
                            <span>
                                <PrintSvg className="icon" />
                            </span>
                            <span className="text">Print</span>
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
                            {items?.map((items: any, index: number) => {
                                return (
                                    <tr key={index}>

                                        <td>
                                            <div className="">{items.CNIC}</div>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>


            </HostelApplicantMeritListSection>
        </HostelApplicantMeritListMain>
    );
};

export default HostelApplicantMeritList;
