import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  phoneNumber: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  password: yup
    .string()
    .required()
    .min(6, "Must be minimum 6 digits long")
    .max(20, "Must be maximum 20 digits long"),
  email: yup.string().email().required(),
});

function Register() {
  const [users, setUsers] = useState();

  const getUsers = () => {
    axios.get(`http://localhost:3001/users`).then((res) => {
      res.data && setUsers(res.data);
    });
  };
  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setUsers([...users, data]);
    await axios.post(`http://localhost:3001/users`, data);
    console.log(users);
  };

  return (
    <div className="Register">
      <h1>REGISTER</h1>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input {...register("name")} />
          {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
        </div>
        <div>
          <label>Phone Number </label>
          <input {...register("phoneNumber")} placeholder="0505555555" />
          {errors?.phoneNumber && (
            <p>{errors?.phoneNumber?.message || "Error!"}</p>
          )}
        </div>
        <div>
          <label>Email Address</label>
          <input {...register("email")} />
          {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
        </div>
        <input value="SUBMIT" type="submit" disabled={!isValid} />
      </form>
    </div>
  );
}

export default Register;
