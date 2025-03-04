import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC } from "react";
import {
    AddAcademicFeeReceiptSection,
    AddAcademicFeeReceiptMain,
    AddAcademicFeeReceiptTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

export const AddAcademicFeeReceipt: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Fee Transactions /", path: siteRoutes.academicFeeTransactionsListing },
        { title: "Add Fee Receipt", path: siteRoutes.createAcademicFeeReceipt },
    ];

    return (
        <AddAcademicFeeReceiptMain>
            <AddAcademicFeeReceiptTop>
                <div className="left">
                    <span className="page-heading">Fee Receipt</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </AddAcademicFeeReceiptTop>

            <AddAcademicFeeReceiptSection className="content-radius-shadow">
                <div className="common-fields">
                    <div className="input-field">
                        <label>Student</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Select Student</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Date Of Transaction</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="date" name="" id="" />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Amount</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" placeholder="Amount" />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Fine(PKR)</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" placeholder="Fine(PKR)" />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Fee Transaction Head</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Select Fee Transaction Head</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Semester</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Select Semester</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Challan No</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" placeholder="Challan No" />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Year</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Year</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Reference</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" name="" id="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray" type="button">
                            Reset
                        </button>

                        <button className="lg-rounded-btn">Submit</button>
                    </div>
                </div>
            </AddAcademicFeeReceiptSection>
        </AddAcademicFeeReceiptMain>
    );
};

export default AddAcademicFeeReceipt;
