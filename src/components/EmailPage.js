import React, { useState } from "react";
import { useSelector } from "react-redux";
import { select } from "../js/actions";
import { Steps, Button, message, Input } from "antd";
import axios from "axios";
import urlConfig from "../config";

const { Step } = Steps;

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const process = {
  Sending: "Sending...",
  Success: "Success",
  Fail: "Fail",
};

const EmailPage = () => {
  const [current, setCurrent] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [emails, setEmails] = useState([]);
  const [sendStatus, setSendStatus] = useState(process.Sending);
  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);
  const projectToken = useSelector(select.project.selectToken);
  const config = {
    headers: { Authorization: `Bearer ${projectToken}` },
  };

  const sendEmail = async () => {
    const bodyParameters = {
      recipients: emails,
      subject: "HORN CHIER TRADING COMPANY LTD.",
    };

    axios
      .post(`${urlConfig.url}/email/`, bodyParameters, config)
      .then(() => setSendStatus(process.Success))
      .catch(() => setSendStatus(process.Fail));
  };

  const steps = [
    {
      title: "Put email address(es)",
      content: (
        <div style={{ padding: "20px" }}>
          <Input
            placeholder="email address(es)"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value || "");
            }}
          />
        </div>
      ),
    },
    {
      title: "Ready to send",
      content: (
        <div>
          {emails.map((item) => (
            <p>{item.trim()}</p>
          ))}
        </div>
      ),
    },
    {
      title: "Finish",
      content: (
        <div style={{ padding: "20px" }}>
          <p>{sendStatus}</p>
        </div>
      ),
    },
  ];

  const handleDone = () => {
    message.success("Processing complete!");
    setInputValue("");
    setCurrent(0);
    setSendStatus(process.Sending);
  };

  const handleNext = () => {
    next();
    const items = inputValue
      .split(";")
      .filter((s) => s)
      .filter(validateEmail)
      .map((item) => item.trim());
    setEmails([...new Set(items)]);
    if (current === 0) return;
    sendEmail();
  };

  return (
    <>
      <div style={!!projectToken ? { display: "block" } : { display: "none" }}>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current === 1 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleDone}>
              Done
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={handleNext}>
              {current === 0 ? "Next" : "Send"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailPage;
