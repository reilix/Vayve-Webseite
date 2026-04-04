"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle size={64} className="text-success mb-6" />
          </motion.div>
          <h3 className="text-2xl font-heading font-bold text-dark mb-2">
            {t("success")}
          </h3>
          <p className="text-muted">{t("success_text")}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              id="name"
              label={t("name")}
              placeholder={t("name_placeholder")}
              required
            />
            <Input
              id="email"
              label={t("email")}
              type="email"
              placeholder={t("email_placeholder")}
              required
            />
          </div>

          <Input
            id="subject"
            label={t("subject")}
            placeholder={t("subject_placeholder")}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="event_type"
              className="text-sm font-medium text-dark font-heading"
            >
              {t("event_type")}
            </label>
            <select
              id="event_type"
              className="px-4 py-3 rounded-[12px] border border-border bg-white text-base text-dark transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="">{t("event_types.default")}</option>
              <option value="wedding">{t("event_types.wedding")}</option>
              <option value="corporate">{t("event_types.corporate")}</option>
              <option value="private">{t("event_types.private")}</option>
              <option value="own_event">{t("event_types.own_event")}</option>
              <option value="other">{t("event_types.other")}</option>
            </select>
          </div>

          <Textarea
            id="message"
            label={t("message")}
            placeholder={t("message_placeholder")}
            required
          />

          <Button type="submit" variant="primary" size="lg" className="w-full">
            {t("submit")}
            <Send size={18} />
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
