export const getStatusColor = (Status) => {
  switch (Status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900";
    case "pending":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900";
    case "shipped":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  }
};

export const getStatusDotColor = (status) => {
  const colors = {
    delivered: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    shipped: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      dot: "bg-amber-500",
    },
    cancelled: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      dot: "bg-rose-500",
    },
  };
  status = status.toLowerCase();
  return (
    colors[status] || {
      bg: "bg-gray-50",
      text: "text-gray-700",
      dot: "bg-gray-500",
    }
  );
};
