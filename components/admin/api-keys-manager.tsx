"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AlertTriangle, KeyRound, Loader2, Plus, ShieldOff } from "lucide-react"
import { createApiKey, revokeApiKey } from "@/app/admin/actions"
import { formatDate } from "@/lib/blog/utils"
import { cn } from "@/lib/utils"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Label } from "@/components/admin/ui/label"
import { Badge } from "@/components/admin/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/admin/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/admin/ui/alert-dialog"
import { CopyButton } from "./copy-button"

export interface ApiKeyRow {
  id: string
  name: string
  key_prefix: string
  created_at: string
  last_used_at: string | null
  expires_at: string | null
  revoked_at: string | null
}

type KeyState = "active" | "revoked" | "expired"

function keyState(key: ApiKeyRow): KeyState {
  if (key.revoked_at) return "revoked"
  if (key.expires_at && new Date(key.expires_at) <= new Date()) return "expired"
  return "active"
}

const STATE_STYLES: Record<KeyState, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  revoked: "border-gray-200 bg-gray-100 text-gray-600",
  expired: "border-amber-200 bg-amber-50 text-amber-700",
}

const EXPIRY_OPTIONS = [
  { value: "never", label: "Never expires" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
  { value: "365", label: "1 year" },
]

export function ApiKeysManager({ keys }: { keys: ApiKeyRow[] }) {
  const router = useRouter()
  const [createOpen, setCreateOpen] = useState(false)
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("never")
  const [newKey, setNewKey] = useState<string | null>(null)
  const [toRevoke, setToRevoke] = useState<ApiKeyRow | null>(null)
  const [isPending, startTransition] = useTransition()

  const closeCreate = (open: boolean) => {
    if (open) return setCreateOpen(true)
    setCreateOpen(false)
    // Reset after the close animation.
    setTimeout(() => {
      setName("")
      setExpiry("never")
      setNewKey(null)
    }, 200)
  }

  const create = (event: React.FormEvent) => {
    event.preventDefault()
    startTransition(async () => {
      const result = await createApiKey(name, expiry === "never" ? null : Number(expiry))
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setNewKey(result.key)
      router.refresh()
    })
  }

  const revoke = () => {
    if (!toRevoke) return
    const key = toRevoke
    setToRevoke(null)
    startTransition(async () => {
      const result = await revokeApiKey(key.id)
      if (result.ok) {
        toast.success(`Revoked “${key.name}”`)
        router.refresh()
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <Card className="gap-0 rounded-2xl border-gray-200/70 py-0 shadow-sm">
      <CardHeader className="border-b border-gray-100 py-5">
        <CardTitle className="text-base">API keys</CardTitle>
        <CardDescription>Each key can create, update and delete blog posts. Revoke a key to cut off access instantly.</CardDescription>
        <CardAction>
          <Button
            onClick={() => setCreateOpen(true)}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold text-white shadow-md hover:from-indigo-600 hover:to-purple-600"
          >
            <Plus /> Create API key
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-0">
        {keys.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <KeyRound className="size-5" />
            </span>
            <p className="font-medium text-gray-900">No API keys yet</p>
            <p className="max-w-sm text-sm text-gray-500">
              Create a key for each partner or tool that should publish to the blog, so you can revoke them individually.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/60 hover:bg-gray-50/60">
                <TableHead className="pl-6">Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="hidden md:table-cell">Last used</TableHead>
                <TableHead className="hidden lg:table-cell">Expires</TableHead>
                <TableHead className="pr-6" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((key) => {
                const state = keyState(key)
                return (
                  <TableRow key={key.id} className={state !== "active" ? "text-gray-400" : undefined}>
                    <TableCell className="pl-6 font-medium text-gray-900">{key.name}</TableCell>
                    <TableCell>
                      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700">{key.key_prefix}…</code>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("rounded-full font-semibold capitalize", STATE_STYLES[state])}>
                        {state}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden text-gray-500 md:table-cell">{formatDate(key.created_at, "short")}</TableCell>
                    <TableCell className="hidden text-gray-500 md:table-cell">
                      {key.last_used_at ? formatDate(key.last_used_at, "short") : "Never"}
                    </TableCell>
                    <TableCell className="hidden text-gray-500 lg:table-cell">
                      {key.expires_at ? formatDate(key.expires_at, "short") : "Never"}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      {state === "active" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={isPending}
                          onClick={() => setToRevoke(key)}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <ShieldOff /> Revoke
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Create key */}
      <Dialog open={createOpen} onOpenChange={closeCreate}>
        <DialogContent className="sm:max-w-lg">
          {newKey ? (
            <div className="grid gap-4">
              <DialogHeader>
                <DialogTitle>Your new API key</DialogTitle>
                <DialogDescription>Share it securely with the person or tool that will publish posts.</DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2">
                <code className="min-w-0 flex-1 break-all px-1 text-xs text-gray-800">{newKey}</code>
                <CopyButton value={newKey} />
              </div>
              <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                This key won&apos;t be shown again. If it is lost, revoke it and create a new one.
              </div>
              <DialogFooter>
                <Button onClick={() => closeCreate(false)} className="bg-indigo-500 hover:bg-indigo-600">
                  Done
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <form onSubmit={create} className="grid gap-4">
              <DialogHeader>
                <DialogTitle>Create API key</DialogTitle>
                <DialogDescription>Name it after who will use it, e.g. “Marketing agency” or “Zapier”.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-2">
                <Label htmlFor="key-name">Name</Label>
                <Input
                  id="key-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Content partner"
                  maxLength={100}
                  autoFocus
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Expiration</Label>
                <Select value={expiry} onValueChange={setExpiry}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPIRY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => closeCreate(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending || !name.trim()} className="bg-indigo-500 hover:bg-indigo-600">
                  {isPending && <Loader2 className="animate-spin" />} Create key
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Revoke key */}
      <AlertDialog open={toRevoke !== null} onOpenChange={(open) => !open && setToRevoke(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke “{toRevoke?.name}”?</AlertDialogTitle>
            <AlertDialogDescription>
              Requests using this key will be rejected immediately. Posts already published with it stay on the site.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={revoke} className="bg-red-600 text-white hover:bg-red-700">
              Revoke key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
