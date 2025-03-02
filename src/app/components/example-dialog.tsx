"use client"

import { Button } from "app/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog"

export function ExampleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variants="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Example Dialog</DialogTitle>
          <DialogDescription>This is an example of how to use the Dialog components.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>Your dialog content goes here.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

