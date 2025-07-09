export const getStatusColor = (status) => {
	switch (status) {
		case "active":
			return "bg-green-100 text-green-800";
		case "pending":
			return "bg-yellow-100 text-yellow-800";
		case "inactive":
			return "bg-red-100 text-red-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};
