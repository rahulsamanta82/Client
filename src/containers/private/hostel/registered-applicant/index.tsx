import { FC } from "react";
import { RegisteredApplicantSection, RegisteredApplicantMain, RegisteredApplicantTop } from "./style";
import { useState } from "react";
import FormErrorMessage from "components/particles/forms/form-error-message";
import {
    AddPersonSvg,
    CancelRedSvg,
    DownloadPrimaryTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    PrintSvg,
    SearchFieldSvg,
    SmallUploadSvg,
    UploadWhiteSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
// import HostelCreate from '../create';
import Breadcrumb from "components/particles/breadcrumb";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import { useForm } from "react-hook-form";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const RegisterdApplicant: FC = () => {
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
        "CNIC",
        "Name",
        "RegNo",
        "Father Name",
        "Domicile",
        "Pressent Address",
        "Permanent Address",
        "Email",
        "Blood",
        "Gender",
        "Is_Active",
        "Created Date",
        "Action"
    ];

    const items: any = [
        {
            CNIC: 'No data Available in Table'


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
        <RegisteredApplicantMain>
            <RegisteredApplicantTop>
                <div className="left">
                    <span className="page-heading">Applicant Applied for Hostels</span>
                    <Breadcrumb />
                </div>
                <div className="right">

                </div>
            </RegisteredApplicantTop>

            <RegisteredApplicantSection className="content-radius shadow">

                <div className="top-heading">
                    <p>Filter</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>CNIC</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="number"
                                        placeholder="CNIC" />
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="action-button-report">
                                <div className="buttons">
                                    <button className="lg-rounded-btn" type="submit">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>







                </form>
            </RegisteredApplicantSection>



            <RegisteredApplicantSection className="content-radius shadow">
                <div className="action-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn" type="submit">
                            Add New
                        </button>
                    </div>
                </div>
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
                <div className='last-portion'>
                    <div className='drop-down-main'>
                        <p>Show</p>
                        <select name="" id="" className='drop-down'>
                            <option value="0">10</option>
                        </select>
                        <p>enteries</p>
                    </div>

                    <Pagination onPageChange={onPageChange} {...pagination} />
                </div>


            </RegisteredApplicantSection>
        </RegisteredApplicantMain>
    );
};

export default RegisterdApplicant;
