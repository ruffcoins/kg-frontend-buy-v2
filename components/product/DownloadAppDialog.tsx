import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { SetStateAction } from "react";
import Link from "next/link";
import { PageLinks } from "@/constants/links";
import Image from "next/image";
import Playstore from "@/public/images/playstore.svg";
import Appstore from "@/public/images/appstore.svg";

const DownloadAppDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:w-[400px] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
        <DialogHeader>
          <DialogTitle> </DialogTitle>
          <DialogDescription />
          <DialogDescription className="py-4 text-center space-y-4">
            <p>Get our Mobile App </p>
            <p>
              to be able to use the{" "}
              <span className="font-medium text-kaiglo_info-base">
                APP DEAL
              </span>{" "}
              discount
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <div className="flex space-x-4">
            <Link href={PageLinks.playstore}>
              <Image
                src={Playstore}
                alt="download on playstore"
                className="w-56"
              />
            </Link>
            <Link href={PageLinks.appstore}>
              <Image
                src={Appstore}
                alt="download on appstore"
                className="w-56"
              />
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DownloadAppDialog;
