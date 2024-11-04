"use client";

import { SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons"; // Added WhatsApp and Instagram icons
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import FacebookIcon from "../../public/images/facebook.png";
import InstagramIcon from "../../public/images/instagram.png";
import WhatsappIcon from "../../public/images/whatsapp.png";
import Image from "next/image";

const ShareDialog = ({
  open,
  setOpen,
  title,
  link,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  link: string;
}) => {
  const { copied, copyAndPaste } = useCopyToClipboard();

  const shareOnPlatform = (platform: string) => {
    const shareUrl = encodeURIComponent(link);
    const shareTitle = encodeURIComponent(title);
    let url = "";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${shareTitle} ${shareUrl}`;
        break;
      case "instagram":
        // Instagram sharing requires the app; open the link in the app
        alert(
          "To share on Instagram, please copy the link and share it in the app.",
        );
        copyAndPaste(link); // Automatically copy the link for convenience
        return;
      default:
        return;
    }

    window.open(url, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-[30%] flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="primary"
            className="space-x-2"
            onClick={() => copyAndPaste(link)}
          >
            <ClipboardCopyIcon />
            <span>{copied ? "Link Copied" : "Copy Link"}</span>
          </Button>
          <Button
            variant="secondary"
            className="space-x-2"
            onClick={() => shareOnPlatform("facebook")}
          >
            <Image
              src={FacebookIcon}
              alt="facebook icon"
              width={20}
              height={20}
            />
            <span>Facebook</span>
          </Button>
          <Button
            variant="secondary"
            className="space-x-2"
            onClick={() => shareOnPlatform("whatsapp")}
          >
            <Image
              src={WhatsappIcon}
              alt="instagram icon"
              width={20}
              height={20}
            />
            <span>WhatsApp</span>
          </Button>
          {/* <Button variant="secondary" className="space-x-2" onClick={() => shareOnPlatform('instagram')}>
            <Image src={InstagramIcon} alt="instagram icon" width={20} height={20} />
            <span>Share on Instagram</span>
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ShareDialog;
