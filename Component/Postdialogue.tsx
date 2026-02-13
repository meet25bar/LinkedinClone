import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ProfilePhoto from "./Shared/ProfilePhoto"
import { Textarea } from "@/components/ui/textarea"
import { Image as ImageIcon } from "lucide-react"
import { createPostAction } from "@/lib/serveraction"

export function DialogDemo({
  setOpen,
  open,
  src,
}: {
  setOpen: (val: boolean) => void
  open: boolean
  src: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageURL, setImageURL] = useState<string | null>(null)
  const [inputtext, setInputText] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageURL(URL.createObjectURL(file))
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("inputText", inputtext)
    if (selectedFile) formData.append("image", selectedFile)

    try {
      await createPostAction(formData)
      // ✅ Close the dialog after success
      setOpen(false)
      // Optional: reset fields
      setInputText("")
      setImageURL(null)
      setSelectedFile(null)
    } catch (err) {
      console.error("Post failed:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md shadow-lg z-50">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center">
              <ProfilePhoto src={src} />
              <div>
                <h1>Meet Barot</h1>
                <p className="text-xs">Post to anyone</p>
              </div>
            </DialogTitle>
            <DialogDescription>Type your post below.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col mt-2">
            <Textarea
              name="inputText"
              value={inputtext}
              onChange={(e) => setInputText(e.target.value)}
              className="border-none text-lg focus-visible:ring-0"
              placeholder="Type your message here."
            />
            {imageURL && (
              <img
                src={imageURL}
                alt="preview"
                className="mt-4 rounded-md max-h-48 object-contain"
              />
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Post</Button>
          </DialogFooter>
        </form>

        <input
          ref={inputRef}
          type="file"
          name="image"
          className="hidden"
          accept="image/*"
          onChange={handleImageSelect}
        />

        <div className="absolute bottom-4 left-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => inputRef?.current?.click()}
            className="flex items-center gap-1 text-sm"
          >
            <ImageIcon className="h-4 w-4" />
            Media
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
