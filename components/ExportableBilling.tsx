import { Clock, Share2, FileDown, Filter } from "lucide-react";

export default function ExportableBilling() {
  return (
    <div className="mb-20">
      <div className="max-w-4xl mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Top Left - Auto-calculated billable hours */}
          <div className="bg-yellow-200 rounded-2xl p-[4rem] shadow-lg text-center">
            <div className="flex flex-col items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Auto-calculated billable hours
              </h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              AI automatically tracks and calculates work hours eligible for
              billing, removing the need for manual entry.
            </p>
          </div>

          {/* Top Right - Shareable with clients or HR */}
          <div className="bg-blue-200 rounded-2xl p-[4rem] shadow-lg text-center">
            <div className="flex flex-col items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Shareable with clients or HR
              </h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Export and send billing reports in clean, professional formats
              tailored for stakeholders.
            </p>
          </div>

          {/* Central Circle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-45">
            <div className="relative w-56 h-56">
              {" "}
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center border-[1.2rem] border-l-[#F9DC42] border-r-[#FE1C6F] border-t-[#C3CEFF] border-b-[#84A65B] rounded-full">
                <div className="h-full w-full flex items-center justify-center flex-col text-center px-2 text-black bg-white rounded-full -rotate-45">
                  <div className="text-xs font-bold leading-tight drop-shadow-lg">
                    Exportable Billing
                  </div>
                  <div className="text-xs font-bold drop-shadow-lg">
                    Dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Left - Pre-formatted export files */}
          <div className="bg-green-200 rounded-2xl p-[4rem] shadow-lg text-center">
            <div className="flex flex-col items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Pre-formatted export files
              </h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Easily sort billing data to view specific timeframes, client work,
              or team combinations.
            </p>
          </div>

          {/* Bottom Right - Filters by date, project, or team */}
          <div className="bg-pink-200 rounded-2xl p-[4rem] shadow-lg text-center">
            <div className="flex flex-col items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Filters by date, project, or team
              </h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Customize reports to display only the data relevant to specific
              timelines, tasks, or groups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
