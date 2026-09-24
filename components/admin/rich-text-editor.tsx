"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { Placeholder } from "@tiptap/extensions"
import { TableKit } from "@tiptap/extension-table"
import { toast } from "sonner"
import {
  Bold,
  Code,
  Heading2,
  Heading3,
  Heading4,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Redo2,
  SquareCode,
  Table2,
  Strikethrough,
  Underline,
  Undo2,
  type LucideIcon,
} from "lucide-react"
import { ACCEPTED_IMAGE_TYPES, uploadBlogImage } from "@/lib/blog/upload"
import { cn } from "@/lib/utils"
import { Toggle } from "@/components/admin/ui/toggle"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Label } from "@/components/admin/ui/label"
import { Separator } from "@/components/admin/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/admin/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/admin/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu"

const imageFiles = (list: FileList | null | undefined) =>
  Array.from(list ?? []).filter((file) => file.type.startsWith("image/"))

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your story…",
}: {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}) {
  const [uploading, setUploading] = useState(0)
  const [linkOpen, setLinkOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<Editor | null>(null)

  /** Upload images to Supabase Storage and insert them at `pos` (or the cursor). */
  const insertImages = useCallback(async (files: File[], pos?: number) => {
    for (const file of files) {
      setUploading((n) => n + 1)
      try {
        const src = await uploadBlogImage(file, "content")
        const editor = editorRef.current
        if (!editor) return
        const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")
        const node = { type: "image", attrs: { src, alt } }
        if (pos !== undefined) editor.chain().focus().insertContentAt(pos, node).run()
        else editor.chain().focus().insertContent(node).run()
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Image upload failed")
      } finally {
        setUploading((n) => n - 1)
      }
    }
  }, [])

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image.configure({ allowBase64: false }),
      // Column resizing is off: widths would be saved as inline styles, which the sanitizer strips.
      TableKit.configure({ table: { resizable: false } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: { class: "blog-content tiptap px-5 py-4 sm:px-8 sm:py-6" },
      handlePaste: (_view, event) => {
        const files = imageFiles(event.clipboardData?.files)
        if (files.length === 0) return false
        event.preventDefault()
        void insertImages(files)
        return true
      },
      handleDrop: (view, event, _slice, moved) => {
        const files = imageFiles(event.dataTransfer?.files)
        if (moved || files.length === 0) return false
        event.preventDefault()
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos
        void insertImages(files, pos)
        return true
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  useEffect(() => {
    editorRef.current = editor
  }, [editor])

  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive("bold") ?? false,
      italic: editor?.isActive("italic") ?? false,
      underline: editor?.isActive("underline") ?? false,
      strike: editor?.isActive("strike") ?? false,
      code: editor?.isActive("code") ?? false,
      h2: editor?.isActive("heading", { level: 2 }) ?? false,
      h3: editor?.isActive("heading", { level: 3 }) ?? false,
      h4: editor?.isActive("heading", { level: 4 }) ?? false,
      bulletList: editor?.isActive("bulletList") ?? false,
      orderedList: editor?.isActive("orderedList") ?? false,
      blockquote: editor?.isActive("blockquote") ?? false,
      codeBlock: editor?.isActive("codeBlock") ?? false,
      link: editor?.isActive("link") ?? false,
      table: editor?.isActive("table") ?? false,
      canUndo: editor?.can().undo() ?? false,
      canRedo: editor?.can().redo() ?? false,
    }),
  })

  const chain = () => editor!.chain().focus()

  return (
    <div className="rounded-xl border border-gray-200 bg-white focus-within:border-indigo-300 focus-within:ring-[3px] focus-within:ring-indigo-500/10">
      {/* Toolbar */}
      <div className="sticky top-[65px] z-10 flex flex-wrap items-center gap-0.5 rounded-t-xl border-b border-gray-200 bg-gray-50/95 px-2 py-1.5 backdrop-blur lg:top-[77px]">
        <ToolButton icon={Undo2} label="Undo" disabled={!state?.canUndo} onClick={() => chain().undo().run()} />
        <ToolButton icon={Redo2} label="Redo" disabled={!state?.canRedo} onClick={() => chain().redo().run()} />
        <ToolbarDivider />
        <ToolToggle icon={Heading2} label="Heading 2" pressed={state?.h2} onClick={() => chain().toggleHeading({ level: 2 }).run()} />
        <ToolToggle icon={Heading3} label="Heading 3" pressed={state?.h3} onClick={() => chain().toggleHeading({ level: 3 }).run()} />
        <ToolToggle icon={Heading4} label="Heading 4" pressed={state?.h4} onClick={() => chain().toggleHeading({ level: 4 }).run()} />
        <ToolbarDivider />
        <ToolToggle icon={Bold} label="Bold (Ctrl+B)" pressed={state?.bold} onClick={() => chain().toggleBold().run()} />
        <ToolToggle icon={Italic} label="Italic (Ctrl+I)" pressed={state?.italic} onClick={() => chain().toggleItalic().run()} />
        <ToolToggle icon={Underline} label="Underline (Ctrl+U)" pressed={state?.underline} onClick={() => chain().toggleUnderline().run()} />
        <ToolToggle icon={Strikethrough} label="Strikethrough" pressed={state?.strike} onClick={() => chain().toggleStrike().run()} />
        <ToolToggle icon={Code} label="Inline code" pressed={state?.code} onClick={() => chain().toggleCode().run()} />
        <ToolbarDivider />
        <ToolToggle icon={List} label="Bullet list" pressed={state?.bulletList} onClick={() => chain().toggleBulletList().run()} />
        <ToolToggle icon={ListOrdered} label="Numbered list" pressed={state?.orderedList} onClick={() => chain().toggleOrderedList().run()} />
        <ToolToggle icon={Quote} label="Quote" pressed={state?.blockquote} onClick={() => chain().toggleBlockquote().run()} />
        <ToolToggle icon={SquareCode} label="Code block" pressed={state?.codeBlock} onClick={() => chain().toggleCodeBlock().run()} />
        <ToolButton icon={Minus} label="Divider" onClick={() => chain().setHorizontalRule().run()} />
        <ToolbarDivider />
        <ToolToggle icon={Link2} label="Link" pressed={state?.link} onClick={() => setLinkOpen(true)} />
        <TableMenu editor={editor} inTable={state?.table ?? false} />
        <ToolButton
          icon={uploading > 0 ? Loader2 : ImagePlus}
          label="Insert image"
          iconClassName={uploading > 0 ? "animate-spin" : undefined}
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          multiple
          className="hidden"
          onChange={(e) => {
            void insertImages(imageFiles(e.target.files))
            e.target.value = ""
          }}
        />
        {uploading > 0 && (
          <span className="ml-auto pr-2 text-xs font-medium text-indigo-600">
            Uploading {uploading} image{uploading === 1 ? "" : "s"}…
          </span>
        )}
      </div>

      {editor ? (
        <EditorContent editor={editor} className="text-gray-800" />
      ) : (
        <div className="min-h-[420px] animate-pulse bg-gray-50/50" />
      )}

      <LinkDialog open={linkOpen} onOpenChange={setLinkOpen} editor={editor} />
    </div>
  )
}

function TableMenu({ editor, inTable }: { editor: Editor | null; inTable: boolean }) {
  const run = (command: (chain: ReturnType<Editor["chain"]>) => ReturnType<Editor["chain"]>) => {
    if (editor) command(editor.chain().focus()).run()
  }
  const tableItems: [string, (c: ReturnType<Editor["chain"]>) => ReturnType<Editor["chain"]>][] = [
    ["Add row above", (c) => c.addRowBefore()],
    ["Add row below", (c) => c.addRowAfter()],
    ["Add column left", (c) => c.addColumnBefore()],
    ["Add column right", (c) => c.addColumnAfter()],
    ["Delete row", (c) => c.deleteRow()],
    ["Delete column", (c) => c.deleteColumn()],
    ["Toggle header row", (c) => c.toggleHeaderRow()],
    ["Merge or split cells", (c) => c.mergeOrSplit()],
  ]

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Table"
              className={cn("text-gray-600", inTable && "bg-indigo-100 text-indigo-700 hover:bg-indigo-100")}
            >
              <Table2 />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Table</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="start" className="w-52" onCloseAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuItem onSelect={() => run((c) => c.insertTable({ rows: 3, cols: 3, withHeaderRow: true }))}>
          <Table2 /> Insert table (3×3)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal text-gray-500">
          {inTable ? "Current table" : "Place the cursor in a table"}
        </DropdownMenuLabel>
        {tableItems.map(([label, command]) => (
          <DropdownMenuItem key={label} disabled={!inTable} onSelect={() => run(command)}>
            {label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled={!inTable} onSelect={() => run((c) => c.deleteTable())}>
          Delete table
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ToolbarDivider() {
  return <Separator orientation="vertical" className="mx-1 h-5! bg-gray-300" />
}

function ToolToggle({
  icon: Icon,
  label,
  pressed,
  onClick,
}: {
  icon: LucideIcon
  label: string
  pressed?: boolean
  onClick: () => void
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          size="sm"
          pressed={pressed ?? false}
          onPressedChange={onClick}
          aria-label={label}
          className="size-8 min-w-8 text-gray-600 data-[state=on]:bg-indigo-100 data-[state=on]:text-indigo-700"
        >
          <Icon />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function ToolButton({
  icon: Icon,
  label,
  disabled,
  iconClassName,
  onClick,
}: {
  icon: LucideIcon
  label: string
  disabled?: boolean
  iconClassName?: string
  onClick: () => void
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={disabled}
          onClick={onClick}
          aria-label={label}
          className="text-gray-600"
        >
          <Icon className={cn(iconClassName)} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function LinkDialog({
  open,
  onOpenChange,
  editor,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  editor: Editor | null
}) {
  const [url, setUrl] = useState("")

  useEffect(() => {
    if (open && editor) setUrl((editor.getAttributes("link").href as string | undefined) ?? "")
  }, [open, editor])

  const apply = (event: React.FormEvent) => {
    event.preventDefault()
    if (!editor) return
    const href = url.trim()
    const range = editor.chain().focus().extendMarkRange("link")
    if (!href) range.unsetLink().run()
    else range.setLink({ href: /^(https?:|mailto:|tel:|\/|#)/i.test(href) ? href : `https://${href}` }).run()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={apply} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Insert link</DialogTitle>
            <DialogDescription>Select text first, then add a URL. Leave empty to remove the link.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="link-url">URL</Label>
            <Input
              id="link-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600">
              {url.trim() ? "Apply link" : "Remove link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
