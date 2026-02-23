"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export default function Modal({
      children, title, confirmLabel, confirmFormId, cancelTo
    }: {
      children: React.ReactNode, 
      title: string, 
      confirmLabel: string, 
      confirmFormId: string,
      cancelTo: string
    }) {
    const router = useRouter()
    const handleCancel = () => {
        router.push(cancelTo)
    }
    return (
        <Dialog open={true} onOpenChange={(isOpen) => {
            if (!isOpen) {
                handleCancel()
            }
        }}>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                {children}
              </DialogHeader>              
              <DialogFooter>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="submit" form={confirmFormId}>{confirmLabel}</Button>
              </DialogFooter>
            </DialogContent>
        </Dialog>
      )
}