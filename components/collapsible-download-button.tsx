"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"

export default function CollapsibleDownloadButton() {
    const onButtonClick = () => {
        const pdfUrl = "/brochure.pdf";
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <motion.div
            className="fixed bottom-16 left-1 z-50 overflow-hidden"
            initial={{ width: 125 }}
            animate={{ width: 40 }}
            whileHover={{ width: 125 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <button onClick={onButtonClick} className="flex items-center justify-start bg-primary text-white px-2.5 py-2 rounded-full shadow-lg transition-colors w-full cursor-pointer">
                <Download size={20} className="mr-3 flex-shrink-0" />
                <span

                    className="whitespace-nowrap"
                >
                    Brochure
                </span>
            </button>
        </motion.div>
    )
}