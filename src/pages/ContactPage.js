import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { Textarea } from "components/textarea";
import React from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";

const schema = yup.object({
  fullname: yup.string().required("Please enter your Full name"),
  email: yup
    .string()
    .email("Please enter valid Email address")
    .required("Please enter your Email address"),
  phonenumber: yup
    .string()
    .min(9, "Your phone number must be at least 9 characters or greater")
    .required("Please enter your Phone number"),
  description: yup
    .string()
    .required("Please enter your Description to contact"),
});

const ContactPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      phonenumber: "",
      description: "",
    },
  });
  const handleSubmitContact = async (values) => {
    if (!isValid) return;
    try {
      await emailjs.send(
        "service_gr9ncxn",
        "template_0er2dhp",
        values,
        "jNugEioN2muIyxNM7"
      );
      const colRef = collection(db, "contacts");
      await addDoc(colRef, {
        ...values,
        createdAt: serverTimestamp(),
      });
      toast.success("Submit contact successfully!");
      reset({ fullname: "", email: "", phonenumber: "", description: "" });
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  return (
    <Layout>
      <div className="container">
        <Heading>Contact</Heading>
        <div className="flex items-start justify-between gap-10 mb-10">
          <div className="relative w-1/2">
            <div className="absolute left-[90px] bottom-1/2 w-[70px] h-[70px] rounded-full bg-[#2EBAC1] animate-ping"></div>
            <img
              src="https://cdn.dribbble.com/users/2697390/screenshots/7274079/media/6c88f8a15fc887651923a262cc6de874.png"
              alt="Dribbble"
              className="object-cover rounded-md"
            />
          </div>
          <form onSubmit={handleSubmit(handleSubmitContact)} className="w-1/2">
            <div className="form-layout !mb-0">
              <Field>
                <Label htmlFor="fullname">Full name</Label>
                <Input
                  control={control}
                  name="fullname"
                  placeholder="Enter your name"
                ></Input>
              </Field>
              <Field>
                <Label htmlFor="email">Email address</Label>
                <Input
                  control={control}
                  name="email"
                  placeholder="Enter your email"
                ></Input>
              </Field>
            </div>
            <div className="form-layout !mb-0">
              <Field>
                <Label htmlFor="phonenumber">Phone number</Label>
                <Input
                  control={control}
                  name="phonenumber"
                  placeholder="Enter your phone number"
                ></Input>
              </Field>
              <Field></Field>
            </div>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                control={control}
                placeholder="Enter your description"
              ></Textarea>
            </Field>
            <Button
              type="submit"
              className="mx-auto w-[120px]"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
