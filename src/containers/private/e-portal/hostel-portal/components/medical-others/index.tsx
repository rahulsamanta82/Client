import { FC } from "react";
import { ContentPart, MedicalOthersMain } from "./style";

interface MedicalOthersProps { }

const MedicalOthers: FC<MedicalOthersProps> = () => {
    return (
        <MedicalOthersMain>
            <ContentPart className="content-radius-shadow">
                <div className="header-part">
                    <div className="heading"><span>Medical & others</span></div>
                </div>

                <form>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Percentage of Marks in Last Degree</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        placeholder="Percentage of marks in last degree"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Blood Group</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select>
                                        <option value=''>Select Blood Group</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <label>Do You Smoke: (Yes/No)</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select>
                                        <option value=''>Select One</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <label>Allergies if any</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        placeholder="Allergies if any"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="description-field">
                        <div className="input-field">
                            <label>Taking any medicines on regular basis, if yes, Please give detail</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="submit-button">
                        <button className="lg-rounded-btn">Submit</button>
                    </div>
                </form>
            </ContentPart>
        </MedicalOthersMain>
    )
}

export default MedicalOthers;