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
import useAuthStore from "@/lib/store/authStore";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState();
 const navigate = useNavigate()
        const {setAuth} = useAuthStore()

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const [error, setError] = useState(null);

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if(data.token) {
        const user = data.user
        const token = data.token
        setAuth(user, token)
        navigate('/dashboard')
        console.log(user);
      }
    },
    onError: (error) => {
      console.log("error", error);
      setError(extractErrorMessage(error));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formValues.email || !formValues.password) {
      setError("All fields are required");
      return;
    }

 

    loginMutation.mutate({
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
          
            <div className="py-6">
              <Button type="submit" className={"w-full cursor-pointer"}>
                {isLoading ? (
                  <span>
                    <LoaderCircle /> Loading....
                  </span>
                ) : (
                  "Login Account"
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter className={"flex justify-center pt-0"}>
            <div className="text-center text-sm">
             Don't have a account?
              <a
              onClick={() => navigate('/register')}
                className="text-primary hover:underline cursor-pointer"
                href="#"
              >
                Sign up
              </a>
            </div>
          </CardFooter>
        </form>
      </CardHeader>
    </Card>
  );
};

export default LoginForm;
