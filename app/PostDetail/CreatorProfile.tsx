import { AvatarCircle, PanelCard } from "@/components/dashboard/shared";
import {  Link,  } from "lucide-react";

export default function CreatorProfile() {
  return (
    <PanelCard className="overflow-hidden">
      <div className="h-16 bg-linear-to-r from-blue-500 to-indigo-500 sm:h-20" />
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <AvatarCircle className="-mt-7 mb-3 h-14 w-14 border-4 border-white dark:border-slate-900 sm:-mt-8 sm:h-16 sm:w-16" />
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          H.Hlaing Swan
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          @hhlaing.swan
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              128
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Threads
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              884
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Helpful
            </p>
          </div>
        </div>
        <div
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition sm:py-2.5 bg-blue-600 text-white hover:bg-blue-700"
        >
          View Profile
        </div>
      </div>
    </PanelCard>
  );
}
