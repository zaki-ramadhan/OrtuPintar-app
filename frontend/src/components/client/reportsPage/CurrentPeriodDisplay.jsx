export default function CurrentPeriodDisplay({ reportType, currentChild, formatDateRange }) {
    return (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{reportType}</span> report for{" "}
                <span className="font-semibold">{currentChild?.name}</span> - {formatDateRange()}
            </p>
        </div>
    )
}