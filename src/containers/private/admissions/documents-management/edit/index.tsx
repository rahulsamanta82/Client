import { FC } from "react";
import { EditAdmissionDocumentForm, EditAdmissionDocumentMain, EditAdmissionDocumentTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";

interface EditAdmissionDocumentProps { }

const EditAdmissionDocument: FC<EditAdmissionDocumentProps> = () => {
    return (
        <EditAdmissionDocumentMain>
            <EditAdmissionDocumentTop>
                <div className="heading">
                    <span className="page-heading">Edit/View Document</span>
                    <Breadcrumb />
                </div>
            </EditAdmissionDocumentTop>

            <EditAdmissionDocumentForm className="content-radius-shadow">
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="">Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Matriculation Certificate / Equivalent" />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="">Required Subject</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" placeholder="5" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray">Reset</button>
                        <button className="lg-rounded-btn" type="submit">Save</button>
                    </div>
                </div>
            </EditAdmissionDocumentForm>
        </EditAdmissionDocumentMain>
    )
}

export default EditAdmissionDocument;