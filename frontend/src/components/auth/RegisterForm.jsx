import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api/apiClient";

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const [error, setError] = useState(null);

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post("/auth/register", userData);
      console.log(response);
      return response.data;
    },
    onSuccess: () => {
      console.log(response.data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
  };

  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className={"text-xl text-center"}>
          Create an account
        </CardTitle>
        <CardDescription className={"text-center"}>
          Enter your details to register
        </CardDescription>
        <form>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Full name</div>
            </div>
            <Input
              name="name"
              placeholder="john Doe"
              value={setFormValues.name}
              onChange={handleInputChange}
              required
            />
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Email</div>
            </div>
            <Input
              name="eamil"
              placeholder="john@gmail.com"
              value={setFormValues.email}
              onChange={handleInputChange}
              required
            />
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Password</div>
            </div>
            <Input
              name="password"
              placeholder="**************"
              value={setFormValues.password}
              onChange={handleInputChange}
              required
            />
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">
                Confirm Password
              </div>
            </div>
            <Input
              name="name"
              placeholder="**************"
              value={setFormValues.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <div className="py-6">
              <Button className={"w-full cursor-pointer"}>
                Create account
              </Button>
            </div>
          </CardContent>
          <CardFooter className={"flex justify-center pt-0"}>
            <div className="text-center text-sm">
              Already have an account?
              <a
                className="text-primary hover:underline cursor-pointer"
                href="#"
              >
                Sign in
              </a>
            </div>
          </CardFooter>
        </form>
      </CardHeader>
    </Card>
  );
};

export default RegisterForm;
