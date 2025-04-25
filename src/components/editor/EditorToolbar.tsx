
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Undo, Redo } from 'lucide-react';

interface EditorToolbarProps {
  editor: any;
  readOnly?: boolean;
}

const EditorToolbar = ({ editor, readOnly = false }: EditorToolbarProps) => {
  if (readOnly || !editor) return null;

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const setHeading = (level: 1 | 2 | 3) => editor.chain().focus().toggleHeading({ level }).run();

  return (
    <div className="p-2 border-b bg-slate-50 flex flex-wrap items-center gap-1 rounded-t-lg">
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="h-8 w-8">
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="h-8 w-8">
        <Redo className="h-4 w-4" />
      </Button>
      <span className="w-px h-6 bg-slate-200 mx-1" />
      <Button variant="ghost" size="icon" onClick={() => setHeading(1)} className={`h-8 w-8 ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-200' : ''}`}>
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => setHeading(2)} className={`h-8 w-8 ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}`}>
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => setHeading(3)} className={`h-8 w-8 ${editor.isActive('heading', { level: 3 }) ? 'bg-slate-200' : ''}`}>
        <Heading3 className="h-4 w-4" />
      </Button>
      <span className="w-px h-6 bg-slate-200 mx-1" />
      <Button variant="ghost" size="icon" onClick={toggleBold} className={`h-8 w-8 ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}>
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={toggleItalic} className={`h-8 w-8 ${editor.isActive('italic') ? 'bg-slate-200' : ''}`}>
        <Italic className="h-4 w-4" />
      </Button>
      <span className="w-px h-6 bg-slate-200 mx-1" />
      <Button variant="ghost" size="icon" onClick={toggleBulletList} className={`h-8 w-8 ${editor.isActive('bulletList') ? 'bg-slate-200' : ''}`}>
        <List className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={toggleOrderedList} className={`h-8 w-8 ${editor.isActive('orderedList') ? 'bg-slate-200' : ''}`}>
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EditorToolbar;
