import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/atoms";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import { XIcon } from "@heroicons/react/outline";

function Modal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {/* modal box start from here */}
            <div className="inline-block h-[800px] align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              {/* <div className="flex itmes-center px-1.5 py-2 border-b border-gray-700"> */}
                {/* <div
                  onClick={() => setIsOpen(false)}
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                >
                  <XIcon className="h-[22px] text-white " />
                </div> */}
              {/* </div> */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
