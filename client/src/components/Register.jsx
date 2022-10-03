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
    <div className="w-full  flex justify-center items-center mt-16">
      <div className="w-full max-w-xs text-center">
        <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-black  text-3xl mb-5 ">REGISTER</h1>

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                {...register("name")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.name && (
                <p className="text-red-600">
                  {errors?.name?.message || "Error!"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number{" "}
              </label>
              <input
                {...register("phoneNumber")}
                placeholder="0505555555"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.phoneNumber && (
                <p className="text-red-600">
                  {errors?.phoneNumber?.message || "Error!"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                {...register("email")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.email && (
                <p className="text-red-600">
                  {errors?.email?.message || "Error!"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors?.password && (
                <p className="text-red-600">
                  {errors?.password?.message || "Error!"}
                </p>
              )}
            </div>
            <input
              value="SUBMIT"
              type="submit"
              disabled={!isValid}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
