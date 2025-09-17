import { useRef } from "react";
import { formatISO } from "date-fns";
import axiosInstance from "@/lib/axios-instance";
import type { TResponse } from "@/types";
import type { IOfferLetter } from "../types";
import { toast } from "sonner";

export default function useFetchAfterDelay() {
  const clickTimeRef = useRef<Date | null>(null);

  const handleSubmit = async () => {
    // Save the current time to the ref
    clickTimeRef.current = new Date();

    console.log("Clicked at:", clickTimeRef.current.toISOString());

    // Wait for 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const now = new Date();
    const past = clickTimeRef.current;

    if (!past) {
      console.error("No click time available");
      return;
    }

    const from = formatISO(past); // format to ISO string
    const to = formatISO(now);

    const params = {
      page: 1,
      limit: 10,
      searchTerm: "",
    };

    // Custom URL query format for createdAt filter
    const url = `/offer-letter?createdAt[$gte]=${encodeURIComponent(
      from
    )}&createdAt[$lte]=${encodeURIComponent(to)}`;

    try {
      const response = await axiosInstance.get<TResponse<IOfferLetter[]>>(url);
      console.log("Filtered Emails:", response.data);
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Something went wrong!";
      toast.error(errMsg);
    }
  };

  return { handleSubmit };
}
