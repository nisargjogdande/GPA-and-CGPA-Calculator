"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"

interface GradePointsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GradePointsDialog({ open, onOpenChange }: GradePointsDialogProps) {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.gradePointsDialog.title}</DialogTitle>
          <DialogDescription>{t.gradePointsDialog.description}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex justify-between items-center p-2 rounded-md bg-primary/5">
            <span className="font-medium">A+</span>
            <span>10</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-md bg-primary/5">
            <span className="font-medium">A</span>
            <span>9</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-md bg-primary/5">
            <span className="font-medium">B+</span>
            <span>8</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-md bg-primary/5">
            <span className="font-medium">B</span>
            <span>7</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-md bg-primary/5">
            <span className="font-medium">C+</span>
            <span>6</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-md bg-primary/5">
            <span className="font-medium">C</span>
            <span>5</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-md bg-primary/5">
            <span className="font-medium">D</span>
            <span>4</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-md bg-primary/5">
            <span className="font-medium">F</span>
            <span>0</span>
          </div>
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button>{t.gradePointsDialog.closeButton}</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
