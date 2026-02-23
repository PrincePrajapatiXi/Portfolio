import {
    Github,
    Instagram,
    Linkedin,
    Twitter,
    Mail,
    Heart,
    ArrowUp,
    MapPin,
    Phone,
    Code2,
} from "lucide-react";

const navLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

const socialLinks = [
    {
        icon: Github,
        href: "https://github.com/PrincePrajapatiXi",
        label: "GitHub",
    },
    {
        icon: Instagram,
        href: "https://www.instagram.com/prince_developer_/",
        label: "Instagram",
    },
    {
        icon: Linkedin,
        href: "#",
        label: "LinkedIn",
    },
    {
        icon: Twitter,
        href: "#",
        label: "Twitter",
    },
];

const contactDetails = [
    {
        icon: Mail,
        value: "princeprajapti2589@gmail.com",
        href: "mailto:princeprajapti2589@gmail.com",
    },
    {
        icon: Phone,
        value: "+91 1234567890",
        href: "tel:+911234567890",
    },
    {
        icon: MapPin,
        value: "Orai, Uttar Pradesh",
        href: "https://www.google.com/maps/place/Orai,+Uttar+Pradesh+285001/",
    },
];

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative overflow-hidden">
            {/* Gradient Top Border */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Background Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Top Section */}
                <div className="py-8 md:py-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-4 md:space-y-6">
                        <a href="#" className="inline-flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                <Code2 className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-xl font-bold">
                                Prince
                                <span className="text-primary">.</span>
                            </span>
                        </a>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                            A passionate web developer crafting digital experiences
                            with modern technologies.
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl glass flex items-center justify-center
                                    hover:bg-primary/10 hover:text-primary hover:border-primary/30
                                    transition-all duration-300 group/social"
                                >
                                    <social.icon className="w-4 h-4 group-hover/social:scale-110 transition-transform duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3 md:space-y-6">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 md:space-y-3">
                            {navLinks.map((link, idx) => (
                                <li key={idx}>
                                    <a
                                        href={link.href}
                                        className="text-muted-foreground text-sm hover:text-primary
                                        transition-colors duration-300 inline-flex items-center gap-2 group/link"
                                    >
                                        <span className="w-0 h-px bg-primary group-hover/link:w-4 transition-all duration-300" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 md:space-y-6">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Get In Touch
                        </h4>
                        <ul className="space-y-2 md:space-y-4">
                            {contactDetails.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 md:gap-3 text-muted-foreground hover:text-foreground
                                        transition-colors duration-300 group/contact"
                                    >
                                        <div className="hidden md:flex w-8 h-8 rounded-lg bg-primary/10 items-center justify-center shrink-0
                                            group-hover/contact:bg-primary/20 transition-colors duration-300">
                                            <item.icon className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <item.icon className="w-3 h-3 text-primary shrink-0 md:hidden" />
                                        <span className="text-[11px] md:text-sm leading-relaxed">
                                            {item.value}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="hidden md:block space-y-6">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Let's Connect
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Interested in working together? Feel free to reach out
                            for collaborations or just a friendly hello!
                        </p>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                            bg-primary/10 border border-primary/30 text-primary text-sm font-medium
                            hover:bg-primary/20 hover:border-primary/50
                            transition-all duration-300 group/cta"
                        >
                            <Mail className="w-4 h-4" />
                            Say Hello
                            <span className="group-hover/cta:translate-x-1 transition-transform duration-300">→</span>
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Bottom Bar */}
                <div className="py-6 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-muted-foreground text-sm text-center sm:text-left">
                        © {new Date().getFullYear()} Prince. Built with{" "}
                        <Heart className="w-3.5 h-3.5 inline text-red-400 animate-pulse" />{" "}
                        using React & Tailwind CSS.
                    </p>

                    {/* Back to Top */}
                    <button
                        onClick={scrollToTop}
                        className="group/top flex items-center gap-2 px-4 py-2 rounded-xl
                        glass hover:bg-primary/10 text-muted-foreground hover:text-primary
                        transition-all duration-300"
                    >
                        <span className="text-sm">Back to top</span>
                        <ArrowUp className="w-4 h-4 group-hover/top:-translate-y-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </footer>
    );
};
