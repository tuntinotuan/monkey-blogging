import { Button } from "components/button";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input, InputPasswordToggle } from "components/input";
import { Label } from "components/label";
import { Textarea } from "components/textarea";
import { useAuth } from "contexts/auth-context";
import { auth, db } from "firebase-app/firebase-config";
import { updatePassword } from "firebase/auth";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { userInfo } = useAuth();
  const {
    control,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const {
    image,
    setImage,
    progress,
    handleSelectImage,
    handleResetImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  async function deleteAvatar() {
    const colRef = doc(db, "users", userInfo.uid);
    await updateDoc(colRef, {
      avatar: "",
    });
    handleResetImage();
  }
  useEffect(() => {
    async function fetchUser() {
      const colRef = doc(db, "users", userInfo.uid);
      const docSnap = await getDoc(colRef);
      reset(docSnap.data());
    }
    if (userInfo.uid) fetchUser();
  }, [userInfo.uid, reset]);
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  const updateProfileHandler = async (values) => {
    console.log(values);
    if (values.newPassword !== "" && values.newPassword.length < 8)
      return toast.error(
        "Your new password must be at least 8 characters or greater!"
      );
    if (values.newPassword !== values.confirmPassword)
      return toast.error("Confirm password don't match!");
    try {
      console.log("------");
      const colRef = doc(db, "users", userInfo.uid);
      await updateDoc(colRef, {
        avatar: image,
        birthday: values.birthday,
        description: values.description,
        email: values.email,
        fullname: values.fullname,
        password: values.confirmPassword || values.password,
        phone: values.phone,
        username: values.username,
        updatedTime: serverTimestamp(),
      });
      values.confirmPassword &&
        updatePassword(auth.currentUser, values.confirmPassword);
      toast.success("Update profile successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
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
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updateProfileHandler)}>
        <div className="w-[200px] h-[200px] mx-auto mb-10">
          <ImageUpload
            // className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="birthday">Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="phone">Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              control={control}
              placeholder="Enter your description"
            ></Textarea>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="newPassword">New Password</Label>
            <InputPasswordToggle
              control={control}
              name="newPassword"
              placeholder="Enter your password"
            ></InputPasswordToggle>
          </Field>
          <Field>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <InputPasswordToggle
              control={control}
              name="confirmPassword"
              placeholder="Enter your confirm password"
            ></InputPasswordToggle>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
