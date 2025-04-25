
import React, { useState, useCallback, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
} from 'lucide-react';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
  className?: string;
  autoFocus?: boolean;
}

const TipTapEditor = ({ 
  content, 
  onChange, 
  readOnly = false,
  className = '',
  autoFocus = false
}: TipTapEditorProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content,
    editable: !readOnly,
    autofocus: autoFocus,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Update editor content when it changes externally
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const setHeading = (level: 1 | 2 | 3) => editor.chain().focus().toggleHeading({ level }).run();

  return (
    <div className={`border rounded-lg ${isFocused ? 'ring-2 ring-primary/20' : ''} ${className}`}>
      {!readOnly && (
        <div className="p-2 border-b bg-slate-50 flex flex-wrap items-center gap-1 rounded-t-lg">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.commands.undo()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="h-8 w-8"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.commands.redo()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="h-8 w-8"
          >
            <Redo className="h-4 w-4" />
          </Button>
          <span className="w-px h-6 bg-slate-200 mx-1" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setHeading(1)}
            className={`h-8 w-8 ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-200' : ''}`}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setHeading(2)}
            className={`h-8 w-8 ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}`}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setHeading(3)}
            className={`h-8 w-8 ${editor.isActive('heading', { level: 3 }) ? 'bg-slate-200' : ''}`}
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <span className="w-px h-6 bg-slate-200 mx-1" />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBold}
            className={`h-8 w-8 ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleItalic}
            className={`h-8 w-8 ${editor.isActive('italic') ? 'bg-slate-200' : ''}`}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <span className="w-px h-6 bg-slate-200 mx-1" />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBulletList}
            className={`h-8 w-8 ${editor.isActive('bulletList') ? 'bg-slate-200' : ''}`}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleOrderedList}
            className={`h-8 w-8 ${editor.isActive('orderedList') ? 'bg-slate-200' : ''}`}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
      )}
      <EditorContent 
        editor={editor} 
        className={`prose max-w-none p-4 min-h-[200px] ${readOnly ? 'cursor-default' : ''}`} 
      />
    </div>
  );
};

export default TipTapEditor;
