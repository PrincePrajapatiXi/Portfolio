import {
    Mail,
    Phone,
    MapPin,
    Send,
    CheckCircle,
    AlertCircle,
    ChevronDown,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "princeprajapti2589@gmail.com",
        href: "mailto:princeprajapti2589@gmail.com",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Orai, Uttar Pradesh, India",
        href: "https://www.google.com/maps/place/Orai,+Uttar+Pradesh+285001/",
    },
];

const projectTypes = [
    { value: "", label: "Select project type..." },
    { value: "freelance", label: "Freelance Project" },
    { value: "collaboration", label: "Collaboration" },
    { value: "job", label: "Job Opportunity" },
    { value: "hello", label: "Just Saying Hi 👋" },
];

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        projectType: "",
        message: "",
        honeypot: "", // Spam protection
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        type: null,
        message: "",
    });

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Honeypot check — if filled, it's a bot
        if (formData.honeypot) return;

        if (!validate()) return;

        setIsLoading(true);
        setSubmitStatus({ type: null, message: "" });
        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error(
                    "EmailJS configuration is missing. Please check your environment variables."
                );
            }

            await emailjs.send(
                serviceId,
                templateId,
                {
                    name: formData.name,
                    email: formData.email,
                    project_type: formData.projectType,
                    message: formData.message,
                },
                publicKey
            );

            setSubmitStatus({
                type: "success",
                message: "Message sent successfully! I'll get back to you soon.",
            });
            setFormData({ name: "", email: "", projectType: "", message: "", honeypot: "" });
            setErrors({});
        } catch (err) {
            console.error("EmailJS error:", err);
            setSubmitStatus({
                type: "error",
                message:
                    err.text || "Failed to send message. Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        // Clear error on change
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    return (
        <section id="contact" className="py-16 md:py-32 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-secondary-foreground text-sm font-medium tracking-wider uppercase"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 text-secondary-foreground"
                    >
                        Let's build{" "}
                        <span className="font-serif italic font-normal text-white">
                            something cool.
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm md:text-base text-muted-foreground"
                    >
                        Got a cool project idea or just want to chat? Drop me a message
                        and I'll get back to you as soon as I can!
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass p-5 md:p-8 rounded-2xl md:rounded-3xl border border-primary/30"
                    >
                        <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                            {/* Honeypot — hidden from users, catches bots */}
                            <input
                                type="text"
                                name="website"
                                value={formData.honeypot}
                                onChange={(e) => handleChange("honeypot", e.target.value)}
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                            />

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name..."
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    className={`w-full px-3 py-2.5 md:px-4 md:py-3 bg-surface rounded-xl border ${errors.name ? "border-red-500" : "border-border"} focus:border-primary focus:ring-1 focus:ring-primary text-sm md:text-base transition-colors`}
                                />
                                {errors.name && (
                                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className={`w-full px-3 py-2.5 md:px-4 md:py-3 bg-surface rounded-xl border ${errors.email ? "border-red-500" : "border-border"} focus:border-primary focus:ring-1 focus:ring-primary text-sm md:text-base transition-colors`}
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                                    Project Type
                                </label>
                                <div className="relative">
                                    <select
                                        id="projectType"
                                        value={formData.projectType}
                                        onChange={(e) => handleChange("projectType", e.target.value)}
                                        className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm md:text-base appearance-none transition-colors"
                                    >
                                        {projectTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => handleChange("message", e.target.value)}
                                    placeholder="Your Message..."
                                    className={`w-full px-3 py-2.5 md:px-4 md:py-3 bg-surface rounded-xl border ${errors.message ? "border-red-500" : "border-border"} focus:border-primary focus:ring-1 focus:ring-primary resize-none text-sm md:text-base transition-colors`}
                                />
                                {errors.message && (
                                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.message}
                                    </p>
                                )}
                            </div>

                            <Button
                                className="w-full"
                                type="submit"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </Button>

                            {submitStatus.type && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-center gap-3 p-4 rounded-xl ${submitStatus.type === "success"
                                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                                    }`}
                                >
                                    {submitStatus.type === "success" ? (
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    )}
                                    <p className="text-sm">{submitStatus.message}</p>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4 md:space-y-6"
                    >
                        <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-8">
                            <h3 className="text-xl font-semibold mb-6">
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                {contactInfo.map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.href}
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-surface transition-colors group"
                                    >
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <item.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground">
                                                {item.label}
                                            </div>
                                            <div className="font-medium text-sm md:text-base break-all">{item.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Availability Card */}
                        <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-8 border border-primary/30">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="font-medium">Currently Available</span>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                I'm always open to teaming up on fun projects or freelance work.
                                If you need a developer to help out, let's talk!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};