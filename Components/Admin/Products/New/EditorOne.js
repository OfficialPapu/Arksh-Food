"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EditorContent } from "@tiptap/react";
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Slider } from "@/Components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { cn } from "@/lib/utils"
import { Bold, Italic, UnderlineIcon, Link2, ImageIcon, Palette, List, ListOrdered, Quote, Minus, X, Undo, Redo, AlignLeft, AlignCenter, AlignRight, Code, Strikethrough, SubscriptIcon, SuperscriptIcon, Table2 } from "lucide-react"
import { useDescTipTap } from "../Context/DescTipTapContext";
const EditorOne = () => {
    const { activeTab, setActiveTab, fontSize, setFontSize, textColor, setTextColor, highlightColor, setHighlightColor, imageSize, setImageSize, image, setImage, editor, tabs, handleImageUpload, insertImage, wordCount, setHeading, setTextColorForSelection, setHighlightColorForSelection, insertTable } = useDescTipTap();
    return (
        <div className="w-full mx-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden transition-colors duration-200">
            <div className="flex flex-col h-[455px] overflow-y-scroll">
                <div className="w-full bg-gray-100 dark:bg-gray-800 py-2 sticky top-0 z-[5]">
                    <div className="flex justify-center gap-10">
                        {tabs.map((tab) => (
                            <Button
                                type="button"
                                key={tab.id}
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "w-12 h-12 rounded-full transition-all duration-200 ease-in-out",
                                    activeTab === tab.id && "bg-primary text-primary-foreground shadow-md",
                                )}
                                onClick={() => setActiveTab(tab.id)}
                                aria-label={tab.label}
                            >
                                {tab.icon}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <EditorContent
                        editor={editor}
                        className="flex-1 px-4 pt-4 overflow-auto focus:outline-none prose dark:prose-invert max-w-none TipTapEditor"
                        style={{ fontSize: `${fontSize}px`, color: textColor }}
                    />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-gray-50 dark:bg-gray-700 p-4 flex items-center justify-center overflow-x-auto sticky bottom-0 mt-2"
                        >
                            {activeTab === "text" && (
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5, 6].map((level) => (
                                        <Button
                                            type="button"
                                            key={level}
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setHeading(level)}
                                            className={cn(editor.isActive("heading", { level }) && "bg-muted")}
                                            aria-label={`Heading ${level}`}
                                        >
                                            {React.createElement(`p`, { className: "w-8 h-8 text-xl grid place-items-center" }, `h${level}`)}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        type="button"
                                        size="icon"
                                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                                        className={cn(editor.isActive("bulletList") && "bg-muted")}
                                        aria-label="Bullet List"
                                    >
                                        <List className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                        className={cn(editor.isActive("orderedList") && "bg-muted")}
                                        aria-label="Ordered List"
                                    >
                                        <ListOrdered className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                        className={cn(editor.isActive("blockquote") && "bg-muted")}
                                        aria-label="Blockquote"
                                    >
                                        <Quote className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                            {activeTab === "format" && (
                                <div className="flex space-x-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().toggleBold().run()}
                                        className={cn(editor.isActive("bold") && "bg-muted")}
                                        aria-label="Bold"
                                    >
                                        <Bold className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().toggleItalic().run()}
                                        className={cn(editor.isActive("italic") && "bg-muted")}
                                        aria-label="Italic"
                                    >
                                        <Italic className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                                        className={cn(editor.isActive("underline") && "bg-muted")}
                                        aria-label="Underline"
                                    >
                                        <UnderlineIcon className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().toggleStrike().run()}
                                        className={cn(editor.isActive("strike") && "bg-muted")}
                                        aria-label="Strikethrough"
                                    >
                                        <Strikethrough className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                                        className={cn(editor.isActive("subscript") && "bg-muted")}
                                        aria-label="Subscript"
                                    >
                                        <SubscriptIcon className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                                        className={cn(editor.isActive("superscript") && "bg-muted")}
                                        aria-label="Superscript"
                                    >
                                        <SuperscriptIcon className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            const url = window.prompt("URL")
                                            if (url) editor.chain().focus().setLink({ href: url }).run()
                                        }}
                                        className={cn(editor.isActive("link") && "bg-muted")}
                                        aria-label="Insert Link"
                                    >
                                        <Link2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                        className={cn(editor.isActive("codeBlock") && "bg-muted")}
                                        aria-label="Code Block"
                                    >
                                        <Code className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                                        className={cn(editor.isActive({ textAlign: "left" }) && "bg-muted")}
                                        aria-label="Align Left"
                                    >
                                        <AlignLeft className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                                        className={cn(editor.isActive({ textAlign: "center" }) && "bg-muted")}
                                        aria-label="Align Center"
                                    >
                                        <AlignCenter className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                                        className={cn(editor.isActive({ textAlign: "right" }) && "bg-muted")}
                                        aria-label="Align Right"
                                    >
                                        <AlignRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                            {activeTab === "insert" && (
                                <div className="flex items-center space-x-4">
                                    <div className="flex space-x-2">
                                        <label htmlFor="image-upload">
                                            <Button variant="outline" size="icon" asChild type="button">
                                                <span>
                                                    <ImageIcon className="w-4 h-4" />
                                                </span>
                                            </Button>
                                        </label>
                                        <Input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            multiple
                                            onChange={handleImageUpload}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                                            aria-label="Insert Horizontal Rule"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={insertTable} aria-label="Insert Table" type="button">
                                            <Table2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    {editor.isActive("image") && (
                                        <div className="flex flex-col items-center ml-4">
                                            <span className="text-sm mb-2">Image Size</span>
                                            <Slider
                                                min={10}
                                                max={100}
                                                step={5}
                                                value={[imageSize]}
                                                onValueChange={(value) => {
                                                    setImageSize(value[0]);
                                                    editor.commands.setResizableImage({
                                                        width: `${value[0]}%`,  // Adjust the unit as per your design (e.g., % or px)
                                                        height: 'auto',         // You can also update height here if needed
                                                    });
                                                }}
                                                className="w-32"
                                            />
                                        </div>
                                    )}

                                </div>
                            )}
                            {activeTab === "style" && (
                                <div className="flex items-center space-x-4">
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm mb-2">Font Size</span>
                                        <Slider
                                            min={12}
                                            max={24}
                                            step={1}
                                            value={[fontSize]}
                                            onValueChange={(value) => setFontSize(value[0])}
                                            className="w-32"
                                        />
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="icon" aria-label="Text Color" type="button">
                                                <Palette className="w-4 h-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64">
                                            <div className="flex flex-wrap gap-1">
                                                {["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"].map((color) => (
                                                    <Button
                                                        type="button"
                                                        key={color}
                                                        variant="outline"
                                                        size="icon"
                                                        className="w-8 h-8 rounded-full"
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => setTextColorForSelection(color)}
                                                    />
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="icon" aria-label="Highlight Color" type="button">
                                                <span className="w-4 h-4 bg-yellow-200 rounded" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64">
                                            <div className="flex flex-wrap gap-1">
                                                {["#FFFF00", "#00FF00", "#00FFFF", "#FF69B4", "#FFA500"].map((color) => (
                                                    <Button
                                                        type="button"
                                                        key={color}
                                                        variant="outline"
                                                        size="icon"
                                                        className="w-8 h-8 rounded-full"
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => setHighlightColorForSelection(color)}
                                                    />
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().clearContent().run()}>
                        <X className="w-4 h-4 mr-2" /> Clear
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                    >
                        <Undo className="w-4 h-4 mr-2" /> Undo
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                    >
                        <Redo className="w-4 h-4 mr-2" /> Redo
                    </Button>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-muted-foreground">{wordCount} words</div>
                </div>
            </div>
        </div>
    )
}

export default EditorOne;

