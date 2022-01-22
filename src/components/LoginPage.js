import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions, { select } from "../js/actions";
import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import urlConfig from "../config";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const dispatch = useDispatch();
  const setProjctToken = (token) => dispatch(actions.project.setToken(token));
  const projectToken = useSelector(select.project.selectToken);

  const logining = async ({ username, password }) => {
    const bodyParameters = {
      username,
      password,
    };

    axios
      .post(`${urlConfig.url}/token/`, bodyParameters)
      .then((response) => {
        setVisible(false);
        setProjctToken(response.data.access);
        setTextVisible(false);
      })
      .catch(() => setTextVisible(true));
  };

  const showModal = () => {
    setVisible(true);
    setProjctToken("");
  };

  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        logining(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });

    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setTextVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {!projectToken ? "Login" : "Logout"}
      </Button>
      <Modal
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {textVisible ? (
          <div>
            <p>Error username or password</p>
          </div>
        ) : (
          ""
        )}
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="username"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please enter username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter password!",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginPage;
