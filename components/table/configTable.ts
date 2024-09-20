type HeaderConfig = {
  id: string;
  name: string;
  isSortable?: boolean;
  isFilterable?: boolean;
};

export const headersConfig: HeaderConfig[] = [
  { id: "profile", name: "Profile" },
  { id: "systemId", name: "System ID" },
  { id: "guestStatuses", name: "Guest Statuses", isFilterable: true },
  { id: "arrivalDate", name: "Arrival Date", isSortable: true },
  { id: "departureDate", name: "Departure Date", isFilterable: true },
  { id: "nights", name: "Nights", isFilterable: true },
  { id: "bPhoto", name: "B. Photo" },
  { id: "booker", name: "Booker", isFilterable: true },
  { id: "gPhoto", name: "G. Photo" },
  { id: "mainGuest", name: "Main Guest", isFilterable: true },
  { id: "adults", name: "Adults" },
  { id: "children", name: "Children" },
  { id: "toddler", name: "Toddler" },
  { id: "infant", name: "Infant" },
  { id: "roomQnt", name: "Room QNT", isFilterable: true },
  { id: "roomCategory", name: "Room Category", isFilterable: true },
  { id: "roomNumber", name: "Room Number", isFilterable: true },
  { id: "bedType", name: "Bed Type", isFilterable: true },
  { id: "roomAvailability", name: "Room Availability", isFilterable: true },
  { id: "roomCondition", name: "Room Condition", isFilterable: true },
  { id: "traces", name: "Traces" },
  { id: "catering", name: "Catering", isFilterable: true },
  { id: "reservationNumber", name: "Reservation Number", isFilterable: true },
  {
    id: "reservationCondition",
    name: "Reservation Condition",
    isFilterable: true,
  },
  { id: "ratePlan", name: "Rate Plan", isFilterable: true },
  { id: "dailyRate", name: "Daily Rate" },
  { id: "reservationType", name: "Reservation Type", isFilterable: true },
  { id: "bookingNumber", name: "Booking Number", isFilterable: true },
  { id: "reservationDate", name: "Reservation Date", isFilterable: true },
  { id: "totalCost", name: "Total Cost", isFilterable: true },
  { id: "payed", name: "Payed", isFilterable: true },
  { id: "debt", name: "Debt", isFilterable: true },
  { id: "balance", name: "Balance", isFilterable: true },
  { id: "financialCode", name: "Financial Code", isFilterable: true },
  { id: "paymentDate", name: "Payment Date", isFilterable: true },
  { id: "individualInvoicePdf", name: "Individual Invoice pdf" },
  { id: "individualInvoiceXlsx", name: "Individual Invoice xlsx" },
  { id: "groupInvoicePdf", name: "Group Invoice pdf" },
  { id: "groupInvoiceXlsx", name: "Group Invoice xlsx" },
];
