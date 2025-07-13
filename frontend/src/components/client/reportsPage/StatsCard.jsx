export default function StatsCard ({ icon, value, label, bgColor, textColor }) {
    return (
        <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-300 hover:shadow-md transition-shadow">
            <div className="text-center">
                <div className={`w-8 h-8 md:w-10 md:h-10 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    {icon}
                </div>
                <div className={`text-xl md:text-2xl lg:text-3xl font-bold ${textColor}`}>
                    {value}
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">{label}</div>
            </div>
        </div>
    )
}