import React, { useState, useEffect } from "react";
import Input from "../pdf/Input";
import Title from "../pdf/Title";
import moment from "moment";
import { updateShowBackDropLoader } from "../../redux/features/adminSlice";
import { useDispatch } from "react-redux";
import { sweetNotification } from "../common/SweetAlert";
import { useParams } from "react-router-dom";
import { getQuotation } from "../../redux/features/pdfSlice";

const ViewQuotation = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [data, setData] = useState({});
  let className = "mr-0";

  const getQuotationData = () => {
    dispatch(updateShowBackDropLoader(true));
    dispatch(getQuotation(params.id))
      .then((response) => {
        dispatch(updateShowBackDropLoader(false));
        if (response && !response.payload.hasError) {
          setData(response.payload.data.quotation);
          sweetNotification(false, response.payload.msg);
        } else {
          sweetNotification(true, response.payload.msg);
        }
      })
      .catch((error) => {
        dispatch(updateShowBackDropLoader(false));
        sweetNotification(true, "Something went wrong");
        console.error("Dispatch failed:", error);
      });
  };

  useEffect(() => {
    getQuotationData();
  }, []);

  return (
    <div className="p-5 md:p-10">
      <div className="flex justify-center w-full h-auto md:m-auto">
        {data?.selectCompany === "Injaz" ? (
          <img src="/Injaz/page3Logo.png" alt="Company Logo" className="w-72" />
        ) : (
          <img src="/page3Logo.png" alt="Company Logo" className="w-72" />
        )}
      </div>

      {/* client detail and data */}
      <div className="mt-10">
        <Title
          title="Client Details"
          titleType="title"
          style={{
            color: data?.selectCompany === "Conqueror" ? "#BA141A" : "#222A59",
          }}
        />

        {/* client name, flag, email */}
        <div className="mt-8 flex gap-5 flex-col flex-wrap md:flex-row">
          <Title title="" titleType="subtitle" />

          <Input
            label="Name"
            disabled="disabled"
            className={className}
            value={data?.clientName}
            name="clientName"
          />

          <div>
            <label className="text-sm text-[#222A59] font-medium mb-2">
              Flag
            </label>
            <div className="w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base text-black px-3 flex justify-evenly items-center">
              <span>{data.country}</span>
              <img
                className="w-20 h-11 outline-none text-base px-4"
                alt="United States"
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data?.flag}.svg`}
              />
            </div>
          </div>

          <Input
            label="Email"
            disabled="disabled"
            placeholder="Enter Your Email"
            className={className}
            value={data?.clientEmail}
            name="clientEmail"
          />
          <Input
            label="Date"
            value={moment(data?.quotationDate).format("YYYY-MM-DD")}
            name="quotationDate"
            type="date"
            disabled="disabled"
          />
        </div>

        {/* client phone and Refrence */}
        <div className="mt-8 flex gap-5 flex-col flex-wrap md:flex-row">
          <Title title="" titleType="subtitle" />

          <Input
            label="Phone"
            disabled="disabled"
            value={data?.clientPhone}
            name="clientPhone"
          />

          <Input
            label="Reference"
            disabled="disabled"
            value={data?.reference}
            name="reference"
          />
        </div>

        {/* state */}
        <div className="my-8 flex gap-5 flex-col md:flex-row">
          <Title
            title="State"
            titleType="subtitle"
            style={{
              color:
                data?.selectCompany === "Conqueror" ? "#BA141A" : "#222A59",
            }}
          />
          <div className="flex flex-wrap gap-3 md:gap-5 ">
            <Input
              label="State"
              disabled="disabled"
              value={data?.stateValue}
              name="stateValue"
            />
            <Input
              label="License Package Including "
              disabled="disabled"
              value={data?.packageIncludingVisa}
              name="packageIncludingVisa"
            />
          </div>
        </div>

        {/* activities */}
        <div className="my-8 flex gap-6 flex-col md:flex-row flex-wrap md:gap-10">
          <div className=" flex flex-col md:flex-row">
            <Title
              title="Activies"
              titleType="subtitle"
              style={{
                color:
                  data?.selectCompany === "Conqueror" ? "#BA141A" : "#222A59",
              }}
            />

            <div className="mb-5 mt-5 md:mt-0">
              <div className="space-y-4 md:ml-5">
                {data?.stateArray?.map((row) => (
                  <div className="flex flex-wrap gap-6 md:gap-5 items-center">
                    {/* Input fields for each row */}

                    <div className={`flex flex-col`}>
                      <label className="text-sm text-[#222A59] font-medium mb-2">
                        Code
                      </label>
                      <input
                        type="number"
                        value={row.code}
                        className="w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3"
                      />
                    </div>

                    <div className={`flex flex-col`}>
                      <label className="text-sm text-[#222A59] font-medium mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={row.description}
                        className="w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3"
                      />
                    </div>

                    <div className={`flex flex-col`}>
                      <label
                        className={`text-sm text-[#222A59] font-medium pb-3`}
                      >
                        Approval
                      </label>
                      <input
                        type="text"
                        value={row.approval}
                        className="w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3"
                      />
                    </div>

                    <div className={`flex flex-col`}>
                      <label className="text-sm text-[#222A59] font-medium mb-2">
                        Authority
                      </label>
                      <input
                        placeholder={`Enter authority`}
                        type="text"
                        value={row.authority}
                        className="w-64 h-11 rounded-lg border border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black px-3"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* step: 1 */}
        <div className="my-8 flex gap-5 flex-col md:flex-row">
          <Title
            title="Step 1: License"
            titleType="subtitle"
            style={{
              color:
                data?.selectCompany === "Conqueror" ? "#BA141A" : "#222A59",
            }}
          />
          <div>
            <div className="flex flex-wrap gap-6 md:gap-5">
              <Input
                label="Trade License Fees"
                disabled="disabled"
                value={data?.step1value}
                name="step1value"
              />
              <Input
                label="Remarks"
                disabled="disabled"
                value={data.step1Remarks}
                name="step1Remarks"
              />
              <Input
                label="Timeline"
                disabled="disabled"
                value={data.step1Timeline}
                name="step1Timeline"
              />
            </div>
          </div>
        </div>

        {/* step: 2 */}
        <div className="my-8 flex gap-5 flex-col md:flex-row">
          <Title
            title="Step 2: Immigration"
            titleType="subtitle"
            style={{
              color:
                data?.selectCompany === "Conqueror" ? "#BA141A" : "#222A59",
            }}
          />
          <div>
            <div className="flex flex-wrap gap-6 md:gap-5 my-8">
              <Input
                label="Pre Approval Fee"
                disabled="disabled"
                value={data?.step2ApprovalFee}
                name="step2ApprovalFee"
              />
              <Input
                label="Remarks"
                disabled="disabled"
                value={data.preRemarks}
                name="preRemarks"
              />
              <Input
                label="Timeline"
                disabled="disabled"
                value={data.preTimeline}
                name="preTimeline"
              />
            </div>

            <div className="mb-8 flex flex-wrap gap-6 md:gap-5">
              <Input
                label="Establishment Card"
                disabled="disabled"
                value={data?.step2Establishment}
                name="step2Establishment"
              />
              <Input
                label="Establishment Card (include)"
                disabled="disabled"
                value={data?.step2EstablishmentIN}
                name="step2EstablishmentIN"
              />
              <Input
                label="Remarks"
                disabled="disabled"
                value={data.step2EstablishmentRemark}
                name="step2Timeline"
              />
              <Input
                label="Timeline"
                disabled="disabled"
                value={data.step2EstablishmentTimeline}
                name="step2EstablishmentTimeline"
              />
            </div>

            <div className="my-8 flex flex-wrap gap-6 md:gap-5">
              <Input
                label="E Channel Card"
                disabled="disabled"
                value={data?.step2value1}
                name="step2value1"
              />
              <Input
                label="E Channel Card (include)"
                disabled="disabled"
                value={data?.step2value1IN}
                name="step2value1IN"
              />
            </div>
          </div>
        </div>

        {/* step: 3 */}
        <div className="my-8 flex gap-5 flex-col md:flex-row">
          <Title
            title="Step  3: Entry VISA"
            titleType="subtitle"
            style={{
              color:
                data?.selectCompany === "Conqueror" ? "#BA141A" : "#222A59",
            }}
          />
          <div>
            <div className="my-8 flex flex-wrap gap-6 md:gap-5">
              <Input
                label="Free Visa"
                disabled="disabled"
                value={data?.freeVisa}
                name="freeVisa"
              />
            </div>

            <div className="my-8 flex flex-wrap gap-6 md:gap-5">
              <Input
                label="Visa (Per Visa) Partner"
                disabled="disabled"
                value={data?.step2value2a}
                name="step2value2a"
              />
              <Input
                label="Visa (Per Visa) Partner (include)"
                disabled="disabled"
                value={data?.step2value2aIN}
                name="step2value2aIN"
              />
              <Input
                label="Remarks"
                disabled="disabled"
                value={data.step3Renewable}
                name="step3Renewable"
              />
              <Input
                label="Timeline"
                disabled="disabled"
                value={data.step3Timeline}
                name="step3Timeline"
              />
            </div>

            <div className="my-8 flex flex-wrap gap-6 md:gap-5">
              <Input
                label="Visa (Per Visa) Employment"
                disabled="disabled"
                value={data?.step2value2}
                name="step2value2"
              />
              <Input
                label="Visa (Per Visa) Employment (include)"
                disabled="disabled"
                value={data?.step2value2IN}
                name="step2value2IN"
              />
            </div>

            <div className="my-8 flex flex-wrap gap-6 md:gap-5">
              <Input
                label="Status Change"
                disabled="disabled"
                value={data?.step2value3}
                name="step2value3"
              />
              <Input
                label="Status Change (include)"
                disabled="disabled"
                value={data?.step2value3IN}
                name="step2value3IN"
              />
              <Input
                label="Remarks"
                disabled="disabled"
                value={data.step3StatusChange}
                name="step3StatusChange"
              />
              <Input
                label="Timeline"
                disabled="disabled"
                value={data.step3TimelineStatusChange}
                name="step3TimelineStatusChange"
              />
            </div>

            <div className="my-8 flex flex-wrap gap-6 md:gap-5 justify-between">
              <div className="flex gap-6 flex-wrap ">
                <Input
                  label="Medical Test (Per visa)"
                  disabled="disabled"
                  value={data?.medical}
                  name="medical"
                />
                <Input
                  label="Medical Test (Per visa) (include)"
                  disabled="disabled"
                  value={data?.medicalIN}
                  name="medicalIN"
                />
              </div>
              <Input
                label="Timeline"
                disabled="disabled"
                value={data.medicalTimeline}
                name="medicalTimeline"
              />
            </div>

            <div className="my-8 flex flex-wrap gap-6 md:gap-5 justify-between">
              <div className="flex gap-6 flex-wrap ">
                <Input
                  label="Emirates ID (Per Visa)"
                  disabled="disabled"
                  value={data?.emiratesId}
                  name="emiratesId"
                />
                <Input
                  label="Emirates ID (Per Visa) (include)"
                  disabled="disabled"
                  value={data?.emiratesIdIN}
                  name="emiratesIdIN"
                />
              </div>
              <Input
                label="Timeline"
                disabled="disabled"
                value={data.emiratesIdTimeline}
                name="emiratesIdTimeline"
              />
            </div>

            <div className="mb-8 flex flex-wrap gap-6 md:gap-5">
              <Input
                label="Pro Fees"
                disabled="disabled"
                value={data?.discount}
                name="discount"
              />
            </div>

            <div className="mb-8 flex flex-wrap gap-6 md:gap-5">
              <Input
                label="Total (Step 1, 2, 3)"
                disabled="disabled"
                value={data?.tAmount}
                name="tAmount"
              />
            </div>

            <div className="mb-8 flex flex-wrap gap-6 md:gap-5">
              <Input
                label="Grand Total Amount"
                disabled="disabled"
                className={className}
                value={data.gtAmount}
                name="gtAmount"
              />
              <Input
                label="Date"
                type="date"
                className={className}
                name="date"
                value={moment(data.date).format("YYYY-MM-DD")}
                disabled="disabled"
              />

              <div className={`flex flex-col mt-5`}>
                <label className="text-sm text-[#222A59] font-medium mb-2">
                  In Words
                </label>
                <label className="underline">{data.word}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CheckBox firlds */}
      <div className="mt-10">
        <Title
          title="Full Package Inclusive:"
          titleType="title"
          style={{
            color: data?.selectCompany === "Conqueror" ? "#BA141A" : "#222A59",
          }}
        />
        <div className="mt-8 flex flex-wrap">
          {data?.checkBoxData?.map((item) => (
            <div
              key={item.id} // Ensure each item has a unique key if it has an id field
              className="w-full lg:w-1/2 mb-2 flex justify-between items-center rounded-lg"
              readOnly
            >
              <input
                className="w-16 h-16 mr-2 md:w-5 md:h-5"
                type="checkbox"
                checked={item.status === "0" ? false : true} // Assume item has a checked property
              />
              <label className="w-96 text-sm font-medium">{item.title}</label>
              {item.filed ? (
                <label className="text-sm w-96 text-center md:text-left">
                  {item.value}
                </label>
              ) : (
                <div className="w-96 flex justify-center">
                  <input
                    type="number"
                    value={item.value}
                    className="w-20 h-8 border rounded-lg text-center outline-none"
                  />
                </div>
              )}
              <label className="text-sm w-96">
                {item.status === "0" ? "NOT INCLUDED" : "INCLUDED"}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewQuotation;
