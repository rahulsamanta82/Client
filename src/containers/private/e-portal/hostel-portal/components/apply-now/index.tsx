import { FC } from "react";
import { HostelApplyNowMain, HostelListingSection } from "./style";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface HostelApplyNowProps { }

const HostelApplyNow: FC<HostelApplyNowProps> = () => {
    const columns: string[] = ["Session", "Start Date", "End Date", "Action"];
    const { hasAccess } = useStore();
    return (
        <HostelApplyNowMain>
            <HostelListingSection className="content-radius shadow">
                <div className="table-header">
                    <div className="heading">
                        <span>Apply for hostel</span>
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
                            {[1, 2, 3]?.map((items: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>Fall 2024</td>
                                        <td>2024-05-20</td>
                                        <td>2024-06-20</td>
                                        <td>
                                            {hasAccess(sitePermissions.eportalHostelApplyNow) && (
                                                <div className="apply-now-button">
                                                    <button>Apply Now</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </HostelListingSection>
        </HostelApplyNowMain>
    );
};

export default HostelApplyNow;
