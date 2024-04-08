import { Heading } from "./Heading";

import { FormWrapper } from "./form/FormWrapper";
import { AssetPicker } from "../../../../components/AssetPicker";

export const EarnTab = () => {
  return (
    <div>
      <Heading />
      <div className="mt-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden md:block col-span-5">
            <AssetPicker />
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="bg-neutral-0 px-8 shadow-card rounded-card py-6">
              <FormWrapper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
