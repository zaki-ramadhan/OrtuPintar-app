import { useState } from "react";
import { exportChildReportToPDF } from "@/utils/pdfExport";

export default function ExportAndActions({ mockReportData, currentChild }) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);

  const handlePDFExport = async () => {
    if (!currentChild) {
      setExportStatus({
        type: "error",
        message: "Pilih anak terlebih dahulu untuk mengekspor laporan.",
      });
      return;
    }

    try {
      setIsExporting(true);
      setExportStatus({ type: "loading", message: "Membuat PDF..." });

      console.log("🖨️ Starting PDF export with data:", {
        mockReportData,
        currentChild,
      });

      const result = await exportChildReportToPDF(mockReportData, currentChild);

      setExportStatus({
        type: "success",
        message: `PDF berhasil diunduh: ${result.fileName}`,
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setExportStatus(null);
      }, 3000);
    } catch (error) {
      console.error("❌ PDF export error:", error);
      setExportStatus({
        type: "error",
        message: `Gagal mengekspor PDF: ${error.message}`,
      });

      // Clear error message after 5 seconds
      setTimeout(() => {
        setExportStatus(null);
      }, 5000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mt-6 bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-2xl shadow-sm border border-gray-300 p-4 md:p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
          Export Report
        </h3>
        <p className="text-sm text-gray-600">
          Download your child's progress report as PDF
        </p>
      </div>

      {/* Export Status Message */}
      {exportStatus && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            exportStatus.type === "success"
              ? "bg-green-100 border border-green-300 text-green-800"
              : exportStatus.type === "error"
              ? "bg-red-100 border border-red-300 text-red-800"
              : "bg-blue-100 border border-blue-300 text-blue-800"
          }`}
        >
          <div className="flex items-center space-x-2">
            {exportStatus.type === "loading" && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            )}
            {exportStatus.type === "success" && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {exportStatus.type === "error" && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <span className="text-sm font-medium">{exportStatus.message}</span>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        {/* Export PDF Button - Centered */}
        <button
          onClick={handlePDFExport}
          disabled={isExporting || !currentChild}
          className={`group px-8 md:px-12 py-4 rounded-xl transition-all duration-200 font-medium flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
            isExporting || !currentChild
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-emerald-500 text-white hover:bg-emerald-600"
          }`}
        >
          {isExporting ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          )}
          <span className="text-lg">
            {isExporting ? "Membuat PDF..." : "Export PDF Report"}
          </span>
        </button>
      </div>

      {/* Achievement Box */}
      <div className="mt-6 p-4 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-xl">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-emerald-800">
              <strong>🎯 Achievement Unlocked:</strong>{" "}
              {currentChild?.name || "Your child"} has completed{" "}
              {mockReportData?.overview?.completedMilestones || 0} milestones
              this month! Keep up the great work with consistent daily
              activities.
            </p>
            <button className="text-emerald-600 hover:text-emerald-700 underline text-sm font-medium mt-1 transition-colors">
              View Achievement History →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
