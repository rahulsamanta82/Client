import { FC } from "react";
import { FinanceManagementSection, FinanceManagementMain, FinanceManagementTop } from "./style";
import { useState } from "react";
import FormErrorMessage from "components/particles/forms/form-error-message";
import {
    CallTableSvg,
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    MessageTableSvg,
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

const FinanceManagement: FC = () => {
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
        "Session Tile",
        "Start Date",
        "End Date",
        "Voucher Status",
        "Action",
    ];

    const items: any = [
        {
            CNIC: "31109-5467012-8",
            SessionTile: "Fall 2019",
            StartDate: "25-05-2019",
            EndDate: "25-05-2020",
            VoucherStatus: "Pending",
        },
        {
            CNIC: "31109-5467012-8",
            SessionTile: "Fall 2019",
            StartDate: "25-05-2019",
            EndDate: "25-05-2020",
            VoucherStatus: "Pending",
        },
        {
            CNIC: "31109-5467012-8",
            SessionTile: "Fall 2019",
            StartDate: "25-05-2019",
            EndDate: "25-05-2020",
            VoucherStatus: "Pending",
        },
        {
            CNIC: "31109-5467012-8",
            SessionTile: "Fall 2019",
            StartDate: "25-05-2019",
            EndDate: "25-05-2020",
            VoucherStatus: "Pending",
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
        <FinanceManagementMain>
            <FinanceManagementTop>
                <div className="left">
                    <span className="page-heading">Finance | Applicant Applied for Hostels</span>
                    <Breadcrumb />
                </div>
                <div className="right">

                </div>
            </FinanceManagementTop>

            <FinanceManagementSection className="content-radius shadow">

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
                    </div>
                    <div className="btn-parent">
                        <div className="buttons">
                            <button className="lg-rounded-btn">Search</button>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn gray" type="reset">
                                Reset
                            </button>

                            <button className="lg-rounded-btn" type="submit">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </FinanceManagementSection>

            <FinanceManagementSection className="content-radius shadow">
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

                                        <td>
                                            <div>{items.SessionTile}</div>
                                        </td>
                                        <td>{items.StartDate}</td>
                                        <td className="mw-150">{items.EndDate}</td>
                                        <td>{items.VoucherStatus}</td>

                                        <td>
                                            <div className="table-action-icons">
                                                <div className="action-icon">
                                                    <EditTableSvg />
                                                </div>

                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="last-portion">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "var(--black-text)",
                        }}
                    >
                        <p>Show</p>
                        <select
                            name=""
                            id=""
                            className="drop-down"
                        >
                            <option value="0">10</option>
                        </select>
                        <p>enteries</p>
                    </div>
                    <Pagination onPageChange={onPageChange} {...pagination} />
                </div>
            </FinanceManagementSection>
        </FinanceManagementMain>
    );
};

export default FinanceManagement;
