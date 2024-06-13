import { AdditionalInfo } from "./AdditionalInfo";
import { useFormSettingsContext } from "../../../../../components/forms/contexts/useFormSettingsContext";

export const AdditionalInfoContainer = () => {
  const { subStrategy, asset } = useFormSettingsContext();
  if (!asset) return null;

  return <AdditionalInfo asset={asset} subStrategy={subStrategy} />;
};
