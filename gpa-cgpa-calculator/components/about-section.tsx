"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { motion } from "framer-motion"

export function AboutSection() {
  const { language } = useLanguage()
  const t = translations[language]

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{t.about.title}</CardTitle>
        <CardDescription>{t.about.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <h3 className="text-lg font-medium mb-2">{t.about.whatIsGpa.title}</h3>
          <p className="text-muted-foreground">{t.about.whatIsGpa.content}</p>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <h3 className="text-lg font-medium mb-2">{t.about.whatIsCgpa.title}</h3>
          <p className="text-muted-foreground">{t.about.whatIsCgpa.content}</p>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <h3 className="text-lg font-medium mb-2">{t.about.howToUse.title}</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>{t.about.howToUse.step1}</li>
            <li>{t.about.howToUse.step2}</li>
            <li>{t.about.howToUse.step3}</li>
            <li>{t.about.howToUse.step4}</li>
          </ul>
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <h3 className="text-lg font-medium mb-2">{t.about.features.title}</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              {t.about.features.feature1}
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              {t.about.features.feature2}
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              {t.about.features.feature3}
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              {t.about.features.feature4}
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              {t.about.features.feature5}
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              {t.about.features.feature6}
            </li>
          </ul>
        </motion.div>
      </CardContent>
    </Card>
  )
}
