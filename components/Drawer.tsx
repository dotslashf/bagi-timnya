import { Disclosure, Transition } from "@headlessui/react";

interface DrawerProps {
  title: string;
  emoji?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}

const Drawer = ({
  title,
  emoji = "✅",
  defaultOpen = false,
  children,
}: DrawerProps) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between items-center px-4 py-2 text-left text-sm font-medium border-b border-gray-400 border-opacity-30 shadow-sm">
            <span>{emoji}</span>
            <span className="text-lg">{title}</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className={`${open ? "rotate-180" : ""}` + " w-4 h-4 transition"}
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
              />
            </svg>
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="px-4 py-2 text-sm text-gray-500">
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Drawer;
