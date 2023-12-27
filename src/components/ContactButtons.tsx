import { useState } from "react";
import { removePTags } from "../utils";

const ContactButtons = ({ phoneNumber }: { phoneNumber: string }) => {
  const [openModal, setOpenModal] = useState<string>("");

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setOpenModal("sent"))
      .catch((error) => alert(error));
  };

  function getModalContents(current: string) {
    let component = null;
    switch (current) {
      case "call":
        component = <ContentsCall phoneNumber={phoneNumber} />;
        break;
      case "message":
        component = <ContentsMessage handleSubmit={handleSubmit} />;
        break;
      case "sent":
        component = <ContentsSent setOpenModal={setOpenModal} />;
        break;
      default:
        component = <p>Error</p>;
        break;
    }

    return component;
  }

  return (
    <div>
      <div
        onClick={() => setOpenModal("")}
        className={`${
          openModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } fixed w-full h-full inset-0 bg-gray-transparent2 transition-opacity flex justify-center items-center`}
      >
        <div
          className="bg-white px-5 py-6 w-11/12 rounded-md"
          onClick={stopPropagation}
        >
          {openModal && getModalContents(openModal)}
        </div>
      </div>
      <button
        className="bg-purple rounded-md text-white p-3 w-full mt-10 flex gap-3 justify-center"
        onClick={() => setOpenModal("message")}
      >
        <img src="/mail.svg" alt="mail icon" /> Send a Message
      </button>
      <button
        className="bg-purple rounded-md text-white p-3 w-full mt-5 flex gap-2 justify-center"
        onClick={() => setOpenModal("call")}
      >
        <img src="/phone.svg" alt="phone icon" /> Call
      </button>
    </div>
  );
};

const ContentsMessage = ({
  handleSubmit,
}: {
  handleSubmit: (event: React.FormEvent) => void;
}) => {
  return (
    <>
      <h3 className="text-2xl pb-5">Contact Spring Bank Science</h3>
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <div className="flex flex-col gap-5">
          <input
            className="bg-gray-50 p-3 rounded-md placeholder:text-gray-150"
            name="name"
            placeholder="Name"
          />
          <input
            className="bg-gray-50 p-3 rounded-md placeholder:text-gray-150"
            name="email"
            type="email"
            placeholder="Email"
          />
          <textarea
            rows={5}
            className="bg-gray-50 p-3 rounded-md placeholder:text-gray-150"
            name="message"
            placeholder="Message"
          />
          <button type="submit" className="p-3 bg-purple rounded-md text-white">
            Send Message
          </button>
        </div>
      </form>
    </>
  );
};

const ContentsCall = ({ phoneNumber }: { phoneNumber: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.log("Failed to copy phone number: ", err);
    }
  };

  return (
    <div className="flex flex-col gap-3 relative">
      <h3 className="text-2xl pb-5">Contact Spring Bank Science</h3>
      <p
        className={`absolute top-[-105px] right-[-10px] bg-gray text-white rounded-md py-1 px-2 text-sm
        ${
          isCopied
            ? "opacity-100 translate-y-5 transition-all"
            : "opacity-0 translate-y-0 transition-all"
        }`}
      >
        Copied!
      </p>
      <div
        className="bg-gray-50 rounded-md p-3 flex justify-between items-center"
        onClick={copyToClipboard}
      >
        <p className="text-gray font-medium">{removePTags(phoneNumber)}</p>
        <button className="p-1 rounded-sm">
          <img src="/copy.svg" alt="copy icon" />
        </button>
      </div>
      <a
        href={`tel:${removePTags(phoneNumber)}`}
        className="bg-purple text-white flex justify-center p-3 rounded-md gap-2"
      >
        <img src="/phone.svg" alt="phone icon" />
        Call now
      </a>
    </div>
  );
};

const ContentsSent = ({ setOpenModal }: { setOpenModal: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-2xl pb-5">Message Sent</h3>
      <img src="/success.svg" alt="success icon" className="h-20 w-20 mb-5" />
      <button
        className="border-purple text-purple border-2 rounded-md py-1 px-3"
        onClick={() => setOpenModal("")}
      >
        Close
      </button>
    </div>
  );
};

export default ContactButtons;
