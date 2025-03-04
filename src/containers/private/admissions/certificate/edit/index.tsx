import { FC } from "react";
import { EditAdmissionCertificateFormSection, EditAdmissionCertificateMain, EditAdmissionCertificateTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";

interface EditAdmissionCertificateProps { }

const EditAdmissionCertificate: FC<EditAdmissionCertificateProps> = () => {
    return (
        <EditAdmissionCertificateMain>
            <EditAdmissionCertificateTop>
                <div className="left">
                    <span className="page-heading">Edit/View Certificate/Degree</span>
                    <Breadcrumb />
                </div>
            </EditAdmissionCertificateTop>
            <EditAdmissionCertificateFormSection>
                <div className="common-fields">
                    <div className="input-field">
                        <label>Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Matriculation" />
                            </div>
                            {/* <FormErrorMessage error={errors.minor_category} /> */}
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Certificate Category</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Matriculation / SSC</option>
                                </select>
                            </div>
                            {/* <FormErrorMessage error={errors.minor_category} /> */}
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Board Type</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Board Type" />
                            </div>
                            {/* <FormErrorMessage error={errors.minor_category} /> */}
                        </div>
                    </div>
                </div>

                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray">Reset</button>
                        <button className="lg-rounded-btn black" type="submit" >Save & Add more</button>
                        <button className="lg-rounded-btn" type="submit">Save & Exit</button>
                    </div>
                </div>
            </EditAdmissionCertificateFormSection>
        </EditAdmissionCertificateMain>
    )
}

export default EditAdmissionCertificate;