import { Button, Checkbox,Row,Col,Typography, Form, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()

    const [success, setSuccess] = useState(false)


    const onFinish = async (values) => {
        const {data} = await  axios.post('http://localhost:3000/apiv1/login', values)
     //    console.log(data)
     
        if (data.token) {
         localStorage.setItem('token',data.token)
         setSuccess(true)
        }
     //    console.log(localStorage)
     
     
     
     
     
     };
     const onFinishFailed = (errorInfo) => {
       console.log('Failed:', errorInfo);
     };

    useEffect(() => {
        if(!success) return
            navigate('/user')
            setSuccess(false)
        

    },[success])

    
  return(
   <Row
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "",
      }}
    >
      <Col
        span={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 500,
          flexDirection: "column",
          border :"solid"
        }}
      >
        <Typography.Title level={2}>Login</Typography.Title>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            width: 300,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={8}>
              <Form.Item
                wrapperCol={{
                  span: 8,
                }}
              >
                <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                  Login
                </Button>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button
                type="default"
                style={{ width: 100 }}
                onClick={() => setGoRegister(true)}
              >
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
    }
export default Login;