import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { useLogin } from "../../logic/mutation/login";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();

  localStorage.removeItem("userid");
  localStorage.removeItem("orderid");
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  const [messageApi, contextHolder] = message.useMessage();

  const loginMutate = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
    }),
    onSubmit: async (values: any) => {
      console.log("Login Data:", values);

      const response = await loginMutate.mutateAsync([
        formik.values.email,
        formik.values.password,
      ]);

      if (response.error) {
        messageApi.open({
          type: "error",
          content: response.error,
        });
      } else {
        localStorage.setItem("userid", response.user.user_id);
        localStorage.setItem("role", response.user.role);
        localStorage.setItem("token", response.token);
        navigate(`/homepage`);
      }
    },
  });

  return (
    <>
      {contextHolder}

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
