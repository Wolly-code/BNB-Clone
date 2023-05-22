"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { MouseEvent, useCallback, useState } from "react";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import useRegisterModal from "@/app/hooks/userRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setisLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setisLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something Went Wrong ");
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbng" subtitle="Create an Account!" />
      <Input
        register={register}
        id={"email"}
        label={"Email"}
        disabled={isLoading}
        errors={errors}
      />
      <Input
        register={register}
        id={"name"}
        label={"Name"}
        disabled={isLoading}
        errors={errors}
      />
      <Input
        id={"password"}
        register={register}
        label={"Password"}
        disabled={isLoading}
        type="password"
        errors={errors}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label={"Continue With Google"}
        icon={FcGoogle}
        onClick={() => {}}
      ></Button>
      <Button
        outline
        label={"Continue With GitHub"}
        icon={AiFillGithub}
        onClick={() => {}}
      ></Button>
      <div className=" text-neutral-500 text-center font-light mt-4">
        <div className="justify-center flex flex-row items-center gap-2 ">
          <div>Already Have an account?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline">
            Login
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
