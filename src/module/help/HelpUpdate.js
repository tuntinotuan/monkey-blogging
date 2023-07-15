import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { ErrorFallback } from "components/error";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { helpStatus } from "utils/constants";

const HelpUpdate = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const helpId = params.get("id");
  const watchStatus = watch("status");
  useEffect(() => {
    async function fetchHelpId() {
      const colRef = doc(db, "helps", helpId);
      const docSnap = await getDoc(colRef);
      reset(docSnap.data());
      console.log(docSnap.data());
    }
    fetchHelpId();
  }, [helpId, reset]);
  const handleUpdateHelp = async (values) => {
    try {
      const colRef = doc(db, "helps", helpId);
      await updateDoc(colRef, {
        ...values,
        status: Number(values.status),
        updatedTime: serverTimestamp(),
      });
      toast.success("Update help successfully!");
      navigate("/manage/help");
    } catch (error) {
      console.log(error);
    }
  };
  if (!helpId) return;
  return (
    <div>
      <DashboardHeading
        title="Update help"
        desc="Update newest help"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateHelp)} autoComplete="off">
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
          Update Help
        </Button>
      </form>
    </div>
  );
};

export default withErrorBoundary(HelpUpdate, {
  FallbackComponent: ErrorFallback,
});
