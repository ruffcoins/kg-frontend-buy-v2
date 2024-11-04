import AddAddressForm from "@/components/forms/address/AddAddressForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllStatesAndCities } from "@/hooks/queries/address/getStatesAndCities";
import { SetStateAction } from "react";

const NewAddressDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { statesAndCities } = useGetAllStatesAndCities();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:w-[361px] md:w-[563px]">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <AddAddressForm
          stateAndCities={statesAndCities ?? []}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
export default NewAddressDialog;
