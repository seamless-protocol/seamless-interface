import { ReactNode } from "react";
// form
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  // todo: resolve this properly

  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};

export const MyFormProvider: React.FC<Props> = ({ children, onSubmit, methods }) => {
  return (
    <div data-cy="Form">
      <Form {...methods}>
        <form onSubmit={onSubmit}>{children}</form>
      </Form>
    </div>
  );
};
