"use client"

import { Bold, Italic, List, ListChecks, Heading1, Heading2, Undo, Redo } from "lucide-react"
import { Button } from "./ui/button"
import { useRef, useEffect, useState } from "react"

type RichTextEditorProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
}

export const RichTextEditor = ({ value, onChange, placeholder, maxLength = 500 }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [textLength, setTextLength] = useState(0)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
      updateTextLength()
    }
  }, [value])

  const updateTextLength = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || ""
      setTextLength(text.length)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      const text = editorRef.current.innerText || ""

      if (text.length <= maxLength) {
        onChange(content)
        updateTextLength()
      } else {
        // Prevent further input if max length exceeded
        editorRef.current.innerHTML = value
      }
    }
  }

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const insertChecklistItem = () => {
    const selection = window.getSelection()
    if (selection && editorRef.current) {
      const range = selection.getRangeAt(0)
      const checklistItem = document.createElement("div")
      checklistItem.innerHTML = "☐ "
      checklistItem.style.marginBottom = "4px"

      range.deleteContents()
      range.insertNode(checklistItem)

      // Move cursor after the checkbox
      const newRange = document.createRange()
      newRange.setStartAfter(checklistItem.firstChild!)
      newRange.collapse(true)
      selection.removeAllRanges()
      selection.addRange(newRange)

      handleInput()
    }
  }

  return (
    <div className="border rounded-xl bg-transparent overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-white/20 backdrop-blur-sm">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("bold")}
          className="h-8 w-8 p-0 hover:bg-white/30"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("italic")}
          className="h-8 w-8 p-0 hover:bg-white/30"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("formatBlock", "h1")}
          className="h-8 w-8 p-0 hover:bg-white/30"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("formatBlock", "h2")}
          className="h-8 w-8 p-0 hover:bg-white/30"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("insertUnorderedList")}
          className="h-8 w-8 p-0 hover:bg-white/30"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertChecklistItem}
          className="h-8 w-8 p-0 hover:bg-white/30"
        >
          <ListChecks className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("undo")}
          className="h-8 w-8 p-0 hover:bg-white/30"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("redo")}
          className="h-8 w-8 p-0 hover:bg-white/30"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="w-full min-h-28 p-3 text-gray-700 focus:outline-none resize-none"
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      {/* Character count */}
      <div className="px-3 pb-2 text-right">
        <span className={`text-sm ${textLength > maxLength * 0.9 ? "text-red-500" : "text-gray-500"}`}>
          {textLength}/{maxLength}
        </span>
      </div>

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: rgb(156, 163, 175);
          pointer-events: none;
        }
        
        [contenteditable] h1 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        
        [contenteditable] h2 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.4rem 0;
        }
        
        [contenteditable] ul {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        
        [contenteditable] li {
          margin: 0.2rem 0;
        }
      `}</style>
    </div>
  )
}
