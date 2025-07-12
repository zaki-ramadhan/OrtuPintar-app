export default function UpcomingReminders({
  reminders = [],
  onComplete,
  onCancel,
}) {
  // Debug log
  console.log("UpcomingReminders received reminders:", reminders);
  console.log("Reminders length:", reminders.length);

  const pendingReminders = reminders.filter((reminder) => !reminder.completed);

  const handleCancelAll = () => {
    if (pendingReminders.length === 0) return;

    // Batalkan semua reminder yang belum selesai
    pendingReminders.forEach((reminder) => {
      if (onCancel) {
        onCancel(reminder);
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Upcoming Reminders
        {reminders.length > 0 && (
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {reminders.length}
          </span>
        )}
      </h3>
      {reminders.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-6">
          No upcoming activities for today.
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
          <div className="space-y-3">
            {reminders.map((reminder, index) => (
              <div
                key={index}
                className={`p-3 border rounded-lg flex items-center justify-between ${
                  reminder.completed
                    ? "bg-emerald-50 border-emerald-200"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-lg">📝</div>
                  <div>
                    <h4
                      className={`font-medium text-gray-900 text-sm ${
                        reminder.completed
                          ? "line-through text-emerald-700"
                          : ""
                      }`}
                    >
                      {reminder.activityName}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!reminder.completed && (
                    <>
                      <button
                        className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600 transition-colors"
                        onClick={() => onComplete && onComplete(reminder)}
                      >
                        Done
                      </button>
                      <button
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                        onClick={() => onCancel && onCancel(reminder)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {reminder.completed && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium">
                      Done
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Batalkan Semua */}
      {pendingReminders.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={handleCancelAll}
            className="w-full text-sm bg-red-50 text-red-700 hover:bg-red-100 font-medium rounded-lg py-2 transition-colors cursor-pointer"
          >
            Cancel All ({pendingReminders.length})
          </button>
        </div>
      )}
    </div>
  );
}
