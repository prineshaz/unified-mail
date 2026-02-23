import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function reducedData(acc: Record<string, any>, curr: Record<string, any>) {
  return {
    ...acc,
    ...{inbox: [...[curr.inbox], ...acc.inbox]},
    ...{messages: [...[curr.message], ...acc.messages]}
  }

}