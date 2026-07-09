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
import { LoaderCircle } from "lucide-react";
import { extractErrorMessage } from "@/utils/errorUtils";
import { useNavigate } from "react-router";

const RegisterForm = () => {

            const navigate = useNavigate()


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
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log("error", error);
      setError(extractErrorMessage(error));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formValues.name || !formValues.email || !formValues.password) {
      setError("All fields are required");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setError("Password do not match");
      return;
    }

    registerMutation.mutate({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    });
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
        <form onSubmit={handleSubmit}>
          <CardContent>
            {error && (
              <div className="p-3 text-center text-destructive text-sm rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Full name</div>
            </div>
            <Input
              name="name"
              placeholder="John Doe"
            required
              value={formValues.name}
              onChange={handleInputChange}
            />
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Email</div>
            </div>
            <Input
              name="email"
              placeholder="john@gmail.com"
              value={formValues.email}
              onChange={handleInputChange}
               
            required
            />
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Password</div>
            </div>
            <Input
              name="password"
              placeholder="**************"
              value={formValues.password}
              onChange={handleInputChange}
              type={'password'}
            required
            />
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">
                Confirm Password
              </div>
            </div>
            <Input
              name="confirmPassword"
              placeholder="**************"
              value={setFormValues.confirmPassword}
              onChange={handleInputChange}
                type={'password'}
            required
            />
            <div className="py-6">
              <Button type="submit" className={"w-full cursor-pointer"}>
                {registerMutation.isPending ? (
                  <span>
                    <LoaderCircle /> Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter className={"flex justify-center pt-0"}>
            <div className="text-center text-sm">
              Already have an account?
              <a
              onClick={() => navigate('/login')}
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
