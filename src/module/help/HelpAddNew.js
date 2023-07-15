import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { ErrorFallback } from "components/error";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { helpStatus } from "utils/constants";

const HelpAddNew = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      question: "",
      answer: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const handleAddNewHelp = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.status = Number(newValues.status);
    const colRef = collection(db, "helps");
    try {
      await addDoc(colRef, {
        ...newValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new help successfully!");
      navigate("/manage/help");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      reset({
        question: "",
        answer: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };
  return (
    <div>
      <DashboardHeading title="New Help" desc="Add new help"></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewHelp)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label htmlFor="question">Question</Label>
            <Input
              control={control}
              name="question"
              placeholder="Enter your question name"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="answer">Answer</Label>
            <Input
              control={control}
              name="answer"
              placeholder="Enter your answer"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === helpStatus.APPROVED}
                value={helpStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === helpStatus.UNAPPROVED}
                value={helpStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="w-[200px] mx-auto"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Add Help
        </Button>
      </form>
    </div>
  );
};

export default withErrorBoundary(HelpAddNew, {
  FallbackComponent: ErrorFallback,
});
