import Image from "next/image";
import py from "@/assets/img/py.svg";
import { Separator } from "@/components/ui/separator";

export default function PostContent() {
  return (
    <div className="mt-4">
      <div className="mb-2  text-xl font-semibold text-slate-900 dark:text-slate-100">
        Loream:2023-09-15: How to implement a new feature in our product?
      </div>
      <div>
        <div className="space-x-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
            # fun
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
            # http
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
            # webdev
          </span>
        </div>
      </div>

      <Image
        src={py}
        alt="Post Image"
        className="my-4 rounded-sm mb-5  border border-slate-200 dark:border-slate-700"
      />
      <div className="mb-3 mt-5  text-base leading-6 text-slate-700 dark:text-slate-300">
        Loream ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt{" "}
        <span className="font-semibold text-blue-700 dark:text-blue-100">
          ut labore et dolore magna aliqua
        </span>
        . Ut enim ad minim veniam,
        <br />
        <br />
        <span className="font-semibold text-blue-700 dark:text-blue-100">
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident,{" "}
        </span>
        <br />
        <br />
        sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <Separator className="mt-5 mb-5"/>
    </div>
  );
}
