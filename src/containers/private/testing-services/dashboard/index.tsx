import { FC } from "react";
import {
  FDContentSection,
  FDTopSection,
  FinanceDashboardMain,
  HeadlineCard,
  HeadlineCards,
  FilterSection,
  MainStatCard,
  MainStatCards,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  DummyHeadlineGraphSvg,
  GreenFileBgSvg,
} from "assets/images/finance/svgs";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface TestingDashboardProps {}

const TestingDashboard: FC<TestingDashboardProps> = ({}) => {
  const data1 = [12, 19, 3, 5, 2, 3, 8, 10, 6, 7]; // Data for the first bar
  const data2 = [15, 10, 6, 4, 3, 2, 5, 9, 4, 6]; // Data for the second bar
  const data3 = [8, 14, 7, 3, 5, 6, 9, 12, 5, 4]; // Data for the third bar
  const data4 = [10, 12, 3, 12, 15, 16, 19, 12, 15, 14]; // Data for the third bar
  const data5 = [10, 12, 3, 12, 15, 16, 19, 12, 15, 14]; // Data for the third bar
  const data6 = [10, 12, 3, 12, 15, 16, 19, 12, 15, 14]; // Data for the third bar
  const data7 = [10, 12, 3, 12, 15, 16, 19, 12, 15, 14]; // Data for the third bar
  const labels = [
    "Fall 2020",
    "Spring 2022",
    "Fall 2020",
    "Spring 2022",
    "Fall 2020",
    "Spring 2022",
    "Fall 2020",
    "Spring 2022",
    "Fall 2020",
    "Spring 2022",
  ];
  const lineLabels = [
    "01-12-2020",
    "02-12-2020",
    "03-12-2020",
    "04-12-2020",
    "05-12-2020",
    "06-12-2020",
    "07-12-2020",
    "08-12-2020",
    "09-12-2020",
    "10-12-2020",
  ];

  const lineChartData = {
    labels: lineLabels, // Use newLabels for the line chart
    datasets: [
      {
        label: "Test Conducted",
        data: data2,
        backgroundColor: "#128B9B",
        borderColor: "#128B9B",
        borderWidth: 1,
      },
    ],
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Applicants",
        data: data1,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Not Verified",
        data: data2,
        backgroundColor: "#128B9B",
        borderColor: "#128B9B",
        borderWidth: 1,
      },
      {
        label: "Total Verified",
        data: data3,
        backgroundColor: "#E9EBEC",
        borderColor: "#E9EBEC",
        borderWidth: 1,
      },
    ],
  };
  const chartDataTwo = {
    labels,
    datasets: [
      {
        label: "IUB-HAt (for Mphil/MS)",
        data: data1,
        backgroundColor: "#128B9B",
        borderColor: "#128B9B",
        borderWidth: 1,
      },
      {
        label: "IUB-HAt (for phd)",
        data: data2,
        backgroundColor: "#78DA5F",
        borderColor: "#78DA5F",
        borderWidth: 1,
      },
      {
        label: "IUB-Admission Test (Under Graduate)",
        data: data3,
        backgroundColor: "#155096",
        borderColor: "#155096",
        borderWidth: 1,
      },
      {
        label: "IUB-Admission Test (for Engineering)",
        data: data4,
        backgroundColor: "#CAF2E1",
        borderColor: "#CAF2E1",
        borderWidth: 1,
      },
    ],
  };
  const pieChartData = {
    labels: [
      "IUB-HAt (for Mphil/MS)",
      "IUB-HAt (for PhD)",
      "IUB-Admission Test (Under Graduate)",
      "IUB-Admission Test (for Engineering)",
      "IUB-HAt (for Law)",
      "IUB-Admission Test (for Business)",
      "IUB-Admission Test (for Medicine)",
    ],
    datasets: [
      {
        label: "Test Distribution",
        data: [12, 19, 3, 5, 2, 3, 10], // Your data values here
        backgroundColor: [
          "#128B9B",
          "#78DA5F",
          "#155096",
          "#CAF2E1",
          "#FF5733",
          "#FFC300",
          "#C70039",
        ],
        borderColor: [
          "#128B9B",
          "#78DA5F",
          "#155096",
          "#CAF2E1",
          "#FF5733",
          "#FFC300",
          "#C70039",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <FinanceDashboardMain>
      <FDTopSection>
        <div className="heading">
          <span className="page-heading">Dashboard</span>
          <Breadcrumb />
        </div>
      </FDTopSection>

      <FDContentSection>
        <HeadlineCards>
          {[1, 1, 1, 1, 1, 1].map((card: any, index: number) => {
            return (
              <HeadlineCard key={index}>
                <div className="header">
                  <div className="file-icon">
                    <GreenFileBgSvg />
                  </div>
                  <div className="title">TOTAL Amount ITS</div>
                </div>

                <div className="lower-part">
                  <div className="stats">
                    <span className="total">122,123,467</span>
                    <span className="percentage">52%</span>
                  </div>
                  <div className="graph">
                    <DummyHeadlineGraphSvg />
                  </div>
                </div>
              </HeadlineCard>
            );
          })}
        </HeadlineCards>
        <FilterSection className="content-radius-shadow">
          <div className="filter-fields">
            <div className="input-field">
              <label>Session</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="campus">
                    <option value="">Select Session</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="input-field">
              <label>Test Batch</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="input-field">
              <label>Date From-To</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" name="" id="" />
                </div>
              </div>
            </div>
          </div>
          <div className="stats-container">
            <div className="stats-heading-main">
              <p className="stats-heading">IUB-HAT (for Mphil/MS)</p>
              <div className="stat-heading-right">
                <div className="stats-amount">Total Verified Amount(PKR)</div>
                <div className="stats-value">256,888</div>
              </div>
            </div>
            <div className="stats-main">
              <div className="sats-item">
                <div className="stats-title">Total Applications</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Total Verify</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Not Verified</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Result Uploaded </div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Total Passed</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Total Failed</div>
                <div className="stats-value">334</div>
              </div>
            </div>
          </div>
          <div className="stats-container">
            <div className="stats-heading-main">
              <p className="stats-heading">IUB-HAT (for phd)</p>
              <div className="stat-heading-right">
                <div className="stats-amount">Total Verified Amount(PKR)</div>
                <div className="stats-value">256,888</div>
              </div>
            </div>
            <div className="stats-main">
              <div className="sats-item">
                <div className="stats-title">Total Applications</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Total Verify</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Not Verified</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Result Uploaded </div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Total Passed</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Total Failed</div>
                <div className="stats-value">334</div>
              </div>
            </div>
          </div>
          <div className="stats-container">
            <div className="stats-heading-main">
              <p className="stats-heading">
                IUB-Admission Test (under Graduation)
              </p>
              <div className="stat-heading-right">
                <div className="stats-amount">Total Verified Amount(PKR)</div>
                <div className="stats-value">256,888</div>
              </div>
            </div>
            <div className="stats-main">
              <div className="sats-item">
                <div className="stats-title">Total Applications</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Total Verify</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Not Verified</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Result Uploaded </div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Total Passed</div>
                <div className="stats-value">334</div>
              </div>
              <div className="sats-item">
                <div className="stats-title">Total Failed</div>
                <div className="stats-value">334</div>
              </div>
            </div>
          </div>
        </FilterSection>
        {/* pie-graph*/}
        <MainStatCards>
          <MainStatCard>
            <div className="header-section">
              <div className="title">
                <span>Total Applicants Test Wise</span>
              </div>
              <div className="description">
                Total Applicants/ Total Verified/ Total Not Verified
              </div>
            </div>

            <div className="pie-chart-section">
              <Pie data={pieChartData} options={options} />
            </div>
          </MainStatCard>
        </MainStatCards>
        {/* line-graph*/}
        <MainStatCards>
          <MainStatCard>
            <div className="header-section">
              <div className="title">
                <span>Tests Conducted </span>
              </div>
              <div className="description">
                Total Applicants/ Total Verified/ Total Not Verified
              </div>
            </div>

            <div className="">
              <Line data={lineChartData} options={options} />
            </div>
          </MainStatCard>
        </MainStatCards>
        {/* bar graph-1*/}
        <MainStatCards>
          <MainStatCard>
            <div className="header-section">
              <div className="title">
                <span>Tests Report Session Wise</span>
              </div>
              <div className="description">
                Total Applicants/ Total Verified/ Total Not Verified
              </div>
            </div>

            <div className="chart-section">
              <Bar data={chartData} options={options} />
            </div>
          </MainStatCard>
        </MainStatCards>
        {/* bar graph-2*/}
        <MainStatCards>
          <MainStatCard>
            <div className="header-section">
              <div className="title">
                <span>Tests Report Session Wise</span>
              </div>
              <div className="description">
                Total Applicants/ Total Verified/ Total Not Verified
              </div>
            </div>

            <div className="chart-section">
              <Bar data={chartDataTwo} options={options} />
            </div>
          </MainStatCard>
        </MainStatCards>
      </FDContentSection>
    </FinanceDashboardMain>
  );
};

export default TestingDashboard;
