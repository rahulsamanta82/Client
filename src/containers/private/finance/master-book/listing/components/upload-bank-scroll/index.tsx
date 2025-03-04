import { FC } from "react";
import { UploadBankScrollMain, UBSContentWrapper, UBSContainer } from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";

interface UploadBankScrollProps {
    setOpen: Function;
}

const UploadBankScroll: FC<UploadBankScrollProps> = ({ setOpen }) => {
    // console.log(formData);

    return (
        <UploadBankScrollMain>
            <UBSContainer>
                <UBSContentWrapper className="p-custom-scrollbar-8">
                    <div className="header">
                        <div className="empty"></div>
                        <div className="heading">
                            <span>Upload Bank Scroll</span>
                        </div>
                        <div className="close-icon cp" onClick={() => setOpen(false)}>
                            <CloseMediumSvg className="icon" />
                        </div>
                    </div>

                    <form>
                        <div className="common-fields">
                            <div className="input-field">
                                <label htmlFor="">Verification Bank</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select>
                                            <option value="">Select Bank</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="upload-field">
                            <label>Upload Scroll File</label>
                            <input
                                type="file"
                                className="d-none"
                                id="result_document"
                            />
                            <div className="field-wrapper">
                                <label
                                    className="file-name-section"
                                    htmlFor="result_document"
                                >
                                    <div className="inner-content">
                                        <div className="upload-text">
                                            <div className="upload-icon">
                                                <SmallUploadSvg className="icon" />
                                            </div>
                                            <span className="text">
                                                Upload Certificate/ Equivalent()
                                            </span>
                                        </div>
                                        <div className="upload-restrictions">
                                            Select a 300x300 jpg image with maximum size of 400 KB
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <div className="buttons">
                                <button
                                    className="lg-rounded-btn gray"
                                    type="reset"
                                >
                                    Reset
                                </button>
                                <button
                                    className="lg-rounded-btn black"
                                    type="submit"
                                >
                                    Save & Add More
                                </button>

                                <button
                                    className="lg-rounded-btn"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </UBSContentWrapper>
            </UBSContainer>
        </UploadBankScrollMain>
    );
};

export default UploadBankScroll;
