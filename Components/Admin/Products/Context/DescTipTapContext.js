"use client";

import React, { createContext, useContext, useState } from "react";
import { useEditor } from "@tiptap/react";
import { Bold, ImageIcon, Type, Palette } from "lucide-react";
import CodeBlock from "@tiptap/extension-code-block";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";

const DescTipTapContext = createContext();

export const DescTipTapProvider = ({ children }) => {
    const ResizableImage = Image.extend({
        addAttributes() {
            return {
                ...this.parent?.(),
                width: {
                    default: "100%",
                    renderHTML: (attributes) => ({ width: attributes.width }),
                },
                height: {
                    default: "auto",
                    renderHTML: (attributes) => ({ height: attributes.height }),
                },
            };
        },
        addCommands() {
            return {
                ...this.parent?.(),
                setResizableImage: (attributes) => ({ commands }) => {
                    return commands.updateAttributes("image", attributes);
                },
            };
        },
    });

    const [activeTab, setActiveTab] = useState("text");
    const [fontSize, setFontSize] = useState(16);
    const [textColor, setTextColor] = useState("#000000");
    const [highlightColor, setHighlightColor] = useState("#ffff00");
    const [imageSize, setImageSize] = useState(100);
    const [image, setImage] = useState(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            ResizableImage,
            Underline,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({
                placeholder: "Start crafting your product story...",
            }),
            CharacterCount.configure({ limit: 50000 }),
            CodeBlock,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight.configure({ multicolor: true }),
            TextStyle,
            Color,
            Subscript,
            Superscript,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: "<p></p>",
    });

    if (!editor) {
        return null;
    }

    const tabs = [
        { id: "text", icon: <Type className="w-6 h-6" />, label: "Text" },
        { id: "format", icon: <Bold className="w-6 h-6" />, label: "Format" },
        { id: "insert", icon: <ImageIcon className="w-6 h-6" />, label: "Insert" },
        { id: "style", icon: <Palette className="w-6 h-6" />, label: "Style" },
    ];
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (typeof event.target?.result === "string") {
                    insertImage(event.target.result);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const insertImage = (imageSrc) => {
        editor.chain().focus().insertContentAt(editor.state.doc.content.size, {
            type: "image",
            attrs: { src: imageSrc },
        }).run();
    };


    const wordCount = editor.storage.characterCount.words();

    const setHeading = (level) => {
        editor.chain().focus().toggleHeading({ level }).run();
    };

    const setTextColorForSelection = (color) => {
        editor.chain().focus().setColor(color).run();
    };

    const setHighlightColorForSelection = (color) => {
        editor.chain().focus().toggleHighlight({ color }).run();
    };

    const insertTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    return (
        <DescTipTapContext.Provider value={{ activeTab, setActiveTab, fontSize, setFontSize, textColor, setTextColor, highlightColor, setHighlightColor, imageSize, setImageSize, image, setImage, editor, tabs, handleImageUpload, insertImage, wordCount, setHeading, setTextColorForSelection, setHighlightColorForSelection, insertTable }}>
            {children}
        </DescTipTapContext.Provider>
    );
};

export const useDescTipTap = () => useContext(DescTipTapContext);
