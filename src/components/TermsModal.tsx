import React from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { RxCross2 } from "react-icons/rx";

type Props = {
  setOpenTermsModal: (value: boolean) => void;
};

const TermsModal = ({ setOpenTermsModal }: Props) => {
  return (
    <Modal height="h-screen md:h-auto md:max-h-[75vh]">
      <div className="flex justify-between items-center pt-4 md:pt-0">
        <h5 className="text-2xl">Terms & conditions</h5>
        <button
          className="rounded-full border-mediumGray border p-2 "
          onClick={() => setOpenTermsModal(false)}
        >
          <RxCross2 className="size-5" />
        </button>
      </div>
      <div className="text-base flex flex-col">
        <p>Welcome to Diverbook!</p>
        <br></br>
        <p>
          These terms and conditions govern your use of the Diverbook web
          application hosted at diverbook.vercel.app. By accessing or using
          Diverbook, you agree to be bound by these terms.
        </p>
        <br></br>
        <p>
          <strong>1. Age Restriction:</strong> Users under the age of 14 are not
          permitted to use Diverbook. By accessing or using Diverbook, you
          confirm that you are at least 14 years old.
        </p>
        <br></br>
        <p>
          <strong>2. User Conduct:</strong> Diverbook aims to provide a safe and
          enjoyable environment for all users. You agree not to engage in any
          conduct that violates these Terms or any applicable laws. In
          particular, you agree not to post, upload, or share any content that
          is unlawful, harmful, threatening, abusive, harassing, defamatory,
          vulgar, obscene, or otherwise objectionable.
        </p>
        <br></br>
        <p>
          <strong>3. User Responsibility:</strong> You are solely responsible
          for your use of Diverbook and any content you post, upload, or share
          on the platform. Diverbook does not endorse or control the content
          posted by users, but reserves the right to remove any content that it
          considers inappropriate or in violation of these Terms.
        </p>
        <br></br>
        <p>
          <strong>4. Account Termination:</strong> Diverbook reserves the right
          to terminate or suspend your account and access at any time and for
          any reason, including but not limited to violations of these Terms or
          misuse of the platform.
        </p>
        <br></br>
        <p>
          <strong>5. Modification of Terms:</strong> Diverbook may modify these
          Terms at any time without prior notice. It is your responsibility to
          review these Terms regularly to stay informed of any changes. Your
          continued use of Diverbook after the posting of changes constitutes
          your acceptance of the modified Terms.
        </p>
        <br></br>
        <p>
          <strong>6. Disclaimer:</strong> Diverbook is provided as it is and
          without warranty of any kind. Diverbook makes no representations or
          warranties regarding the accuracy, completeness, or reliability of
          Diverbook or any content posted on the platform.
        </p>
        <br></br>
        <p>
          <strong>7. Limitation of Liability:</strong> In no event shall
          Diverbook or its affiliates be liable for any direct, indirect,
          incidental, special, or consequential damages arising out of or in any
          way connected with your use of Diverbook or any content posted on the
          platform.
        </p>
        <br></br>
        <p>
          <strong>8. Governing Law:</strong> These Terms shall be governed by
          and construed in accordance with the laws of Spain. Any disputes
          arising under these Terms shall be subject to the exclusive
          jurisdiction of the courts of Spain.
        </p>
        <br></br>
        <p>
          If you have any questions or concerns about these Terms, please{" "}
          <a className="text-primary underline" href="/contact">
            contact us.
          </a>
        </p>
        <br></br>
        <p>Thank you for using Diverbook!</p>

        <Button
          onClick={() => setOpenTermsModal(false)}
          className="w-fit mt-6"
          label="Accept terms "
        />
      </div>
    </Modal>
  );
};

export default TermsModal;
