import { FC } from "react";
import {
    EditAdmissionBoardFormSection,
    EditAdmissionBoardMain,
    EditAdmissionBoardTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

interface EditAdmissionBoardProps { }

const EditAdmissionBoard: FC<EditAdmissionBoardProps> = () => {
    return (
        <EditAdmissionBoardMain>
            <EditAdmissionBoardTop>
                <div className="left">
                    <span className="page-heading">Edit/View Board</span>
                    <Breadcrumb />
                </div>
            </EditAdmissionBoardTop>
            <EditAdmissionBoardFormSection>
                <div className="common-fields">
                    <div className="input-field">
                        <label>Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="(NFC) Institute of Engineering & Technology Training Khanewal Road, ML"
                                />
                            </div>
                            {/* <FormErrorMessage error={errors.minor_category} /> */}
                        </div>
                    </div>
                </div>

                <div className="radio-field">
                    <label>Level</label>
                    <div className="field-wrap">
                        <div className="field">
                            <input type="radio" id="inter" name="level" />
                            <label htmlFor="inter">Inter</label>
                        </div>
                        <div className="field">
                            <input type="radio" id="graduate" name="level" />
                            <label htmlFor="graduate">Graduate </label>
                        </div>
                        <div className="field">
                            <input type="radio" id="technical" name="level" />
                            <label htmlFor="technical">Technical</label>
                        </div>
                        <div className="field">
                            <input type="radio" id="technical-graduate" name="level" />
                            <label htmlFor="technical-graduate">Technical, Graduate</label>
                        </div>
                        <div className="field">
                            <input type="radio" id="inter-graduate-technical" name="level" />
                            <label htmlFor="inter-graduate-technical">Inter, Graduate , Technical </label>
                        </div>
                        <div className="field">
                            <input type="radio" id="cambridge" name="level" />
                            <label htmlFor="cambridge">Cambridge</label>
                        </div>
                    </div>
                </div>

                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray">Reset</button>
                        <button className="lg-rounded-btn black" type="submit">
                            Save & Add more
                        </button>
                        <button className="lg-rounded-btn" type="submit">
                            Save & Exit
                        </button>
                    </div>
                </div>
            </EditAdmissionBoardFormSection>
        </EditAdmissionBoardMain>
    );
};

export default EditAdmissionBoard;
