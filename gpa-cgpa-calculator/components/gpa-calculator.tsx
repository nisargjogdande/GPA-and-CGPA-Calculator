"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus, HelpCircle, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { GradePointsDialog } from "@/components/grade-points-dialog"
import { exportToPdf } from "@/lib/pdf-export"

interface Subject {
  id: string
  name: string
  grade: string
  credits: number
}

const INITIAL_SUBJECT: Subject = {
  id: "1",
  name: "",
  grade: "",
  credits: 0,
}

export function GpaCalculator() {
  const [subjects, setSubjects] = useState<Subject[]>([{ ...INITIAL_SUBJECT }])
  const [gpa, setGpa] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showGradePointsDialog, setShowGradePointsDialog] = useState(false)
  const [animateGpa, setAnimateGpa] = useState(false)
  const { toast } = useToast()
  const { language } = useLanguage()
  const t = translations[language]

  // Load saved subjects from localStorage on mount
  useEffect(() => {
    const savedSubjects = localStorage.getItem("gpaSubjects")
    if (savedSubjects) {
      try {
        const parsedSubjects = JSON.parse(savedSubjects)
        if (Array.isArray(parsedSubjects) && parsedSubjects.length > 0) {
          setSubjects(parsedSubjects)
        }
      } catch (error) {
        console.error("Error parsing saved subjects:", error)
      }
    }
  }, [])

  // Save subjects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("gpaSubjects", JSON.stringify(subjects))
  }, [subjects])

  // Get grade point for a given grade
  const getGradePoint = (grade: string): number => {
    const gradePoints: Record<string, number> = {
      "A+": 10,
      A: 9,
      "B+": 8,
      B: 7,
      "C+": 6,
      C: 5,
      D: 4,
      F: 0,
    }
    return gradePoints[grade] || 0
  }

  // Add a new subject row
  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: Date.now().toString(),
        name: "",
        grade: "",
        credits: 0,
      },
    ])
  }

  // Remove a subject row
  const removeSubject = (id: string) => {
    if (subjects.length === 1) {
      toast({
        title: t.gpaCalculator.minimumSubjectToast,
        description: t.gpaCalculator.minimumSubjectToastDesc,
        variant: "destructive",
      })
      return
    }
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  // Update a subject's property
  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(subjects.map((subject) => (subject.id === id ? { ...subject, [field]: value } : subject)))
  }

  // Calculate GPA
  const calculateGpa = () => {
    // Validate inputs
    const invalidSubjects = subjects.filter((subject) => !subject.name || !subject.grade || !subject.credits)

    if (invalidSubjects.length > 0) {
      toast({
        title: t.gpaCalculator.invalidInputToast,
        description: t.gpaCalculator.invalidInputToastDesc,
        variant: "destructive",
      })
      return
    }

    setIsCalculating(true)

    // Calculate GPA
    let totalCredits = 0
    let totalGradePoints = 0

    subjects.forEach((subject) => {
      const credits = Number(subject.credits)
      const gradePoint = getGradePoint(subject.grade)

      totalCredits += credits
      totalGradePoints += credits * gradePoint
    })

    const calculatedGpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0

    // Animate the GPA calculation
    setTimeout(() => {
      setGpa(Number.parseFloat(calculatedGpa.toFixed(2)))
      setIsCalculating(false)
      setAnimateGpa(true)

      // Show motivational quote
      const quotes = [
        t.motivationalQuotes.quote1,
        t.motivationalQuotes.quote2,
        t.motivationalQuotes.quote3,
        t.motivationalQuotes.quote4,
      ]
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

      toast({
        title: t.gpaCalculator.calculationCompleteToast,
        description: randomQuote,
      })
    }, 800)
  }

  // Reset the calculator
  const resetCalculator = () => {
    setSubjects([{ ...INITIAL_SUBJECT }])
    setGpa(null)
    setAnimateGpa(false)
    toast({
      title: t.gpaCalculator.resetToast,
      description: t.gpaCalculator.resetToastDesc,
    })
  }

  return (
    <Card className="w-full" id="gpa-calculator-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{t.gpaCalculator.title}</CardTitle>
            <CardDescription>{t.gpaCalculator.description}</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setShowGradePointsDialog(true)}>
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.gpaCalculator.gradePointsTooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 font-medium text-sm">
            <div className="col-span-5 md:col-span-6">{t.gpaCalculator.subjectName}</div>
            <div className="col-span-3 md:col-span-2">{t.gpaCalculator.grade}</div>
            <div className="col-span-3 md:col-span-3">{t.gpaCalculator.credits}</div>
            <div className="col-span-1"></div>
          </div>

          <AnimatePresence>
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-12 gap-4 items-center"
              >
                <div className="col-span-5 md:col-span-6">
                  <Input
                    placeholder={t.gpaCalculator.subjectNamePlaceholder}
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                  />
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Select value={subject.grade} onValueChange={(value) => updateSubject(subject.id, "grade", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.gpaCalculator.gradePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C+">C+</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3 md:col-span-3">
                  <Input
                    type="number"
                    placeholder={t.gpaCalculator.creditsPlaceholder}
                    value={subject.credits || ""}
                    onChange={(e) => updateSubject(subject.id, "credits", Number(e.target.value))}
                    min="0"
                    max="10"
                  />
                </div>
                <div className="col-span-1">
                  <Button variant="ghost" size="icon" onClick={() => removeSubject(subject.id)} className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">{t.gpaCalculator.removeSubject}</span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Button variant="outline" onClick={addSubject} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            {t.gpaCalculator.addSubject}
          </Button>
        </div>

        {gpa !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: animateGpa ? 1 : 0,
              scale: animateGpa ? 1 : 0.8,
            }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 border rounded-lg bg-primary/5 text-center"
          >
            <h3 className="text-lg font-medium mb-2">{t.gpaCalculator.yourGpa}</h3>
            <div className="text-4xl font-bold text-primary">{gpa.toFixed(2)}</div>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button onClick={calculateGpa} disabled={isCalculating} className="w-full sm:w-auto">
          {isCalculating ? t.gpaCalculator.calculating : t.gpaCalculator.calculate}
        </Button>
        <Button variant="outline" onClick={resetCalculator} className="w-full sm:w-auto">
          {t.gpaCalculator.reset}
        </Button>
        <Button variant="outline" onClick={exportToPdf} className="w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          {t.gpaCalculator.exportPdf}
        </Button>
      </CardFooter>

      <GradePointsDialog open={showGradePointsDialog} onOpenChange={setShowGradePointsDialog} />
    </Card>
  )
}
