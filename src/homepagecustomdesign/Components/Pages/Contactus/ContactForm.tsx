import axiosInstance from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormData = {
  fullName: string;
  email: string;
  message: string;
};

// Zod Schema for form validation
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

const ContactForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors,  },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn:(data:FormData)=>{
        {

  
return axiosInstance.post("/guest-message/contact-message",data)
  }
    },
    onSuccess:()=>{
        toast.success("Thanks for connecting us.We will connect soon!");
        reset()
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      await mutation.mutateAsync(data);
     
    } catch (error) {
      toast.error("Failed to send message.");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block mb-1 font-medium">Full Name*</label>
        <input
          type="text"
          placeholder="Enter your full name"
          {...register("fullName")}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Email Address*</label>
        <input
          type="email"
          placeholder="Enter your email address"
          {...register("email")}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-medium">Message*</label>
        <textarea
          rows={4}
          placeholder="Type your message"
          {...register("message")}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition duration-300"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
