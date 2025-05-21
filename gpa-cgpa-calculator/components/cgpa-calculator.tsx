"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { exportToPdf } from "@/lib/pdf-export"

interface Semester {
  id: string
  name: string
  gpa: number
  credits: number
}

const INITIAL_SEMESTER: Semester = {
  id: "1",
  name: "",
  gpa: 0,
  credits: 0,
}

export function CgpaCalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([{ ...INITIAL_SEMESTER }])
  const [cgpa, setCgpa] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [animateCgpa, setAnimateCgpa] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const { toast } = useToast()
  const { language } = useLanguage()
  const t = translations[language]

  // Load saved semesters from localStorage on mount
  useEffect(() => {
    const savedSemesters = localStorage.getItem("cgpaSemesters")
    if (savedSemesters) {
      try {
        const parsedSemesters = JSON.parse(savedSemesters)
        if (Array.isArray(parsedSemesters) && parsedSemesters.length > 0) {
          setSemesters(parsedSemesters)
        }
      } catch (error) {
        console.error("Error parsing saved semesters:", error)
      }
    }
  }, [])

  // Save semesters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cgpaSemesters", JSON.stringify(semesters))
  }, [semesters])

  // Add a new semester row
  const addSemester = () => {
    setSemesters([
      ...semesters,
      {
        id: Date.now().toString(),
        name: `${t.cgpaCalculator.semester} ${semesters.length + 1}`,
        gpa: 0,
        credits: 0,
      },
    ])
  }

  // Remove a semester row
  const removeSemester = (id: string) => {
    if (semesters.length === 1) {
      toast({
        title: t.cgpaCalculator.minimumSemesterToast,
        description: t.cgpaCalculator.minimumSemesterToastDesc,
        variant: "destructive",
      })
      return
    }
    setSemesters(semesters.filter((semester) => semester.id !== id))
  }

  // Update a semester's property
  const updateSemester = (id: string, field: keyof Semester, value: string | number) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === id) {
          // If updating the name field, handle it as a string
          if (field === "name") {
            return { ...semester, [field]: value as string }
          }
          // For GPA, ensure it's between 0 and 10
          else if (field === "gpa") {
            const numValue = Number(value)
            return { ...semester, [field]: Math.min(Math.max(numValue, 0), 10) }
          }
          // For credits, ensure it's a positive number
          else {
            const numValue = Number(value)
            return { ...semester, [field]: Math.max(numValue, 0) }
          }
        }
        return semester
      }),
    )
  }

  // Calculate CGPA
  const calculateCgpa = () => {
    // Validate inputs
    const invalidSemesters = semesters.filter(
      (semester) => !semester.name || semester.gpa < 0 || semester.gpa > 10 || !semester.credits,
    )

    if (invalidSemesters.length > 0) {
      toast({
        title: t.cgpaCalculator.invalidInputToast,
        description: t.cgpaCalculator.invalidInputToastDesc,
        variant: "destructive",
      })
      return
    }

    setIsCalculating(true)
    setProgressValue(0)

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 5
      })
    }, 50)

    // Calculate CGPA
    setTimeout(() => {
      let totalCredits = 0
      let totalGradePoints = 0

      semesters.forEach((semester) => {
        const credits = Number(semester.credits)
        const gpa = Number(semester.gpa)

        totalCredits += credits
        totalGradePoints += credits * gpa
      })

      const calculatedCgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0

      setCgpa(Number.parseFloat(calculatedCgpa.toFixed(2)))
      setIsCalculating(false)
      setAnimateCgpa(true)
      clearInterval(progressInterval)
      setProgressValue(100)

      // Show motivational quote
      const quotes = [
        t.motivationalQuotes.quote1,
        t.motivationalQuotes.quote2,
        t.motivationalQuotes.quote3,
        t.motivationalQuotes.quote4,
      ]
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

      toast({
        title: t.cgpaCalculator.calculationCompleteToast,
        description: randomQuote,
      })
    }, 1500)
  }

  // Reset the calculator
  const resetCalculator = () => {
    setSemesters([{ ...INITIAL_SEMESTER }])
    setCgpa(null)
    setAnimateCgpa(false)
    setProgressValue(0)
    toast({
      title: t.cgpaCalculator.resetToast,
      description: t.cgpaCalculator.resetToastDesc,
    })
  }

  return (
    <Card className="w-full" id="cgpa-calculator-card">
      <CardHeader>
        <CardTitle className="text-2xl">{t.cgpaCalculator.title}</CardTitle>
        <CardDescription>{t.cgpaCalculator.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 font-medium text-sm">
            <div className="col-span-5 md:col-span-6">{t.cgpaCalculator.semesterName}</div>
            <div className="col-span-3 md:col-span-2">{t.cgpaCalculator.gpa}</div>
            <div className="col-span-3 md:col-span-3">{t.cgpaCalculator.credits}</div>
            <div className="col-span-1"></div>
          </div>

          <AnimatePresence>
            {semesters.map((semester, index) => (
              <motion.div
                key={semester.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-12 gap-4 items-center"
              >
                <div className="col-span-5 md:col-span-6">
                  <Input
                    placeholder={t.cgpaCalculator.semesterNamePlaceholder}
                    value={semester.name}
                    onChange={(e) => updateSemester(semester.id, "name", e.target.value)}
                  />
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Input
                    type="number"
                    placeholder={t.cgpaCalculator.gpaPlaceholder}
                    value={semester.gpa || ""}
                    onChange={(e) => updateSemester(semester.id, "gpa", Number(e.target.value))}
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </div>
                <div className="col-span-3 md:col-span-3">
                  <Input
                    type="number"
                    placeholder={t.cgpaCalculator.creditsPlaceholder}
                    value={semester.credits || ""}
                    onChange={(e) => updateSemester(semester.id, "credits", Number(e.target.value))}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="col-span-1">
                  <Button variant="ghost" size="icon" onClick={() => removeSemester(semester.id)} className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">{t.cgpaCalculator.removeSemester}</span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Button variant="outline" onClick={addSemester} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            {t.cgpaCalculator.addSemester}
          </Button>
        </div>

        {isCalculating && (
          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-2">{t.cgpaCalculator.calculating}</p>
            <Progress value={progressValue} className="h-2" />
          </div>
        )}

        {cgpa !== null && !isCalculating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: animateCgpa ? 1 : 0,
              scale: animateCgpa ? 1 : 0.8,
            }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 border rounded-lg bg-primary/5 text-center"
          >
            <h3 className="text-lg font-medium mb-2">{t.cgpaCalculator.yourCgpa}</h3>
            <div className="text-4xl font-bold text-primary">{cgpa.toFixed(2)}</div>
            <div className="mt-4">
              <Progress value={cgpa * 10} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {cgpa >= 9
                  ? t.cgpaCalculator.excellentPerformance
                  : cgpa >= 8
                    ? t.cgpaCalculator.veryGoodPerformance
                    : cgpa >= 7
                      ? t.cgpaCalculator.goodPerformance
                      : cgpa >= 6
                        ? t.cgpaCalculator.averagePerformance
                        : t.cgpaCalculator.needsImprovement}
              </p>
            </div>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button onClick={calculateCgpa} disabled={isCalculating} className="w-full sm:w-auto">
          {isCalculating ? t.cgpaCalculator.calculating : t.cgpaCalculator.calculate}
        </Button>
        <Button variant="outline" onClick={resetCalculator} className="w-full sm:w-auto">
          {t.cgpaCalculator.reset}
        </Button>
        <Button variant="outline" onClick={exportToPdf} className="w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          {t.cgpaCalculator.exportPdf}
        </Button>
      </CardFooter>
    </Card>
  )
}
