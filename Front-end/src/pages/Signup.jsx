import { Form, Input, Typography, Button } from "antd";
import axios from "axios";
import Joi from "joi";
import { useCookies } from "react-cookie";
import "../assets/custom.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const schema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
    }),

  contactInformation: Joi.string()
    .pattern(new RegExp("^[0-9]{10,15}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Contact Information must be a valid phone number with 10 to 15 digits",
      "string.empty": "Contact Information is required",
    }),
}).options({ abortEarly: false });

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    contactInformation: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [userIdCookies, setUserIdCookies] = useCookies(["userId_cookies"]);
  const navigate = useNavigate();

  // const checkLogin = () => {
  //   message.success("Login Successful!");
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await schema.validateAsync(formData, { abortEarly: false });
      const response = await axios.post(
        `${import.meta.env.VITE_API_PATH}/user/register`,
        formData
      );
      console.log("response", response.data);
      alert("user regester In Successfully!");
      // setFormData({ password: "", email: "" });
      // console.log(response.data);
      if (response.status === 201) {
        setCookies("access_token", response.data.token);
        setUserIdCookies("userId_cookies", response.data.user._id);
        navigate("/");
      }
    } catch (ex) {
      console.log("ex:", ex);
      if (ex.response && ex.response.status === 400) {
        setErrors({ email: ex.response.data.error });
      } else if (ex.response && ex.response.status === 409) {
        setErrors({ username: ex.response.data.error });
      } else if (ex.response && ex.response.status === 408) {
        setErrors({ contactInformation: ex.response.data.error });
      } else if (ex?.details) {
        // Extract the validation errors from the Joi validation error
        const validationErrors = {};
        ex.details.forEach((error) => {
          validationErrors[error.context.key] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };
  const labelStyle = {
    fontSize: "1.2rem", // Adjust the font size as needed
  };

  return (
    <div className="my-40 flex justify-center items-center">
      <form className="loginForm" onSubmit={handleSubmit}>
        <Typography.Title className="flex justify-center items-center">
          SignUp
        </Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              type: "email",
              message: "please enter valid email",
            },
          ]}
          label={<span style={labelStyle}>Email</span>}
          name={"email"}
          className="text-lg"
        >
          <Input
            name="email"
            placeholder="Enter your Email"
            className="text-lg"
            required
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              type: "text",
              message: "please enter your username",
            },
          ]}
          label={<span style={labelStyle}>UserName</span>}
          name={"username"}
          className="text-lg"
        >
          <Input
            name="username"
            placeholder="Enter your username"
            className="text-lg"
            required
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="text-red-500">{errors.username}</div>
          )}
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              type: "text",
              message: "please enter your name",
            },
          ]}
          label={<span style={labelStyle}>Name</span>}
          name={"name"}
          className="text-lg"
        >
          <Input
            name="name"
            placeholder="Enter your name"
            className="text-lg"
            required
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              type: "text",
              message: "please enter your ContactInformation",
            },
          ]}
          label={<span style={labelStyle}>Phone Number</span>}
          name={"contactInformation"}
          className="text-lg"
        >
          <Input
            name="contactInformation"
            placeholder="Enter your contactInformation"
            className="text-lg"
            required
            type="number"
            value={formData.contactInformation}
            onChange={handleChange}
          />
          {errors.contactInformation && (
            <div className="text-red-500">{errors.contactInformation}</div>
          )}
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "please enter your password",
            },
          ]}
          label={<span style={labelStyle}>Password</span>}
          name={"password"}
          className="text-lg"
        >
          <Input.Password
            name="password"
            placeholder="Enter your password"
            className="text-lg"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          className="text-lg flex items-center justify-center"
        >
          Submit
        </Button>
        <div className="flex items-center justify-center mt-6 gap-4">
          <p>Already a member ?</p>
          <Link to="/login">
            <Button className="font-semibold">Login</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
