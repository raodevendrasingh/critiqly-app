"use client";

import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Testimonial } from "@/models/Testimonial";
import { toast } from "sonner";

export const useFetchTestimonials = () => {
	const [testimonial, setTestimonial] = useState<Testimonial[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchTestimonials = useCallback(async (refresh: boolean = false) => {
		setIsLoading(true);
		try {
			const response = await axios.get<ApiResponse>("/api/get-testimonials");
			setTestimonial(response.data.testimonial || []);
			if (refresh) {
				toast("Testimonial Refreshed");
			}
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;
			toast.error("Error", {
				description:
					axiosError.response?.data.message || "Failed to fetch testimonial",
			});
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { testimonial, isLoading, setTestimonial, fetchTestimonials };
};
